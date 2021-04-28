# vue3
## 六大亮点
1. Performance: 性能比vue2.x快1.2*2倍
2. Tree sharking support: 按需编译，体积比Vue2.x更小
3. Composition Api：组合API（类似React Hooks）
4. 更好的TS支持
5. Custom Renderer API: 暴露了自定义渲染api
6. Fragment，Teleport（Protal），Suspense：更先进的组件

## 如何变快的
- diff方法优化
  + Vue2中的虚拟DOM是进行全量的对比的
  + Vue3新增**静态标记**（PatchFlag）
    在与上次虚拟节点进行对比的时候，只对比带有patch flag的节点
    并且可以通过flag的信息得知当前节点要对比的具体内容
- hoistStatic 静态提升（_createVNode）
  + vue2中无论元素是否参与更新，每次都会重新创建
  + Vue3中对于不参与更新的元素，只会被创建一次，之后会在每次渲染时候被不停服用
- cacheHandlers 事件侦听器缓存
  + 默认情况OnClick会被视为动态绑定，所以每次都会去追踪变化
    但是因为是同一个函数，所以没有必要追踪，直接缓存起来复用
- SSR渲染
  + 当大量静态的内容时候，这些内容被当作纯字符串推进一个buffer里面
    即使存在动态的绑定，会通过模板插值嵌入进去，这样会比通过虚拟DOM来渲染的快
  + 当静态内容打倒一定量级时候，会用_createStaticVnode方法在客户端去生成一个static node，这些静态node，会被直接innerHtml，就不需要创建对象，然后根据对象渲染

## vue2的弊端
- data数据和业务逻辑处理分开，不利于维护和阅读
- 没新增一个业务逻辑，都需要在data中加入相关的数据

## Composition API
封装好的具备独立功能的函数组合在一起
### reactive
- 实现响应式数据的变化
- 如果传入的是基础类型的数据，不会包装成proxy，即不会实现响应式
- vue2是使用defineProperty来实现，vue3是使用proxy来实现
- 注意点：
  - 参数必须是对象
  - 如果给reactive传递其他对象，默认下修改对象，界面不会更新，想要更新可以重新赋值的方式
- 本质：将传入的数据包装成一个proxy

### ref
- 和reactive一样，也是实现响应式数据的方法
- 可以监听简单类型的变化，也可以监听引用类型的变化(会转换成proxy代理对象)
- 本质：底层还是**reactive**，系统会自动根据我们给ref传入的值转换成**ref(xx)=>reactive({value:xx})**
- 注意点：在vue中使用ref的值不用通过value获取，在js中必须通过value获取

### reactive和ref的区别
- 如果在template里使用ref类型的数据，Vue会自动帮我们添加.value；如果使用的是reactive的数据，不会添加
- Vue如何决定是否需要添加.value
  - 在解析数据之前，会通过__v_ref私有属性来判断是不是ref类型的数据，从而判断是否需要添加.value
- 可以通过**import {isRef,isReactive} from 'vue'**来判断

### 计算属性和监视
#### 计算属性
```javascript
  computed(()=>{})  // 只包含get方法

  computed({
    get:()=>{},
    set:()=>{}
  })
```
#### 监视
```javascript
  // 监听一个数据
  watch('监听对象',()=>{},{immediate:true,deep:true})
  // 监听多个数据,如果数据是非响应式需要加()=>
  watch([()=>user.firstName,()=>user.lastName],()=>{
    console.log(11)
  })

  watchEffect(()=>{}) // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。即immediate默认为true了

```
### 生命周期
#### 2.0和3.0相比
beforeDestroy和destroy替换成了beforeUnmount和Unmount
同时：
- beforeCreate -> 使用 setup()
- created -> 使用 setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- errorCaptured -> onErrorCaptured
> 3.0的比2.0的同周期的钩子函数要先执行，即如onBeforeMount比beforeMount先执行

### 自定义Hook函数

### toRefs
问题: reactive 对象取出的所有属性值都是非响应式的
解决: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性
```javascript
setup () {
  let state=reactive({
    name:'zjs',
    age:18
  })
  setTimeout(() => {
    state.age=22
  }, 1000);
  // return {
  //   state
  // }
  // return{
  //   ...state // 不是响应式了,因为name和age没有实现响应式，只是state实现了而已
  // }
  return {
    ...toRefs(state)    // 会将state里的属性都变成ref，即响应式数据，所以定时器可以改变值并实现ui变更
  }
}
```

### 递归监听
- ref和reactive都是递归监听
- 缺点：数据量大的话，非常消耗性能

### 非递归监听
- shallowReactive，只会监听第一层，即第一级
- shallowRef，监听的是state第一层的，**shallowRef(xx)=>shallowReactive({value:xx})**，也就是state.value，而state.value里面的每层都不监听
- triggerRef，没有提供triggerReactive方法，所以如果是reactive类型的数据，那么无法触发页面更新

### readonly和shallowReadonly
- readonly：深度代理只读，对象任何property都不可修改
- shallowReadonly：浅度代理只读，嵌套对象的深度只读转换还是可以修改的

### toRaw
- 从reactive或ref中得到原始数据
- 作用：有些操作不需要更新ui界面，可以通过toRaw获取原始数据，对原始数据进行修改，这样就不会更新ui界面，性能就提升了
```javascript
// reactive
setup(){
  let obj={name:'zj',age:18}
  let state=reactive(obj)
  let obj2=toRaw(state)
  // obj===obj2
}
// ref
setup(){
  let obj={name:'zj',age:18}
  let state=ref(obj)
  let obj2=toRaw(state.value)
  // obj===obj2
}
```
> proxy变成普通对象，不影响原代理对象

### markRaw
- 数据永远不追踪
```javascript
// reactive
setup(){
  let obj={name:'zj',age:18}
  obj=markRaw(obj)  
  let state=reactive(obj) // 追踪无效，不能实现响应式
}
```
> 将普通对象赋予不能代理的特性，而不是将响应式数据变成普通对象
> 观察对象中会出现多了一个__v_skip属性

### toRef
- ref->复制，修改响应式数据，不会影响以前的数据
- toRef-> 引用，修改响应式数据，会影响之前的数据
应用: 当要将 某个prop 的 ref 传递给复合函数时，toRef 很有用

### provide和inject
- 实现跨层级组件(祖孙)间通信
- 父级组件：`provide('color', color)`
- 子孙组件：`inject('color')`

### 响应式数据的判断
- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
- isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
- isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理

### 新组件
#### Fragment(片断)
其实就是不再需要一定在template中写根标签
好处:减少标签层级,减小内存占用
#### Teleport(瞬移)
```html
<teleport to="body">
  <div v-if="modalOpen" class="modal">
    <div>
      I'm a teleported modal! 
      (My parent is "body")
      <button @click="modalOpen = false">
        Close
      </button>
    </div>
  </div>
</teleport>
```
将元素插入到特定的标签内

#### Suspense(不确定的)
此api可能会更改
- 它们允许我们的应用程序在等待异步组件时渲染一些后备内容，可以让我们创建一个平滑的用户体验
```javascript
  async setup () {

    // promise
    // async/await
    // axios
    // 都使组件成为异步组件
    return new Promise((resolve)=>{
        setTimeout(() => {
          console.log('setTimeout')
          resolve()
        }, 5100);
      })
  }
```

### setUp
- 注入data和注入methods
#### 执行时机
- 在beforeCreatea之前执行，组件Data和method还没初始化好
- 不能使用data和methods，所以Vue为了避免我们错误使用，将setup函数中的this修改成undefined
- setup只能是同步的，不能异步，即async setup
#### 返回值问题
- 和data合并对象的方法和属性,如果重名,优先使用setup的
#### 参数
- `setup(props,context){}`
- props表示:是一个对象,里面是父级传给子组件的所有属性,Proxy类型
- context:{attrs, slots, emit}
  - attrs:包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
  - emit:用来分发自定义事件的函数, 相当于 this.$emit
  - slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
