<template>
  <div>
    <div v-if="!isLoading" >
      <h2 class="display-2">
      {{ author.firstName }} {{ author.lastName}} 
      </h2>
      <div class="list">
        <gallery-card v-for="gallery in galleryPage.data" :key="gallery.id" :gallery="gallery">
        </gallery-card>
      </div>
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
import GalleryCard from '../components/GalleryCard.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'AuthorPage',
  methods: {
    ...mapActions('author', ['fetchAuthor']),
    ...mapActions('galleries', {loadMorePages: 'loadMoreByAuthor'}),
    async loadMore() {
      await this.loadMorePages({page: this.nextPage, author: this.author.id});
    }
  },
  computed: {
    ...mapGetters('author', {author: 'getAuthor'}),
    ...mapGetters('galleries', ['galleryPage', 'isLoading', 'currentPage', 'lastPage']),
    nextPage() {
      return this.currentPage + 1;
    }
  },
  created() {
    this.fetchAuthor(this.id);
  },
  props: ['id'],
  components: {
    GalleryCard
  }
}
</script>

<style>

</style>