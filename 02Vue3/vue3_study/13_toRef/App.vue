<template>
  <div>
    toRef:{{state1}}<br/>
    ref:{{state2}}<br/>
    toRef的age：{{toState1}}<br/>
    ref的age：{{toState2}}<br/>
    <button @click="change1">修改toRef里的数据</button>
    <button @click="change2">修改ref里的数据</button>
    <hr/>
    <Child :age="toState1"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef,ref } from 'vue'
import Child from './component/Child.vue'
export default defineComponent({
  components:{
    Child
  },
  setup () {
    let state1=reactive({
      name:'刘德华',
      age:22
    })
    let state2=reactive({
      name:'刘德华',
      age:22
    })
    let toState1=toRef(state1,'age')  // 复制对象的引用，修改值会影响之前的对象
    let toState2=ref(state2.age)  // 重新创建一个对象，修改值不会影响之前的对象
    const change1=()=>{
      toState1.value+=100
    }
    const change2=()=>{
      toState2.value+=100
    }
    return {
      state1,
      state2,
      toState2,
      toState1,
      change1,
      change2
    }
  }
})
</script>

<style scoped>

</style>