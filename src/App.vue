<template>
  <v-app>
    <v-main>
      <KanbanBoard />
    </v-main>
  </v-app>
</template>

<script>
import KanbanBoard from "@/pages/KanbanBoard.vue";
export default {
  name: "App",
  components: {
    KanbanBoard,
  },
};
</script>

<style>
@font-face {
  font-family: "Montserrat";
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("Montserrat"),
    url("../public/fonts/Montserrat/Montserrat.ttf") format("ttf");
}
* {
  font-family: Montserrat !important;
}
</style>
