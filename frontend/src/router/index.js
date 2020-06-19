import Vue from 'vue'
import VueRouter from 'vue-router'
import MyDatePolls from '../views/MyDatePolls.vue'
import Login from '../views/Login.vue'
import Vote from '../views/Vote.vue'

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
  {
    path:'/vote/:pollId',
    name:'Vote',
    component: Vote,
    props:true,
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
