<template>
  <div>
    <h2>reactive和ref</h2>
    <p>{{m1}}</p>
    <p>{{m2}}</p>
    <p>{{m3}}</p>
    <p>
      <button @click="change">改变值</button>
    </p>
  </div>
</template>

<script>
import { reactive,ref, defineComponent } from 'vue'

export default defineComponent({
  setup () {
    let m1=ref(123)
    let m2=reactive({
      name:'小明',
      wife:{
        name:'小丽'
      }
    })
    let m3=ref({
      name:'小明',
      wife:{
        name:'小丽'
      }
    })
    function change() {
      m1.value+='==='
      m2.name+='==='
      m3.value.name+='===='
    }
    console.log(m1)
    console.log(m3) // ref的引用类型本质还是走了reactive
    return {
      m1,
      m2,
      m3,
      change
    }
  }
})
</script>