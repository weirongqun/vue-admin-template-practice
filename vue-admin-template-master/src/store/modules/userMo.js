import {getAll,update,createUser,deleteUser} from '@/api/userMo'
const state = {
    AllUser: [],

}

const mutations = {
    GETALLUSER : (state,UserList) =>{
        state.AllUser = UserList
    },
    UPDATE : (state,res) =>{
        let i = 0
        while(state.AllUser[i].id !== res.id){
            i++
        }
        state.AllUser[i] = res
    },
    CREATEUSER : (state,User) => {
        state.AllUser.push(User)
    },
    DELETE : (state,id) =>{
        let newUserList = state.AllUser.filter(item => item.id !== id)
        state.AllUser = newUserList
    }
}

const actions = {
    getAllUser({commit},data){
        return new Promise((resolve,reject) => {
            getAll(data)
            .then(res => {
                let UserList = res.data.result.items
                commit('GETALLUSER',UserList)
                resolve(res)
            })
        }).catch(err =>{
            console.log(err);
        })
        
    },
    update({commit},data){
        return new Promise((resolve,reject) => {
            update(data).then((res) => {
                let result = res.data.result
                commit('UPDATE',result)
                resolve()
            })
        })
    },
    addUser({commit},data){
        return new Promise((resolve,reject) => {
            createUser(data).then(res=> {
                console.log('action');
                let User = res.data.result
                commit('CREATEUSER',User)
                resolve()
            })
        })
    },
    delete({commit},id){
        return new Promise((resolve,reject) => {
            let data = {Id:id}
            deleteUser(data).then(res => {
                commit('DELETE',id)
                resolve(state.AllUser)
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

