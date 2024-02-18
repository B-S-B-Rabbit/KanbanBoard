<template>
  <v-menu min-width="300" :location="menuPosition">
    <template v-slot:activator="{ props }">
      <base-icon v-if="isIcon" v-bind="props" :iconName="menuIconName" />
      <base-button-icon v-else v-bind="props" :iconName="menuIconName">
      </base-button-icon>
    </template>
    <slot></slot>
  </v-menu>
</template>

<script>
import BaseIcon from "./BaseIcon.vue";
export default {
  components: { BaseIcon },
  props: {
    menuPosition: {
      type: String,
      required: true,
    },
    menuIconName: {
      type: String,
      required: true,
    },
    iconType: {
      type: String,
      required: true,
    },
  },
  computed: {
    isIcon() {
      return this.iconType === "icon" ? true : false;
    },
  },
  name: "base-menu-dropdown",
};
</script>

<style></style>
