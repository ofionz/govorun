<template>
  <div class="flex flex-center">
    <q-dialog
      v-model="player"
      @close="currentRecord = undefined"
      position="top"
      content-style="z-index: 3002"
    >
      <q-card style="border-radius: 0 0 33px 33px" flat bordered>
        <player
          key="player"
          class="q-ma-md"
          v-if="currentRecord && player"

          autoplay
          :src="currentRecord.url"
        />
      </q-card>
    </q-dialog>
    <div class="q-pa-md table_wrap">
      <q-table
        title="Произведенные звонки"
        class="table"
        :data="calls"
        :columns="columns"
        row-key="name"
        rows-per-page-label="Звонков на странице"
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
            <span class="text-h6" style=" color: gray"> Произведенные звонки  </span>

          </div>
        </template>
        <template v-slot:no-data>
          <div
            class="full-width row flex-center text-center  text-primary q-gutter-sm"
          >
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>
              Звонков пока нет.
            </span>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              @click="playRecord($event, props.row.record)"
              key="phone"
              :props="props"
              class="cursor-pointer"
            >
              <q-icon
                v-if=" props.row.record"
                style="top: -2px; left: -6px"
                class="text-primary "
                size="sm"
                name="play_arrow"
              />
              <q-icon
                v-else

                class="text-primary q-mr-sm"
                size="xs"

              />
              {{ props.row.phone }}
              <img
                :src="props.row.img"
                alt=""
              >
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.status }}
            </q-td>
            <q-td key="time" :props="props">
              {{ props.row.time }}
            </q-td>
            <q-td key="duration" :props="props">
              {{ props.row.duration }}
            </q-td>
            <q-td key="cost" :props="props">
              {{ props.row.cost }}
            </q-td>


          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
  import player from "../components/Player/player";
  export default {
    name: "Calls",
    components: {  player },

    data: () => {
      return {
        player: false,
        currentRecord: undefined,
        calls: [
          // {
          //   name : "12312312312",
          //   duration: "4:04",
          //   status: "Неизвестен"
          // }
        ],

        initialPagination: {
          sortBy: "phone",
          descending: false,
          rowsPerPage: 10,
          bottomIitem: "false"
        },

        columns: [
          {
            name: "phone",
            required: true,
            label: "Номер телефона",
            align: "left",
            field: row => row.phone,
            format: val => `${val}`,
            style: "min-width: 150px; white-space: normal",
            sortable: true
          },
          {
            name: "status",
            required: true,
            label: "Статус",
            align: "left",
          },
          {
            name: "time",
            required: true,
            label: "Время",
            align: "left",
          },
          {
            name: "duration",
            label: "Длительность",
            field: "duration",
            sortable: true,
            sort: (a, b) => {
              a = a.split(":");
              b = b.split(":");
              if (a[0] !== b[0]) return parseInt(a[0], 10) - parseInt(b[0], 10);
              else return parseInt(a[1], 10) - parseInt(b[1], 10);
            }
          },
          {
            name: "cost",
            label: "Стоимость",
            field: "cost",
            sortable: true,

          },

        ]
      };
    },
    methods: {

      playRecord(event, record) {
        if (!record) return;
        this.currentRecord = record;
        this.player = true;
      },

      closeModal() {
        this.player = false;
        this.currentRecord = undefined;
      },

      updateData () {
        this.calls = this.$store.state.calls.calls;
        this.closeModal()
      }

    },
    created() {
      const context = this;
      this.$store.dispatch('calls/fetchCalls')
        .then(() => context.updateData())
        .catch((err) => this.$logger('Ошибка обновления списка звонков. '+ err));
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
