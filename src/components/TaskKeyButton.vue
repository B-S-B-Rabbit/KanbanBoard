<template>
  <v-btn variant="text" prepend-icon="mdi-checkbox-marked">
    <template v-slot:default>
      <p
        :class="
          task.taskStatus === 'completed' ? 'text-decoration-line-through' : ''
        "
      >
        {{ `Task-${task.id}` }}
      </p>
    </template>
    <template v-slot:prepend>
      <v-icon
        :color="task.taskStatus === 'completed' ? 'success' : 'primary'"
      ></v-icon>
    </template>
  </v-btn>
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
