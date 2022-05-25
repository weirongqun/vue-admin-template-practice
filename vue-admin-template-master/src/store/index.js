import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import role from './modules/role'
import userMo from './modules/userMo'
import tenant from './modules/tenant'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    role,
    userMo,
    tenant
  },
  getters
})

export default store
