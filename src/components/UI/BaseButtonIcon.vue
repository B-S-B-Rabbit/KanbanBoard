<template>
  <v-btn variant="tonal" :color="buttonColor" :icon="iconName" size="small">
    <template v-slot:default>
      <v-icon :color="computedIconColor"></v-icon>
    </template>
  </v-btn>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    iconColor: {
      type: String,
      required: false,
    },
    tonalColor: {
      type: String,
      required: false,
    },
  },
  computed: {
    buttonColor() {
      return this.tonalColor ? this.tonalColor : "blue";
    },
    computedIconColor() {
      return this.iconColor ? this.iconColor : "black";
    },
  },
  name: "base-button-icon",
};
</script>

<style></style>
