import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
import user from "./modules/user";
import article from "./modules/article";
import menu from "./modules/menu";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [persistedState({ storage: window.sessionStorage })],

  modules: {
    user,
    article,
    menu
  },

});
