<template>
  <div>
Main Page в разработке...

    <audio-recorder v-if="showRecorder"
                    upload-url="some url"
                    filename="ninja"
                    format="mp3"
                    :headers="headers"
                    :before-recording="callback"
                    :pause-recording="callback"
                    :after-recording="callback"
                    :select-record="callback"
                    :before-upload="callback"
                    :successful-upload="callback"
                    :failed-upload="callback"
                    :bit-rate="192"/>
  </div>
</template>

<script>
import audioRecorder from '../components/Player/recorder';
  export default {
    name: 'Main',
    components : {audioRecorder},
    created() {
    //  if (!this.$store.state.userInfo.apiKey) this.$router.push({name:'start'})
    },

    data () {
      return {
        mp3: '/demo/example.mp3',
        showRecorder: true,
        headers: {
          'X-Custom-Header': 'some data'
        }
      }
    },
    methods: {
      callback(msg) {
        console.log('Event: ', msg)
      },
    }
  };
</script>

<style scoped>

</style>