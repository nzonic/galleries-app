<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Galleries</router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">All Galleries</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/logout">Link</router-link>
        </li> -->
      </ul>
      <span v-if="isAuthenticated">
        <button class="btn btn-outline-danger" @click="handleLogout">Logout</button>
        <b-nav-form @submit.stop.prevent="search">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </span>
      <span v-else>
        <router-link class="btn btn-outline-primary" to="/login">Login</router-link>
        <router-link class="btn btn-outline-primary ml-2" to="/register">Register</router-link>
      </span>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('galleries', ['getGalleries']),
    ...mapMutations('galleries', ['setSearchTerm']),
    async handleLogout() {
      try {
        this.logout();
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    search(event) {
      this.setSearchTerm(event.target[0].value);
      this.getGalleries(1)
    }
  }
}
</script>
