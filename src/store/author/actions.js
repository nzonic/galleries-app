  
import userService from '../../services/userService';

export const actions = {
  async fetchAuthor(store, id) {
    try {
      const {author, galleries} = await userService.getUser(id);
      store.commit('setAuthor', author);
      store.commit('galleries/setGalleryPage', galleries, {root: true});
      store.commit('galleries/isLoaded', null, {root: true});
    } catch (error) {
      console.log(error);
    }
  },
};