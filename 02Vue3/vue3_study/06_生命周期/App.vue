<template>
  <div>
    <button @click="isShow=!isShow">控制子组件显示切换</button>
    <Child v-if="isShow"></Child>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Child from './components/Child.vue'
export default defineComponent({
  components:{
    Child
  },
  setup () {
    let isShow=ref(true)

    return {
      isShow
    }
  }
})
</script>

<style scoped>

</style>