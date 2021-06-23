import galleriesService from '../../services/GalleriesService.js';

export const actions = {
    async getAll(store) {
        let data  = await galleriesService.getAll();

        store.commit('setGalleryList', data);
    }
}