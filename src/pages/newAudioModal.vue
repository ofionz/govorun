<template>
  <div class="wrap">
    <q-btn-toggle
      v-model="model"
      push
      glossy
      class="toggles"
      @input="resetRecord"
      toggle-color="primary"
      :options="[
        { label: 'Микрофон', value: 'microphone' },
        { label: 'Аудиофайл', value: 'file' },
        { label: 'Текст', value: 'text' }
      ]"
    />
    <audio-recorder
      class="q-mt-md"
      v-if="model === 'microphone'"
      format="mp3"
      :mic-failed="() => $q.dialog({
       title: 'Ошибка',
      message: 'Ошибка подключения микрофона: проверьте подключение и перезагрузите страницу '})"
      :after-recording="setRecord"
      :bit-rate="192"
    />

    <q-file
      v-if="model === 'file'"
      class="q-mt-md"
      v-model="file"
      label="Кликните или перетащите сюда аудиофайл mp3/m4a"
      outlined
      accept=".mp3, .m4a"
      @input="setRecord"
    />
    <transition name="slide-left">
      <q-input
        v-if="record"
        class="recordName  q-mt-lg"
        label="Введите название аудиоролика"
        :rules="[val => !!val || 'Введите название аудиоролика']"
        v-model="recordName"
        square
        dense
      ></q-input>
    </transition>
    <transition name="slide-right">
      <audio-player
        key="player"
        class="q-mt-md"
        :src="record.url"
        v-if="record"
      />
    </transition>
    <div class="flex q-my-md buttons_wrap">
      <q-btn
        @click="closePopup"
        padding="10px 40px"
        color="white"
        text-color="primary"
        push
        >Отмена</q-btn
      >
      <transition name="slide-left2">
        <q-btn
          v-if="record"
          @click="saveRecord"
          padding="10px 40px"
          color="primary"
          push
          >Сохранить запись</q-btn
        >
      </transition>
    </div>
  </div>
</template>

<script>
import audioRecorder from "../components/Player/recorder";
import audioPlayer from "../components/Player/player";
import fromFile from "../lib/audio-from-file";

export default {
  name: "newRecord",
  components: { audioRecorder, audioPlayer },
  data() {
    return {
      model: "file",
      file: undefined,
      record: undefined,
      recordName: ""
    };
  },

  methods: {
    async setRecord(newRecord) {
      if (this.model === "file" && this.file) {
        this.recordName = this.file.name;
        this.record = await fromFile(this.file);
      } else if (this.model === "microphone") {
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        };
        const date = new Date();
        this.recordName = "Аудиозапись " + date.toLocaleString("ru", options);
        this.record = newRecord;
      }
    },
    saveRecord() {
      if (!this.record || !this.recordName) return;
      this.record.name = this.recordName;
      this.record.status = "Неизвестен";
      this.$emit("saved", this.record);
      this.$emit("close");
    },
    async closePopup() {
      this.$emit("close");
    },

    resetRecord() {
      this.record = undefined;
      this.file = undefined;
      this.recordName = "";
    }
  }
};
</script>

<style lang="scss">
.wrap {
  overflow-x: hidden;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
}
.recordName {
  width: 250px;
}
.toggles {
  width: 100%;
  & button {
    width: 33.33333%;
  }
}
.buttons_wrap {
  width: 100%;
  justify-content: space-around;
}

.slide-left-enter-active {
  transition: all 0.7s ease !important;
}
.slide-left-enter {
  transform: translateX(70vw) !important;
}

.slide-left2-enter-active {
  transition: all 1s ease !important;
}
.slide-left2-enter {
  transform: translateX(70vw) !important;
}

.slide-right-enter-active {
  transition: all 0.8s ease !important;
}

.slide-right-enter {
  transform: translateX(-70vw) !important;
}
</style>
