<template>
  <div>
    {{name}}
    {{age}}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive,ref,toRefs } from 'vue'

export default defineComponent({
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
})
</script>

<style scoped>

</style>