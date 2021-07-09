<template>
  <v-container>
    <div>
      <v-card class="d-flex flex-column flex-sm-row my-6" dark>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          :max-width="width"
        />
        <div class="d-flex flex-column my-4">
          <v-card-text>
            <h1 class="display-1 mb-2">{{ post.title }}</h1>
            <p>
              {{ post.description }}
            </p>
          </v-card-text>
        </div>
      </v-card>
    </div>
  </v-container></template
>

<script>
import postServices from "@/services/postServices.js";

export default {
  name: "Post",
  data() {
    return {
      post: {},
    };
  },
  methods: {
    async getPost() {
      const { response, status } = await postServices.getPost(
        this.$route.params.id
      );
      if (status === 200) {
        const { data } = response;
        this.post = data;
      }
    },
  },
  created() {
    this.getPost();
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "sm":
          return 200;
        case "md":
          return 300;
        case "lg":
          return 300;
        case "xl":
          return 600;
        default:
          return "100%";
      }
    },
  },
};
</script>

<style></style>
