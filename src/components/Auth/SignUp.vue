<template>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      top
    >
      {{ response.message }}
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
            ></v-text-field>
          </v-flex>
          <v-flex class="px-2" xs12 sm6>
            <v-text-field
              v-model="age"
              type="number"
              :rules="[rules.required, rules.ageMin, rules.ageMax]"
              name="input-password"
              hint="Enter Your Age"
              label="Age"
              required
            ></v-text-field>
          </v-flex>
          <v-flex class="px-2" xs12 sm6>
            <v-text-field
              v-model="cgpa"
              type="number"
              :rules="[rules.required, rules.cgpa]"
              name="input-password"
              hint="Enter Your Cumulative Grade Point Average"
              label="CGPA"
              required
            ></v-text-field>
          </v-flex>
          <v-flex class="px-2" xs12 sm6>
            <v-text-field
              v-model="twelfthPercent"
              type="number"
              :rules="[rules.required, rules.twelfth]"
              name="input-password"
              append-icon="%"
              hint="Enter Your 12th Percentage"
              label="12th Percentage"
              required
            ></v-text-field>
          </v-flex>
          <v-flex class="px-2" xs12>
            <v-autocomplete
            v-model="specialisation"
            :items="items"
            :rules="[rules.required]"
            label="Select your area of expertise."
          ></v-autocomplete>
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
      response: "",
      name: "",
      password: "",
      age: null,
      cgpa: null,
      specialisation: null,
      twelfthPercent: null,
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
          value == this.password || "Both Passwords must be same.",
        cgpa: v => v <= 10.0 || "CGPA must be less than or equal to 10.0",
        twelfth: v =>
          v <= 100.0 || "Percentage must be less than or equal to 100%",
        ageMin: v => v >= 18 || "You must be atleast greater than 18 to work.",
        ageMax: v => v <= 100 || "You are too old."
      },
      items: ["Design", "Web Development", "Content Writing"]
    };
  },
  created() {
    // var self = this;
    // auth.onAuthStateChanged(function(user) {
    //   if (user) {
    //     self.$router.push("/dashboard");
    //   }
    // });
  },
  methods: {
    async signUp() {
      var validate = this.$refs.signUpForm.validate();
      if (!validate) return;
      var payload = {
        name: this.name,
        password: this.password,
        pno: this.pno,
        email: this.email,
        age: this.age,
        cgpa: this.cgpa,
        twelfthPercent: this.twelfthPercent,
        specialisation: this.specialisation
      };
      this.loading = true;
      try {
        this.response = await this.$store.dispatch("signUpUser", payload);
      } catch (ex) {
        alert(ex);
      }
      this.loading = false;
      this.snackbar = true;
      if (this.response.errorValue) {
        this.$router.push("/dashboard");
      }
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