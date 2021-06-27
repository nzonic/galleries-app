<template>
  <b-card
    
    :img-src="gallery.images[0].url"
    img-alt="Image"
    img-top
    img-width="250"
    img-height="250"
    tag="article"
    style="
      max-width: 20rem;
      display: inline-block;"
    class="mb-2"
  >
  <b-card-title><router-link :to="`/galleries/${gallery.id}`">{{gallery.name}}</router-link></b-card-title>
    <b-card-text>
      <router-link :to="`/authors/${gallery.user.id}`">
        {{ gallery.user.firstName }} {{ gallery.user.lastName }}
      </router-link>
      <br>
      {{ gallery.created_at | formatDate}}
    </b-card-text>

    <!-- <router-link class="btn btn-primary" :to="`/galleries/${gallery.id}`">Open Gallery</router-link> -->
  </b-card>
</template>

<script>
import dateMixins from '../mixins/DateMixins.js';
export default {
  name: 'GalleryCard',
  props: {
    gallery: Object
  },
  mixins: [dateMixins]
}
</script>
