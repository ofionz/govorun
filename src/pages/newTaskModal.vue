<template>
  <div class="wrap">
    <q-stepper
      v-model="step"
      ref="stepper"
      class="full-width"
      color="primary"
      active-color="secondary"
      alternative-labels
      header-nav
      flat
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
        <phone-step :add-error="actualErrors" :data="test"/>
      </q-step>

      <q-step
        :name="2"
        title="Шаг 2"
        icon="audiotrack"
        :done="step > 2"

      >
       2222
      </q-step>

      <q-step
        :name="3"
        title="Шаг 3"
        icon="assignment"
        :done="step > 3"

      >
       333
      </q-step>

      <q-step
        :name="4"
        title="Шаг 4"
        icon="add_comment"

      >
       4444
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" push color="primary" :label="step === 4 ? 'Закончить' : 'Далее'" />
          <q-btn v-if="step > 1" flat color="primary" push @click="$refs.stepper.previous()" label="Назад" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
      <template v-slot:message>
        <q-banner @click="test2 " v-if="step === 1"  class="bg-primary text-white text-center">
          На какие номера будем звонить?
        </q-banner>
        <q-banner v-else-if="step === 2" @click="test2" class="bg-primary text-white text-center">
          На какие номера будем звонить?2
        </q-banner>
        <q-banner v-else-if="step === 3" class="bg-primary text-white text-center ">
          На какие номера будем звонить?3
        </q-banner>
        <q-banner v-else class="bg-primary text-white text-center ">
          На какие номера будем звонить?4
        </q-banner>
      </template>
    </q-stepper>

  </div>
</template>

<script>
import PhoneStep from './newTaskModalInnerScreens/PhoneStep';

export default {
  name: "newTask",
  components: { PhoneStep},
  data() {
    return {
      step: 1,
      data: {},
      errors: []
    };
  },

  methods: {
    async closePopup() {
      this.$emit("close");
    },
    resetTask() {

    },
    nextStep () {
      this.step++;
    },
     test (phones) {
       this.data.phones = phones;
     }
     ,
    test2 (){
      console.log(this.data.phones)
    },

    actualErrors (newErrors) {
      this.errors = newErrors;
      console.log( this.errors);
    }
  }
};
</script>

<style lang="scss">
.wrap {
  overflow: hidden;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.buttons_wrap {
  width: 100%;
  justify-content: space-around;
}
</style>
