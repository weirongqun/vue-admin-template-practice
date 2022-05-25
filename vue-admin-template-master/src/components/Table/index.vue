<template>
  <div style="padding : 10px">
    <el-table :data="tableData.realData" :max-height="400">
      <template v-for="(item,index) in tableData.columns" >
        <el-table-column
          v-if="item.index"
          type="index"
          fixed="left"
          label="序号"
          :key="index"></el-table-column>
         <el-table-column v-if="item.type === 'input' && item.isArray===false" :prop="item.prop" :label="item.label" :key="item.pros"></el-table-column>
         <el-table-column v-if="item.type === 'input' && item.isTime===true" :prop="item.prop" :label="item.label" :formatter="dateFatter" :key="item.pros"></el-table-column>
         <el-table-column v-if="item.type === 'input' && item.isArray===true" :prop="item.prop" :label="item.label" :formatter="arrayFatter" :key="item.pros"></el-table-column>
         <el-table-column v-if="item.type === 'input' && item.isBoolean === true" :prop="item.prop" :label="item.label" :formatter="BooleanFatter" :key="item.prop"></el-table-column>
      </template>
      <el-table-column  fixed='right'>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="upload(scope.row)">{{tableData.editButtonName}}</el-button>
          <!-- <el-button type="danger" size="small" @click="delectLine(tableData.deleteUrl,scope.row.id)">删除</el-button> -->
          <el-popconfirm title="确定删除吗？" @onConfirm = 'delectLine(tableData.deleteUrl,scope.row.id)'>
            <el-button type="danger" size="small" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog :title="tableData.editFormTitle" :visible.sync="dialogFormVisible">
      <Form ref="editForm" :itemList = 'tableData.editableItemList'></Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qvxiao">取 消</el-button>
        <el-button type="primary" @click='queding'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'Table',
  props:{
    tableData: {
      type: Object,
      default() {
        return {
          columns: {
            type: Array,
          },
          realData: {
            type: Array,
          },
          deleteUrl: {
            type: String
          },
          editableItemList: {
            type: Array
          },
          editButtonName:{
            type: String
          },
          editFormTitle:{
            type: String
          }
        };
      },
    },
    // page:{type:Number},
    // size:{type:Number}
  },
  methods:{
    //删除行方法
    delectLine(deleteUrl,id){
      console.log('删除');
      this.$store.dispatch(deleteUrl,id)
      .then((afterDeleteTableData) => {
        //触发绑定的deleteLine事件更新table数据
        this.$emit('deleteLine',afterDeleteTableData)
        })
    },
    //蓝色按钮
    upload(row){
      this.dialogFormVisible = true
      let rowKeys = Object.keys(row)
      rowKeys.forEach(element => {
        this.$refs.editForm.form[element] = row[element]
      });
      this.$refs.editForm.$forceUpdate()
    },
    //编辑表单取消键
    qvxiao(){
      this.dialogFormVisible = false
      // formClose()
    },
    //编辑表单确定键
    queding(){
      this.dialogFormVisible = false
      this.$emit('editSubmit',this.$refs.editForm.form)
      //this.$refs.editForm.form = null
    },
    //数组格式化
    arrayFatter(row,column,cellValue){
      let arr = cellValue
      return arr.toString()
    },
    //日期格式化
    dateFatter(row,column,cellValue){
      let time = new Date(cellValue)
      let y = time.getFullYear()+'-'
      let m = (time.getMonth()+1) + '-'
      let d = time.getDate()

      return y + m + d
    },
    //布尔值格式化
    BooleanFatter(row,column,cellValue){
      if(cellValue === true) {return '是'}
      else {return '否'}
    }
  },
  data(){
    return {
      dialogFormVisible:true
    }
  },
  mounted(){
    this.dialogFormVisible = false
  }
};
</script>

<style>

</style>