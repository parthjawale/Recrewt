<template>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      top
    >
      <!-- Hello {{name.split(" ")[0]}}. Thank you for signing up. -->
      {{ response.message }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-card width="500" style="padding:20px;margin: 30px auto;">
      <h2 class="display-2 font-weight-light text-xs-left mb-3">{{ passwordReset ? 'Reset Password' : 'Login' }}</h2>
      <v-form ref="loginForm" width="400" @submit.prevent="passwordReset ? login : resetPassword">
        <v-text-field
          v-model="email"
          :rules="rules.emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          autocomplete="off"
          :append-icon="!showPassword ? 'visibility_off' : 'visibility'"
          :rules="[rules.required, rules.min]"
          :type="showPassword ? 'text' : 'password'"
          name="input-password"
          label="Password"
          hint="At least 6 characters"
          v-if="!passwordReset"
          required
          @click:append="showPassword = !showPassword"
          @keyup.enter="login"
        ></v-text-field>
        <p class="body-2 blue--text text--darken-2 font-weight-regular hover-underline" v-if="!passwordReset" @click="passwordReset = true">Forgot Password?</p>
        <p class="body-2 blue--text text--darken-2 font-weight-regular hover-underline" v-if="passwordReset" @click="passwordReset = false">Go Back.</p>
        <v-btn :loading="loading" :disabled="loading" type="submit" v-if="!passwordReset">Submit</v-btn>
        <v-btn :loading="loading" :disabled="loading" type="submit" @click="resetPassword" v-if="passwordReset">Reset Password</v-btn>
        <v-btn @click="clear" color="red" flat >Clear</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { auth } from "@/scripts/firebase";

export default {
  data() {
    return {
      showPassword: false,
      password: "",
      loading: false,
      response: "",
      email: "",
      snackbar: false,
      passwordReset: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ]
      }
    };
  },
  created() {
    var self = this;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        self.$router.push("/dashboard");
      }
    });
  },
  methods: {
    async resetPassword() {
      let validate = this.$refs.loginForm.validate();
      if (!validate) return;
      this.loading = true;
      var payload = { email: this.email };
      this.response = await this.$store.dispatch("resetPassword", payload);
      this.loading = false;
      this.snackbar = true;
      if (!this.response.error) this.passwordReset = false;
    },
    async login() {
      let validate = this.$refs.loginForm.validate();
      if (!validate) return;
      var payload = {
        email: this.email,
        password: this.password
      };
      this.loading = true;
      try {
        this.response = await this.$store.dispatch("loginUser", payload);
      } catch (ex) {
        alert(ex);
      }
      this.loading = false;
      this.snackbar = true;
      // this.clear();
      if (!this.response.errorValue) this.$router.push("/dashboard");
    },
    clear() {
      this.password = "";
      this.email = "";
      this.$refs.loginForm.reset();
      console.clear();
    }
  }
};
</script>

<style scoped>
.hover-underline:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>

