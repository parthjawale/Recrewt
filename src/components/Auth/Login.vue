<template>
  <v-container>
    <v-card width="500" style="padding:20px;margin: 30px auto;">
      <h2 class="display-2 font-weight-light text-xs-left mb-3">Login</h2>
      <v-form width="400" @submit.prevent="">
        <v-text-field
          v-model="email"
          :rules="rules.emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          :rules="[rules.required, rules.min]"
          :type="showPassword ? 'text' : 'password'"
          name="input-password"
          label="Password"
          hint="At least 6 characters"
          required
          @click:append="showPassword = !showPassword"
        ></v-text-field>
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
