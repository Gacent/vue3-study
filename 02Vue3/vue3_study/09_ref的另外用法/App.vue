<template>
  <div>
    <input type="text" ref="inputVal">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup () {
    const inputVal=ref<HTMLElement|null>(null)
    onMounted(()=>{
      console.log(inputVal)
      inputVal.value&&inputVal.value.focus()
    })
    return {
      inputVal
    }
  }
})
</script>

<style scoped>

</style>