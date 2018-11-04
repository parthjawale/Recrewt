<template>
  <v-container>
    <v-card width="800" style="padding: 30px;margin: 30px auto;">
      <h2 class="display-2 font-weight-light text-xs-left mb-3 px-2">Sign Up</h2>
      <v-form width="500" @submit.prevent="">
        <v-layout row wrap>
          <v-flex class="px-2"  xs12 sm6>
            <v-text-field
              v-model="name"
              :rules="[rules.required]"
              required
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
              hint="At least 6 characters"
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-flex>
          <v-flex class="px-2" xs12 sm6>
            <v-text-field
              v-model="repassword"
              :rules="[rules.required]"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              name="input-password"
              label="Enter Password Again"
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
              label="Mobile Number"
              counter="10"
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn type="submit">Submit</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      password: "",
      name: "",
      pno: "",
      repassword: "",
      email: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ]
      }
    };
  }
};
</script>

