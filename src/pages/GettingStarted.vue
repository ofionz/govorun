<template>
  <div >
    <div v-if="step === 1" class="flex column wrap">
      <span  class="text-h6 title"> Добро пожаловать!</span>
      <img  class="logo" src="../assets/Logo.svg" alt="" />
      <span  class="description"
        >Мы - стороннее приложение для сервиса Звонобот. Так как ваш аккаунт
        Битрикс24 еще не привязан к сервису, то необходимо пройти авторизацию
        иподключить наше приложение. Если у вас еще нет аккаунта, то
        <a href="https://lk.zvonobot.ru/ru-ru/registration.html">
          пройдите быструю регистрацию на сайте. </a>
      </span>
      <q-btn @click="nextStep" padding="20px 80px" color="primary" push>
        Настроить подключение
      </q-btn>
    </div>
    <div v-if="step === 2" class="flex column wrap">
      <span  class="text-h6 title"> Подключение к аккаунту</span>
      <span  class="description"
      >Вам необходимо скопировать индивидуальный Master-API ключ, который вы можете найти на
        <a href="https://lk.zvonobot.ru/ru-ru/registration.html">странице</a>
        настроек подключения в личном кабинете. Этот ключ вам необходимо скопировать полностью
        и вставить в поле ниже, после чего нажать кнопку подключить. На этом процесс настройки
        приложения будет завершен, и вы сможете пользоваться им в полном объеме
      </span>

      <span class="key_label">Введите мастер-ключ API</span>
      <q-input :lazy-rules="true"  class = "key"    ref="key"    v-model="key"    :rules="[testKey]" square filled ></q-input>
      <q-btn @click="setConnection" padding="20px 80px" color="primary" push>
        Подключить
      </q-btn>
    </div>
    <div v-if="step === 3" class="flex column wrap">
      <span  class="text-h6 title"> У вас получилось!</span>
      <img  class="logo" src="../assets/Logo.svg" alt="" />

      <span style="width: 345px" class="description"
      >Теперь вы без проблем можете пользоваться приложением. Успеха вашему бизнесу!
      </span>
      <q-btn @click="finishSet" padding="20px 80px" color="secondary" push>
        Закрыть мастер настройки
      </q-btn>
    </div>

  </div>
</template>

<script>
export default {
  name: "GettingStarted",
  data: ()=> {
    return {
      step: 1,
      key: '',
    }
  },
  methods: {
    nextStep () {
      this.step++;
    },
    finishSet () {
      this.$router.push({name: 'main'})
    },
    async setConnection () {
      if( await this.$refs.key.validate()) {
        this.$store.commit('userInfo/setApiKey', this.key);
        this.nextStep();
      }
    },

    testKey (val) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(val.length> 10 || 'Проверьте правильность ввода ключа')
        }, 2000)
      })
    },
  }
};
</script>

<style scoped>
.wrap {
  align-items: center;
}
.title {
  color: #48596d;
  margin-top: 60px;

}
.logo {
  margin-top: 50px;
}
.description {
  margin-top: 50px;
  margin-bottom: 35px;
  width: 650px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #6d788c;
}
  .key_label {
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 15px;
    line-height: 22px;
    color: #424E72;
  }
  .key {
    width: 380px;
    margin-bottom: 30px;
  }
</style>
