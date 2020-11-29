<template>
  <div>
    <q-dialog
      v-model="player"
      @close="currentRecord = undefined"
      position="top"
      content-style="z-index: 6000"
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
    <div  v-if="options.length">
         <q-select @input="$emit('setAudio', currentRecord)" filled bottom-slots v-model="model" :options="options"  >

        <template v-slot:hint>
        Выберите аудиозапись
        </template>

        <template v-slot:after>
          <q-btn v-if="model"  @click="playRecord()" round dense flat class="text-primary cursor-pointer" size="25px" padding="none" icon="play_arrow" />
        </template>
      </q-select>
    </div>
    <span v-else>
      Возможно у вас нет аудиороликов или они не прошли модерацию. <br />
      Создать его вы можете в разделе
      <router-link :to="{ name: 'audios' }"> аудиоролики. </router-link></span
    >
  </div>
</template>

<script>
  import player from '../../components/Player/player';
export default {
  name: "AudioStep",
  components: {
    player
  },
  props: {
    selectedAudio: {}
  },
  async created() {
    const context = this;
   await this.$store.dispatch('audios/fetchAudio')
      .then(() =>  context.audios = context.$store.state.audios.audios)
      .catch((err) => this.$logger('Ошибка обновления списка аудиозаписей. '+ err));

   this.model =this.selectedAudio?this.selectedAudio.name: '';

   this.options = this.audios.map(el => el.name);
  },
  data() {
    return {
      model: "",
      player: false,
      audios: undefined,
      options: []
    };
  },
  computed: {
    currentRecord (){
     return  this.audios?.find ((el) => el.name === this.model)
    }
  },

  methods : {
    playRecord() {
      if (this.currentRecord) this.player = true;
    },
  }
};
</script>

<style scoped></style>
