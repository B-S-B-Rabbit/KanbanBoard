<template>
  <base-menu-dropdown :menuPosition="'center'" :menuIconName="menuIconName">
    <v-list>
      <v-list-item>
        <v-list-item-title
          v-for="(option, index) in menuOptions"
          :key="index"
          :value="index"
        >
          <base-button-text
            :append-icon="option.icon"
            @click="menuOptionClick(option.action, elem.id)"
            >{{ option.title }}</base-button-text
          >
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </base-menu-dropdown>
</template>

<script>
export default {
  props: {
    menuOptions: {
      type: Array,
      required: true,
    },
    menuIconName: {
      type: String,
      required: true,
    },
    elem: {
      object: Object,
      required: true,
    },
  },
  emits: ["menuOptionClick"],
  methods: {
    menuOptionClick(action, id) {
      this.$emit("menuOptionClick", action, id);
    },
  },
};
</script>

<style></style>
