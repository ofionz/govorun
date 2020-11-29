<template>
  <div class="flex flex-center">
    <q-dialog v-model="newTaskModal">
      <newTaskModal
        :editedTask="currentTask"
        @saved="addTask"
        @close="newTaskModal = false"
      ></newTaskModal>
    </q-dialog>

    <q-dialog
      v-model="isDeleteModalVisible"
      v-if="isDeleteModalVisible"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >Вы действительно хотите удалить рассылку ?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Да" color="primary" @click="deleteTask()" />
          <q-btn flat label="Нет" color="primary" @click="closeModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md table_wrap">
      <q-table
        title="Рассылки"
        class="table"
        :data="tasks"
        :columns="columns"
        row-key="name"
        rows-per-page-label="Рассылок на странице"
        :rows-per-page-options="[10, 20, 50]"
        :pagination-label="
          (firstRowIndex, endRowIndex, totalRowsNumber) =>
            `с ${firstRowIndex} по ${endRowIndex} из ${totalRowsNumber}`
        "
        :pagination="initialPagination"
      >
        <template v-slot:top>
          <div
            style=" width: 100%; justify-content: space-between; align-items: center"
            class="flex"
          >
            <span class="text-h6" style=" color: gray"> Рассылки </span>
            <q-btn
              @click="newTaskModal = !newTaskModal"
              padding="10px 20px"
              color="primary"
              push
              >Добавить рассылку</q-btn
            >
          </div>
        </template>
        <template v-slot:no-data>
          <div
            @click="newTaskModal = !newTaskModal"
            class="full-width row flex-center text-center  text-primary q-gutter-sm"
          >
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span class="cursor-pointer">
              Записей пока нет. Нажмите на эту надпись или на кнопку добавить
              рассылку чтобы создать новое.
            </span>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.other.name }}
            </q-td>
            <q-td key="phones" :props="props">
              {{ props.row.phones.length }}
            </q-td>

            <q-td
              key="edit"
              auto-width
              class="text-primary cursor-pointer"
              :props="props"
            >
              <q-icon
                style="top: -2px"
                @click="editTask(props.row)"
                size="xs"
                name="create"
              />
            </q-td>
            <q-td
              key="delete"
              @click="
                () => {
                  currentTask = props.row;
                  isDeleteModalVisible = true;
                }
              "
              style="top: -2px"
              auto-width
              class="text-primary cursor-pointer"
              :props="props"
            >
              <q-icon size="xs" name="delete" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import newTaskModal from "./newTaskModal";

export default {
  name: "Main",
  components: { newTaskModal },
  async created() {
    const context = this;
    await this.$store
      .dispatch("tasks/fetchTasks")
      .then(() => context.updateData())
      .catch(err => this.$logger("Ошибка обновления списка рассылок. " + err));
  },

  data: () => {
    return {
      isDeleteModalVisible: false,
      newTaskModal: false,
      newName: "",
      currentTask: undefined,
      tasks: [
        {
          phones: [],
          other: { name: "" }
        }
      ],

      initialPagination: {
        sortBy: "name",
        descending: false,
        rowsPerPage: 10,
        bottomIitem: "false"
      },

      columns: [
        {
          name: "name",
          required: true,
          label: "Наименование",
          align: "left",
          field: row => row.other.name,
          format: val => `${val}`,
          style: "min-width: 150px; white-space: normal",
          sortable: true
        },
        {
          name: "phones",
          required: true,
          label: "Номеров в базе обзвона",
          align: "center"
        },
        {
          name: "edit",
          required: true,
          label: "",
          align: "right"
        },
        {
          name: "delete",
          required: true,
          label: "",
          align: "right"
        }
      ]
    };
  },
  methods: {
    updateData() {
      this.tasks = this.$store.state.tasks.tasks;
      this.currentTask = undefined;
      this.newTaskModal = false;
    },
    editTask(task) {
      this.currentTask = task;
      this.newTaskModal = true;
    },
    addTask(newTask) {
      if (this.currentTask) this.updateCurrentTask(newTask);
      else {
        const context = this;
        this.$store
          .dispatch("tasks/addTask", newTask)
          .then(() => context.updateData())
          .catch(err =>
            this.$logger(
              "Ошибка добавления задачи - запись не была сохранена." + err
            )
          );
      }
    },

    updateCurrentTask(newTask) {
      const context = this;
      this.$store
        .dispatch("tasks/editTask", newTask)
        .then(() => context.updateData())
        .catch(err =>
          this.$logger(
            "Ошибка изменения задачи - запись не была сохранена." + err
          )
        );
    },

    deleteTask() {
      const indx = this.tasks.findIndex(e => e.id === this.currentTask.id);
      this.tasks.splice(indx, 1);
      this.closeModal();
    },
    closeModal() {
      this.isDeleteModalVisible = false;
      this.edit = false;
      this.player = false;
      this.currentTask = undefined;
      this.newName = undefined;
    }
  }
};
</script>

<style lang="scss" scoped>
.table_wrap {
  width: fit-content;
}
.table {
  width: 100%;
}
</style>
