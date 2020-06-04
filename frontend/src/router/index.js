import Vue from 'vue'
import VueRouter from 'vue-router'
import MyDatePolls from '../views/MyDatePolls.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'myDatePolls',
    component: MyDatePolls
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
