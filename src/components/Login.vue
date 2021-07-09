<template>
  <v-dialog max-width="500" :value="value" @input="$emit('input', $event)">
    <v-card class="d-flex flex-column align-center">
      <!-- <v-img src="@/assets/logo.png" width="200" /> -->
      <v-card-text class="mt-2">
        <h1 class="my-6" align="center">Login</h1>
        <v-form @submit.prevent="handleSubmit">
          <Input
            type="email"
            placeholder="Ingrese su correo"
            label="Correo"
            id="email"
            v-model="userInfo.email"
          />
          <Input
            type="password"
            placeholder="Ingrese su contraseña"
            label="Contraseña"
            id="password"
            v-model="userInfo.password"
          />
          <v-btn type="submit" color="primary" block>Ingresar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Input from "@/components/Input.vue";
import userServices from "@/services/userServices.js";

export default {
  name: "Login",
  data() {
    return {
      userInfo: { email: "", password: "" },
    };
  },
  emits: ["login"],
  components: {
    Input,
  },
  props: {
    value: Boolean,
  },
  methods: {
    async handleSubmit() {
      try {
        const { response, status } = await userServices.login(this.userInfo);
        if (status === 200) {
          const { user, access_token } = response;
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              access_token,
            })
          );
          this.$emit("login");
        }
      } catch (error) {
        console.log({ error });
      } finally {
        this.$emit("input", false);
      }
    },
  },
};
</script>

<style></style>
