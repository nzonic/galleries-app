import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { authGuard } from '../guards/AuthGuard.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { authRequired: false}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestRequired: true}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guestRequired: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(authGuard);
export default router
