<template>
  <div class="flex flex-center">
    <q-dialog v-model="recordModal">
      <q-card>
        <q-card-section class="q-pa-lg">
          <newAudioModal
            @saved="addRecord"
            @close="closeModal"
          ></newAudioModal>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="player"
      @close="closeModal"
      position="top"
      content-style="z-index: 3002"
    >
      <q-card
        style="border-radius: 0 0 33px 33px"
        flat
        bordered
      >
        <player
          key="player"
          class="q-ma-md"
          v-if="currentRecord && player"
          autoplay
          :src="currentRecord.url"

        />
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="edit"
      v-if="edit"
      persistent
    >
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

        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            flat
            label="Отмена"
            @click="closeModal"
          />
          <q-btn
            flat
            label="Сохранить"
            @click="saveNewNameRecord"
          />
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
          <q-avatar
            icon="delete"
            color="primary"
            text-color="white"
          />
          <span
            class="q-ml-sm"
          >Вы действительно хотите удалить аудиозапись ?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Да"
            color="primary"
            @click="deleteRecord"
          />
          <q-btn
            flat
            label="Нет"
            color="primary"
            @click="closeModal"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md table_wrap">
      <q-table
        title="Аудиозаписи"
        class="table"
        :data="records"
        :columns="columns"
        row-key="name"
        rows-per-page-label="Аудиозаписей на странице"
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
            <span
              class="text-h6"
              style=" color: gray"
            > Аудиозаписи </span>
            <q-btn
              @click="recordModal = !recordModal"
              padding="10px 20px"
              color="primary"
              push
            >Добавить аудиозапись
            </q-btn
            >
          </div>
        </template>
        <template v-slot:no-data>
          <div
            @click="recordModal = !recordModal"
            class="full-width row flex-center text-center  text-primary q-gutter-sm cursor-pointer"
          >
            <q-icon
              size="2em"
              name="sentiment_dissatisfied"
            />
            <span>
              Записей пока нет. Нажмите на эту надпись или на кнопку добавить
              аудиозапись чтобы загрузить или записать ролик
            </span>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              @click="playRecord($event, props.row)"
              key="name"
              :props="props"
              class="cursor-pointer"
            >
              <q-icon
                style="top: -2px"
                class="text-primary"
                size="md"
                name="play_arrow"
              />
              {{ props.row.name }}
            </q-td>
            <q-td
              key="status"
              :props="props"
            >
              {{ props.row.status }}
            </q-td>
            <q-td
              key="duration"
              :props="props"
            >
              {{ props.row.duration }}
            </q-td>

            <q-td
              key="edit"
              auto-width
              class="text-primary cursor-pointer"
              :props="props"
            >
              <q-icon
                style="top: -2px"
                @click="
                  () => {
                    newName = props.row.name;
                    currentRecord = props.row;
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
                  currentRecord = props.row;
                  isDeleteModalVisible = true;
                }
              "
              style="top: -2px"
              auto-width
              class="text-primary cursor-pointer"
              :props="props"
            >
              <q-icon
                size="xs"
                name="delete"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
  import newAudioModal from './newAudioModal';
  import player from '../components/Player/player';

  export default {
    name: 'Audios',
    components: { newAudioModal, player },

    data: () => {
      return {
        player: false,
        edit: false,
        isDeleteModalVisible: false,
        newName: '',
        recordModal: false,
        model: null,
        currentRecord: undefined,
        records: [
          // {
          //   name : "12312312312",
          //   duration: "4:04",
          //   status: "Неизвестен"
          // }
        ],

        initialPagination: {
          sortBy: 'name',
          descending: false,
          rowsPerPage: 10,
          bottomIitem: 'false',
        },

        columns: [
          {
            name: 'name',
            required: true,
            label: 'Наименование',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            style: 'min-width: 150px; white-space: normal',
            sortable: true,
          },
          {
            name: 'status',
            required: true,
            label: 'Статус модерации',
            align: 'left',
            sortable: true,
          },
          {
            name: 'duration',
            label: 'Длительность',
            field: 'duration',
            sortable: true,
            sort: (a, b) => {
              a = a.split(':');
              b = b.split(':');
              if (a[0] !== b[0]) return parseInt(a[0], 10) - parseInt(b[0], 10);
              else return parseInt(a[1], 10) - parseInt(b[1], 10);
            },
          },

          {
            name: 'edit',
            required: true,
            label: '',
            align: 'left',
          },
          {
            name: 'delete',
            required: true,
            label: '',
            align: 'left',
          },
        ],
      };
    },

    methods: {
      addRecord(record) {
        const context = this;
        this.$store.dispatch('audios/addAudio', record)
          .then(() => context.updateData())
          .catch((err) => this.$logger('Ошибка добавления аудиозаписи - запись не была сохранена.'+ err));
      },

      updateData() {
        this.records = this.$store.state.audios.audios;
        this.closeModal();
      },

      playRecord(event, record) {
        this.currentRecord = record;
        this.player = true;
      },

      deleteRecord() {
        const context = this;
        this.$store.dispatch('audios/deleteAudio', this.currentRecord)
          .then(() => context.updateData())
          .catch((err) => this.$logger('Ошибка удаления аудиозаписи - запись не была удалена.'+ err));
      },

      closeModal() {
        this.recordModal = false;
        this.isDeleteModalVisible = false;
        this.edit = false;
        this.player = false;
        this.currentRecord = undefined;
        this.newName = undefined;
      },
      saveNewNameRecord() {
        const context = this;
        this.currentRecord.name = this.newName;

        this.$store.dispatch('audios/editAudio', this.currentRecord)
          .then(() => context.updateData())
          .catch((err) => this.$logger('Ошибка обновления аудиозаписи - запись не была изменена.'+ err));
      },
    },

    created() {
      const context = this;
      this.$store.dispatch('audios/fetchAudio')
        .then(() => context.updateData())
        .catch((err) => this.$logger('Ошибка обновления списка аудиозаписей. '+ err));
    },
  };
</script>

<style
  lang="scss"
  scoped
>
  .table_wrap {
    width: fit-content;
  }

  .table {
    width: 100%;
  }
</style>
