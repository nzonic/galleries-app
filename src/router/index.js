import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import SingleGallery from "../views/SingleGallery.vue";
import AuthorPage from "../views/AuthorPage.vue";
import CreateGallery from "../views/CreateGallery.vue";
import { authGuard } from "../guards/AuthGuard.js";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { authRequired: false },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestRequired: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guestRequired: true },
  },
  {
    path: "/galleries/:id",
    name: "SingleGallery",
    component: SingleGallery,
    meta: { authRequired: false },
    props: true,
  },
  {
    path: "/authors/:id",
    name: "Author",
    component: AuthorPage,
    meta: { authRequired: false },
    props: true,
  },
  {
    path: "/create",
    name: "CreateGallery",
    component: CreateGallery,
    meta: { authRequired: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(authGuard);
router.beforeEach((to, from, next) => {
  store.commit("galleries/isLoading");
  store.dispatch("auth/getActiveUser");
  next();
});
export default router;
