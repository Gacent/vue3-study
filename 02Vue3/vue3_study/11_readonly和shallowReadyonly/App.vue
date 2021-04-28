<template>
  <div>
    state:{{state}}<br/>
    state2:{{state2}}<br/>
    <button @click="update">修改值</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, readonly, shallowReadonly } from 'vue'

export default defineComponent({
  setup () {
    // let state=ref({
    //   name:'zjs',
    //   child:{
    //     name:'zjs2'
    //   }
    // })
    let state2=reactive({
      name:'zks',
      child:{
        name:'zks2'
      }
    })
    // let rState=readonly(state)
    // let rState2=readonly(state2)
    let rState2=shallowReadonly(state2)
    const update=()=>{
      // rState.value.name=2  // error
      rState2.child.name='232'  // error
    }
    return {
      // state,
      state2,
      update
    }
  }
})
</script>

<style scoped>

</style>