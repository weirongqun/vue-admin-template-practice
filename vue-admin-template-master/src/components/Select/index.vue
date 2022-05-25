<template>
    <div>
        <!-- flag用于决定下拉选项内容 -->
        <el-select v-model="value" multiple placeholder="请选择" @change="changetag">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
  
</template>

<script>
export default {
    name : 'Select',
    props:{
        flag:{
            type : String,
            require : true
        }
    },
    data() {
      return {
        options: [],
        value: []
      }
    },
    mounted(){
        if(this.$props.flag === 'getAllPermission'){
            this.getAllPermission();
        }
        else if(this.$props.flag === 'getAllRole'){
            this.getAllRole()
        }
    },
    methods:{
        getAllPermission(){
            this.$store.dispatch('role/getAllPermission').then(
                (res)=>{
                    res.forEach(element => {
                        this.options.push({value:element.name,label:element.displayName})
                    });
                },
                (err)=>{console.log(err)}
            )
        },
        getAllRole(){
            this.$store.dispatch('role/getAllRole').then(
                (res)=>{
                    res.data.result.items.forEach(element => {
                        this.options.push({value:element.name,label:element.name})
                    });
                }
            )
        },
        //选中选项列表发生改变时
        changetag(item){
            this.$emit('getItem',item)
        }
    }
}
</script>

<style>

</style>