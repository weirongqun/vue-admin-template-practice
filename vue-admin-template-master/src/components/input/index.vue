<template>

    <el-input :placeholder="placeholder" :show-password='password' v-model="model" @input="change($event)" ></el-input>
</template>

<script>
export default {
  props:{
    placeholder:{
      default(){
        return '请输入'
      }
    },
    password:{
      type:Boolean,
      default(){
        return false
      }
    },
    model:{
      default(){
        return {}
      }
    }
  },
  methods:{
    change(e){

            this.$forceUpdate()
        }
  }
}
</script>

<style>

</style>