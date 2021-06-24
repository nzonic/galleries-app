export const getters = {
    galleryPage: (state) => state.galleryPage,
    isLoading: (state) => state.loading,
    currentPage: (state) => state.galleryPage.current_page,
    lastPage: (state) => state.galleryPage.last_page,
    searchTerm: (state) => state.searchTerm
}