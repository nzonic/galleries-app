<template>
  <div>
    <div v-if="!isLoading">
      <h1 class="display-1">
        {{ gallery.name }}
      </h1>
      <h2 class="display-5">
        Author:
        <router-link :to="`/authors/${gallery.user.id}`">
          {{ gallery.user.firstName }} {{ gallery.user.lastName }}
        </router-link>
      </h2>
      <h3 class="display-6">
        Posted:
        {{ gallery.created_at | formatDate }}
      </h3>
      <p>
        {{ gallery.description }}
      </p>
      <div v-if="gallery.user.id === activeUser.id">
        <b-modal
          id="modal-1"
          :ref="`modal-${gallery.id}`"
          title="Delete Gallery?"
          @ok="handleOk"
        >
        <p>
          Are you sure you want to delete your Gallery?
          <br>
          You will not be able to undo this action.
        </p>
        </b-modal>
        <button type="button" class="btn btn-danger" @click="onDelete">Delete</button>
        <router-link class="btn btn-primary" :to="`/edit-gallery/${gallery.id}`">Edit</router-link>
      </div>
      <div>
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="640"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >


          <b-carousel-slide v-for="image in gallery.images" :key="image.id">
            <template #img>
              <a :href="image.url" target="_blank">
                <img
                  class="d-block img-fluid w-100"
                  width="640"
                  height="480"
                  :src="image.url"
                  alt="image slot"
                />
              </a>
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <div>
        <comments-component :comments="gallery.comments" :activeUser="activeUser" :galleryId="gallery.id"></comments-component>
      </div>
    </div>
    <div v-else>
      <h2>
        We're Loading...
      </h2>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import dateMixins from "../mixins/DateMixins";
import CommentsComponent from "../components/Comments.vue";
export default {
  name: "SingleGallery",
  computed: {
    ...mapGetters("auth", ['activeUser']),
    ...mapGetters("galleries", {
      gallery: "galleryPage",
      isLoading: "isLoading",
    }),
  },
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    ...mapActions("galleries", ["showGallery", "deleteGallery"]),
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    async onDelete() {
      this.$bvModal.show('modal-1')
    },
    async handleOk() {
      try {
        let data = await this.deleteGallery(this.id);
        console.log(data);
        this.$router.push(`/authors/${this.activeUser.id}`);
      } catch (error) {
        console.log(error);
      }
    }
    
  },
  props: ["id"],
  created() {
    this.showGallery(this.id);
  },
  mixins: [dateMixins],
  components: {
    CommentsComponent
  }
};
</script>

<style></style>
