<template>
  <base-menu-dropdown
    :close-on-content-click="false"
    :buttonType="rootType"
    :menuPosition="'end'"
    :menuIconName="menuIconName"
    :iconType="'icon'"
  >
    <v-select
      menu
      menu-icon="mdi-account-circle"
      persistent-placeholder
      placeholder="Назначить исполнителя"
      clearable
      label="Select"
      variant="solo"
      :items="options"
      :item-props="itemProps"
      :modelValue="selectedValue"
      @update:modelValue="handleUpdatingSelection"
    ></v-select>
  </base-menu-dropdown>
</template>

<script>
export default {
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
  emits: ["menuOptionClick", "updateSelection"],
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
