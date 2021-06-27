import BaseService from './BaseService';
class CommentsService extends BaseService {

 

    async getAll(id) {
        const { data } = await this.http.get(`/comments/${id}`);
        return data;
    }

    async addComment({ gallery_id, ...restData }) {
        const { data } = await this.http.post(`/add-comment/${gallery_id}`, restData);
        return data;
    }

    async deleteComment(commentId) {
        const { data } = await this.http.delete(`/delete-comment/${commentId}`);
        return data;
    }

}

const commentsService = new CommentsService();
export default commentsService;