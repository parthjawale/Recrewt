<template>
<div class="App">
  <v-app>
      <v-toolbar dark color="primary">
        <v-toolbar-side-icon></v-toolbar-side-icon>

        <v-toolbar-title class="white--text">ReCrewt</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat icon to="/">
            <v-icon>home</v-icon>  
          </v-btn>
          <v-btn flat to="/profile">Profile</v-btn>
          <v-btn flat to="/dashboard">Dashboard</v-btn>
          <v-btn flat to="/login">Login</v-btn>
          <v-btn flat to="/signup">Sign Up</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <main>
        <router-view/>
      </main>
  </v-app>
</div>
</template>

<script>
export default {
  name: "App"
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
</style>
