<template>
  <v-btn
    :prepend-icon="prependIconName"
    :append-icon="appendIconName"
    :color="textColor"
    :variant="variant"
    ><slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    textColor: {
      type: String,
    },
    variant: {
      type: String,
    },
    prependIconName: {
      type: String,
    },
    appendIconName: {
      type: String,
    },
  },
  name: "base-button-text",
};
</script>

<style></style>
