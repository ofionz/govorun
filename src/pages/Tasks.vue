<template>
  <div class="flex flex-center">
    <q-dialog v-model="newTaskModal">
      <q-card>
        <q-card-section class="q-pa-none">
          <newTaskModal
            @saved="addTask"
            @close="newTaskModal = false"
          ></newTaskModal>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edit" v-if="edit" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Введите новое название</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="newName"
            autofocus
            @keyup.enter="edit = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Отмена" @click="closeModal" />
          <q-btn flat label="Сохранить" @click="saveNeqNameRecord" />
        </q-card-actions>
      </q-card>
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
            >Вы действительно хотите удалить задание ?</span
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
        title="Задания"
        class="table"
        :data="tasks"
        :columns="columns"
        row-key="name"
        rows-per-page-label="Заданий на странице"
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
            <span class="text-h6" style=" color: gray"> Задания </span>
            <q-btn
              @click="newTaskModal = !newTaskModal"
              padding="10px 20px"
              color="primary"
              push
              >Добавить задание</q-btn
            >
          </div>
        </template>
        <template v-slot:no-data>
          <div
            @click="newTaskModal = !newTaskModal"
            class="full-width row flex-center text-center  text-primary q-gutter-sm"
          >
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>
              Записей пока нет. Нажмите на эту надпись или на кнопку добавить
              задание чтобы создать новое.
            </span>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              @click="playRecord($event, props.row)"
              key="name"
              :props="props"
            >
              {{ props.row.name }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
            </q-td>
            <q-td key="duration" :props="props">
              {{ props.row.duration }}
            </q-td>

            <q-td key="edit" auto-width class="text-primary" :props="props">
              <q-icon
                style="top: -2px"
                @click="
                  () => {
                    newName = props.row.name;
                    currentTask = props.row;
                    edit = true;
                  }
                "
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
              class="text-primary"
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
  import newTaskModal from './newTaskModal';

export default {
  name: "Main",
  components: {  newTaskModal },

  data: () => {
    return {
      edit: false,
      isDeleteModalVisible: false,
      newTaskModal: false,
      newName: "",
      currentTask: undefined,
      tasks: [
        {
          name : "задание 1",
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
          field: row => row.name,
          format: val => `${val}`,
          style: "min-width: 150px; white-space: normal",
          sortable: true
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
    addTask(newTask) {
      this.tasks.push(newTask);
    },
    deleteTask() {
      const indx = this.tasks.findIndex(
        e => e.name === this.currentTask.name
      );
      this.tasks.splice(indx, 1);
      this.closeModal();
    },
    closeModal() {
      this.isDeleteModalVisible = false;
      this.edit = false;
      this.player = false;
      this.currentTask = undefined;
      this.newName = undefined;
    },
    saveNeqNameRecord() {
      const record = this.tasks.find(e => e.name === this.currentTask.name);
      this.edit = false;
      record.name = this.newName;
      this.closeModal();
    }
  },
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
