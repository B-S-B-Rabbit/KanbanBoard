<template>
  <v-dialog max-width="450px" :modelValue="dialogState" persistent width="auto">
    <v-card>
      <v-card-title class="d-flex justify-center text-h5">
        {{ action }}
      </v-card-title>
      <v-card-text>{{ confirmText }}</v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn color="blue-darken-1" variant="text" @click="cancelActionDialog">
          Отменить
        </v-btn>
        <v-btn color="red-darken-1" variant="text" @click="confirmActionDialog">
          Подтвердить
        </v-btn>
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
