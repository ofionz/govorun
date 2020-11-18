<template>
  <div class="full-width flex column flex-center">
    <q-btn-toggle
      v-model="model"
      @input="resetPhones"
      push
      glossy
      class="toggles"
      toggle-color="primary"
      :options="[
        { label: 'Ручной ввод', value: 'manual' },
        { label: 'Буфер обмена', value: 'paste' }
      ]"
    />
    <div class=" q-my-lg full-width" v-if="model === 'paste'">
      <q-input
        v-model="phonesText"
        filled
        autogrow
        @input="checkPhones"
        hint="Номера должны быть в формате +7(xxx)xxx-xx-xx, 7xxxxxxxxxx , 8xxxxxxxxxx или 8(xxx)xxx-xx-xx"
        label="Вставьте сюда номера:"
      />
    </div>
    <div v-if="model === 'manual'">
      <q-btn
        @click="addPhoneCell"
        fab
        label="Добавить ячейку"
        icon="add"
        class="q-my-md full-width"
        color="secondary"
      />
      <q-input
        v-for="(phone, index) in phonesArr"
        v-model="phonesArr[index]"
        :key="index"
        type="tel"
        class="input q-mt-sm"
        @focusin="maskVisible = true"
        fill-mask
        unmasked-value
        :ref = "'Телефон '+(index+1)"
        mask="+7(###)###-##-##"
        error-message="Введите телефон"
        :error="phone.length<10"
        @input="checkPhones"
        :label="'Телефон '+(index + 1) "
      >

        <template v-slot:append>
          <q-icon
            @click="deletePhone(index)"
            size="xs"
            color="negative"
            name="delete"
          ></q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneStep",
  props:{
    data : {
      type: Function
    },
    addError: {
      type: Function
    }
  },
  data() {
    return {
      model: "manual",
      previousModel: 'manual',
      phonesArr: [],
      errors: [],
      phonesText: ""
    };
  },
  methods: {
    addPhoneCell() {
      this.phonesArr.splice(0, 0, []);
    },
    deletePhone(indx) {
      this.phonesArr.splice(indx, 1);
    },

  checkPhones (){
      if (  this.model === "manual") {
        for (const [key, value] of Object.entries(this.$refs)) {
          if( value[0].hasError) {
            this.errors.push({name: value[0].label, value: value[0].innerValue});
            this.addError (this.errors);

            //TODO решить вопрос с добавлением ошибок и удалением лишних,
            // TODO а также с полем ввода путем вставки - нужна валидация и привод к одному формату
          }
        }
        this.data(this.phonesArr)
      }
      else if ( this.model === "paste") {
        console.log(this.phonesText.split (' '))
     //   this.data();

      }
        },
  resetPhones() {
      if(this.phonesArr.length ||this.phonesText.length)
      this.$q.dialog ({message: 'Введенные номера телефонов будут потеряны!',ok: {label: 'Ок'},cancel: {label: 'Отмена'}}).onOk(() => {
        this.phonesArr= [];
        this.phonesText= "";
        this.previousModel =  this.model;
      }).onCancel(() => {
        this.model=this.previousModel;
        this.previousModel =  this.model;
      })

  }
  }
};
</script>

<style lang="scss" scoped></style>
