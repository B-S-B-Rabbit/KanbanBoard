<template>
  <DescriptionText
    @changeText="setEditing(task.id)"
    :textValue="task.description"
    v-if="!task.isEditing"
  />
  <DescriptionEdit
    @cancelChanges="cancelChanges"
    @saveText="saveDescription"
    :textValue="task.description"
    :placeholder="'Введите описание задачи'"
    v-else
  />
</template>

<script>
import DescriptionText from "./UI/EditableText.vue";
import DescriptionEdit from "./UI/WritableText.vue";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  components: {
    DescriptionText,
    DescriptionEdit,
  },
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
