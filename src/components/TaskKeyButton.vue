<template>
  <v-btn variant="text" prepend-icon="mdi-checkbox-marked">
    <template v-slot:prepend>
      <v-icon color="primary"></v-icon>
    </template>
    {{ `Task-${taskId}` }}</v-btn
  >
</template>

<script>
export default {
  props: {
    taskId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style></style>
