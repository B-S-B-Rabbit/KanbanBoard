import { createStore } from "vuex";

export default createStore({
  state: {
    taskCards: [
      { description: "Надо поспать", isEditing: true, id: 1 },
      { description: "Надо почиллить", isEditing: false, id: 2 },
      { description: "Надо поесть", isEditing: false, id: 3 },
    ],
  },
  getters: {},
  mutations: {
    setTaskDescription(id) {
      console.log("working on this shit" + id);
      this.taskCards = this.taskCards.map((item) => {
        if (item.id === id) {
          item.isEditing = true;
          return item;
        } else {
          return item;
        }
      });
    },
    changeDescription(newValue, id) {
      console.log(newValue + id);
      this.taskCards = this.taskCards.map((item) => {
        if (item.id === id) {
          item.description = newValue;
          item.isEditing = false;
          return item;
        } else {
          return item;
        }
      });
    },
    cancelChanges(id) {
      this.taskCards = this.taskCards.map((item) => {
        if (item.id === id) {
          item.isEditing = false;
          return item;
        } else {
          return item;
        }
      });
    },
  },
  actions: {},
  modules: {},
});
