<template>
  <v-app>
    <v-main>
      <v-container class="d-flex flex-row justify-space-between">
        <!-- <TasksHolderVue
          :taskCards="taskCardsList[0].taskCards"
          :status="taskCardsList[0].tasksStatus"
          :executors="executors"
          :newTaskId="currentTaskId"
          @setTaskEditing="setTaskEditing"
          @changeDescription="changeDescription"
          @cancelChanges="cancelChanges"
          @addNewTask="addNewTask"
          @deleteTask="deleteTask"
          @setTaskExecutor="setTaskExecutor"
        /> -->
        <TasksHolderVue
          :newTaskId="currentTaskId"
          :executors="executors"
          :status="'Todo'"
          @increaseCurrentId="increaseCurrentId"
        />
        <TasksHolderVue
          :newTaskId="currentTaskId"
          :executors="executors"
          :status="'In progress'"
          @increaseCurrentId="increaseCurrentId"
        />
        <TasksHolderVue
          :newTaskId="currentTaskId"
          :executors="executors"
          :status="'In review'"
          @increaseCurrentId="increaseCurrentId"
        />
        <TasksHolderVue
          :newTaskId="currentTaskId"
          :executors="executors"
          :status="'Complete'"
          @increaseCurrentId="increaseCurrentId"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TasksHolderVue from "@/components/TasksHolder.vue";
export default {
  name: "App",
  components: {
    TasksHolderVue,
  },
  data() {
    return {
      // taskCardsList: [
      //   {
      //     tasksStatus: "",
      //     taskCards: [
      //       {
      //         description: "Еда",
      //         isEditing: false,
      //         executor: null,
      //         id: 0,
      //         taskStatus: "",
      //       },
      //     ],
      //   },
      // ],
      executors: [
        { name: "Andrew", department: "Frontend", id: 1 },
        { name: "Billy", department: "Backend", id: 2 },
        { name: "Stesi", department: "Designer", id: 3 },
      ],
      currentTaskId: 0,
    };
  },
  methods: {
    // setTaskEditing(id, status) {
    //   this.taskCardsList = this.taskCardsList.map((tasks) => {
    //     if (tasks.tasksStatus === status) {
    //       tasks.taskCards = tasks.taskCards.map((task) => {
    //         if (task.id === id) {
    //           task.isEditing = true;
    //         }
    //         return task;
    //       });
    //       return tasks;
    //     }
    //   });
    // },
    // changeDescription(newValue, id, status) {
    //   this.taskCardsList = this.taskCardsList.map((tasks) => {
    //     if (tasks.tasksStatus === status) {
    //       tasks.taskCards = tasks.taskCards.map((task) => {
    //         if (task.id === id) {
    //           task.description = newValue;
    //           task.isEditing = false;
    //         }
    //         return task;
    //       });
    //       return tasks;
    //     }
    //   });
    // },
    // cancelChanges(id, status) {
    //   this.taskCardsList = this.taskCardsList.map((tasks) => {
    //     if (tasks.tasksStatus === status) {
    //       tasks.taskCards = tasks.taskCards.map((task) => {
    //         if (task.id === id) {
    //           task.isEditing = false;
    //         }
    //         return task;
    //       });
    //       return tasks;
    //     }
    //   });
    // },
    // addNewTask(status) {
    //   this.taskCardsList = this.taskCardsList.map((tasks) => {
    //     if (tasks.tasksStatus === status) {
    //       tasks.taskCards.push({
    //         description: "",
    //         isEditing: true,
    //         executor: null,
    //         id: this.currentTaskId,
    //         taskStatus: "status",
    //       });
    //       return tasks;
    //     }
    //   });
    //   this.increaseCurrentId();
    // },
    // deleteTask(id, status) {
    //   this.taskCardsList = this.taskCardsList.map((tasks) => {
    //     if (tasks.tasksStatus === status) {
    //       tasks.taskCards = tasks.taskCards.filter((task) => task.id !== id);
    //       return tasks;
    //     }
    //   });
    // },
    increaseCurrentId() {
      this.currentTaskId++;
    },
    // setTaskExecutor(executor, id, status) {
    //   this.taskCardsList = this.taskCardsList.map((tasks) => {
    //     if (tasks.tasksStatus === status) {
    //       tasks.taskCards = tasks.taskCards.map((task) => {
    //         if (task.id === id) {
    //           task.executor = executor;
    //         }
    //         return task;
    //       });
    //       return tasks;
    //     }
    //   });
    // },
  },
  // mounted() {
  //   const storedTaskCards = localStorage.getItem("taskCards");
  //   const storedExecutors = localStorage.getItem("executors");
  //   console.log(storedTaskCards);
  //   localStorage.setItem("taskCards", JSON.stringify(this.taskCards));
  //   localStorage.setItem("executors", JSON.stringify(this.executors));
  //   if (storedTaskCards && storedExecutors) {
  //     this.taskCards = JSON.parse(storedTaskCards);
  //     this.executors = JSON.parse(storedExecutors);
  //   }
  //   console.log(this.taskCards);
  // },
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
