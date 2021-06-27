  
import commentsService from '../../services/CommentsService';

export const actions = {
  async getComments(store,id) {
    const data = await commentsService.getAll(id);
    return data;
  },
  async addComment(store, comment) {
    try {
      const data = await commentsService.addComment(comment);
      store.commit('galleries/pushComment', data, {root: true});
    } catch (error) {
      console.log(error)
    }
  },
  async deleteComment(store, commentId) {
    try {
      await commentsService.deleteComment(commentId);
      store.commit('galleries/removeComment', commentId, {root: true});
    } catch (error) {
      console.log(error);
    }
  }
};