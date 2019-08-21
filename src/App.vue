<template>
  <div class="App">
    <v-app>
      <v-toolbar fixed dark flat color="primary" style="z-index:999;">
        <v-toolbar-title
          class="white--text"
          style="cursor:pointer"
          @click="$router.push('/')"
        >Recrewt</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="!mobile">
          <v-btn flat to="/">
            Home
            <v-icon right>home</v-icon>
          </v-btn>
          <v-btn flat v-if="isSignedIn" to="/profile">
            Profile
            <v-icon right>person</v-icon>
          </v-btn>
          <v-btn flat v-if="isSignedIn" to="/dashboard">
            Dashboard
            <v-icon right>dashboard</v-icon>
          </v-btn>
          <v-btn flat v-if="!isSignedIn" to="/login">
            Login
            <v-icon right></v-icon>
          </v-btn>
          <v-btn flat v-if="!isSignedIn" to="/signup">
            Sign Up
            <v-icon right></v-icon>
          </v-btn>
          <v-btn flat v-if="isSignedIn" @click="logout">
            Logout
            <v-icon right>exit_to_app</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else>
          <v-btn icon flat to="/">
            <v-icon>home</v-icon>
          </v-btn>
          <v-btn icon flat v-if="isSignedIn" to="/profile">
            <v-icon>person</v-icon>
          </v-btn>
          <v-btn icon flat v-if="isSignedIn" to="/dashboard">
            <v-icon>dashboard</v-icon>
          </v-btn>
          <v-btn icon flat v-if="!isSignedIn" to="/login">
            <v-icon></v-icon>
          </v-btn>
          <v-btn icon flat v-if="!isSignedIn" to="/signup">
            <v-icon></v-icon>
          </v-btn>
          <v-btn icon flat v-if="isSignedIn" @click="logout">
            <v-icon>exit_to_app</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <main class="toolbar-fixing">
        <router-view />
      </main>
    </v-app>
  </div>
</template>

<script>
import { auth } from "@/scripts/firebase";
export default {
  name: "App",
  data() {
    return {
      isSignedIn: false,
      drawer: true,
      mobile: false,
      user: null
    };
  },
  created() {
    var self = this;
    if (
      this.$vuetify.breakpoint.name == "xs" ||
      this.$vuetify.breakpoint.name == "sm"
    ) {
      this.mobile = true;
    }
    auth.onAuthStateChanged(function(user) {
      if (user) {
        self.isSignedIn = true;
        self.user = user;
      } else self.isSignedIn = false;
    });
  },
  methods: {
    logout() {
      var self = this;
      auth
        .signOut()
        .then(function() {
          self.$router.push("/login");
        })
        .catch(function(error) {
          alert(error.message);
        });
    }
  }
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
.toolbar-fixing {
  padding-top: 64px;
}
.navigation-drawer {
  margin-top: 64px !important;
}
@media screen and (max-width: 960px) {
  .toolbar-fixing {
    padding-top: 56px;
  }
  .navigation-drawer {
    margin-top: 56px !important;
  }
}
</style>
