<template>
  <menu-dropdown :menuPosition="'center'" :menuIconName="menuIconName">
    <v-list>
      <v-list-item>
        <v-list-item-title
          v-for="(option, index) in menuOptions"
          :key="index"
          :value="index"
        >
          <v-btn
            @click="menuOptionClick(option.action, elem.id)"
            variant="text"
            :append-icon="option.icon"
            >{{ option.title }}</v-btn
          >
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </menu-dropdown>
</template>

<script>
import MenuDropdown from "./UI/MenuDropdown.vue";
export default {
  components: { MenuDropdown },
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
  methods: {
    menuOptionClick(action, id) {
      this.$emit("menuOptionClick", action, id);
    },
  },
};
</script>

<style></style>
