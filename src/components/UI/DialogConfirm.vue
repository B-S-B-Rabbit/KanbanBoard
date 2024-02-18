<template>
  <v-dialog max-width="450px" :modelValue="dialogState" persistent>
    <v-card>
      <v-card-title class="d-flex justify-center text-h5">
        {{ action }}
      </v-card-title>
      <v-card-text>{{ confirmText }}</v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <base-button-text :color="'blue-darken-1'" @click="cancelActionDialog">
          Отменить
        </base-button-text>
        <base-button-text :color="'red-darken-1'" @click="confirmActionDialog">
          Подтвердить
        </base-button-text>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogState: {
      type: Boolean,
      required: true,
    },
    confirmText: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  emits: ["cancelAction", "confirmAction"],
  methods: {
    cancelActionDialog() {
      this.$emit("cancelAction");
    },
    confirmActionDialog() {
      this.$emit("confirmAction");
    },
  },
  name: "dialog-confirm",
};
</script>

<style></style>
