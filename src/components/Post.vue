<template>
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
      <v-card-actions class="pl-4">
        <v-btn
          color="deep-purple lighten-2"
          @click="$router.push(`/post/${post.id}`)"
        >
          Leer más
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Post",
  props: ["post"],
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

<style scoped></style>
