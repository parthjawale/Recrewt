import Vue from "vue";
import Router from "vue-router";

import Auth from "./auth";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Jobs from "./jobs";

Vue.use(Router);

export default new Router({
  routes: [...Auth, ...Dashboard, ...Profile, ...Jobs],
  mode: "history"
});
