<template>
  <div class="ma-4">
    <v-textarea
      variant="outlined"
      v-model="textValueCopy"
      auto-grow
      bg-color="rgb(252, 252, 252)"
      rows="2"
      type="text"
      autofocus="true"
      :placeholder="placeholder"
    >
    </v-textarea>
    <div class="d-flex justify-space-between">
      <base-button-icon
        :iconColor="'green'"
        :iconName="'mdi-check'"
        @click="saveText(textValueCopy)"
      />
      <base-button-icon
        :iconColor="'red'"
        :iconName="'mdi-cancel'"
        @click="cancelChanges"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    textValue: {
      type: String,
      requierd: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      textValueCopy: this.textValue,
    };
  },
  emits: ["saveText", "cancelChanges"],
  methods: {
    saveText(textValueCopy) {
      this.$emit("saveText", textValueCopy);
    },
    cancelChanges() {
      this.$emit("cancelChanges");
    },
  },
  name: "base-writable-text",
};
</script>

<style></style>
