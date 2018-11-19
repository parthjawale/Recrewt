import Vue from "vue";
import Router from "vue-router";

import MainPage from "@/components/MainPage";
import Auth from "./auth";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Jobs from "./jobs";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: MainPage,
      name: "Home"
    },
    ...Auth,
    ...Dashboard,
    ...Profile,
    ...Jobs
  ],
  mode: "history"
});
