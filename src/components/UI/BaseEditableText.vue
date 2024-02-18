<template>
  <div class="d-inline-flex">
    <p class="editable-text d-inline-flex py-5 ml-5 description">
      {{ textValue }}
    </p>
    <base-button-icon @click="changeText" :iconName="'mdi-pencil'" />
  </div>
</template>

<script>
export default {
  props: {
    textValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeText() {
      this.$emit("changeText");
    },
  },
  name: "base-editable-text",
};
</script>

<style scoped>
.editable-text {
  width: 209px;
  word-break: break-word;
}
</style>
