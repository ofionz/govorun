import Vue from 'vue';
import { Dialog } from 'quasar'


Vue.config.errorHandler = function(err, vm, info) {
  console.log('%c%s', 'color: red;' ,`Error: ${err.toString()}\nInfo: ${info}`);
  Dialog.create({
    title: 'Ошибка!',
    message: err.toString()})
};
Vue.config.warnHandler = function(msg, vm, trace) {
   console.log('%c%s', 'color: red;' , `Warn: ${msg}\nTrace: ${trace}`);
  Dialog.create({
    title: 'Ошибка',
    message: msg.toString()})
};
