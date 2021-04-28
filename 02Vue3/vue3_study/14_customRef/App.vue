<template>
  <div>
    <input type="text" v-model="text">
    {{text}}
  </div>
</template>

<script lang="ts">
import { defineComponent, customRef } from 'vue'
function useDebouncedRef<T>(value:T,delay){
  let timer:number
  return customRef((track,trigger)=>{
    return {
      get(){
        track()
        return value
      },
      set(newValue:T){
        clearTimeout(timer)
        timer=setTimeout(() => {
          value=newValue
          trigger()
        }, delay);
      }
    }
  })
}
export default defineComponent({
  setup () {
    let text=useDebouncedRef('abc',200)

    return {
      text
    }
  }
})
</script>

<style scoped>

</style>