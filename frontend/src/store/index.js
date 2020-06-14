import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    exitHidden:false
  },
  mutations: {
    changeExitHidden(state,hide){
      state.exitHidden=hide
    }
  },
  actions: {
  },
  modules: {
  }
})
