<template>
  <div class="home">
    <h1 class="display-1"> Galleries App  </h1>
    <ul v-if="galleries.length">
      <li v-for="gallery in galleries" :key="gallery.id">
          {{gallery.name}}
      </li>
    </ul>
    <h2 v-else>
      No Galleries! :(
    </h2>

    <button class="btn btn-primary" v-if="!loadedAll" @click="load10">
      Load 10 more
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      galleries: [],
      loaded: 0,
      loadedAll: false
    }
  },
  computed: {
    ...mapGetters('galleries', ['fullList'])
  },
  methods: {
    ...mapActions('galleries', ['getAll']),
    load10() {
      let latest10 = this.fullList.slice(this.loaded, this.loaded + 10);
      latest10.forEach(element => {
        this.galleries.push(element);
      });
      this.loaded += 9;
      if (this.loaded >= this.fullList.length) {
        this.loadedAll = true
      }
    }
  },
  async created() {
    this.getAll();
    this.load10();
  }
}
</script>
