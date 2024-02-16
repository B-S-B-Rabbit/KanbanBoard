<template>
  <div
    class="tasks-list rounded ma-5"
    style="background-color: rgb(243, 243, 243); width: 364px"
  >
    <TaskHolderHead :taskType="'Заглушка'" :numberOfTasks="2" />
    <!-- <transition-group name="list">
          <TaskCard
            v-for="task in taskCards"
            :key="task.id"
            @cancelChanges="cancelChanges"
            @setEditState="setTaskEditing"
            @saveDescription="changeDescription"
            @deleteTask="deleteTask"
            @setExecutor="setTaskExecutor"
            :taskCard="task"
            :menuOptions="menuOptions"
            :executors="executors"
          />
        </transition-group> -->
    <draggable
      class="list-group"
      :list="taskCards"
      item-key="id"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <div class="list-group-item">
          <transition-group name="list">
            <TaskCard
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
    </draggable>
    <div class="d-flex justify-center mt-4">
      <v-btn @click="addNewTask" append-icon="mdi-plus">Добавить задачу</v-btn>
    </div>
  </div>
</template>

<script>
import TaskCard from "@/components/TaskCard.vue";
import draggable from "vuedraggable";
import TaskHolderHead from "./TaskHolderHead.vue";
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    executors: {
      type: Array,
      required: true,
    },
    newTaskId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      taskCards: [
        {
          description: "Надо поспать",
          isEditing: true,
          executor: null,
          id: 1,
          taskStatus: this.status,
        },
        {
          description: "Надо почиллить",
          isEditing: false,
          executor: null,
          taskStatus: this.status,
          id: 2,
        },
        {
          description: "Надо поесть",
          isEditing: false,
          executor: null,
          id: 3,
          taskStatus: this.status,
        },
      ],
      menuOptions: [
        { title: "Удалить", action: "delete", icon: "mdi-delete" },
        { title: "Скопировать ключ", action: "copy", icon: "mdi-content-copy" },
      ],
      drag: false,
    };
  },
  components: {
    TaskCard,
    TaskHolderHead,
    draggable,
  },
  methods: {
    setTaskEditing(id) {
      this.taskCards = this.taskCards.map((task) => {
        if (task.id === id) {
          task.isEditing = true;
        }
        return task;
      });
    },
    changeDescription(newValue, id) {
      this.taskCards = this.taskCards.map((task) => {
        if (task.id === id) {
          task.description = newValue;
          task.isEditing = false;
        }
        return task;
      });
    },
    cancelChanges(id) {
      this.taskCards = this.taskCards.map((task) => {
        if (task.id === id) {
          task.isEditing = false;
        }
        return task;
      });
    },
    addNewTask() {
      this.taskCards.push({
        description: "",
        isEditing: true,
        executor: null,
        id: this.newTaskId,
      });
      this.increaseCurrentId();
    },
    deleteTask(id) {
      this.taskCards = this.taskCards.filter((task) => task.id !== id);
    },
    increaseCurrentId() {
      this.$emit("increaseCurrentId");
    },
    setTaskExecutor(executor, id) {
      this.taskCards = this.taskCards.map((task) => {
        if (task.id === id) {
          task.executor = executor;
        }
        return task;
      });
    },
  },
};
</script>

<style>
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
.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
