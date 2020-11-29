<template>
  <q-scroll-area class="wrap">
  <div>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      active-color="secondary"
      alternative-labels
      flat
      style="width: 560px;"
      animated
    >
      <q-step
        :name="1"
        title="Шаг 1"
        icon="call"
        done-icon="call"
        active-icon="call"
        :done="step > 1"
      >
        <phone-step
          ref="phones"
          :phones="this.data.phones"
          @setErrors="err => (this.errors = err)"
          @setPhones="phones => (this.data.phones = phones)"
        />
      </q-step>

      <q-step
        :name="2"
        title="Шаг 2"
        icon="audiotrack"
        :done="step > 2"
        done-icon="audiotrack"
        active-icon="audiotrack"
      >
        <audio-step
          :selected-audio="data.audio"
          @setAudio="audio =>this.data.audio = audio"
        ></audio-step>
      </q-step>

      <q-step :name="3" title="Шаг 3"  icon="assignment" active-icon='assignment'  done-icon='assignment' :done="step > 3">
        <tree-step :tree = "data.tree"     @setTree="tree => {this.data.tree = tree}"></tree-step>
      </q-step>

      <q-step :name="4" title="Шаг 4" icon="add_comment">
        <OtherSettingsStep :other = "this.data.other" @setOthers ="other => {this.data.other = other}"    @setErrors="err => (this.errors = err)"></OtherSettingsStep>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="text-center q-my-lg" >
          <q-btn
            @click="nextStep"
            push
            color="primary"
            :label="step === 4 ? 'Закончить' : 'Далее'"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            push
            @click="$refs.stepper.previous()"
            label="Назад"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
      <template v-slot:message>
        <q-banner
          v-if="step === 1"
          class="bg-primary text-white text-center"
        >
          На какие номера будем звонить?
        </q-banner>
        <q-banner
          v-else-if="step === 2"
          class="bg-primary text-white text-center"
        >
          Какой аудиоролик будем использовать для начала общения ?
        </q-banner>
        <q-banner
          v-else-if="step === 3"
          class="bg-primary text-white text-center "
        >
          Настройка событий
        </q-banner>
        <q-banner v-else class="bg-primary text-white text-center ">
          Другие настройки
        </q-banner>
      </template>
    </q-stepper>

  </div>

  </q-scroll-area>
</template>

<script>
import PhoneStep from "./newTaskModalInnerScreens/PhoneStep";
import AudioStep from "./newTaskModalInnerScreens/AudioStep";
import TreeStep from './newTaskModalInnerScreens/TreeStep';
import OtherSettingsStep from './newTaskModalInnerScreens/OtherSettingsStep';

export default {
  name: "newTask",
  components: { PhoneStep, AudioStep,TreeStep,OtherSettingsStep },
  props: {
    editedTask: {

    }
  },
  created() {
    if (this.editedTask) this.data = this.editedTask;
  },
  data() {
    return {
      step: 1,
      data: {
        id: Date.now(),
        phones: [],
        audio: undefined,
        tree: undefined,
        other: undefined
      },
      errors: []
    };
  },

  methods: {
    async closePopup() {
      this.$emit("close");
    },
    resetTask() {},
    nextStep() {
      if (this.step === 1) {
        this.errors = [];
        this.$refs.phones.getPhones();
        if (!this.data.phones.length && !this.errors.length) {
          this.$q.dialog({
            message: "Чтобы продолжить укажите номера для обзвона.",
            ok: { label: "Ок" }
          });
        } else if (this.errors.length) {
          let message = "";
          this.errors.forEach(err => (message += `${err}, <br>`));
          this.$q.dialog({
            message: `Исправьте или удалите следующие номера: <br> <span style="color: red">${message}</span> `,
            html: true,
            ok: { label: "Ок" }
          });
        } else {
          this.$refs.stepper.next();
        }
      } else if (this.step === 2) {
        if (!this.data.audio) {
          this.$q.dialog({
            message: "Выберите аудиозапись",
            ok: { label: "Ок" }
          });
        } else {
          this.$refs.stepper.next();
        }
      }
      else if (this.step === 3) {
          this.$refs.stepper.next();
      }
      else if (this.step === 4) {
     // this.$store.commit('tasks/addTask', this.data);

        if (!this.data.other?.name) {
          this.$q.dialog({

            message: "Введите название рассылки",
            ok: { label: "Ок" }
          });
        }
        else this.$emit ("saved", this.data)
      }
    },
  }
};
</script>

<style scoped lang="scss">

.wrap {
  width: 560px;
  height: calc(100vh - 100px);
  overflow: hidden !important;
  background: #fff
}
.buttons_wrap {
  width: 100%;
  justify-content: space-around;
}
</style>
