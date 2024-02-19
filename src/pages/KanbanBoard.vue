<template>
  <v-container min-width="264px" class="d-flex flex-row justify-center">
    <div
      v-for="status in statuses"
      :key="status"
      class="d-flex flex-row tasks-list rounded ma-5"
    >
      <draggable
        class="list-group"
        :group="{ name: 'task-cards', pull: true, put: true }"
        :list="taskCardsJoint[status]"
        itemKey="id"
        :handle="'.drag-handle'"
        @change="changeTaskStatus($event, status)"
      >
        <template #item="{ element }">
          <div
            class="list-group-item"
            :class="element.isEditing ? '' : 'drag-handle'"
          >
            <transition-group name="list">
              <TaskCard
                :key="element.id"
                :taskCard="element"
                :menuOptions="menuOptions"
                :executors="executors"
                @cancelChanges="cancelChanges"
                @setEditState="setTaskEditing"
                @saveDescription="changeDescription"
                @deleteTask="deleteTask"
                @setExecutor="setTaskExecutor"
              />
            </transition-group>
          </div>
        </template>
        <template #header>
          <TaskHolderHead
            :taskType="holderNames[status]"
            :numberOfTasks="taskCardsJoint[status].length"
            :holderType="status"
            :limitTasks="limitTasks[status]"
            @menuOptionClick="handleMenuOptionsClick"
          />
        </template>
        <template #footer>
          <div class="d-flex justify-center mt-4">
            <v-btn @click="addNewTask(status)" append-icon="mdi-plus"
              >Добавить задачу</v-btn
            >
          </div>
        </template>
      </draggable>
    </div>
  </v-container>
</template>

<script>
import TaskCard from "@/components/TaskCard.vue";
import draggable from "vuedraggable";
import TaskHolderHead from "@/components/TaskHolderHead.vue";
const statuses = ["todo", "progress", "review", "completed"];
export default {
  name: "kanban-page",
  components: {
    TaskHolderHead,
    draggable,
    TaskCard,
  },
  data() {
    return {
      statuses: statuses,
      limitTasks: {
        [statuses[0]]: 0,
        [statuses[1]]: 0,
        [statuses[2]]: 0,
        [statuses[3]]: 0,
      },
      holderNames: {
        [statuses[0]]: "К выполнению",
        [statuses[1]]: "В процессе",
        [statuses[2]]: "На ревью",
        [statuses[3]]: "Сделано",
      },
      taskCardsJoint: {
        [statuses[0]]: [],
        [statuses[1]]: [],
        [statuses[2]]: [],
        [statuses[3]]: [],
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
          this.limitTasks[holderType] = +userResponse;
        }
      }
      this.updateLocalStorage();
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
      localStorage.setItem("holderNames", JSON.stringify(this.holderNames));
      localStorage.setItem("limitTasks", JSON.stringify(this.limitTasks));
      localStorage.setItem("currentTaskId", JSON.stringify(this.currentTaskId));
    },
  },
  mounted() {
    const storedTaskJointCards = localStorage.getItem("taskJointCards");
    const storedExecutors = localStorage.getItem("executors");
    const storedHolderNames = localStorage.getItem("holderNames");
    const storedLimitTasks = localStorage.getItem("limitTasks");
    const storedCurrentTaskId = localStorage.getItem("currentTaskId");
    if (
      storedTaskJointCards &&
      storedExecutors &&
      storedHolderNames &&
      storedLimitTasks &&
      storedCurrentTaskId
    ) {
      this.taskCardsJoint = JSON.parse(storedTaskJointCards);
      this.executors = JSON.parse(storedExecutors);
      this.holderNames = JSON.parse(storedHolderNames);
      this.limitTasks = JSON.parse(storedLimitTasks);
      this.currentTaskId = JSON.parse(storedCurrentTaskId);
    }
  },
};
</script>

<style scoped>
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

.tasks-list {
  background-color: rgb(243, 243, 243);
  width: 264px;
}
.list-group {
  width: 100%;
}
</style>
