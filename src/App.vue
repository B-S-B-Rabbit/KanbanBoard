<template>
  <v-app>
    <v-main>
      <v-container class="d-flex flex-row justify-space-between">
        <div
          v-for="i in 4"
          :key="statuses[i - 1]"
          class="d-flex flex-row tasks-list rounded ma-5"
          style="background-color: rgb(243, 243, 243); width: 364px"
        >
          <draggable
            :group="{ name: 'task-cards', pull: true, put: true }"
            class="list-group"
            :list="taskCardsJoint[statuses[i - 1]]"
            itemKey="id"
            @start="drag = true"
            @end="drag = false"
            @change="changeTaskStatus($event, statuses[i - 1])"
            :handle="'.drag-handle'"
          >
            <template #item="{ element }">
              <div
                class="list-group-item"
                :class="element.isEditing ? '' : 'drag-handle'"
              >
                <transition-group name="list">
                  <TaskCard
                    :key="element.id"
                    @cancelChanges="cancelChanges"
                    @setEditState="setTaskEditing"
                    @saveDescription="changeDescription"
                    @deleteTask="deleteTask"
                    @setExecutor="setTaskExecutor"
                    :taskCard="element"
                    :menuOptions="menuOptions"
                    :executors="executors"
                  />
                </transition-group>
              </div>
            </template>
            <template #header>
              <TaskHolderHead
                :taskType="holderNames[statuses[i - 1]]"
                :numberOfTasks="taskCardsJoint[statuses[i - 1]].length"
                :holderType="statuses[i - 1]"
                :limitTasks="limitTasks"
                @menuOptionClick="handleMenuOptionsClick"
              />
            </template>
            <template #footer>
              <div class="d-flex justify-center mt-4">
                <v-btn
                  @click="addNewTask(statuses[i - 1])"
                  append-icon="mdi-plus"
                  >Добавить задачу</v-btn
                >
              </div>
            </template>
          </draggable>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TaskCard from "@/components/TaskCard.vue";
import draggable from "vuedraggable";
import TaskHolderHead from "@/components/TaskHolderHead.vue";
const statuses = ["todo", "progress", "review", "completed"];
export default {
  name: "App",
  components: {
    TaskHolderHead,
    draggable,
    TaskCard,
  },
  data() {
    return {
      statuses: statuses,
      limitTasks: 0,
      holderNames: {
        [statuses[0]]: "К выполнению",
        [statuses[1]]: "В процессе",
        [statuses[2]]: "На ревью",
        [statuses[3]]: "Сделано",
      },
      taskCardsJoint: {
        [statuses[0]]: [
          {
            description: "Надо посddпать",
            isEditing: true,
            executor: null,
            id: 1,
            taskStatus: statuses[0],
          },
          {
            description: "Надо почиллить",
            isEditing: false,
            executor: null,
            taskStatus: statuses[0],
            id: 2,
          },
          {
            description: "Надо поесть",
            isEditing: false,
            executor: null,
            id: 3,
            taskStatus: statuses[0],
          },
        ],
        [statuses[1]]: [
          {
            description: "Надо поспать",
            isEditing: true,
            executor: null,
            id: 4,
            taskStatus: statuses[1],
          },
          {
            description: "Надо почиллить",
            isEditing: false,
            executor: null,
            taskStatus: statuses[1],
            id: 5,
          },
          {
            description: "Надо поесть",
            isEditing: false,
            executor: null,
            id: 6,
            taskStatus: statuses[1],
          },
        ],
        [statuses[2]]: [
          {
            description: "Надо поспать",
            isEditing: true,
            executor: null,
            id: 7,
            taskStatus: statuses[2],
          },
          {
            description: "Надо почиллить",
            isEditing: false,
            executor: null,
            taskStatus: statuses[2],
            id: 8,
          },
          {
            description: "Надо поесть",
            isEditing: false,
            executor: null,
            id: 9,
            taskStatus: statuses[2],
          },
        ],
        [statuses[3]]: [
          {
            description: "Надо поспать",
            isEditing: true,
            executor: null,
            id: 10,
            taskStatus: statuses[3],
          },
          {
            description: "Надо почиллить",
            isEditing: false,
            executor: null,
            taskStatus: statuses[3],
            id: 11,
          },
          {
            description: "Надо поесть",
            isEditing: false,
            executor: null,
            id: 12,
            taskStatus: statuses[3],
          },
        ],
      },
      executors: [
        { name: "Andrew", department: "Frontend", id: 1 },
        { name: "Billy", department: "Backend", id: 2 },
        { name: "Stesi", department: "Designer", id: 3 },
      ],
      currentTaskId: 0,
      menuOptions: [
        { title: "Удалить", action: "delete", icon: "mdi-delete" },
        { title: "Скопировать ключ", action: "copy", icon: "mdi-content-copy" },
      ],
      drag: false,
    };
  },
  checkMove: function () {
    return false;
  },
  methods: {
    handleMenuOptionsClick(action, holderType) {
      if (action === "rename") {
        const userResponse = prompt(
          "Введите новое название для данных типов задач"
        );
        if (userResponse) {
          this.holderNames[holderType] = userResponse;
        }
      } else if (action === "limit") {
        const userResponse = prompt(
          "Введите ограничение на максимальное количество задач(от 1 до 10)"
        );
        if (
          userResponse &&
          Number(userResponse) >= 1 &&
          Number(userResponse) <= 10
        ) {
          this.limitTasks = +userResponse;
        }
      }
    },
    changeTaskStatus(event, newStatus) {
      if (event.added) event.added.element.taskStatus = newStatus;
      this.updateLocalStorage();
    },
    setTaskEditing(status, id) {
      this.taskCardsJoint[status] = this.taskCardsJoint[status].map((task) => {
        if (task.id === id) {
          task.isEditing = true;
        }
        return task;
      });
      this.updateLocalStorage();
    },
    changeDescription(status, newValue, id) {
      this.taskCardsJoint[status] = this.taskCardsJoint[status].map((task) => {
        if (task.id === id) {
          task.description = newValue;
          task.isEditing = false;
        }
        return task;
      });
      this.updateLocalStorage();
    },
    cancelChanges(status, id) {
      this.taskCardsJoint[status] = this.taskCardsJoint[status].map((task) => {
        if (task.id === id) {
          task.isEditing = false;
        }
        return task;
      });
      this.updateLocalStorage();
    },
    addNewTask(status) {
      this.taskCardsJoint[status].push({
        description: "",
        isEditing: true,
        executor: null,
        taskStatus: status,
        id: this.currentTaskId,
      });
      this.increaseCurrentId();
      this.updateLocalStorage();
    },
    deleteTask(status, id) {
      this.taskCardsJoint[status] = this.taskCardsJoint[status].filter(
        (task) => task.id !== id
      );
      this.updateLocalStorage();
    },
    setTaskExecutor(status, executor, id) {
      this.taskCardsJoint[status] = this.taskCardsJoint[status].map((task) => {
        if (task.id === id) {
          task.executor = executor;
        }
        return task;
      });
      this.updateLocalStorage();
    },

    increaseCurrentId() {
      this.currentTaskId++;
    },
    updateLocalStorage() {
      localStorage.setItem(
        "taskJointCards",
        JSON.stringify(this.taskCardsJoint)
      );
      localStorage.setItem("executors", JSON.stringify(this.executors));
    },
  },
  mounted() {
    const storedTaskJointCards = localStorage.getItem("taskJointCards");
    const storedExecutors = localStorage.getItem("executors");
    console.log(storedExecutors);
    if (storedTaskJointCards && storedExecutors) {
      this.taskCardsJoint = JSON.parse(storedTaskJointCards);
      this.executors = JSON.parse(storedExecutors);
    }
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
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.list-move {
  transition: transform 0.4s ease;
}
.drag-handle {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
