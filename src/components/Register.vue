<template>
  <v-dialog max-width="600" :value="value" @input="$emit('input', $event)">
    <v-card class="d-flex flex-column align-center">
      <v-card-text class="mt-2">
        <h1 class="my-6" align="center">Registro</h1>
        <v-form @submit.prevent="handleSubmit">
          <Input
            type="text"
            placeholder="Ingrese su nombre"
            label="Nombre"
            id="first-name"
            v-model="userInfo.firstName"
          />
          <Input
            type="text"
            placeholder="Ingrese su apellido"
            label="Apellido"
            id="last-name"
            v-model="userInfo.lastName"
          />
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
  name: "Register",
  data() {
    return {
      userInfo: {
        firstName: "safsa",
        lastName: "asfsa",
        email: "asfsa@safsa.com",
        password: "123456",
      },
    };
  },
  components: {
    Input,
  },
  props: {
    value: Boolean,
  },
  methods: {
    async handleSubmit() {
      const { response, status } = await userServices.register(this.userInfo);
      console.log({ status, response });
      if (status === 200) {
        this.$emit("input", false);
      }
    },
  },
};
</script>

<style></style>
