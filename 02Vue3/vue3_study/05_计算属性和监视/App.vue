<template>
  <div>
    <h2>计算属性和监视</h2>
    <fieldset>
      <legend>姓名操作</legend>
      姓氏:<input type="text" placeholder="请输入姓氏" v-model="user.firstName"/><br/>
      名字:<input type="text" placeholder="请输入名字" v-model="user.lastName"/> <br/>
    </fieldset>
    <fieldset>
      <legend>方法演示</legend>
      姓名（computed的get）: <input  type="text" placeholder="显示" v-model="fullName1"/><br/>
      姓名（computed的get和set）: <input  type="text" placeholder="显示"  v-model="fullName2"/><br/>
      姓名（watch）: <input  type="text" placeholder="显示" v-model="fullName3"/><br/>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive, computed, watch,ref, watchEffect } from 'vue'

export default defineComponent({
  setup () {
    let user=reactive({
      firstName:'东方',
      lastName:'不败'
    })
    
    let fullName1=computed(()=>{
      return user.firstName+'_'+user.lastName
    })
    let fullName2=computed({
      get:()=>{
        return user.firstName+'_'+user.lastName
      },
      set:(val)=>{
        let splitVal=val.split('_')
        user.firstName=splitVal[0]
        user.lastName=splitVal[1]
      }
    })
    let fullName3=ref('')
    watch(user,({firstName,lastName})=>{
      fullName3.value=firstName+'_'+lastName
    },{immediate:true})
    // watchEffect(()=>{
    //   fullName3.value=user.firstName+'_'+user.lastName
    // })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
})
</script>

<style scoped>

</style>