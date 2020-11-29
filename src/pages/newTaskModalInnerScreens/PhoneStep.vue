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
        v-model="rawPhones"
        filled
        autogrow
        hint="Номера должны быть в формате +7(9xx)xxx-xx-xx, 79xxxxxxxxx , 89xxxxxxxxx, 8(9xx)xxx-xx-xx, 9xxxxxxxxx, (9xx)xxx-xx-xx разделенные пробелом и/или запятой."
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
        v-for="(elem, index) in phonesArr"
        v-model="phonesArr[index].phone"
        :key="index"
        type="tel"
        class="input q-mt-sm"
        fill-mask
        unmasked-value
        ref="phone"
        mask="+7(###)###-##-##"
        error-message="Введите телефон"
        no-error-icon
        :error="elem.phone.length < 10"
        :label="'Телефон ' + (index + 1)"
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
  props: {
    phones: {
      type: Array
    }
  },

  data() {
    return {
      model: "manual",
      previousModel: "manual",
      phonesArr: [],
      errors: [],
      rawPhones: ""
    };
  },
  mounted() {
    if (this.phones.length)
      this.phonesArr = this.phones.map(elem => {
        return { phone: elem };
      });
  },
  methods: {
    addPhoneCell() {
      this.phonesArr.splice(0, 0, { phone: "" });
      this.$nextTick(() => {
        this.$refs.phone[0].focus();
      });
    },
    deletePhone(indx) {
      this.phonesArr.splice(indx, 1);
    },

    checkPhones() {
      this.errors = [];
      for (const key of this.phonesArr) {
        if (key.phone.length !== 10 || key.phone.charAt(0) !== "9") {
          const phone = `(${key.phone.substring(0, 3)})${key.phone.substring(
            3,
            6
          )}-${key.phone.substring(6, 8)}-${key.phone.substring(8)}`;
          if (key.raw) this.errors.push(key.raw);
          else this.errors.push(phone);
        }
      }
      this.$emit("setErrors", this.errors);
    },

    getPhones() {
      if (this.model === "paste") {
        const rawArr = this.rawPhones.split(/[\s,]+/).filter(el => el.length);

        const filteredArr = rawArr.map(elem => {
          if (!elem.length) return;
          let phone = elem.replace(/[^\d]/g, "");
          if (
            phone.length === 11 &&
            (phone.charAt(0) === "7" || phone.charAt(0) === "8") &&
            phone.charAt(1) === "9"
          ) {
            phone = phone.substring(1);
          }
          return { phone: phone, raw: elem };
        });

        this.phonesArr = filteredArr;
      } else if (this.model === "manual") {
        // Do nothing
      }
      this.checkPhones();
      if (!this.errors.length)
        this.$emit(
          "setPhones",
          this.phonesArr.map(elem => elem.phone)
        );
    },

    resetPhones() {
      if (this.phonesArr.length || this.rawPhones.length)
        this.$q
          .dialog({
            message: "Введенные номера телефонов будут потеряны!",
            ok: { label: "Ок" },
            cancel: { label: "Отмена" }
          })
          .onOk(() => {
            this.phonesArr = [];
            this.rawPhones = "";
            this.previousModel = this.model;
          })
          .onCancel(() => {
            this.model = this.previousModel;
            this.previousModel = this.model;
          });
    }
  }
};
</script>

<style lang="scss" scoped></style>
