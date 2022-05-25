<template>
  <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
  </el-pagination>
</template>

<script>
export default {
    props:{
        size:{
            type: Number
        },
        total:{
            type: Number
        }
    },
    methods:{
        handleSizeChange(size){
            this.$emit('changeSize',size)
        },
        handleCurrentChange(num){
            this.$emit('changePage',num)
        }
    }
}
</script>

<style>

</style>