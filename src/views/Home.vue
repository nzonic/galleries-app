<template>
  <div class="home">
    <h1 class="display-1"> Galleries App  </h1>
    <div v-if="!isLoading" class="list">
      <gallery-card v-for="gallery in galleryPage.data" :key="gallery.id" :gallery="gallery">
      </gallery-card>
    </div>
    <h2 v-else>
      Loading... Please Wait :)
    </h2>

    <button class="btn btn-primary" v-if="currentPage < lastPage" @click="loadMore">
      Load 10 more
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GalleryCard from '../components/GalleryCard.vue';
export default {
  name: 'Home',
  components: {
    GalleryCard
  },
  computed: {
    ...mapGetters('galleries', ['galleryPage', 'isLoading', 'currentPage', 'lastPage']),
    nextPage() {
      return this.currentPage + 1;
    }
  },
  methods: {
    ...mapActions('galleries', {loadMorePages: 'loadMore', getGalleries: 'getGalleries' }),
    async loadMore() {
      await this.loadMorePages( 
        this.nextPage
        );
    }
  },
  async created() {
    this.getGalleries(1);
  }
}
</script>

<style scoped>
#list {
  display: flex;
  flex-direction: row;
}
</style>
