import Vue from "vue";
import Vuex from "vuex";
import Jobs from "./Jobs";
import Auth from "./Auth";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Jobs,
    Auth
  }
});
export default store;
