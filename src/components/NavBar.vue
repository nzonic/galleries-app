<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Galleries</router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/login">Link</router-link>
        </li> -->
      </ul>
        <router-link class="btn btn-outline-primary" to="/login">Login</router-link>
        <router-link class="btn btn-outline-primary ml-2" to="/register">Register</router-link>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>
