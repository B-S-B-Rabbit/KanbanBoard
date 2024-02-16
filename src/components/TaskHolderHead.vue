<template>
  <div class="d-flex justify-space-between align-center">
    <h1 class="text-h4">{{ taskType }}: {{ numberOfTasks }}</h1>
    <small-icon-btn :tonalColor="'gray'" :iconName="'mdi-dots-horizontal'">
    </small-icon-btn>
  </div>
</template>

<script>
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
  },
};
</script>

<style></style>
