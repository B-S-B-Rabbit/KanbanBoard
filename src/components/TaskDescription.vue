<template>
  <base-editable-text
    v-if="!task.isEditing"
    :textValue="task.description"
    @changeText="setEditing(task.id)"
  />
  <base-writable-text
    v-else
    :textValue="task.description"
    :placeholder="'Введите описание задачи'"
    @cancelChanges="cancelChanges"
    @saveText="saveDescription"
  />
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  emits: ["setTaskEditing", "saveDescription", "cancelChanges"],
  methods: {
    setEditing(id) {
      this.$emit("setTaskEditing", id);
    },
    saveDescription(taskValue) {
      this.$emit("saveDescription", taskValue, this.task.id);
    },
    cancelChanges() {
      this.$emit("cancelChanges", this.task.id);
    },
  },
};
</script>

<style></style>
