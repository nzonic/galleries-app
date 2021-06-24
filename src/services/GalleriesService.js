import BaseService from './BaseService';
import { PAGE_SIZE } from '../constants';
class GalleriesService extends BaseService {

    async getGalleries(page, title = '') {
        const { data } = await this.http.get(`/galleries?page=${page}`, {params: {PAGE_SIZE, title}});
        return data;
    }
}

const galleriesService = new GalleriesService();
export default galleriesService;