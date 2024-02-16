<template>
  <v-btn
    :class="
      task.taskStatus === 'completed' ? 'text-decoration-line-through' : ''
    "
    variant="text"
    prepend-icon="mdi-checkbox-marked"
  >
    <template v-slot:prepend>
      <v-icon
        :color="task.taskStatus === 'completed' ? 'success' : 'primary'"
      ></v-icon>
    </template>
    {{ `Task-${task.id}` }}</v-btn
  >
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
