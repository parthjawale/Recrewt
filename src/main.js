// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App";
import router from "./router";
import store from "@/store";
import { firestore, auth } from "@/scripts/firebase";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;
Vue.use(Vuetify);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  data: vm => {
    return {
      user: null
    };
  },
  created() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        firestore
          .collection("users")
          .doc(user.uid)
          .get()
          .then(function(doc) {
            Vue.prototype.$user = doc.data();
          });
      }
    });
  },
  router,
  store,
  components: { App },
  template: "<App/>"
});
