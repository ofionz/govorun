<template>
  <div class="text-center" :class="$style.wrap">

    <div v-if="isRootNode">
      <span :class="$style.option__info">Выберите  действия которые будут выполнены</span>
      <q-select
        v-model="events.eventFailure.state"
        :options="events.eventFailure.options"
        :label="events.eventFailure.label"
      />
      <q-select
        v-model="events.eventDropped.state"
        :options="events.eventDropped.options"
        :label="events.eventDropped.label"
      />
      <q-select
        v-model="events.eventAccepted.state"
        :options="events.eventAccepted.options"
        :label="events.eventAccepted.label"
      />
    </div>
    <div v-else>
      <div v-if="mode === 'number'">
        <span :class="$style.option__info">Выберите нажатие клавиши</span>
        <div :class="$style.keyboard">
          <q-btn
            v-for="(num, index) in nums"
            @click="selectedNum = num"
            :key="index"
            :class="[
              selectedNum === num ? $style.keyboard__choosen : '',
              $style.keyboard__num
            ]"
          >
            {{ num }}
          </q-btn>
        </div>
        <span     v-if="selectedNum" :class="$style.option__info">Выберите  действия которые будут выполнены</span>
        <q-select
          v-if="selectedNum"
          class="q-mt-md"
          v-model="events.eventAccepted.state"
          :options="events.eventAccepted.options"
          :label="events.eventAccepted.label"
        />
      </div>
      <div v-else>
        <span :class="$style.option__info">Введите ключевые слова</span>
        <q-input v-model="words" filled type="textarea" />
        <span     v-if="words" :class="$style.option__info">Выберите  действия которые будут выполнены</span>
        <q-select
          v-if="words"
          class="q-mt-md"
          v-model="events.eventAccepted.state"
          :options="events.eventAccepted.options"
          :label="events.eventAccepted.label"
        />
      </div>
    </div>
    <div class="q-mt-lg">
      <q-btn
        @click="saveEvent"
        push
        color="primary"
        label="Сохранить"
        padding="8px"
      />
      <q-btn
        v-close-popup
        flat
        color="primary"
        push
        label="Отмена"
        class="q-ml-sm"
        padding="8px"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "newEvent",
  props: {
    node: {
      type: Object
    },
    mode: {
      type: String
    }
  },
  data: () => {
    return {
      events: {
        eventFailure: {
          label: "Если трубку не взяли то:",
          state: null,
          options: [
            "Действие 11",
            "Действие 12",
            "Действие 13",
            "Действие 14",
            "Действие 15"
          ]
        },
        eventDropped: {
          label: "Если звонок сбросили после начала, то:",
          state: null,
          options: [
            "Действие 21",
            "Действие 22",
            "Действие 23",
            "Действие 24",
            "Действие 25"
          ]
        },
        eventAccepted: {
          label: "Звонок принят:",
          state: null,
          options: [
            "Действие 31",
            "Действие 32",
            "Действие 33",
            "Действие 34",
            "Действие 35"
          ]
        }
      },
      nums: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"],
      words: "",
      isRootNode: false,
      selectedNum: ""
    };
  },
  created() {
    this.isRootNode = this.node.id === "0";

    if (this.node.events) {
      for (const event in this.node.events) {
        this.events[event].state = this.node.events[event];
      }
    }
     this.words = this.node.words;
     this.selectedNum = this.node.selectedNum;
  },
  methods: {
    saveEvent() {
      const eventData = {
        events: this.events,
        words: this.words,
        selectedNum: this.selectedNum
      }

      this.$emit("saved", eventData);
    }
  }
};
</script>

<style lang="scss" module>
.wrap {
  width: 100%;
  height: 100%;
  background: white;
  padding: 24px;
}
.keyboard {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 76px 76px 76px;
  gap: 5px;
  justify-content: center;
}
.keyboard__num {
  background: #f0f4f9;
  height: 74px;
  text-align: center;
  font-size: 26px;
  line-height: 38px;
  color: #48596d;
  cursor: pointer;
  transition: all 0.2s;
}
.keyboard__num:hover,
.keyboard__num:focus,
.keyboard__num:active {
  background-color: $secondary;
  color: #fff;
}
.keyboard,
.option__info {
  margin-bottom: 24px;
}
.keyboard__choosen {
  background-color: $primary;
  color: #fff;
}
.option__info {
  font-size: 15px;
  line-height: 22px;
  color: #424e72;
}
</style>
