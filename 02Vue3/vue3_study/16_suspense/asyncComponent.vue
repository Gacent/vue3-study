<template>
  <div>
    asyncComponent异步子组件
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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
})
</script>

<style scoped>

</style>