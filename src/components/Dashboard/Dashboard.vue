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
    <h2 class="display-2 text-xs-center font-weight-thin">Dashboard</h2>
    <v-layout row wrap class="mt-5">
      <v-flex xs3 class="pr-3">
        <h4 class="title font-weight-regular pb-3" style="padding-left: 18px;">
          Constraints
          <v-icon right>filter_list</v-icon>
          </h4>
        <div>
          <v-expansion-panel expand v-model="constraints.panel" class="elevation-0 transparent">
            <v-expansion-panel-content ripple>
              <div slot="header" class="subheading">Job Area</div>
              <v-radio-group v-model="constraints.type">
                <v-radio style="padding-left: 24px;" color="red" label="Design" value="Design"></v-radio>
                <v-radio style="padding-left: 24px;" color="red" label="Web Development" value="Web Development"></v-radio>
              </v-radio-group>
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header" class="subheading">Duration</div>
              <v-radio-group v-model="constraints.duration">
                <v-radio style="padding-left: 24px;" color="red" label="1 Month" value="1"></v-radio>
                <v-radio style="padding-left: 24px;" color="red" label="2 Months" value="2"></v-radio>
                <v-radio style="padding-left: 24px;" color="red" label="3 Months" value="3"></v-radio>
                <v-radio style="padding-left: 24px;" color="red" label="4 Months" value="4"></v-radio>
                <v-radio style="padding-left: 24px;" color="red" label="5 Months" value="5"></v-radio>
                <v-radio style="padding-left: 24px;" color="red" label="6 Months" value="6"></v-radio>
              </v-radio-group>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <div v-if="constraints.panel[0] || constraints.panel[1]">
            <v-btn class="text-xs-center mx-auto d-block" color="blue" @click="findJobs" flat>Apply Constraints</v-btn>
            <v-btn class="text-xs-center mx-auto d-block" color="red" @click="clearConstraints" flat>Clear Constraints</v-btn>
          </div>
        </div>
      </v-flex>
      <v-flex xs9 class="pl-3">
        <div class="d-flex align-content-space-between mb-3">
            <h4 class="title font-weight-regular pb-3">Jobs Available</h4>
            <div class="text-xs-right" style="width:80px">
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
              <v-btn flat color="blue">Apply Now</v-btn>
              </div>
            </v-layout>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="jobChild.show">
              {{jobChild.description}}
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
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
                    :items="items"
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
                    :rules="[rules.required, rules.min]"
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
  </v-container>
</template>

<script>
import { auth } from "@/scripts/firebase";
export default {
  data: vm => ({
    show: false,
    noConstraints: true,
    dialog: false,
    dateMenu: false,
    loading: false,
    response: "",
    snackbar: false,
    alert: false,
    constraints: {
      noChange: true,
      type: null,
      duration: null,
      panel: [true, true]
    },
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
      min: v => v <= 10 || "Max 10 Vacancies"
    },
    jobs: null
    // availableJobs: [
    //   {
    //     id: 1,
    //     company: "Infosys Tech Solutions",
    //     requiredPosition: "Software Tester",
    //     positionsAvailable: 1,
    //     lastDate: "26th Nov",
    //     show: false,
    //     tag: "Design",
    //     estimatedDuration: "2 Months",
    //     details:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //   },
    //   {
    //     id: 1,
    //     company: "Infosys Tech Solutions",
    //     requiredPosition: "Web Designer",
    //     positionsAvailable: 1,
    //     lastDate: "26th Nov",
    //     show: false,
    //     tag: "Web Development",
    //     estimatedDuration: "6 Months",
    //     details:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //   }
    // ]
  }),
  async created() {
    var self = this;
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        self.$router.push("/login");
      }
    });
    await this.$store.dispatch("getJobs");
    this.jobs = this.availableJobs;
  },
  computed: {
    availableJobs() {
      return this.$store.getters.getJobs;
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
    async dialogClosed() {
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
                job.tag == this.constraints.type &&
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
      if (!this.response.error) this.clearJobForm();
    },
    clearJobForm() {
      this.$refs.addJobForm.reset();
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
</style>
