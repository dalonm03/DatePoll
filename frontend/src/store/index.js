import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    exitVisible:false
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
