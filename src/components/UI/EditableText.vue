<template>
  <div class="d-inline-flex">
    <p
      class="d-inline-flex py-5 ml-5 description"
      style="min-width: 209px; max-width: 209px; word-break: break-word"
    >
      {{ textValue }}
    </p>
    <small-icon-btn @click="changeText" :iconName="'mdi-pencil'" />
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
};
</script>

<style></style>
