<template>
  <div>
    <h3 class="display-3">
      Comments:
    </h3>
    <b-list-group v-if="comments.length">
      <b-list-group-item
        v-for="comment in comments"
        :key="comment.id"
        class="flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">
            {{ comment.user.firstName }} {{ comment.user.lastName }}
          </h5>
          <small>{{ comment.created_at | diffForHumans }}</small>
        </div>

        <p class="mb-1">
          {{ comment.content }}
        </p>

        <b-modal
          :id="`comment-modal-${comment.id}`"
          :ref="`modal-${comment.id}`"
          title="Delete Comment?"
          @ok="handleOk(comment.id)"
        >
        <p>
          Are you sure you want to delete your comment?
        </p>
        </b-modal>
        <small v-if="activeUser.id === comment.user_id">
          <button
            class="btn btn-danger"
            type="button"
            @click="onDelete(comment.id)"
          >
            Delete Comment
            <b-icon-x-octagon-fill danger> </b-icon-x-octagon-fill></button
        ></small>
      
      </b-list-group-item>
    </b-list-group>
    <h5 class="display-5" v-else>
      No comments
    </h5>
    <hr />
    <b-form @submit.stop.prevent v-if="!commented && !!this.activeUser.id">
      <!-- @keyup.enter="onSubmit" -->
      <b-form-group
        id="input-group-1"
        label="Add Your Comment: "
        label-for="input-1"
      >
        <b-form-textarea
          id="input-1"
          v-model="comment.content"
          type="textarea"
          rows="3"
          :state="commentState"
          placeholder="Enter Text here.."
        ></b-form-textarea>
        <b-form-invalid-feedback :state="commentState">
          <span> Cannot send empty comment</span>
        </b-form-invalid-feedback>
        <br />
        <b-button @click="onSubmit">Submit Comment</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import dateMixins from "../mixins/DateMixins";
import { mapActions } from "vuex";

export default {
  name: "Comments",
  data() {
    return {
      comment: {
        content: "",
      },
      commented: false,
      commentState: null,
    };
  },
  methods: {
    ...mapActions("comments", ["addComment", "deleteComment"]),
    async onSubmit() {
      this.commentState = null;
      let comment = this.comment;
      if (!this.comment.content.trim().length) {
        this.comment.content = "";
        this.commentState = false;
        return;
      }
      comment.gallery_id = this.galleryId;
      comment.user_id = this.activeUser.id;
      await this.addComment(comment);
      this.commented = true;
    },
    async onDelete(commentId) {
      this.$bvModal.show(`comment-modal-${commentId}`)
    },
    async handleOk(commentId) {
      await this.deleteComment(commentId);
    }
  },
  props: {
    comments: Array,
    activeUser: Object,
    galleryId: Number,
  },
  mixins: [dateMixins],
};
</script>

<style></style>
