<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
        :state="formState.email"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          :state="formState.email"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formState.email">
         <span v-for="(error, index) in errors.email" :key="index"> {{error}}</span>
        </b-form-invalid-feedback>
      </b-form-group>
      

      <b-form-group id="input-group-4" label="Your First Name:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.firstName"
          type="text"
          placeholder="Enter First name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Your Last Name:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.lastName"
          type="text"
          placeholder="Enter Last name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter Password"
          :state="formState.password"
          aria-describedby="password-help-block"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formState.password">
         <span v-for="(error, index) in errors.password" :key="index"> {{error}}</span>
        </b-form-invalid-feedback>
        <b-form-text id="password-help-block">
          Your password must be at least 8 characters long, contain letters and numbers.
        </b-form-text>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Confirm Password:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.password_confirmation"
          type="password"
          placeholder="Enter password again"
          :state="formState.password_confirmation"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formState.password_confirmation">
         <span v-for="(error, index) in errors.password_confirmation" :key="index"> {{error}}</span>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-checkbox
        id="checkbox-1"
        v-model="status"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
        required
      >
        I accept the terms and conditions.
      </b-form-checkbox>

      <b-button type="submit" variant="primary">Register</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    name: 'RegisterPage',
    data() {
      return {
        form: {
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          password_confirmation: '',
        },
        status: 'not_accepted',
        show: true,
        errors: {},
        formState: {
          password: null,
          email: null,
          password_confirmation: null,
        }
      }
    },
    methods: {
      ...mapActions('auth', ['register']),
      async onSubmit() {
        this.resetState();
        try {
          await this.register(this.form);
          this.$router.push('/')
        } catch (error) {
          this.errors = error.data.errors;
          let keys = Object.keys(this.errors);
          keys.forEach((el) => {
            if (this.errors[el]) {
              this.formState[el] = false;
            }
          });
          console.log(error.data.errors);
        }
      },
      onReset() {
        this.form.email = ''
        this.form.firstName = ''
        this.form.lastName = ''
        this.form.password = ''
        this.form.password_confirmation = ''
        this.status = 'not_accepted'

        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      resetState() {
          this.formState.password = null;
          this.formState.email = null;
          this.formState.password_confirmation = null;
        
      }
    }
  }
</script>