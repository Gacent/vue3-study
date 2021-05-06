<template>
  <div class="todo-container">
    <div class="todo-header">
      <a-form style="width:100%" ref="formRef" :model="modelRef" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rulesRef">
        <a-form-item label="title" name="title">
          <a-input v-model:value="modelRef.title" />
        </a-form-item>
        <a-form-item label="content" name="content">
          <a-textarea v-model:value="modelRef.content" :autoSize="{minRows: 2, maxRows: 6}" :maxlength="300"/>
        </a-form-item>
        <a-form-item class="error-infos" :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="todo-list">
      <a-list :loading="loading"  :grid="{ gutter: 16, column: 4 }" :data-source="list">
        <template v-slot:renderItem="{ item,index }">
          <a-list-item :key="'slide'+index">
            <a-card :hoverable="true">
              <template #title>
                <span v-show="!item.isEditTitle">{{item.title}}</span>
                <a-input style="width:80%" 
                :ref="titleInput"
                v-show="item.isEditTitle" 
                :maxlength="30"
                v-model:value="item.title" 
                @pressEnter="(val)=>onTitleBlurs(val,index)" 
                @blur="(val)=>onTitleBlurs(val,index)"></a-input>
              </template>
              <template v-slot:extra>
                <a-dropdown>
                  <EllipsisOutlined />
                    <template #overlay>
                    <a-menu @click="(val)=>onMenuClick(val,index)">
                      <a-menu-item key="1">
                        <a href="javascript:;">修改title</a>
                      </a-menu-item>
                      <a-menu-item key="2">
                        <a href="javascript:;">修改content</a>
                      </a-menu-item>
                      <a-menu-item key="3">
                        <a href="javascript:;">删除</a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
              <span v-show="!item.isEditContent">{{item.content}}</span>
              <a-textarea 
                v-show="item.isEditContent"
                v-model:value="item.content" 
                :autoSize="{minRows: 2, maxRows: 6}"
                :ref="contentInput"
                :maxlength="300"
                @pressEnter="(val)=>onContextBlurs(val,index)" 
                @blur="(val)=>onContextBlurs(val,index)"/>
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </div> 
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs,ref, nextTick, toRaw, computed } from 'vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { useForm } from '@ant-design-vue/use';
export default defineComponent({
  components:{
    EllipsisOutlined
  },
  setup () {
    let state:any
    if(sessionStorage.getItem('data')){
      state=sessionStorage.getItem('data')
      state=reactive(JSON.parse(state))
    } else {
      state=reactive({
        list: [],
        loading:false
      })
    }
    
    // 表单操作
    let initForm=()=>{
      const formRef = ref();
      let modelRef=reactive({
        title:'',
        content:'',
        isEditTitle:false,
        isEditContent:false
      })
      const rulesRef = reactive({
        title: [
          {
            required: true,
            message: 'Please input title',
          },
        ],
        content: [
          {
            required: true,
            message: 'Please input content',
          },
        ]
      });
      const onSubmit = () => {
        // console.log(formRef)
        formRef.value
          .validate()
          .then(() => {
            console.log(state)
            // console.log('values', modelRef, toRaw(modelRef));
            state.list.push(JSON.parse(JSON.stringify(toRaw(modelRef))))
            modelRef.title=''
            modelRef.content=''
            sessionStorage.setItem('data', JSON.stringify(state))
          }).catch((error:any) => {
            console.log('error', error);
          });
      };
      const resetForm = () => {
        formRef.value.resetFields();
      };

      return {
        labelCol: { span: 3 },
        wrapperCol: { span: 18 },
        rulesRef,
        resetForm,
        formRef,
        modelRef,
        onSubmit
      }
    }
    // 列表渲染及操作的函数
    let initInput=()=>{
      let myTitleInput:any=reactive([])
      let myContentInput:any=reactive([])

      let titleInput = (el:any) => {
        myTitleInput.push(el);
      };
      let contentInput = (el:any) => {
        myContentInput.push(el);
      };

      // 焦点取消
      const onTitleBlurs=(val:any,index:any)=>{
        console.log(val)
        let item=state.list[index]
        item.isEditTitle=false
      }
      const onContextBlurs=(val:any,index:any)=>{
        console.log(val)
        let item=state.list[index]
        item.isEditContent=false
      }
      
      // onMounted(()=>{
      //   console.log(titleInput)
      // })
      // 菜单按钮
      const onMenuClick=(val:any,index:any)=>{
        let item=state.list[index]
        switch (val.key) {
          case "1":
            item.isEditTitle=true
            nextTick(() => {
              myTitleInput[index]&&myTitleInput[index].focus()
            });
            break;
          case "2":
            item.isEditContent=true
            nextTick(() => {
              myContentInput[index]&&myContentInput[index].focus()
            });
            break;
          case "3":
            state.list.splice(index,1)
            break;
        }
        
      }
      return {
        ...toRefs(state),
        onMenuClick,
        onTitleBlurs,
        onContextBlurs,
        titleInput,
        contentInput
      }
    }
    
    return {
      ...initForm(),
      ...initInput()
    }
  }
})
</script>

<style  scoped>
/* todo-list */
.todo-list{
  width: 95%;
  margin: 0 auto;
}

/* todo-header */
.todo-header{
  display: flex;
  width: 80%;
  border:1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 0 auto 20px;
}
</style>