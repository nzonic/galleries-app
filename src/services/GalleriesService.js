import BaseService from './BaseService';

class GalleriesService extends BaseService {

    async getAll() {
        const { data } = await this.http.get('/galleries');
        return data;
    }
}

const galleriesService = new GalleriesService();
export default galleriesService;