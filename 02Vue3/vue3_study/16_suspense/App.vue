<template>
  <div>
    父组件App
    <Suspense>
      <template #default>
        <asyncComponent/>
      </template>
      <template v-slot:fallback>
        <h2>Loading·············</h2>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent,defineAsyncComponent } from 'vue'
let asyncComponent=defineAsyncComponent(()=>import('./asyncComponent.vue'))
export default defineComponent({
  components:{
    asyncComponent
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>