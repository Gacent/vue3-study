<template>
  <div>
    m1:{{m1}}<br/>
    m2:{{m2}}<br/>
    m3:{{m3}}<br/>
    m4:{{m4}}<br/>
    <button @click="changeValue">改变值</button>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, shallowRef, shallowReactive } from 'vue'

export default defineComponent({
  setup () {
    let m1=ref({
      name:'zjs',
      age:12,
      child:{
        name:'zjss',
        age:2
      }
    })

    let m2=reactive({
      name:'zjs',
      age:12,
      child:{
        name:'zjss',
        age:2
      }
    })
    
    let m3=shallowRef({
      name:'zjs',
      age:12,
      child:{
        name:'zjss',
        age:2
      }
    })

    let m4=shallowReactive({
      name:'zjs',
      age:12,
      child:{
        name:'zjss',
        age:2
      }
    })

    function changeValue(){
      m1.value.child.name+='==' // 深度响应式
      // m2.child.name+='==' // 深度响应式
      m3.value.child.name+='=11=' // 浅度响应式
      // m3.value.name+='==' // 浅度响应式，一级对象也不响应
      // m4.name+='==' // 浅度响应式，一级对象会响应
      // m4.child.name+='==' // 浅度响应式

    }

    return {
      m1,
      m2,
      m3,
      m4,
      changeValue
    }
  }
})
</script>

<style scoped>

</style>