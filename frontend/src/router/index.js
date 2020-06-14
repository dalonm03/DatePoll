import Vue from 'vue'
import VueRouter from 'vue-router'
import MyDatePolls from '../views/MyDatePolls.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/myDatePolls/:userId',
    name: 'MyDatePolls',
    component: MyDatePolls,
    props:true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'root',
    component: Login
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
