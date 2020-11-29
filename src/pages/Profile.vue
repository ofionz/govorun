<template>
  <div class="text-center flex flex-center">
    <q-card
      class="my-card  q-mt-lg"
      bordered

      style="width:fit-content;"
    >
      <q-card-section>
        <q-icon
          style="top: -2px"
          class="text-secondary"
          size="xl"
          name="assignment_ind"
        />
        <div class="text-h6 "> Профиль</div>
      </q-card-section>
      <div
        :class="$style.wrapper"
        class="flex column">
        <div
          class="q-mb-md flex column"
          :class="$style.profile__card">
          <div class="text-subtitle1 "> <q-icon
            style="top: -2px"
            class="text-primary q-mr-xs"
            size="sm"
            name="vpn_key"
          />
            Ключ API
          </div>
          <div class="text-subtitle2 ">{{userInfo.apiKey}}</div>
        </div>

        <div
          class="q-mb-md flex column"
          :class="$style.profile__card">
          <div class="text-subtitle1 ">
            <q-icon
              style="top: -2px"
              class="text-primary"
              size="sm"
              name="mail_outline"
            />
            Почта</div>
          <div class="text-subtitle2 ">{{userInfo.email}}</div>
        </div>

        <div
          class="flex column"
          :class="$style.profile__card">
          <div class="text-subtitle1 ">
            <q-icon
              style="top: -2px"
              class="text-primary"
              size="sm"
              name="account_balance_wallet"
            />
            Баланс
          </div>
          <div class="text-subtitle2">{{userInfo.balance}} руб.</div>
        </div>
        </div>
      <q-card-section class="q-pt-none">
         <br>

      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    created() {
      this.userInfo = this.$store.state.userInfo
    },
    data: ()=> {
      return{
        userInfo : {

        }
      }
    }
  };
</script>

<style module lang="scss">

  .wrapper{
    padding: 20px;
  }
  .profile__card{
    background-color: #eeeeee4f;
    padding: 10px;
    min-width: 400px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
    align-items: flex-start;
  }

</style>