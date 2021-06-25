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

}

const galleriesService = new GalleriesService();
export default galleriesService;