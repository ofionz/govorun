import Vue from "vue";
import Vuex from "vuex";
import userInfo from "./userInfo";
import tasks from "./tasks";
import audios from "./audios";
import calls from "./calls";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      userInfo,
      tasks,
      calls,
      audios
    }
  });

  return Store;
}
