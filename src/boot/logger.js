import Vue from 'vue';
import { Dialog } from 'quasar'

Vue.prototype.$logger = showErrorDialog

Vue.config.errorHandler = function(err, vm, info) {
  console.log('%c%s', 'color: red;' ,`Error: ${err.toString()}\nInfo: ${info}`);
showErrorDialog(err)
};
Vue.config.warnHandler = function(msg, vm, trace) {
   console.log('%c%s', 'color: red;' , `Warn: ${msg}\nTrace: ${trace}`);
  showErrorDialog(msg)
};



export  function showErrorDialog(text, title='Ошибка!') {

  Dialog.create({
    title: title,
    message: text.toString()})
}