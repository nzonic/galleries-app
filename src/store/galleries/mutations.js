export const mutations = {
    setGalleryPage(state, pageInfo) {
      state.galleryPage = pageInfo;
    },
    paginate(state, pageInfo) {
      console.log(pageInfo);
      pageInfo.data = [...state.galleryPage.data, ...pageInfo.data];
      state.galleryPage = pageInfo;
    },
    isLoading(state) {
      state.loading = true;
    },
    isNotLoading(state) {
      state.loading = false;
    },
    setSearchTerm(state, payload) {
      state.searchTerm = payload;
    }
  };