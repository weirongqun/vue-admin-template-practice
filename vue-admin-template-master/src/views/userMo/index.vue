<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
    
    <div>
        <span>是否可用：</span>
        <el-select v-model="condition.IsActive" placeholder="请选择" @change="isActiveChange">
            <el-option :value="true" label="是"></el-option>
            <el-option :value="false" label="否"></el-option>
            <el-option :value="null" label="全部"></el-option>
        </el-select>   
    </div>
    <div style="width:150px">
        <el-input v-model="condition.keyWord" placeholder="请输入搜索关键字" @change="keyWordChange"></el-input>
    </div>
    
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <Form ref="formInfo" :itemList = 'itemList' :rules='createRules'></Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qvxiao">取 消</el-button>
        <el-button type="primary" @click='addUser'>确 定</el-button>
      </div>
    </el-dialog>
    
    <Table :tableData='tableData' @editSubmit='editSubmit' @deleteLine = 'deleteLine'></Table>
    <Pageination :total='total' @changeSize = 'changeSize' @changePage = 'changePage'></Pageination>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            //table数据和结构和其他
            tableData:{
                columns: [
                    {index: true},
                    {prop:'username',label:'用户名',type:'input',isArray:false},
                    {prop:'name',label:'名字',type:'input',isArray:false},
                    {prop:'surname',label:'姓氏',type:'input',isArray:false},
                    {prop:'emailAddress',label:'邮箱地址',type:'input',isArray:false},
                    {prop:'isActive',label:'是否可用',type:'input',isBoolean:true},
                    {prop:'fullName',label:'全名',type:'input',isArray:false},
                    {prop:'lastLoginTime',label:'上次登录时间',type:'input',isTime:true},
                    {prop:'creationTime',label:'创建时间',type:'input',isTime:true},
                    {prop:'roleNames',label:'拥有角色名',isArray:true,type:'input'},
                    {prop:'id',label:'ID'},
                ],
                realData:[],
                deleteUrl:'userMo/delete',
                editableItemList:[],
                editButtonName:'授权',
                editFormTitle:'授权'
            },
            //蓝色按钮表单结构
            editableItemList:[
                {
                    type:'select',prop:'roleNames',label:'角色列表',flag:'getAllRole'
                }
            ],
            //新增表单结构
            itemList:[
                {prop:"userName",type: "input",label:'用户名'},
                {prop:"name",type: "input",label:'名字'},
                {prop:"surname",type: "input",label:'姓氏'},
                {prop:"emailAddress",type: "input",label:'邮箱地址'},
                {prop:"isActive",type: 'switchButton',label:'是否可用'},
                {prop:"roleNames",type: 'select',label:'角色列表',flag: 'getAllRole'},
                {prop:"password",label:'密码',ispassword:true}
            ],
            //新增弹出框可见否？
            dialogFormVisible:false,
            //新增表单校验规则
            createRules: {
                userName:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                name:[
                    { required: true, message: '请输入名字', trigger: 'blur' },
                ],
                surname:[
                    { required: true, message: '请输入姓氏', trigger: 'blur' },
                ],
                emailAddress:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            },
            //邮箱验证规则
            emailValidator(rule,value,callback){
                if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)){
                    callback()
                } else{
                    callback(new Error('邮箱格式不正确'))
                }
            },
            page:1,
            size:10,
            total:100,
            condition:{
                KeyWord:null,
                IsActive:null,
                MaxResultCount:null,
                SkipCount:null,
            }
        }
    },
    computed:{
        ...mapState(
            {
                AllUser: state => state.userMo.AllUser
            }
        )
    },
    methods:{
        deleteLine(newArr){
            this.tableData.realData = newArr
        },
        //蓝色按钮提交
        editSubmit(res){
            this.$store.dispatch('userMo/update',res).then(()=>{
                //由于elementui的table组件与data双向绑定检测不到数组内部的变化，通过concat来改变数组地址实现页面数据改变
                let newArr = [].concat(this.AllUser)
                this.tableData.realData = newArr
            })
            
        },
        qvxiao(){},
        addUser(){
            this.dialogFormVisible = false
            let temp = this.$refs.formInfo.form
            let{userName,name,surname,emailAddress,isActive,roleNames,password} = temp
            let formItems = {userName,name,surname,emailAddress,isActive,roleNames,password}
            this.$store.dispatch('userMo/addUser',formItems)
            //清空避免影响下次添加数据
            this.$refs.formInfo.form = {}
        },
        changeSize(size){
            this.size = size
            this.condition.MaxResultCount = size
            this.condition.SkipCount = size*(this.page-1)
            this.find()
        },
        //切换页面请求
        changePage(num){
            this.page = num
            this.condition.SkipCount = (num-1)*this.size
            this.find()
        },
        //切换是否可用请求
        isActiveChange(){
            this.find()
        },
        //keyword
        keyWordChange(val){
            this.condition.KeyWord = val
            this.find()
        },
        //查询方法封装
        find(){
            console.log('find');
            let data = {}
             for(let k in this.condition){
                if(this.condition[k]!== null){
                    data[k] = this.condition[k]
                }
            }
            console.log(data);
            this.$store.dispatch('userMo/getAllUser',data)
            .then(res => {
                this.tableData.realData = res.data.result.items
                this.total = res.data.result.totalCount
            })
        }
    },
    beforeMount(){
        //初始化页面数据
        this.$store.dispatch('userMo/getAllUser').then(
            (res) => {
                this.tableData.realData = this.AllUser
                this.total = res.data.result.totalCount
            }
        )
        //授权表单条目
        this.tableData.editableItemList = this.editableItemList
        //传送邮箱校验规则
        this.createRules.emailAddress.push({validator:this.emailValidator,trigger: 'blur'})
    },
    mounted(){
       
    }
}
</script>

<style>

</style>