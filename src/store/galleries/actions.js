import galleriesService from '../../services/GalleriesService.js';

export const actions = {
    async getGalleries(store, nextPage) {
        try {
            const data  = await galleriesService.getGalleries(nextPage, store.state.searchTerm);
            store.commit('setGalleryPage', data);
            store.commit('isLoaded');
        } catch (error) {
            console.log(error);
        }
    },
    async loadMore(store, nextPage) {
        try {
            const data  = await galleriesService.getGalleries(nextPage, store.state.searchTerm);
            store.commit('paginate', data);
        } catch (error) {
            console.log(error);
        }
    },
    async showGallery(store, id) {
        try {
            const data = await galleriesService.getGallery(id);
            store.commit('setGalleryPage', data);
            store.commit('isLoaded');
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getGalleriesByAuthor(store, {page, author}) {
        try {
            const data  = await galleriesService.getGalleries(page, store.state.searchTerm, author);
            store.commit('setGalleryPage', data);
            store.commit('isLoaded');
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async loadMoreByAuthor(store, {page, author}) {
        try {
            const data  = await galleriesService.getGalleries(page, store.state.searchTerm, author);
            store.commit('paginate', data);
        } catch (error) {
            console.log(error);
        }
    },
    async createGallery(store, gallery) {
        
        const data = await galleriesService.create(gallery);
        return data;
    },
    finishLoading(store) {
        store.commit('isLoaded');
    },
    async editGallery(store, gallery) {
        try {
            const data = await galleriesService.edit(gallery);
            return data;
        } catch (error) {
            console.log(error)
        }
    },
    async deleteGallery(store, galleryId) {
        const data = await galleriesService.delete(galleryId);
        return data;
    } 
}