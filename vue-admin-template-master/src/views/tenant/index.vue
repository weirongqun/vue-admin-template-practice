<template>
  <!-- <h1>租户管理</h1> -->
  <div>
      <el-button type="primary" @click="dialogFormVisible = true">添加角色</el-button>
      <div style="width:150px">
        <el-input v-model="condition.keyWord" placeholder="请输入搜索关键字" @change="keyWordChange"></el-input>
      </div>
      <el-dialog title="添加租户" :visible.sync="dialogFormVisible">
        <Form ref="formInfo" :itemList = 'itemList' :rules='createRules'></Form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="qvxiao">取 消</el-button>
            <el-button type="primary" @click='addTenand'>确 定</el-button>
        </div>
        </el-dialog>
      <Table :tableData = 'tableData' @editSubmit = 'editSubmit' @deleteLine ='deleteLine'></Table>
      <Pageination :total='total' @changeSize = 'changeSize' @changePage = 'changePage'></Pageination> 
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            tableData:{
                columns:[
                    {index: true},
                    {prop:'id',label:'ID',isArray:false},
                    {prop:'isActive',label:'是否可用',type:'input',isBoolean:true},
                    {prop:'name',label:'名字',type:'input',isArray:false},
                    {prop:'tenancyName',label:'租户账号',type:'input',isArray:false}
                ],
                realData:[],
                deleteUrl:'tenant/delecteTenant',
                editableItemList:[],
                editButtonName:'编辑',
                editFormTitle:'编辑租户信息'
            },
            editableItemList:[
                {
                    type:'input', prop:'tenancyName',label:'租户名'
                },
                {
                    type:'input', prop:'name',label:'名字'
                },
                {
                    type:'trueOrFalse',prop:'isActive',label:'是否可用'
                }
            ],
            dialogFormVisible:false,
            itemList:[
                {prop:'tenancyName',type :'input',label:'租户账号'},
                {prop:'name',type :'input',label:'租户姓名'},
                {prop:'adminEmailAddress',type :'input',label:'电子邮箱'},
                //{prop:'connectionString',type :'input',label:'连接字符串'},
                {prop:'isActive',type :'switchButton',label:'是否可用',isBoolean:'true'}
            ],
            createRules:{
                tenancyName:[
                    { required: true, message: '请输入租户账号', trigger: 'blur'}
                ],
                name:[
                    { required: true, message: '请输入租户名', trigger: 'blur'}
                ],
                adminEmailAddress:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur'}
                ],
                connectionString:[
                    { required: true, message: '请输入连接字符串', trigger: 'blur'}
                ],
            },
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
                MaxResultCount:null,
                SkipCount:null,
            }
        }
    },
    computed:{
        ...mapState(
            {
                AllTenant:state => state.tenant.AllTenant
            }
        )
    },
    methods:{
        editSubmit(ref){
            // console.log(ref);
            this.$store.dispatch('tenant/edit',ref).then(
                () => {
                    // let newArr = [].concat(this.AllTenant)
                    // this.tableData.realData = newArr
                    alert('修改成功')
                }
            )
        },
        deleteLine(res){
            this.tableData.realData = res
        },
        qvxiao(){

        },
        addTenand(){
            this.dialogFormVisible = false
            let form = this.$refs.formInfo.form
            this.$store.dispatch('tenant/addTenant',form).then(() =>{alert('添加成功')})
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
      this.$store.dispatch('role/getAllRole',data)
      .then(res => {
          this.tableData.realData = res.data.result.items
          this.total = res.data.result.totalCount
      })
    }
    },
    beforeMount(){
        this.$store.dispatch('tenant/getAll')
        .then(res => {
            this.tableData.realData = this.AllTenant
            this.total = res.data.result.totalCount
        })
        this.tableData.editableItemList = this.editableItemList
        this.createRules.adminEmailAddress.push({validator:this.emailValidator,trigger:'blur'})
    }
}
</script>

<style>

</style>