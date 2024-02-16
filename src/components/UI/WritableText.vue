<template>
  <div class="ma-5">
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
      <small-icon-btn
        :iconColor="'green'"
        @click="saveText(textValueCopy)"
        :iconName="'mdi-check'"
      />
      <small-icon-btn
        :iconColor="'red'"
        @click="cancelChanges"
        :iconName="'mdi-cancel'"
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
  methods: {
    saveText(textValueCopy) {
      this.$emit("saveText", textValueCopy);
    },
    cancelChanges() {
      this.$emit("cancelChanges");
    },
  },
};
</script>

<style></style>
