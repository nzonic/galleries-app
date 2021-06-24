import galleriesService from '../../services/GalleriesService.js';

export const actions = {
    async getGalleries(store, nextPage) {
        try {
            const data  = await galleriesService.getGalleries(nextPage, store.state.searchTerm);
            store.commit('setGalleryPage', data);
            store.commit('isNotLoading');
        } catch (error) {
            console.log(error);
        }
    },
    async loadMore(store, nextPage) {
        try {
            const data  = await galleriesService.getGalleries(nextPage, store.state.searchTerm);
            console.log(data);
            store.commit('paginate', data);
        } catch (error) {
            console.log(error);
        }
    }
}