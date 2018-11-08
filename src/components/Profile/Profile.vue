<template>
  <div>
    <preloader v-if="preloaderLoading"></preloader>
    <v-container v-else>
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
      <v-snackbar
        v-model="passwordSnackbar"
        top
      >
        {{ passwordResponse.message }}
        <v-btn
          color="pink"
          flat
          @click="passwordSnackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
      <h1 class="display-3">Hello, <span class="blue--text">{{userProfile.name.split(' ')[0]}}.</span></h1>
      <h2 class="headline"> Welcome to your Profile.</h2>
      <v-layout row wrap>
        <v-flex sm3 class="mt-5">
          <img src="/static/images/profile/profile_man.png" width="200" alt="">
        </v-flex>
        <v-flex sm9 class="mt-5">
          <v-layout row wrap>
            <v-flex xs12 sm6 class="pb-3">
              <h3 class="title font-weight-regular">Name: {{userProfile.name}}</h3>
            </v-flex>
            <v-flex xs12 sm6 class="pb-3">
              <h4 class="title font-weight-regular">Specialisation: <span class="blue--text text--darken-3">{{userProfile.specialisation}}</span> </h4>
            </v-flex>
            <v-flex xs12 sm6 class="pb-3">
              <h4 class="title font-weight-regular">Age: <span class="blue--text text--darken-3">{{userProfile.age}}</span> </h4>
            </v-flex>
            <v-flex xs12 sm6 class="pb-3">
              <h4 class="title font-weight-regular">College: <span class="blue--text text--darken-3">{{ userProfile.college }}</span> </h4>
            </v-flex>
            <v-flex xs12 sm6 class="pb-3">
              <h4 class="title font-weight-regular">Email: <span class="blue--text text--darken-3">{{userProfile.email}}</span> </h4>
            </v-flex>
            <v-flex xs12 sm6 class="pb-3">
              <h4 class="title font-weight-regular">Mobile No: <span class="blue--text text--darken-3">+91-{{userProfile.pno}}</span> </h4>
            </v-flex>
            <v-flex xs12 sm6 class="pb-3">
              <h4 class="title font-weight-regular">CGPA: <span class="blue--text text--darken-3">{{userProfile.cgpa}}</span> </h4>
            </v-flex>
            <v-flex xs12 sm6 class="pb-3">
              <h4 class="title font-weight-regular">12th Percentage: <span class="blue--text text--darken-3">{{userProfile.twelfthPercent}}%</span> </h4>
            </v-flex>
            <v-flex xs6 sm3>
              <v-btn @click="editDialog = true" dark>Edit Details</v-btn>
            </v-flex>
            <v-flex xs6 sm3>
              <v-btn flat @click="showDets('approvedJobs')">
                Jobs Approved
                <v-icon>
                    {{this.det.params == 'approvedJobs' ? 'expand_less' : 'expand_more'}}
                  </v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs6 sm3>
              <v-btn flat @click="showDets('appliedJobs')">
                Jobs Applied
                <v-icon>
                  {{this.det.params == 'appliedJobs' ? 'expand_less' : 'expand_more'}}
                  </v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs6 sm3>
              <v-btn flat @click="showDets('postedJobs')">
                Jobs Posted
                <v-icon>
                  {{this.det.params == 'postedJobs' ? 'expand_less' : 'expand_more'}}
                  </v-icon>
                </v-btn>
            </v-flex>
          </v-layout>
          <v-flex xs12>
            <small>* Jobs where you were rejected are not shown in Applied Jobs.</small>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout column class="pt-5" v-show="det.show">
        <div class="pt-4 text-xs-center" v-if="det.detArr == null || det.detArr.length == 0">
          <h4 class="headline">No Jobs Yet.</h4>
        </div>
        <v-flex xs12>
          <v-alert
            :value="deleteAlert"
            type="info"
            class="mb-4"
            outline
          >
            Your job has been successfully deleted. Please reload to see changes.
          </v-alert>
        </v-flex>
        <v-card class="mb-4" v-for="(jobChild,index) in det.detArr" :key="index">
          <v-card-title>
            <h2 class="font-weight-regular headline">
                {{jobChild.name}}
              <br>
              <span class="grey--text text--darken-2 font-weight-light subheading">{{jobChild.specialisation}}</span>
            </h2>
          </v-card-title>
          <v-card-text>
            <div class="d-flex align-content-space-between">
              <p class="text-xs-left">
                Estimated Duration
                <br>
                <span class="grey--text text--darken-1" v-if="jobChild.estimatedDuration == 1">{{jobChild.estimatedDuration}} Month</span>

                <span class="grey--text text--darken-1" v-else>{{jobChild.estimatedDuration}} Months</span></p>
              <p class="text-xs-center">
                Last Date 
                <br>
                <span class="grey--text text--darken-1">{{jobChild.lastDate}}</span>
              </p>
              <p class="text-xs-right">
                No Of Positions Available 
                <br>
                <span class="grey--text text--darken-1">{{jobChild.positionsAvailable}}</span>
              </p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-layout d-flex align-content-space-between>
              <div style="width: 40px;">
                <v-btn flat color="black" @click="jobChild.show=!jobChild.show">
                  More Details
                  <v-icon>
                    {{jobChild.show ? 'expand_less' : 'expand_more'}}
                  </v-icon>
                </v-btn>
              </div>
              <v-spacer></v-spacer>
              <div style="width: 40px;" class="text-xs-right">
                <v-btn flat color="red" v-if="det.params == 'postedJobs'" @click="openDeleteDialog(jobChild)">
                  Delete Job
                </v-btn>
              </div>
              <div style="width: 40px;" class="text-xs-right">
                <v-btn flat color="blue" v-if="det.params == 'postedJobs'" :to="`/managejob/${jobChild.jobId}`">
                  Manage Applications
                </v-btn>
              </div>
            </v-layout>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="jobChild.show">
              {{jobChild.description}}
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-layout>
      <v-dialog v-model="editDialog" dark persistent max-width="500px">
        <v-card>
          <v-card-title class="text-xs-center">
            <h2 class="headline">Edit User Details</h2>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-sm>
              <v-form ref="editDetailsForm" @submit.prevent="addJob">
                <v-layout row wrap>
                  <v-flex class="px-2"  xs12 sm6>
                    <v-text-field
                      v-model="userProfile.name"
                      :rules="[rules.required, rules.name]"
                      required
                      value=""
                      label="Name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="px-2" xs12 sm6>
                    <v-text-field
                      v-model="userProfile.pno"
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
                      v-model="userProfile.age"
                      type="number"
                      :rules="[rules.required]"
                      name="input-password"
                      hint="Enter Your Age"
                      label="Age"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="px-2" xs12 sm6>
                    <v-text-field
                      v-model="userProfile.cgpa"
                      type="number"
                      :rules="[rules.required]"
                      name="input-password"
                      hint="Enter Your Cumulative Grade Point Average"
                      label="CGPA"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="px-2" xs12 sm6>
                    <v-text-field
                      v-model="userProfile.twelfthPercent"
                      type="number"
                      :rules="[rules.required]"
                      name="input-password"
                      append-icon="%"
                      hint="Enter Your 12th Percentage"
                      label="12th Percentage"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="px-2" xs12 sm6>
                    <v-autocomplete
                    v-model="userProfile.specialisation"
                    :items="items"
                    :rules="[rules.required]"
                    label="Select your area of expertise."
                  ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-btn @click="passwordDialog = true">Change Password</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="editDialog = false" :disabled="loading">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="saveDetails" :loading = "loading" :disabled="loading">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="passwordDialog" dark persistent max-width="300px">
        <v-card>
          <v-form ref="changePasswordForm" @submit.prevent="saveNewPassword">
            <v-card-title>
              <h2 class="headline">Change Password</h2>
            </v-card-title>
            <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Old Password"
                      hint="Enter Current Password"
                      :rules="[rules.required, rules.min]"
                      v-model="changePassword.old"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="New Password"
                      autocomplete="off"
                      :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                      :type="showPassword ? 'text' : 'password'"
                      hint="Enter New Password"
                      :rules="[rules.required, rules.min]"
                      v-model="changePassword.new"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="New Password Again"
                      autocomplete="off"
                      :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                      :type="showPassword ? 'text' : 'password'"
                      hint="Enter New Password Again"
                      :rules="[rules.required, rules.min, rules.repassword]"
                      v-model="changePassword.reNew"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn :disabled="passwordLoading" @click="closePasswordDialog">Close</v-btn>
                <v-btn type="submit" :loading="passwordLoading" :disabled="passwordLoading" @click="saveNewPassword">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog width="500" persistent v-model="deleteJobDialog.switch" v-if="deleteJobDialog.job != null">
        <v-card>
          <v-card-title class="grey lighten-2">
            <h2 class="headline font-weight-regular">Delete {{ deleteJobDialog.job.name }}</h2>
          </v-card-title>
          <v-card-text>
            <p class="subheading mb-0">By clicking 'Yes' you would be permanently deleting this job. There's no turning back from this.</p>
            <br>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="red" :disabled="deleteLoading" @click="closeDeleteDialog()">No, Please take me back.</v-btn>
            <v-btn color="green" flat @click="deleteJob()" :disabled="deleteLoading">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { firestore, auth } from "@/scripts/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import Preloader from "@/components/Common/Preloader";
export default {
  components: {
    preloader: Preloader
  },
  data() {
    return {
      det: {
        detArr: [],
        show: false,
        params: null
      },
      preloaderLoading: true,
      response: "",
      loading: false,
      snackbar: false,
      showPassword: false,
      deleteAlert: false,
      passwordDialog: false,
      passwordResponse: {
        message: "Password Successfully Changed.",
        error: false
      },
      passwordSnackbar: false,
      passwordLoading: false,
      deleteJobDialog: {
        switch: false,
        job: null
      },
      changePassword: {
        old: "",
        new: "",
        reNew: ""
      },
      deleteLoading: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        repassword: value =>
          value == this.changePassword.new || "Both Passwords must be same.",
        name: value =>
          value.trim().split(" ").length > 1 || "Enter Last Name too",
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ]
      },
      items: ["Design", "Web Development", "Content Writing"],
      editDialog: false,
      userProfile: {},
      approvedJobs: [],
      postedJobs: [],
      appliedJobs: []
    };
  },
  created() {
    var self = this;
    self.preloaderLoading = true;
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        self.$router.push("/login");
      }
      if (user) {
        firestore
          .collection("users")
          .doc(user.uid)
          .get()
          .then(function(doc) {
            self.userProfile = doc.data();
            firestore
              .collection("jobs")
              .get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(child) {
                  if (child.data().status != "deleted") {
                    for (var i in self.userProfile.postedJobs) {
                      if (self.userProfile.postedJobs[i] == child.id)
                        self.postedJobs.push(child.data());
                    }
                    for (var i in self.userProfile.appliedJobs) {
                      if (
                        self.userProfile.appliedJobs[i].jobId == child.id &&
                        self.userProfile.appliedJobs[i].status != "rejected"
                      ) {
                        self.appliedJobs.push(child.data());
                      }
                    }
                    for (var i in self.userProfile.approvedJobs) {
                      if (self.userProfile.approvedJobs[i].jobId == child.id)
                        self.approvedJobs.push(child.data());
                    }
                  }
                });
                self.preloaderLoading = false;
              });
          });
      }
    });
  },
  methods: {
    async saveNewPassword() {
      var validate = this.$refs.changePasswordForm.validate();
      if (!validate) return;
      this.passwordLoading = true;
      var payload = {
        oldPassword: this.changePassword.old,
        newPassword: this.changePassword.new
      };
      this.passwordResponse = await this.$store.dispatch(
        "changePassword",
        payload
      );
      this.passwordSnackbar = true;
      this.passwordLoading = false;
      if (!this.passwordResponse.error) this.closePasswordDialog();
    },
    closePasswordDialog() {
      this.$refs.changePasswordForm.reset();
      this.passwordDialog = false;
    },
    openDeleteDialog(job) {
      this.deleteJobDialog.switch = true;
      this.deleteJobDialog.job = job;
    },
    closeDeleteDialog() {
      this.deleteJobDialog.switch = false;
      this.deleteJobDialog.job = null;
    },
    async deleteJob() {
      this.deleteLoading = true;
      this.response = await this.$store.dispatch(
        "deleteJob",
        this.deleteJobDialog.job
      );
      this.deleteLoading = false;
      this.snackbar = true;
      this.deleteAlert = true;
      if (!this.response.error) this.closeDeleteDialog();
    },
    showDets(params) {
      if (this.det.show && this.det.params == params) {
        this.det.show = false;
        this.det.detArr = [];
        this.det.params = null;
        return;
      }
      this.det.show = true;
      if (params == "approvedJobs") {
        this.det.detArr = this.approvedJobs;
        this.det.params = params;
      } else if (params == "appliedJobs") {
        this.det.detArr = this.appliedJobs;
        this.det.params = params;
      } else if (params == "postedJobs") {
        this.det.detArr = this.postedJobs;
        this.det.params = params;
      } else {
        this.det.show = false;
        this.det.detArr = [];
        this.det.params = null;
      }
    },
    async saveDetails() {
      this.$refs.editDetailsForm.validate();
      this.userProfile.uid = auth.currentUser.uid;
      this.loading = true;
      this.response = await this.$store.dispatch(
        "saveNewDetails",
        this.userProfile
      );
      this.loading = false;
      this.snackbar = true;
    }
  }
};
</script>