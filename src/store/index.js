import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import galleries from './galleries';
import author from './author';
import comments from './comments';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    galleries,
    author,
    comments
  }
})
