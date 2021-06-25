<template>
  <b-card
    :title="gallery.name"
    :img-src="gallery.images[0].url"
    img-alt="Image"
    img-top
    tag="article"
    style="
      max-width: 20rem;
      display: inline-block;"
    class="mb-2"
  >
    <b-card-text>
      {{ gallery.user.firstName }} {{ gallery.user.lastName }}
      <br>
      {{ gallery.created_at | formatDate}}
    </b-card-text>

    <router-link class="btn btn-primary" :to="`/galleries/${gallery.id}`">Open Gallery</router-link>
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
