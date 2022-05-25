<template>
    <el-form :model="form" :rules='rules' label-position='right' label-width='200px' >
      <el-form-item v-for="item in itemList" :key="item.label" :label="item.label" :prop='item.prop'>
          <!-- 输入框 -->
          <el-input v-if="item.type === 'input'" v-model="form[item.prop]" placeholder="请输入" @input="change($event)"></el-input>
          <!-- 密码框 -->
          <el-input v-if="item.ispassword === true" v-model="form[item.prop]" placeholder="请输入密码" show-password @input="change($event)"></el-input>
          <!-- switch开关 -->
          <el-switch v-if="item.type === 'switchButton'" style="display: block" v-model="form[item.prop]" active-color="#13ce66" inactive-color="#ff4949" active-text="可用" inactive-text="不可用" :active-value="true"
            :inactive-value="false"></el-switch>
          <el-select ref='trueOrFalse' v-if="item.type === 'trueOrFalse'" v-model="form[item.prop]" @change="$forceUpdate()">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
          </el-select>
          <!-- 下拉多选 -->
          <Select v-if="item.type === 'select'" :flag='item.flag' @getItem='getselectItem'></Select>
      </el-form-item>
  </el-form>
</template>

<script>

export default {
    props:{
        itemList: {
            type: Array,
            required: true,
            default: () => []
        },
        rules:{
            type: Object,
            default: ()=>{}
        }

    },
    data(){
        return {
            form:{
                
            }
        }
    },
    computed:{
        selectFlag(){
            let i = 0
            //一、this.$props.itemList[i]第几个对象
            //二、array.indexof >= 0 包含目标元素
            //三、Object.keys(obj)
            //二（三（（一））） 看看select选的是啥（只适合只有一个select的表单）
            while((Object.keys(this.$props.itemList[i])).indexOf('flag') < 0){
                i++
            }
            return this.$props.itemList[i].flag
        }
    },
    mounted(){
        setTimeout(() => {
            this.$forceUpdate()
        }, 2000);
    },
    methods:{
        getselectItem(item){
            console.log(item)
            //多选已选选项赋值给表单
            if(this.selectFlag === 'getAllPermission'){//选权限列表
                this.form.grantedPermissions = item
            }else if(this.selectFlag === 'getAllRole'){//选角色列表
                this.form.roleNames = item
            }
            
        },
        change(e){
            this.$forceUpdate()
        },
        changeTrueOrFalse(){
            
        }
       
        
    },
    mounted(){
        this.$forceUpdate()
    }
}
</script>

<style>

</style>