import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    exitVisible:false,
    ip:'192.168.1.13'
  },
  mutations: {
    changeExitVisible(state,visible){
      state.exitVisible=visible
    }
  },
  actions: {
  },
  modules: {
  }
})
