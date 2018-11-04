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
    <v-card width="800" style="padding: 30px;margin: 30px auto;">
      <h2 class="display-2 font-weight-light text-xs-left mb-3 px-2">Sign Up</h2>
      <v-form ref="signUpForm" width="500" @submit.prevent="signUp" lazy-validation>
        <v-layout row wrap>
          <v-flex class="px-2"  xs12 sm6>
            <v-text-field
              v-model="name"
              :rules="[rules.required, rules.name]"
              required
              value=""
              label="Name"
            ></v-text-field>
          </v-flex>
          <v-flex class="px-2" xs12 sm6>
            <v-text-field
              v-model="email"
              :rules="rules.emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-flex>
          <v-flex class="px-2" xs12 sm6>
            <v-text-field
              v-model="password"
              :rules="[rules.required]"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              name="input-password"
              label="Password"
              autocomplete="off"
              hint="At least 6 characters"
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-flex>
          <v-flex class="px-2" xs12 sm6>
            <v-text-field
              v-model="repassword"
              :rules="[rules.required, rules.repassword]"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              name="input-password"
              label="Enter Password Again"
              autocomplete="off"
              hint="At least 6 characters"
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-flex>
          <v-flex class="px-2" xs12 sm6>
            <v-text-field
              v-model="pno"
              type="number"
              :rules="[rules.required]"
              name="input-password"
              hint="Enter 10-digit Mobile Number"
              label="Mobile Number"
              counter="10"
              required
              @keyup.enter="signUp"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn type="submit" :loading ="loading" :disabled="loading">Submit</v-btn>
        <v-btn type="submit" color="red" flat @click="clear">Clear</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { auth } from "@/scripts/firebase";

export default {
  data() {
    return {
      loading: false,
      showPassword: false,
      snackbar: false,
      password: "",
      message: "",
      name: "",
      pno: "",
      repassword: "",
      email: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        name: value =>
          value.trim().split(" ").length > 1 || "Enter Last Name too",
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
        password: value =>
          value == this.repassword || "Both Passwords must be same.",
        repassword: value =>
          value == this.password || "Both Passwords must be same."
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
    async signUp() {
      var validate = this.$refs.signUpForm.validate();
      if (!validate) return;
      var payload = {
        name: this.name,
        password: this.password,
        pno: this.pno,
        email: this.email
      };
      this.loading = true;
      try {
        this.message = await this.$store.dispatch("signUpUser", payload);
      } catch (ex) {
        alert(ex);
      }
      this.loading = false;
      this.snackbar = true;
      // this.clear();
      this.$router.push("/dashboard");
    },
    clear() {
      this.name = "";
      this.password = "";
      this.repassword = "";
      this.pno = "";
      this.email = "";
      this.$refs.signUpForm.reset();
      console.clear();
    }
  }
};
</script>