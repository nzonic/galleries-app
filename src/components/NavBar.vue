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
      </span>
      <span v-else>
        <router-link class="btn btn-outline-primary" to="/login">Login</router-link>
        <router-link class="btn btn-outline-primary ml-2" to="/register">Register</router-link>
      </span>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
      try {
        this.logout();
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
