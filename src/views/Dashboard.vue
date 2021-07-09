<template>
  <v-container class="mt-5">
    <v-data-table
      dark
      :headers="fields"
      :items="posts"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Publicaciones</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="openDialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Nuevo post
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <Input
                  type="text"
                  placeholder="Ingrese el título"
                  label="Título"
                  id="title"
                  v-model="newPost.title"
                />
                <label for="description" class="d-block ml-1 mb-1"
                  >Descripción</label
                >
                <v-textarea
                  v-model="newPost.description"
                  placeholder="Ingrese una descripción"
                  outlined
                  full-width
                  id="description"
                  dense
                  required
                ></v-textarea>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="openDialog = false">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="openDeletePost" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Estás seguro que deseas borrar este post?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="openDeletePost = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deletePost">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-3" @click="editPost(item.id)">
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="
            openDeletePost = true;
            selectedId = item.id;
          "
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import postServices from "@/services/postServices.js";
import Input from "@/components/Input.vue";

export default {
  name: "Dashboard",
  components: {
    Input,
  },
  data() {
    return {
      posts: [],
      openDialog: false,
      openDeletePost: false,
      action: "new",
      selectedId: -1,
      editedPost: {
        title: "",
        description: "",
      },
      newPost: {
        title: "",
        description: "",
      },
      fields: [
        {
          text: "Id",
          value: "id",
          sortable: false,
        },
        { text: "Título", value: "title", sortable: false },
        { text: "Autor", value: "user.firstName", sortable: false },
        { text: "Slug", value: "slug", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    formTitle() {
      return this.action === "new" ? "Nuevo post" : "Editar post";
    },
  },
  methods: {
    async initialize() {
      const {
        response: { data },
        status,
      } = await postServices.getPosts();
      if (status === 200) {
        this.posts = data;
        console.log({ data });
      }
    },
    async save() {
      const { status } =
        this.action === "new"
          ? await postServices.addPost(this.newPost)
          : await postServices.editPost({
              id: this.selectedId,
              post: this.newPost,
            });
      if (status === 200) {
        this.initialize();
      }
      this.openDialog = false;
      this.action = "new";
    },
    editPost(id) {
      this.action = "edit";
      this.selectedId = id;
      this.openDialog = true;
    },
    async deletePost() {
      const { status } = await postServices.deletePost(this.selectedId);
      if (status === 200) {
        this.initialize();
      }
      this.openDeletePost = false;
    },
  },
  created() {
    this.initialize();
  },
};
</script>

<style></style>
