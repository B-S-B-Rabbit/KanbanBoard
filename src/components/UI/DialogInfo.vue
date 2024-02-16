<template>
  <v-dialog
    max-width="450px"
    :modelValue="dialogState"
    @update:modelValue="closeDialog"
    width="auto"
  >
    <v-card>
      <v-card-text v-for="(info, index) in dialogData" :key="index">
        {{ info }}
        <v-divider
          :thickness="3"
          class="border-opacity-25"
          color="info"
        ></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="closeDialog">Закрыть</v-btn>
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
    dialogData: {
      type: Array,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
  name: "dialog-info",
};
</script>

<style></style>
