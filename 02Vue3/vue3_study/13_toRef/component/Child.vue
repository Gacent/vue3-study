<template>
  <div>
    age：{{age}}<br/>
    length：{{length}}
  </div>
</template>

<script lang="ts">
import { defineComponent,computed,Ref,toRef } from 'vue'

export default defineComponent({
  props:{
    age:{
      type:Number,
      required:true
    }
  },
  setup (props) {
    const length=useFeatureX(toRef(props,'age'))
    return {
      length
    }
  }
})
function useFeatureX(age:Ref){
  return computed(()=>{
    return age.value.toString().length
  })
}
</script>

<style scoped>

</style>