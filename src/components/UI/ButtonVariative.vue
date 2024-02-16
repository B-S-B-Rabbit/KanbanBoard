<template>
  <v-btn
    v-if="typeBtn !== 'icon'"
    variant="tonal"
    :color="tonalColor ? tonalColor : 'blue'"
    :icon="iconName"
    size="small"
  >
    <template v-slot:default>
      <v-icon :color="iconColor ? iconColor : 'black'"></v-icon>
    </template>
  </v-btn>
  <v-icon
    v-else-if="typeBtn === 'icon'"
    typeBtn="iconName"
    :icon="iconName"
    size="x-large"
  ></v-icon>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    typeBtn: {
      type: String,
      required: false,
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
  name: "small-icon-btn",
};
</script>

<style></style>
