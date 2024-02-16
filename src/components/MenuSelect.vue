<template>
  <menu-dropdown
    :close-on-content-click="false"
    :buttonType="rootType"
    :menuPosition="'end'"
    :menuIconName="menuIconName"
  >
    <v-select
      menu
      menu-icon="mdi-account-circle"
      persistent-placeholder
      placeholder="Назначить исполнителя"
      clearable
      label="Select"
      :items="options"
      :item-props="itemProps"
      variant="solo"
      :modelValue="selectedValue"
      @update:modelValue="handleUpdatingSelection"
    ></v-select>
  </menu-dropdown>
</template>

<script>
import MenuDropdown from "./UI/MenuDropdown.vue";
export default {
  components: { MenuDropdown },
  props: {
    menuIconName: {
      type: String,
      required: true,
    },
    rootType: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
      required: true,
    },
    selectedValue: {
      type: [Object, null],
      required: true,
    },
  },
  methods: {
    menuOptionClick(action, taskId) {
      this.$emit("menuOptionClick", action, taskId);
    },
    itemProps(item) {
      return {
        title: item.name,
        subtitle: item.department,
      };
    },
    handleUpdatingSelection(event) {
      this.$emit("updateSelection", event);
    },
  },
};
</script>

<style></style>
