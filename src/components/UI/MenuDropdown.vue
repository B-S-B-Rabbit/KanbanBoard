<template>
  <v-menu min-width="300" :location="menuPosition">
    <template v-slot:activator="{ props }">
      <small-icon-btn
        :typeBtn="buttonType"
        v-bind="props"
        :iconName="menuIconName"
      />
    </template>
    <slot></slot>
  </v-menu>
</template>

<script>
export default {
  props: {
    menuPosition: {
      type: String,
      required: true,
    },
    menuIconName: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String,
      required: false,
    },
  },
  name: "menu-dropdown",
};
</script>

<style></style>
