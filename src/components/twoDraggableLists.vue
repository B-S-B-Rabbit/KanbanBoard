<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <div v-for="i in 2" :key="i">
        <draggable
          class="list-group d-flex direction-row"
          :list="i === 1 ? list1 : list2"
          group="people"
          itemKey="name"
        >
          <template #item="{ element, index }">
            <div class="list-group-item mt-15">
              {{ element.name }} ----{{ index }}++++
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "two-lists",
  display: "Two Lists",
  components: {
    draggable,
  },
  data() {
    return {
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 },
      ],
      list2: [
        { name: "bibi", id: 5 },
        { name: "bobo", id: 6 },
        { name: "baba", id: 7 },
      ],
    };
  },
};
</script>
