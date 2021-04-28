<template>
  <div>
    toRaw：{{state1}}<br/>
    markRaw：{{state2}}<br/>
    <button @click="onRaw">onRaw</button>
    <button @click="onMarkRaw">onMarkRaw</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, markRaw } from 'vue'

export default defineComponent({
  setup () {
    let state1=reactive({
      name:'张学友',
      age:55
    })
    let state2=reactive<any>({
      name:'刘德华',
      age:44,
      initLikes:['a','b','c']
    })

    let onRaw=()=>{
      let raw=toRaw(state1)
      raw.name='zjssss'
    }
    let onMarkRaw=()=>{
      let likes=['l','i','k','e','s']
      state2.likes=markRaw(likes)
      setTimeout(() => {
        state2.likes[0]=22222
      console.log(state2,state2.likes)
      }, 1000);

    }

    return {
      state1,
      state2,
      onMarkRaw,
      onRaw
    }
  }
})
</script>

<style scoped>

</style>