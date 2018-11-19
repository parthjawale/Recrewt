<template>
  <div>
    <preloader v-if="preloaderLoading"></preloader>
    <v-container v-else>
      <v-navigation-drawer class="toolbar-fixing" fixed hide-overlay v-model="drawer">
        <v-layout>
          <v-flex xs12>
            <v-toolbar flat>
              <v-toolbar-side-icon @click="drawer=!drawer"></v-toolbar-side-icon>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title class="title">
                    Constraints
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list>
              <v-expansion-panel expand v-model="constraints.panel" class="elevation-0 transparent">
                <v-expansion-panel-content ripple>
                  <div slot="header" class="subheading">Job Area</div>
                  <v-radio-group v-model="constraints.type">
                    <v-radio style="padding-left: 24px;" color="red" :label="skill" :value="skill" v-for="(skill,index) in skills" :key="index"></v-radio>
                  </v-radio-group>
                </v-expansion-panel-content>
                <v-expansion-panel-content ripple>
                  <div slot="header" class="subheading">Duration</div>
                  <v-radio-group v-model="constraints.duration">
                    <v-radio style="padding-left: 24px;" color="red" v-for="(duration, index) in durations" v-if="duration == 1" :key="index" :label="`${duration} Month`" :value="duration"></v-radio>
                    <v-radio style="padding-left: 24px;" color="red" v-for="(duration, index) in durations" v-if="duration > 1" :key="index" :label="`${duration} Months`" :value="duration"></v-radio>
                  </v-radio-group>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <div v-if="constraints.panel[0] || constraints.panel[1]">
                <v-btn class="text-xs-center mx-auto d-block" color="blue" @click="findJobs" flat>Apply Constraints</v-btn>
                <v-btn class="text-xs-center mx-auto d-block" color="red" @click="clearConstraints" flat>Clear Constraints</v-btn>
              </div>
              <div class="pl-4">
                <small>* Jobs posted by you will not be visible. <br>Please go to <router-link tag="a" to="/profile" class="blue--text text--darken-2" style="text-decoration:none;">Profile</router-link> to view those jobs.</small>
              </div>
            </v-list>
          </v-flex>  
        </v-layout>
      </v-navigation-drawer>
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
      <div :class="drawer ? 'navbar-fixing' : '' ">
        <h2 class="display-2 text-xs-center font-weight-thin">Dashboard</h2>
        <v-layout row wrap class="mt-5">
          <!-- <v-flex xs3 class="pr-3">
            <h4 class="title font-weight-regular pb-3" style="padding-left: 18px;">
              Constraints
              <v-icon right>filter_list</v-icon>
              </h4>
            <div>
              <v-expansion-panel expand v-model="constraints.panel" class="elevation-0 transparent">
                <v-expansion-panel-content ripple>
                  <div slot="header" class="subheading">Job Area</div>
                  <v-radio-group v-model="constraints.type">
                    <v-radio style="padding-left: 24px;" color="red" :label="skill" :value="skill" v-for="(skill,index) in skills" :key="index"></v-radio>
                  </v-radio-group>
                </v-expansion-panel-content>
                <v-expansion-panel-content ripple>
                  <div slot="header" class="subheading">Duration</div>
                  <v-radio-group v-model="constraints.duration">
                    <v-radio style="padding-left: 24px;" color="red" v-for="(duration, index) in durations" v-if="duration == 1" :key="index" :label="`${duration} Month`" :value="duration"></v-radio>
                    <v-radio style="padding-left: 24px;" color="red" v-for="(duration, index) in durations" v-if="duration > 1" :key="index" :label="`${duration} Months`" :value="duration"></v-radio>
                  </v-radio-group>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <div v-if="constraints.panel[0] || constraints.panel[1]">
                <v-btn class="text-xs-center mx-auto d-block" color="blue" @click="findJobs" flat>Apply Constraints</v-btn>
                <v-btn class="text-xs-center mx-auto d-block" color="red" @click="clearConstraints" flat>Clear Constraints</v-btn>
              </div>
              <small>* Jobs posted by you will not be visible. <br>Please go to <router-link tag="a" to="/profile" class="blue--text text--darken-2" style="text-decoration:none;">Profile</router-link> to view those jobs.</small>
            </div>
          </v-flex> -->
          <v-flex class="pl-3">
            <div class="d-flex align-content-space-between mb-3">
                <h4 class="title font-weight-regular pb-3">Jobs Available</h4>
                <div class="text-xs-right" style="width:80px">
                  <v-btn class="indigo--text text--darken-3" @click="drawer=!drawer">Constraints</v-btn>
                  <v-btn class="indigo--text text--darken-3" @click="dialog=true">Post New Job</v-btn>
                </div>
            </div>
            <v-alert
              :value="alert"
              type="info"
              class="mb-4"
              outline
            >
              Congrats on Posting your Job! Please Reload to see changes.
            </v-alert>
            <div class="mt-5 pt-5 text-xs-center" v-if="jobs == null || jobs.length == 0">
              <v-progress-circular
                :size="55"
                :width="7"
                color="blue"
                v-if="!jobs != 0"
                indeterminate
              ></v-progress-circular>
              <h4 class="subheading mt-4">Post a new job to get it going.</h4>
              <v-btn class="indigo--text text--darken-3 mt-2" @click="dialog=true">Post New Job</v-btn>
            </div>
            <div v-if="jobs.length > 0">
              <v-card class="mb-4" v-for="(jobChild,index) in jobs" :key="index">
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

                      <span class="grey--text text--darken-1" v-else>{{jobChild.estimatedDuration}} Months</span>              </p>
                    <p class="text-xs-center">
                      Apply By 
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
                    <div class="text-xs-right" style="width: 40px;">
                      <v-btn flat color="blue" disabled v-if="jobChild.alreadyApproved">Already Approved</v-btn>
                      <v-btn flat color="blue" disabled v-if="jobChild.alreadyApplied">Already Applied</v-btn>
                      <v-btn flat color="blue" v-if="!jobChild.alreadyApproved && !jobChild.alreadyApplied" @click="openApplyDialog(jobChild.jobId, index)">Apply Now</v-btn>
                    </div>
                  </v-layout>
                </v-card-actions>
                <v-slide-y-transition>
                  <v-card-text v-show="jobChild.show">
                    <p class="px-2">
                      Purpose: {{jobChild.purpose}}
                      <br>
                    {{jobChild.description}}
                    </p>
                  </v-card-text>
                </v-slide-y-transition>
              </v-card>
            </div>
            
          </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title class="text-xs-center">
              <h2 class="headline">Post New Job</h2>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-form ref="addJobForm" @submit.prevent="addJob">
                  <v-layout wrap>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Name/Title"
                        v-model="job.name"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Purpose"
                        v-model="job.purpose"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-autocomplete
                        :items="allSkills"
                        v-model="job.specialisation"
                        label="Select Main Area"
                        :rules="[rules.required]"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Other Skills Required"
                        v-model="job.otherSkills"
                        :rules="[rules.required]"
                        hint="Please separate using a comma"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        type="number"
                        label="No of Vacancies"
                        v-model="job.positionsAvailable"
                        :rules="[rules.required, rules.min, rules.positions]"
                        hint="Enter No of Positions Available"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-autocomplete
                        type="number"
                        :items="[1,2,3,4,5,6]"
                        v-model="job.estimatedDuration"
                        label="Estimated Duration"
                        :rules="[rules.required]"
                        hint="Enter the Job Timespan"
                        suffix="Months"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-menu
                        :close-on-content-click="false"
                        v-model="dateMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="computedDateFormatted"
                          label="Enter Last Date"
                          :rules="[rules.required]"
                          hint="Last Date for Applications"
                          persistent-hint
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="date" no-title @input="dateMenu = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        label="Job Description"
                        v-model="job.description"
                        :rules="[rules.required]"
                        rows="1"              
                        auto-grow
                        hint="Please Enter the Job Description"
                        persistent-hint
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
              <small>*Your Contact Information will be shared with the person applying.</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialogClosed" :disabled="loading">Close</v-btn>
              <v-btn color="blue darken-1" flat @click.native="clearJobForm" :disabled="loading">Clear Fields</v-btn>
              <v-btn color="blue darken-1" flat @click.native="addJob" :loading = "loading" :disabled="loading">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="applyDialog.switch" persistent max-width="600px" v-if="jobs != null">
          <v-card>
            <v-card-title class="text-xs-center">
              <h2 class="headline text-capitalize">Apply For {{jobs[applyDialog.index].name}} Job</h2>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-form @submit.prevent="" ref="applyForm">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <h3 class="subheading font-weight-subheading">Answer this question to continue.</h3>
                      <v-textarea
                        rows="1"
                        auto-grow
                        label="Why do you want this Job?"
                        counter="100"
                        hint="Please do not exceed 100 Characters."
                        :rules="[rules.required, rules.question]"
                        value=""
                        v-model="whyQuestion"
                        persistent-hint
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="closeApplyForm" :disabled="loading">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="applyForJob" :loading = "loading" :disabled="loading">Apply</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
import { firestore, auth } from "@/scripts/firebase";
import Preloader from "@/components/Common/Preloader";
export default {
  components: {
    preloader: Preloader
  },
  data: vm => ({
    show: false,
    noConstraints: true,
    dialog: false,
    applyDialog: {
      switch: false,
      job: null,
      index: 0
    },
    dateMenu: false,
    loading: false,
    response: "",
    snackbar: false,
    preloaderLoading: true,
    userProfile: {},
    alert: false,
    drawer: true,
    constraints: {
      noChange: true,
      type: null,
      duration: null,
      panel: [false, false]
    },
    skills: [],
    durations: [],
    whyQuestion: "",
    items: ["Design", "Web Development", "Content Writing"],
    job: {
      name: null,
      purpose: null,
      show: false,
      specialisation: null,
      otherSkills: null,
      positionsAvailable: null,
      estimatedDuration: null,
      description: null
    },
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    rules: {
      required: value => !!value || "Required.",
      min: v => v <= 10 || "Max 10 Vacancies",
      positions: v => v > 0 || "No of vacancies must atleast be 1.",
      question: v => v.length <= 100 || "Max 100 Characters."
    },
    jobs: [
      {
        name: "",
        purpose: "",
        show: false,
        specialisation: "",
        otherSkills: "",
        positionsAvailable: 0,
        estimatedDuration: 0,
        description: ""
      }
    ],
    availableJobs: []
  }),
  async created() {
    var self = this;
    this.preloaderLoading = true;
    var userP;
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        self.$router.push("/login");
      }
      if (user) {
        self.preloaderLoading = true;
        firestore
          .collection("users")
          .doc(user.uid)
          .get()
          .then(function(doc) {
            self.userProfile = doc.data();
            var flag = 0;
            self.availableJobs = self.$store.getters.getJobs;
            var jobs = self.availableJobs;
            var avJobs = [];
            for (var i in jobs) {
              for (var j in self.userProfile.postedJobs) {
                if (self.userProfile.postedJobs[j] == jobs[i].jobId) {
                  flag = 1;
                }
              }
              if (flag == 0) avJobs.push(jobs[i]);
              flag = 0;
            }
            flag = 0;
            for (var i in avJobs) {
              for (var j in self.userProfile.approvedJobs) {
                if (self.userProfile.approvedJobs[j].jobId == avJobs[i].jobId) {
                  flag = 1;
                  avJobs[i].alreadyApproved = true;
                }
              }
              if (flag == 0) avJobs[i].alreadyApproved = false;
              flag = 0;
            }
            for (var i in avJobs) {
              for (var j in self.userProfile.appliedJobs) {
                if (self.userProfile.appliedJobs[j].jobId == avJobs[i].jobId) {
                  flag = 1;
                  avJobs[i].alreadyApplied = true;
                }
              }
              if (flag == 0) avJobs[i].alreadyApplied = false;
              flag = 0;
            }
            self.availableJobs = avJobs;
            var skillsSet = new Set();
            var durationsSet = new Set();
            for (var i in avJobs) {
              skillsSet.add(avJobs[i].specialisation);
            }
            for (var i in avJobs) {
              durationsSet.add(avJobs[i].estimatedDuration);
            }
            self.skills = [...skillsSet];
            self.durations = [...durationsSet];
            self.durations.sort();
            self.jobs = self.availableJobs;
            self.preloaderLoading = false;
          });
      }
    });
    this.preloaderLoading = true;
    await self.$store.dispatch("getJobs");
    self.jobs = self.availableJobs;
    this.preloaderLoading = false;
  },
  computed: {
    allSkills() {
      return this.$store.getters.getSkills;
    },

    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date: function(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },

  methods: {
    async applyForJob() {
      var payload = {
        jobId: this.applyDialog.job,
        answer: this.whyQuestion,
        user: auth.currentUser.uid
      };
      this.loading = true;
      this.response = await this.$store.dispatch("applyForJob", payload);
      this.loading = false;
      this.snackbar = true;
      if (!this.response.error) this.closeApplyForm();
    },
    closeApplyForm() {
      this.applyDialog.switch = false;
      this.applyDialog.index = 0;
      this.applyDialog.job = null;
      this.$refs.applyForm.reset();
      // console.clear();
    },
    openApplyDialog(param, index) {
      this.applyDialog.switch = true;
      this.applyDialog.job = param;
      this.applyDialog.index = index;
    },
    dialogClosed() {
      this.dialog = false;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    findJobs() {
      if (this.constraints.type == null && this.constraints.duration == null)
        this.jobs = this.availableJobs;
      else {
        this.jobs = this.availableJobs.filter(job => {
          if (this.constraints.duration == null)
            return job.specialisation == this.constraints.type;
          else {
            if (this.constraints.type == null)
              return job.estimatedDuration == this.constraints.duration;
            else
              return (
                job.specialisation == this.constraints.type &&
                job.estimatedDuration == this.constraints.duration
              );
          }
        });
      }
    },
    async addJob() {
      var validated = this.$refs.addJobForm.validate();
      if (!validated) return;
      this.job.lastDate = this.computedDateFormatted;
      this.job.user = auth.currentUser.uid;
      this.loading = true;
      this.response = await this.$store.dispatch("addJob", this.job);
      this.loading = false;
      this.snackbar = true;
      this.alert = true;
      if (!this.response.error) {
        this.clearJobForm();
        this.dialog = false;
      }
    },
    clearJobForm() {
      this.$refs.addJobForm.reset();
      this.date = new Date().toISOString().substr(0, 10);
      this.dateFormatted = this.formatDate(
        new Date().toISOString().substr(0, 10)
      );
    },
    clearConstraints() {
      this.constraints.type = null;
      this.constraints.duration = null;
      this.jobs = this.availableJobs;
    }
  }
};
</script>

<style scoped>
.v-expansion-panel__container {
  background: transparent !important;
}
.v-expansion-panel__header {
  padding-left: 0 !important;
}
.toolbar-fixing {
  padding-top: 64px;
}
.navigation-drawer {
  margin-top: 64px !important;
}
.navbar-fixing {
  padding-left: 300px;
}
@media screen and (max-width: 768px) {
  .navbar-fixing {
    padding-left: 0px;
  }
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
