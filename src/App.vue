<template>
<div class="App">
  <v-app>
      <v-navigation-drawer
        class="navigation-drawer"
        fixed
        v-model="drawer"
      >
        <v-list class="pa-4">
          <v-list-tile avatar v-if="user != null">
            <v-list-tile-avatar>
              <img src="/static/images/profile/profile_man.png">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="font-weight-regular title">{{ user.displayName }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar v-else>
            <v-list-tile-avatar>
              <img src="/static/images/profile/profile_man.png" style="height:60px;width:60px;">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="font-weight-regular subheading">Please Login</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
      </v-navigation-drawer>
      <v-toolbar fixed dark flat color="primary" style="z-index:999;">
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>

        <v-toolbar-title class="white--text">ReCrewt</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat icon to="/">
            <v-icon>home</v-icon>  
          </v-btn>
          <v-btn flat v-if="isSignedIn" to="/profile">Profile</v-btn>
          <v-btn flat v-if="isSignedIn" to="/dashboard">Dashboard</v-btn>
          <v-btn flat v-if="!isSignedIn" to="/login">Login</v-btn>
          <v-btn flat v-if="!isSignedIn" to="/signup">Sign Up</v-btn>
          <v-btn flat v-if="isSignedIn" @click="logout">Logout</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <main class="toolbar-fixing" :style="drawer ? drawerOpen : drawerClosed">
        <router-view/>
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
      user: null,
      drawerOpen: {
        paddingLeft: "300px"
      },
      drawerClosed: {
        paddingLeft: "0px"
      }
    };
  },
  created() {
    var self = this;
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
