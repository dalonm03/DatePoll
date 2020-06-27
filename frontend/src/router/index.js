import Vue from 'vue'
import VueRouter from 'vue-router'
import MyDatePolls from '../views/MyDatePolls.vue'
import Login from '../views/Login.vue'
import Vote from '../views/Vote.vue'
import Results from '../views/Results.vue'

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
  },
  {
    path:'/results/:pollId',
    name:'Results',
    component: Results,
    props:true
  }
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
