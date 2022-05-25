<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">添加角色</el-button>
    <div style="width:150px">
        <el-input v-model="condition.keyWord" placeholder="请输入搜索关键字" @change="keyWordChange"></el-input>
    </div>
    <!-- 多权限筛选角色，因异步问题暂未实现 -->
    <!-- <Select :flag="'getAllPermission'" @getItem = 'findRole'></Select> -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <Form ref="formInfo" :rules='createRules' :itemList = 'itemList'></Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qvxiao">取 消</el-button>
        <el-button type="primary" @click='addRole'>确 定</el-button>
      </div>
    </el-dialog>
    <Table ref="TableInfo" :tableData="tableData"  @deleteLine = 'deleteLineUpData'  @editSubmit='editSubmit'></Table>
    <Pageination :total='total' @changeSize = 'changeSize' @changePage = 'changePage'></Pageination>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      dialogFormVisible : false,
      AllPermission: [],
      // PermissionsFilter:[],
      //添加用表单信息
      itemList : [
        {type:'input',prop:'name',label:'名称'},
        {type:'input',prop:'displayName',label:'显示姓名'},
        {type:'input',prop:'normalizedName',label:'规范化姓名'},
        {type:'input',prop:'description',label:'描述'},
        {type:'select',prop:'grantedPermission',label:'权限',flag:'getAllPermission'}
      ],
      //蓝色按钮表单
      editableItemList : [
        {type:'input',prop:'name',label:'名称'},
        {type:'input',prop:'displayName',label:'显示姓名'},
        {type:'input',prop:'description',label:'描述'},
        {type:'select',prop:'grantedPermission',label:'权限',flag:'getAllPermission'}
      ],
      //table
      tableData: {
        columns: [
          {
            index:true
          },
          {
            prop: 'name',
            label: '姓名',
            type:'input',
            isArray:false
          },
          {
            prop: 'displayName',
            label: '显示姓名',
            type:'input',
            isArray:false
          },
          {
            prop: 'normalizedName',
            label: '规范化姓名',
            type:'input',
            isArray:false
          },
          {
            prop: 'description',
            label: '简介',
            type:'input',
            isArray:false
          },
          {
            prop: 'grantedPermissions',
            label: '权限列表',
            type:'input',
            isArray:true
          },
          {
            prop: 'id',
            label: 'id',
            type:'input',
            isArray:false
          },
        ],
        editableItemList:[],
        realData: [],
        deleteUrl: 'role/deleteRole',
        // filter:[],
        editButtonName: '编辑',
        editFormTitle:'编辑'
      },
      //新增表单校验规则
      createRules: {
        name:[{required : true,message: '请输入账号名'}],
        displayName:[{required: true,message: '请输入用户名'}],
        grantedPermissions:[{required:true,message:'请录入初始权限'}]
      },
      page:1,
      size:10,
      total:100,
      condition:{
        KeyWord:null,
        MaxResultCount:null,
        SkipCount:null,
       }
    };
  },
  methods: {
  	addRole(){
      this.dialogFormVisible = false
      // console.log(this.$refs.formInfo); 
      let temp = this.$refs.formInfo.form 
      let {description,displayName,grantedPermissions,name,normalizedName} = temp
      let formItems = {
        description,
        displayName,
        grantedPermissions,
        name,
        normalizedName
      }
      this.$store.dispatch('role/createRole',formItems)
      //清空避免影响下次添加数据
      this.$refs.formInfo.form = {}
    },

    //添加表单取消按钮
    qvxiao(){
      console.log(this.$refs.formInfo.form);
      this.dialogFormVisible = false
      //清空避免影响下次添加数据
      this.$refs.formInfo.form = {}
    },

    //删除更新table
    deleteLineUpData(AllRoles){
      this.tableData.realData = AllRoles
    },

    //编辑提交
    editSubmit(res){
      console.log('角色管理editSumbit触发');
      this.$store.dispatch('role/updateRole',res).then(
        res => {
          let newArr = [].concat(this.AllRoles)
          this.tableData.realData = newArr
          //console.log(this.AllRoles)不知道为什么vuex数据已修改此页的realdata也已修改但table子组件不会重新渲染,通过concat改变数组地址解决
        }
      ).catch(err =>{console.log(err)})
    },
    // findRole(items){
    //   // console.log(items)
    //   let AllRole = []
    //   //多角色筛选（未完成）
    //   items.forEach(element => {
    //     this.$store.dispatch('role/getRoles',element).then(
    //       async (response) => {
    //         //console.log(response)
    //         AllRole.concat(response)
    //       }
    //     )
    //   });
    //   console.log(AllRole);
    // }
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
      let data = {}
        for(let k in this.condition){
          if(this.condition[k]!== null){
              data[k] = this.condition[k]
          }
      }
      this.$store.dispatch('role/getAllRole',data)
      .then(res => {
          this.tableData.realData = res.data.result.items
          this.total = res.data.result.totalCount
      })
    }
  },
  computed: {
    ...mapState(
      // 'role',{
      //   AllRoles:'AllRole'
      // }
      {
        AllRoles: state => state.role.AllRole
      }
    )
  },
  mounted(){
    this.$store.dispatch('role/getAllRole')
    .then((res)=>{
      this.tableData.realData = this.AllRoles
      this.total = res.data.result.totalCount
    })
    .catch((err) => {
      alert(err)
    })
    this.tableData.editableItemList = this.editableItemList

    
  }

  
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
