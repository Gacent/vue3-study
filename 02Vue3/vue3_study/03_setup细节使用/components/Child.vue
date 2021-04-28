<template>
  <div>
    这里是子组件
    {{msg}}
    <p>{{$attrs.msg2}}</p>
    <p><button @click="emitOut">emitTest一下</button></p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name:'Child',
  props:['msg'],
  emit:['emitTest'],  // 易于阅读
  setup (props, context) {
    // console.log(props,context)
    const count = ref(0)
    function emitOut(){
      context.emit('emitTest','++++++++')
    }
    return {
      count,
      emitOut
    }
  },
  mounted(){
    console.log(this.$attrs)
  }
})
</script>