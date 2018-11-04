<template>
  <v-container>
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
                <v-radio style="padding-left: 24px;" color="red" label="1 Month" value="1 Month"></v-radio>
                <v-radio style="padding-left: 24px;" color="red" label="2 Months" value="2 Months"></v-radio>
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
        <h4 class="title font-weight-regular pb-3">Jobs Available</h4>
        <v-card class="mb-4" v-for="(job,index) in jobs" :key="index">
          <v-card-title>
            <h2 class="font-weight-regular headline">
                {{job.requiredPosition}}
              <br>
              <span class="grey--text text--darken-2 font-weight-light subheading">{{job.company}}</span>
            </h2>
          </v-card-title>
          <v-card-text>
            <div class="d-flex align-content-space-between">
              <p class="text-xs-left">
                Estimated Duration
                <br>
                <span class="grey--text text--darken-1">{{job.estimatedDuration}}</span>
              </p>
              <p class="text-xs-center">
                Apply By 
                <br>
                <span class="grey--text text--darken-1">{{job.lastDate}}</span>
              </p>
              <p class="text-xs-right">
                No Of Positions Available 
                <br>
                <span class="grey--text text--darken-1">{{job.positionsAvailable}}</span>
              </p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-layout d-flex align-content-space-between>
              <div style="width: 40px;">
                <v-btn flat color="black" @click="job.show=!job.show">
                  More Details
                  <v-icon>
                    {{job.show ? 'expand_less' : 'expand_more'}}
                  </v-icon>
                </v-btn>
              </div>
              <div class="text-xs-right" style="width: 40px;">
              <v-btn flat color="blue">Apply Now</v-btn>
              </div>
            </v-layout>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="job.show">
              {{job.details}}
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      noConstraints: true,
      constraints: {
        noChange: true,
        type: null,
        duration: null,
        panel: [true, true]
      },
      filters: {
        panel: [false]
      },
      jobs: [],
      availableJobs: [
        {
          id: 1,
          company: "Infosys Tech Solutions",
          requiredPosition: "Software Tester",
          positionsAvailable: 1,
          lastDate: "26th Nov",
          show: false,
          tag: "Design",
          estimatedDuration: "2 Months",
          details:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          id: 1,
          company: "Infosys Tech Solutions",
          requiredPosition: "Web Designer",
          positionsAvailable: 1,
          lastDate: "26th Nov",
          show: false,
          tag: "Web Development",
          estimatedDuration: "6 Months",
          details:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ]
    };
  },
  created() {
    this.jobs = this.availableJobs;
  },
  methods: {
    findJobs() {
      if (this.constraints.type == null && this.constraints.duration == null)
        this.jobs = this.availableJobs;
      else {
        this.jobs = this.availableJobs.filter(job => {
          if (this.constraints.duration == null)
            return job.tag == this.constraints.type;
          else {
            console.log("in");
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
