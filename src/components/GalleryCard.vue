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

    <b-button href="#" variant="primary">Open Gallery</b-button>
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

<style>
article {
  
}
</style>