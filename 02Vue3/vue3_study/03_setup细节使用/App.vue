<template>
  <div>
    这里是父组件
    {{msg}}
  </div>
  <p>============================================</p>
  <Child :msg="msg" :msg2="'我是没有再props中声明的属性'" @emitTest="emitTest"/>
</template>

<script lang="ts">
import { reactive, defineComponent, ref } from 'vue'
import Child from '@/components/Child.vue'

export default defineComponent({
  name:'App',
  components:{
    Child
  },
  setup () {
    const msg = ref('what are you nong sha lie')
    function emitTest(str:string){
      msg.value=msg.value+str
    }
    return {
      msg,
      emitTest
    }
  }
})
</script>