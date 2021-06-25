import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';


const store = {
  namespaced: true,
  state: {
    author: {}
  },
  actions,
  mutations,
  getters,
};

export default store;