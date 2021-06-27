<template>
  <div>
    <div v-if="!isLoading">
      <h2 class="display-2">{{ author.firstName }} {{ author.lastName }}</h2>
      <!-- <div class="list">
        <gallery-card v-for="gallery in galleryPage.data" :key="gallery.id" :gallery="gallery">
        </gallery-card>
      </div> -->
      <div v-if="galleryPage.data.length">
        <gallery-card
          v-for="gallery in galleryPage.data"
          :key="gallery.id"
          :gallery="gallery"
        >
        </gallery-card>
      </div>
      <div v-else>
        <h2 class="display-2">
          Sorry, but there are no galleries!
        </h2>
      </div>
    </div>
    <h2 v-else>
      Loading... Please Wait
    </h2>

    <button
      class="btn btn-primary"
      v-if="currentPage < lastPage"
      @click="loadMore"
    >
      Load 10 more
    </button>
  </div>
</template>

<script>
import GalleryCard from "../components/GalleryCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AuthorPage",
  methods: {
    ...mapActions("author", ["fetchAuthor"]),
    ...mapActions("galleries", { loadMorePages: "loadMoreByAuthor" }),
    ...mapActions("auth", ["getActiveUser"]),
    async loadMore() {
      await this.loadMorePages({ page: this.nextPage, author: this.author.id });
    },
  },
  computed: {
    ...mapGetters("author", { author: "getAuthor" }),
    ...mapGetters("galleries", [
      "galleryPage",
      "isLoading",
      "currentPage",
      "lastPage",
    ]),
    ...mapGetters("auth", ["activeUser"]),
    nextPage() {
      return this.currentPage + 1;
    },
  },
  async created() {
    if (this.$route.name === "Author" && this.id == this.activeUserId) {
      this.$router.replace({ name: "MyGalleries", params: { id: this.id } });
    }
    if (this.$route.name === "MyGalleries") {
      await this.getActiveUser();
      await this.fetchAuthor(this.activeUser.id);
      return;
    }

    this.fetchAuthor(this.id);
  },
  props: ["id"],
  components: {
    GalleryCard,
  },
};
</script>

<style></style>
