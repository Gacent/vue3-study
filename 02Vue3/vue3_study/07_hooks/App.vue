<template>
  <div>
    <p>自定义hook函数</p>
    <p>鼠标位置：x：{{x}} y:{{y}}</p>
    <p>==========================================</p>
    <div v-if="loading">正在加载中····</div>
    <div v-else-if="errorMsg">{{errorMsg}}</div>
    <!-- <div v-else>
      <ul>
        <li>name: {{result.name}}</li>
        <li>gender: {{result.gender}}</li>
        <li>age: {{result.age}}</li>
      </ul>
    </div> -->
    <div v-else>
      <ul v-for="(item,index) in result" :key="index">
        <li >title: {{item.title}}</li>
        <li>time: {{item.time}}</li>
        <li>views: {{item.views}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import useMousePosition from './hooks/useMousePosition'
import useAjax from './hooks/useAjax'

interface objModule{
  name:string,
  gender:string,
  age:number
}
interface arrayModule{
  title:string,
  time:string,
  views:number
}
export default defineComponent({
  setup () {
    const {x,y}=useMousePosition()
    // const {loading,result,errorMsg}=useAjax<objModule>('/json/obj.json')
    const {loading,result,errorMsg}=useAjax<arrayModule[]>('/json/array.json')
    watch(result,()=>{
      if(result.value){
        console.log(result.value.length)
      }
    })
    return {
      x,y,loading,result,errorMsg
    }
  }
})
</script>

<style scoped>

</style>