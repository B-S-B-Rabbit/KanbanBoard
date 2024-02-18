<template>
  <v-icon :icon="iconName" size="x-large"></v-icon>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
  name: "base-icon",
};
</script>

<style></style>
