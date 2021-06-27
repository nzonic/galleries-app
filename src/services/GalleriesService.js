import BaseService from './BaseService';
import { PAGE_SIZE } from '../constants';
class GalleriesService extends BaseService {

    async getGalleries(page, search = '', userId = 0) {
        const { data } = await this.http.get(`/galleries?page=${page}`, {params: {PAGE_SIZE, search, userId}});
        return data;
    }

    async getGallery(id) {
        const { data } = await this.http.get(`/galleries/${id}`);
        return data;
    }

    async create(gallery) {
        const { data } = await this.http.post('/create', gallery);
        return data;
    }

    async edit({id, ...restData}) {
        const { data } = await this.http.put(`/edit/${id}`, restData);
        return data;
    }

    async delete(id) {
        const { data } = await this.http.delete(`/delete/${id}`);
        return data;
    }

}

const galleriesService = new GalleriesService();
export default galleriesService;