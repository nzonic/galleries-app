<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit" v-if="!isLoading">
      <b-form-group
        id="input-group-1"
        label="Enter Gallery Name:"
        label-for="input-1"
        :state="formState.name"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Enter name"
          :state="formState.name"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formState.name">
          <span v-for="(error, index) in errors.name" :key="index">
            {{ error }}</span
          >
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Gallery Description:"
        label-for="input-2"
      >
        <b-form-textarea
          id="input-2"
          v-model="form.description"
          type="textarea"
          rows="3"
          placeholder="Enter description"
          :state="formState.description"
          aria-describedby="description-help-block"
        ></b-form-textarea>
        <b-form-invalid-feedback :state="formState.description">
          <span v-for="(error, index) in errors.description" :key="index">
            {{ error }}</span
          >
        </b-form-invalid-feedback>
        <b-form-text id="password-help-block">
          Description can be 1000 characters long
        </b-form-text>
      </b-form-group>

      <div v-for="(image, index) in form.images" :key="index">
        <b-form-group id="input-group-3" label="Image URL:" label-for="input-3">
          <b-col sm="9" style="display: flex;">
            <b-form-input
              id="input-3"
              v-model="form.images[index].url"
              type="text"
              placeholder="Enter Url:"
              :state="formState[`images.${index}.url`]"
              required
            ></b-form-input>

            <b-button
              @click="moveUrl(index, index - 1)"
              :disabled="index == 0"
              type="button"
              variant="success"
            >
              Move Up
              <b-icon-arrow-up></b-icon-arrow-up>
            </b-button>

            <b-button
              @click="moveUrl(index, index + 1)"
              :disabled="index == form.images.length - 1"
              type="button"
              variant="danger"
            >
              Move Down
              <b-icon-arrow-down></b-icon-arrow-down>
            </b-button>

            <b-button
              @click="removeUrl(index)"
              :disabled="index == 0"
              type="button"
              variant="dark"
            >
              <b-icon icon="x-circle" scale="2"></b-icon>
            </b-button>
          </b-col>

          <b-form-invalid-feedback :state="formState[`images.${index}.url`]">
            <!-- <span v-for="(error, index) in errors[`images.${index}.url`]" :key="index"> {{error}}</span> -->
            <span> Image Format is Invalid !</span>
          </b-form-invalid-feedback>
        </b-form-group>
      </div>

      <b-button type="button" variant="secondary" @click="addUrl"
        >Add Another Image</b-button
      >
      <br /><br /><br />
      <b-button type="submit" variant="primary">Submit</b-button>
      <router-link class="btn btn-danger" :to="`/galleries/${id}`" v-if="id"
        >Cancel</router-link
      >
      <router-link
        class="btn btn-danger"
        :to="`/authors/${this.activeUser.id}`"
        v-else
        >Cancel</router-link
      >
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreateGallery",
  props: ["id"],
  computed: {
    ...mapGetters("auth", ["activeUser"]),
    ...mapGetters("galleries", ["galleryPage", "isLoading"]),
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        images: [{ url: "" }],
      },
      errors: {},
      formState: {
        name: null,
        description: null,
        images: [null],
      },
    };
  },
  methods: {
    ...mapActions("galleries", [
      "createGallery",
      "finishLoading",
      "showGallery",
      "editGallery",
    ]),
    async onSubmit() {
      this.resetState();
      if (this.id) {
        try {
          await this.editGallery(this.form);
          this.$router.push(`/galleries/${this.id}`);
        } catch (error) {
          console.log(error);
          return;
        }
        return;
      }
      try {
        await this.createGallery(this.form);
        this.$router.push(`/authors/${this.activeUser.id}`);
      } catch (error) {
        this.errors = error.data.errors;
        console.log(error);
        let keys = Object.keys(this.errors);

        keys.forEach((el) => {
          if (this.errors[el]) {
            console.log(el);
            this.formState[el] = false;
          }
        });
      }
    },
    addUrl() {
      this.form.images.push({ url: "" });
      this.formState.images;
    },
    resetState() {
      this.formState.name = null;
      this.formState.description = null;
      this.form.images.forEach((el, index) => {
        this.formState[`images.${index}.url`] = null;
      });
    },
    moveUrl(from, to) {
      this.form.images.splice(to, 0, this.form.images.splice(from, 1)[0]);
    },
    removeUrl(index) {
      this.form.images.splice(index, 1);
    },
    resetForm() {
      this.form = {
        name: "",
        description: "",
        images: [{ url: "" }],
      };
      this.errors = {};
      this.resetState();
    },
    async updateComponentData() {
      if (this.$route.params.id !== undefined) {
        const data = await this.showGallery(this.id);
        if (this.galleryPage.user_id !== this.activeUser.id) {
          this.$router.push("/");
        }
        this.form = data;
        return;
      }
      this.resetForm();
      this.finishLoading();
    },
  },
  async created() {
    this.updateComponentData();
  },
  watch: {
    $route: "updateComponentData",
  },
};
</script>
