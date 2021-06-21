<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      
      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
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
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Your First Name:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.firstName"
          placeholder="Enter First name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Your Last Name:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.lastName"
          placeholder="Enter Last name"
          required
        ></b-form-input>
      </b-form-group>


      <b-form-checkbox
        id="checkbox-1"
        v-model="form.status"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        I accept the terms and conditions.
      </b-form-checkbox>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          password_confirmation: '',
          status: 'not_accepted'
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        this.form.email = ''
        this.form.firstName = ''
        this.form.lastName = ''
        this.form.password = ''
        this.form.password_confirmation = ''
        this.form.status = 'not_accepted'

        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>