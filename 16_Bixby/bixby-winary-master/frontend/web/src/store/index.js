import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import wine from "./modules/wine";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    wine,
  }
});
