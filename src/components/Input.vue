<template>
  <div>
    <label :for="id" class="d-block ml-1 mb-1"> {{ label }}</label>
    <v-text-field
      :placeholder="placeholder"
      outlined
      full-width
      :id="id"
      :type="type"
      :value="value"
      @input="$emit('input', $event)"
      dense
      required
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    value: String,
    id: String,
    type: String,
    placeholder: String,
    label: String,
  },
};
</script>

<style lang="scss">
$text-field-details-margin-bottom: 20px !important;
</style>
