import Mp3Encoder from './mp3-encoder'
import WavEncoder from './wav-encoder'
import { convertTimeMMSS } from './utils'

export default function (file) {
  console.log(file);
    let record = null;


  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = (e) => {
     const encoder = new Mp3Encoder({ bitRate: 128, sampleRate: 44100 })
      if ( 'mp3'.indexOf(file.name.split('.').pop().toLowerCase())>-1) {
        record =  encoder.finish ([e.target.result],{ type: 'audio/mp3' });
      }
        else if ( 'm4a'.indexOf(file.name.split('.').pop().toLowerCase())>-1) {
        record =  encoder.finish ([e.target.result],{ type: 'audio/m4a' });
        }
      let audio = new Audio(record.url);
      audio.addEventListener('canplaythrough', function() {
        record.duration =  convertTimeMMSS(audio.duration);
        audio.remove();
      }, false);

      resolve(record);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  })

  //
  // if (_isMp3) {
  //     record = this.lameEncoder.finish()
  //   } else {
  //     let wavEncoder = new WavEncoder({
  //       bufferSize : this.bufferSize,
  //       sampleRate : this.encoderOptions.sampleRate,
  //       samples    : this.wavSamples
  //     })
  //     record = wavEncoder.finish()
  //     this.wavSamples = []
  //   }
  //
  //  // record.duration = convertTimeMMSS(this.duration)
  //
  //   this._duration = 0
  //   this.duration  = 0
// return  record;




}
