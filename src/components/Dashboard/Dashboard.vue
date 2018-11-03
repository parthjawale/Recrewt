<template>
  <v-container>
    <h2 class="display-2 text-xs-center font-weight-thin">Dashboard</h2>
    <v-layout row wrap class="mt-5">
      <v-flex xs3 class="pr-3">
        <h4 class="title font-weight-regular pb-3" style="padding-left: 18px;">Constraints</h4>
        <div>
          <v-expansion-panel expand v-model="constraints.panel" class="elevation-0 transparent">
            <v-expansion-panel-content ripple>
              <div slot="header" class="subheading">Job Area</div>
              <v-checkbox style="padding-left: 24px;" v-model="constraints.type" color="red" label="Design" value="Design"></v-checkbox>
              <v-checkbox style="padding-left: 24px;" v-model="constraints.type" color="red" label="Web Development" value="Web Development"></v-checkbox>
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header" class="subheading">Duration</div>
              <v-radio-group v-model="constraints.duration">
                <v-radio style="padding-left: 24px;" color="red" label="1 Month" value="1"></v-radio>
                <v-radio style="padding-left: 24px;" color="red" label="2 Months" value="2"></v-radio>
              </v-radio-group>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </div>
      </v-flex>
      <v-flex xs9 class="pl-3">
        <h4 class="title font-weight-regular pb-3">Job Offers</h4>
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
                <v-btn flat color="black" @click="show=!show">
                  More Details
                  <v-icon>
                    {{show ? 'expand_less' : 'expand_more'}}
                  </v-icon>
                </v-btn>
              </div>
              <div class="text-xs-right" style="width: 40px;">
              <v-btn flat color="blue">Apply Now</v-btn>
              </div>
            </v-layout>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show">
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
      constraints: {
        noChange: true,
        type: [],
        duration: null,
        panel: [true, true]
      },
      jobs: [{}],
      availableJobs: [
        {
          id: 1,
          company: "Infosys Tech Solutions",
          requiredPosition: "Software Tester",
          positionsAvailable: 1,
          lastDate: "26th Nov",
          show: false,
          tags: ["design"],
          estimatedDuration: "6 Months",
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
          tags: ["web"],
          estimatedDuration: "6 Months",
          details:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ]
    };
  },
  mounted() {
    this.findJobs();
  },
  methods: {
    findJobs: () => {
      console.log(this.constraints.noChange);
      if (
        this.constraints.type.length == 0 &&
        this.constraints.duration == null
      )
        return this.availableJobs;
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
