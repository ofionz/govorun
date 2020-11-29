<template>
  <div>
    <q-input class="q-mb-md"
             error-message="Введите название"
             :error="settings.name.length<1"
             @input="$emit('setOthers', settings)"
             v-model="settings.name"
             label="Название задания" />
    <q-select
      class="q-mt-md"
      v-model="settings.selectedPhone"
      :options="outgoingPhonesList"
      hint="Выберите телефон с которого будет произведен звонок"
      @input="$emit('setOthers', settings)"
      label="Доступные исходящие номера"
    />
    <q-checkbox
      v-model="settings.needSaveRecord"
      class="q-mt-lg"
      @input="$emit('setOthers', settings)"
      label="Необходимо ли сохранять аудиозапись звонка ?"
    />
  </div>
</template>

<script>
export default {
  name: "OtherSettingsStep",
  props: {
    other: {}
  },
  created() {
    this.outgoingPhonesList = this.$store.state.userInfo.outgoingPhones;
    if (this.other) this.settings = this.other;
  },
  data: () => {
    return {
      outgoingPhonesList: undefined,
      settings: {
        name: '',
        selectedPhone: "",
        needSaveRecord: false
      }
    };
  },
};
</script>

<style scoped></style>
