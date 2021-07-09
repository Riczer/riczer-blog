<template>
  <v-app>
    <Login v-model="openLogin" @login="login" />
    <Register v-model="openRegister" />
    <v-navigation-drawer v-model="openDrawer" app temporary tag="div">
      <v-img src="@/assets/doge.png" class="d-block mx-auto" width="100" />
      <h1 class="text-h4 mb-4 text-center">Riczer's blog</h1>
      <nav>
        <ul class="flex-column">
          <template v-if="!isLogged">
            <li
              @click="
                openLogin = true;
                openDrawer = false;
              "
            >
              Iniciar sesión
            </li>
            <li
              @click="
                openRegister = true;
                openDrawer = false;
              "
            >
              Registrarse
            </li>
          </template>
          <li
            v-else
            @click="
              openDrawer = false;
              logout();
            "
          >
            Cerrar sesion
          </li>
          <li @click="openDrawer = false">
            <router-link to="/">Blog</router-link>
          </li>
        </ul>
      </nav>
    </v-navigation-drawer>
    <v-app-bar app dark>
      <router-link to="/" class="text-decoration-none d-flex">
        <v-toolbar-title class="d-flex align-center">
          <v-img class="mr-3" src="@/assets/doge.png" width="50" />
          Riczer's blog
        </v-toolbar-title>
      </router-link>
      <h1></h1>

      <v-spacer />
      <nav v-show="$vuetify.breakpoint.smAndUp">
        <ul>
          <template v-if="!isLogged">
            <li>
              <v-btn @click="openRegister = true" outlined>Registrarse</v-btn>
            </li>
            <li>
              <v-btn @click="openLogin = true" outlined>Iniciar sesión</v-btn>
            </li>
          </template>
          <template v-else>
            <v-btn @click="$router.push('dashboard').catch(() => {})" outlined
              >Dashboard</v-btn
            >
            <v-btn @click="logout" outlined>Cerrar sesion</v-btn>
          </template>
        </ul>
      </nav>
      <v-app-bar-nav-icon
        v-show="!$vuetify.breakpoint.smAndUp"
        @click="openDrawer = true"
      />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "App",
  components: {
    Login,
    Register,
  },
  data: () => ({
    openDrawer: false,
    openRegister: false,
    openLogin: false,
    isLogged: localStorage.getItem("user"),
  }),
  methods: {
    login() {
      this.isLogged = true;
    },
    logout() {
      localStorage.removeItem("user");
      this.isLogged = false;
      this.$router.push("/").catch(() => {});
    },
  },
};
</script>

<style>
ul {
  display: flex;
  list-style: none;
  gap: 20px;
}
</style>
