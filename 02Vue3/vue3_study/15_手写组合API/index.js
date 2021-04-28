// ==================================================shallowReactive和reactive

// handler函数
const reactiveHandler={
  get(target,key){
    console.log('拦截get ',key)
    if(key==='_is_reactive') return true
    return Reflect.get(target,key)
  },
  set(target,key,value){
    console.log('拦截set ',key)
    return Reflect.set(target,key,value)
  },
  deleteProperty(target,key){
    console.log('拦截deleteProperty ',key)
    return Reflect.deleteProperty(target,key)
  }
}

function shallowReactive(target){
  if(target&&typeof target ==='object'){
    return new Proxy(target,reactiveHandler)
  }
  return target
}

function reactive(target) {
  if(target&&typeof target ==='object'){
    // 如果是数组，循环遍历
    if(Array.isArray(target)){
      target.forEach((item,index)=>{
        target[index]=reacitve(item)
      })
    } else {
      // 对象数据也要遍历操作
      Object.keys(target).forEach((key)=>{
        target[key]=reactive(target[key])
      })
    }
    return new Proxy(target,reactiveHandler)
  }
  return target
}

// ==================================================readonly和shallowReadonly
const readonlyHandler={
  get(target,key){
    console.log('拦截get ',key)
    if(key==='_is_readonly') return true
    return Reflect.get(target,key)
  },
  set(target,key,value){
    console.log('拦截set ',key)
    console.warn('只能读取'+key+'数据')
    return true
  },
  deleteProperty(){
    console.warn('只能读取'+key+'数据')
    return true
  }
}
function shallowReadonly(target) {
  if(target&&typeof target ==='object'){
    return new Proxy(target,readonlyHandler)
  }
  // 如果不是对象则直接返回
  return target
}

function readonly(target){
  if(target&&typeof target==='object'){
    if(Array.isArray(target)){
      target.forEach(item=>{
        target[item]=readonly(item)
      })
    } else {
      Object.keys(target).forEach(key=>{
        target[key]=readonly(target[key])
      })
    }
    return new Proxy(target,readonlyHandler)
  }
  return target
}

// ==================================================shallowRef和ref
// es5中只能依次设置每个属性的set或者get，不能设置整体的set或者get
// es6可以通过proxy重写元程序，针对整体的get算法进行重写
function shallowRef(target){
  return {
    _is_ref:true,
    _value:target,
    get value(){
      console.log('劫持了value')
      return this._value
    },
    set value(value){
      console.log('设置劫持了value')
      this._value=value
    }
  }
}

function ref(target){
  target=reactive(target)
  return {
    _is_ref:true,
    _value:target,
    get value(){
      console.log('劫持了value')
      return this._value
    },
    set value(value){
      console.log('设置劫持了value')
      this._value=value
    }
  }
}

// ===========================================isRef,isReactive,isReadonly,isProxy
function isRef(obj){
  return obj&&obj._is_ref
}
function isReactive(obj){
  return obj&&obj._is_reactive
}
function isReadonly(obj){
  return obj&&obj._is_readonly
}
function isProxy(obj){
  return obj&&(isReactive(obj)||isReadonly(obj))
}