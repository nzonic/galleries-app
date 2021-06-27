export const mutations = {
    setGalleryPage(state, pageInfo) {
      state.galleryPage = pageInfo;
    },
    paginate(state, pageInfo) {
      pageInfo.data = [...state.galleryPage.data, ...pageInfo.data];
      state.galleryPage = pageInfo;
    },
    isLoading(state) {
      state.loading = true;
    },
    isLoaded(state) {
      state.loading = false;
    },
    setSearchTerm(state, payload) {
      state.searchTerm = payload;
    },
    pushComment(state, payload) {
      state.galleryPage.comments.push(payload);
    },
    removeComment(state, commentId) {
      state.galleryPage.comments = state.galleryPage.comments.filter((el) => el.id !== commentId);
    }
  };