import {getAllTenants,editTenant,deleteTenant,add} from '@/api/tenant'
const state = {
    AllTenant:[]
}
const mutations = {
    SETALLTENANT(state,TenantList){
        state.AllTenant = TenantList
    },
    EDIT(state,form){
        let num = 0
        while(state.AllTenant[num].id !== form.id){
            num++
        }
        state.AllTenant[num] = form
        num = 0
    },
    DELETE(state,id){
        state.AllTenant = state.AllTenant.filter(item => item.id !== id)
        
    },
    ADD(state,data){
        state.AllTenant.push(data)
    }
}
const actions = {
    getAll({commit},data){
        return new Promise((resolve,reject) => {
            getAllTenants(data)
            .then(res => {
                let TenantList = res.data.result.items
                commit('SETALLTENANT',TenantList)
                resolve(res)
            })
        })
    },
    edit({commit},form){
        return new Promise((resolve,reject) => {
            editTenant(form)
            .then(res => {
                commit('EDIT',form)
                resolve(state.AllTenant)
            })
        })
    },
    delecteTenant({commit},id){
        return new Promise((resolve,reject) =>{
            let data = {Id:id}
            deleteTenant(data)
            .then(res => {
                commit('DELETE',id)
                resolve(state.AllTenant)
            })
            
        })
    },
    addTenant({commit},data){
        return new Promise((resolve,reject) => {
            add(data)
            .then(res => {
                commit('ADD',res.data.result)
                //console.log(res);
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}