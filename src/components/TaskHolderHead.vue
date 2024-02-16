<template>
  <div class="d-flex justify-space-between align-center">
    <h1 class="text-h5">{{ taskType }}: {{ numberOfTasks }}</h1>
    <v-card
      :color="numberOfTasks <= limitTasks ? 'blue' : 'red'"
      v-if="limitTasks"
      class="pa-1 mt-1"
    >
      Max: {{ limitTasks }}
    </v-card>
    <MenuToolbar
      :menuIconName="optionIconName"
      :menuOptions="menuOptions"
      :elem="{ id: holderType }"
      @menuOptionClick="forwardMenuOptionClick"
    />
  </div>
</template>

<script>
import MenuToolbar from "./MenuToolbar.vue";
export default {
  props: {
    taskType: {
      type: String,
      required: true,
    },
    numberOfTasks: {
      type: Number,
      required: true,
    },
    holderType: {
      type: String,
      required: true,
    },
    limitTasks: {
      type: Number,
      required: true,
    },
  },
  components: {
    MenuToolbar,
  },
  data() {
    return {
      menuOptions: [
        {
          title: "Переименовать",
          action: "rename",
          icon: "mdi-pencil",
        },
        {
          title: "Задать лимит задач",
          action: "limit",
          icon: "mdi-exclamation-thick",
        },
      ],
      optionIconName: "mdi-cog",
    };
  },
  methods: {
    forwardMenuOptionClick(action, holderType) {
      this.$emit("menuOptionClick", action, holderType);
    },
  },
};
</script>

<style></style>
