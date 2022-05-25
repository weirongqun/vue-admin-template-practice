import {getRoleList,getAllPermission,createRole,deleteRole,getRoles,getRoleForEdit,getRoleById,update} from '@/api/role'
const getDefaultState = () => {
    return {
      AllRole:[],
      AllPermissions:[]
    }
  }
const state = getDefaultState()
//{AllRole: []}
const mutations = {
    ALLROLE:(state,AllRole)=>{
        state.AllRole = AllRole
    },
    ALLPERMISSIONS: (state,AllPermissions) => {
        state.AllPermissions = AllPermissions
    },
    CREATEROLE: (state,Role) => {
        state.AllRole.push(Role)
    },
    DELETEROLE: (state,id) =>{ 
        let newAllRole = state.AllRole.filter(item => item.id !== id)
        state.AllRole = newAllRole
    },
    UPDATEROLE: (state,newRole) =>{
        let i = 0
        while(state.AllRole[i].id != newRole.id){
            i++
        }
        state.AllRole[i] = newRole
    }
}
const actions = {
    getAllRole({commit},data){        
        return new Promise((resolve,reject) => {
            getRoleList(data)
            .then((response) =>{
                let items = response.data.result.items
                commit('ALLROLE',items)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            }
            )
        })
    },
    getAllPermission({commit}){
        return new Promise((resolve,reject) => {
            getAllPermission()
            .then((response) => {
                commit('ALLPERMISSIONS',response.data.result.items)
                resolve(response.data.result.items)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    createRole({commit},formItems){
        return new Promise((resolve,reject) => {
            createRole(formItems)
            .then(response => {
                let Role = response.data.result
                commit('CREATEROLE',Role)
                resolve()
            })
            .catch(err => {
                console.log(err)
                reject()
            })
        }) 
    },
    deleteRole({commit},id){
        return new Promise((resolve,reject) => {
            let data = {Id:id}
            deleteRole(data)
            .then(()=>{
                commit('DELETEROLE',id)
                resolve(state.AllRole)
            })
            .catch(err => {
                console.log('err:'+err)
                reject()
            })
        })
        
    },
    getRoles({commit},RoleName){
        return new Promise((resolve,reject) => {
            let data = {Permission:RoleName}
            console.log(data)
            getRoles(data)
            .then(response => {
                console.log('resolve')
                resolve(response)
            })
            .catch(
                reject()
            )
        })
    },
    givePermissions({commit},id){
        return new Promise((resolve,reject) => {
            let data = {Id:id}
            getRoleForEdit(data)
            .then(response => {
                // console.log('action');
                // console.log(response);
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    getRoleById(store,id){
        return new Promise((resolve,reject) => {
            let data = {Id:id}
            getRoleById(data)
            .then(response => {
                resolve(response)
            })
        })
    },
    updateRole({commit},role){
        console.log('action')
        return new Promise((resolve,reject) => {
            update(role)
            .then((res) => {
                // console.log('res')
                // console.log(res)
                commit('UPDATEROLE',res.data.result)
                resolve(res)
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