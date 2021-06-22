<template>
   <div>
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="userData.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      
      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="userData.password"
          type="password"
          placeholder="Enter Password"
          required
        ></b-form-input>
      </b-form-group>
          <b-alert v-model="failedLogin" variant="danger" dismissible>
          Something Went Wrong
          </b-alert>
      <b-button type="submit" variant="primary">Login</b-button>

    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      userData: {
        email: '',
        password: ''
      },
      failedLogin: false
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async onSubmit() {
      this.failedLogin = false;
      try {
        await this.login(this.userData);
        this.$router.push('/');
      } catch (error) {
        this.failedLogin = true;
        console.log(error);
      }
    }
  }

}
</script>