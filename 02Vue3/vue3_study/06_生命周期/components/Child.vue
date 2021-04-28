<template>
  <div>
    <p>子组件</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onUpdated, onBeforeUpdate, onBeforeUnmount, onUnmounted } from 'vue'

export default defineComponent({
  // vue2.0生命周期
  beforeCreate(){
    console.log('2.0中的beforeCreate')
  },
  created(){
    console.log('2.0中的created')
  },
  beforeMount(){
    console.log('2.0中的beforeMount')
  },
  mounted(){
    console.log('2.0中的mounted')
  },
  beforeUpdate(){
    console.log('2.0中的beforeUpdate')
  },
  updated(){
    console.log('2.0中的updated')
  },
  beforeUnmount(){
    console.log('2.0中的beforeDestory')
  },
  unmounted(){
    console.log('2.0中的destroyed')
  },
  setup () {
    console.log('3.0中的setup')
    onBeforeMount(()=>{
      console.log('3.0中的onBeforeMount')
    })
    onMounted(()=>{
      console.log('3.0中的onMounted')
    })
    onUpdated(()=>{
      console.log('3.0中的onUpdated')
    })
    onBeforeUpdate(()=>{
      console.log('3.0中的onBeforeUpdate')
    })
    onBeforeUnmount(()=>{
      console.log('3.0中的onBeforeUnmount')
    })
    onUnmounted(()=>{
      console.log('3.0中的onUnmounted')
    })

    return {}
  }
})
</script>

<style scoped>

</style>