<template>
  <div>
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="d-flex flex-column rounded mt-5 task-card"
        v-bind="props"
        :class="{ 'on-hover': isHovering }"
        :elevation="isHovering ? 16 : 2"
      >
        <div class="d-flex justify-space-between">
          <TaskDescription
            :task="taskCard"
            :btnColor="isHovering ? 'blue' : 'transparent'"
            @setTaskEditing="setEditState"
            @cancelChanges="cancelChanges"
            @saveDescription="saveDescription"
          />
          <div class="d-inline-flex">
            <MenuToolbar
              :btnColor="isHovering ? 'blue' : 'transparent'"
              :menuOptions="menuOptions"
              :menuIconName="'mdi-dots-horizontal'"
              :elem="taskCard"
              @menuOptionClick="handleMenuOptionClick"
            />
          </div>
        </div>
        <div class="d-flex justify-space-between mt-2">
          <TaskKeyButton
            :task="taskCard"
            @click="manageDialog('showDialogInfo', true)"
          />
          <dialog-info
            :dialogState="showDialogInfo"
            :dialogData="[
              `Ключ задачи: ${taskCard.id}`,
              `Описание: ${taskCard.description}`,
              `Исполнитель: ${
                taskCard.executor ? taskCard.executor.name : 'Нет исполнителя'
              }`,
              `Статус задачи: ${taskCard.taskStatus}`,
            ]"
            @closeDialog="manageDialog('showDialogInfo', false)"
          />
          <dialog-confirm
            :action="`Задача №${taskCard.id}`"
            :confirmText="confirmDeleteTaskText"
            :dialogState="showDialogConfirm"
            @confirmAction="manageTaskDeleteConfirmation(true)"
            @cancelAction="manageTaskDeleteConfirmation(false)"
          />
          <MenuSelect
            :options="executors"
            :rootType="'icon'"
            :menuIconName="'mdi-account-circle'"
            :selectedValue="taskCard.executor"
            @updateSelection="setExecutor"
          />
        </div>
      </v-card>
    </v-hover>
  </div>
</template>
<script>
import TaskDescription from "@/components/TaskDescription.vue";
import MenuToolbar from "@/components/MenuToolbar.vue";
import MenuSelect from "@/components/MenuSelect.vue";
import TaskKeyButton from "@/components/TaskKeyButton.vue";
export default {
  props: {
    taskCard: {
      type: Object,
      required: true,
    },
    menuOptions: {
      type: Array,
      requierd: true,
    },
    executors: {
      type: Array,
      required: true,
    },
  },
  components: {
    TaskDescription,
    MenuToolbar,
    MenuSelect,
    TaskKeyButton,
  },
  data() {
    return {
      showDialogInfo: false,
      showDialogConfirm: false,
      confirmDeleteTaskText:
        "Вы действительно хотите безвозвратно удалить данную задачу?",
      confirmedDelete: { made: false, status: false },
    };
  },
  emits: [
    "setEditState",
    "saveDescription",
    "cancelChanges",
    "deleteTask",
    "setExecutor",
  ],
  methods: {
    setEditState(id) {
      this.$emit("setEditState", this.taskCard.taskStatus, id);
    },
    saveDescription(taskValue, id) {
      this.$emit("saveDescription", this.taskCard.taskStatus, taskValue, id);
    },
    cancelChanges(id) {
      this.$emit("cancelChanges", this.taskCard.taskStatus, id);
    },
    deleteTask(id) {
      this.$emit("deleteTask", this.taskCard.taskStatus, id);
    },
    async copyToClipboard() {
      try {
        const textToCopy = `Task-${this.taskCard.id}`;
        await navigator.clipboard.writeText(textToCopy);
        alert(`Текст скопирован в буфер обмена: ${textToCopy}`);
      } catch (err) {
        alert(`Ошибка при копировании текста: ${err}`);
      }
    },

    handleMenuOptionClick(action) {
      if (action === "delete") {
        this.manageDialog("showDialogConfirm", true);
      } else if (action === "copy") {
        this.copyToClipboard();
      }
    },
    setExecutor(event) {
      this.$emit(
        "setExecutor",
        this.taskCard.taskStatus,
        event,
        this.taskCard.id
      );
    },
    manageDialog(name, status) {
      this[name] = status;
    },
    async manageTaskDeleteConfirmation(status) {
      this.confirmedDelete.made = true;
      this.confirmedDelete.status = status;
      this.manageDialog("showDialogConfirm", false);
      if (this.confirmedDelete.status) {
        this.confirmedDelete.made = false;
        this.confirmedDelete.status = false;
        this.deleteTask(this.taskCard.id);
      }
    },
  },
};
</script>
<style scoped>
.task-card {
  background-color: rgb(252, 252, 252);
  width: 364px;
}
.task-card.on-hover {
  background-color: rgb(224, 241, 255);
}
</style>
