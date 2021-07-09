<template>
  <div class="my-4">
    <h1 class="display-1">Publicaciones recientes</h1>
    <template v-for="post in posts">
      <Post :post="post" :key="post.id" />
    </template>
  </div>
</template>

<script>
import Post from "./Post.vue";
import postServices from "@/services/postServices.js";

export default {
  name: "PostList",
  data() {
    return {
      posts: [],
    };
  },
  components: {
    Post,
  },
  created: async function() {
    const {
      response: { data },
      status,
    } = await postServices.getPosts();
    if (status === 200) {
      this.posts = data;
      console.log({ data });
    }
  },
};
</script>
