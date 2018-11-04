<template>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      top
    >
      <!-- Hello {{name.split(" ")[0]}}. Thank you for signing up. -->
      {{message}}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-card width="500" style="padding:20px;margin: 30px auto;">
      <h2 class="display-2 font-weight-light text-xs-left mb-3">Login</h2>
      <v-form ref="loginForm" width="400" @submit.prevent="login">
        <v-text-field
          v-model="email"
          :rules="rules.emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          autocomplete="off"
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          :rules="[rules.required, rules.min]"
          :type="showPassword ? 'text' : 'password'"
          name="input-password"
          label="Password"
          hint="At least 6 characters"
          required
          @click:append="showPassword = !showPassword"
          @keyup.enter="login"
        ></v-text-field>
        <v-btn :loading="loading" :disabled="loading" type="submit">Submit</v-btn>
        <v-btn @click="clear" color="red" flat>Clear</v-btn>
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
      message: "",
      email: "",
      snackbar: false,
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
    async login() {
      let validate = this.$refs.loginForm.validate();
      if (!validate) return;
      var payload = {
        email: this.email,
        password: this.password
      };
      this.loading = true;
      try {
        this.message = await this.$store.dispatch("loginUser", payload);
      } catch (ex) {
        alert(ex);
      }
      this.loading = false;
      this.snackbar = true;
      // this.clear();
      this.$router.push("/dashboard");
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
