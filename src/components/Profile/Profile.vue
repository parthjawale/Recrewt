<template>
  <v-container>
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
            <h4 class="title font-weight-regular">College: <span class="blue--text text--darken-3">{{userProfile.college}}</span> </h4>
          </v-flex>
          <v-flex xs12 sm6 class="pb-3">
            <h4 class="title font-weight-regular">Email: <span class="blue--text text--darken-3">{{userProfile.email}}</span> </h4>
          </v-flex>
          <v-flex xs12 sm6 class="pb-3">
            <h4 class="title font-weight-regular">Mobile No: <span class="blue--text text--darken-3">+91-{{userProfile.pno}}</span> </h4>
          </v-flex>
          <v-flex xs12 sm6 class="pb-3">
            <h4 class="title font-weight-regular">GPA: <span class="blue--text text--darken-3">{{userProfile.gpa}}</span> </h4>
          </v-flex>
          <v-flex xs12 sm6 class="pb-3">
            <h4 class="title font-weight-regular">12th Percentage: <span class="blue--text text--darken-3">{{userProfile.twelfthPercent}}%</span> </h4>
          </v-flex>
          <v-flex xs6 sm3>
            <v-btn dark>Edit Details</v-btn>
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
      </v-flex>
    </v-layout>
    <v-layout column class="pt-5" v-show="det.show">
      <v-card class="mb-4" v-for="(job,index) in det.detArr" :key="index">
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
          </v-layout>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="job.show">
            {{job.details}}
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { auth } from "@/scripts/firebase";
export default {
  data() {
    return {
      det: {
        detArr: [],
        show: false,
        params: null
      },
      userProfile: {
        name: "Parth Jawale",
        specialisation: "Graphic Design",
        gpa: "9.63",
        twelfthPercent: "97.5",
        age: 20,
        approvedJobs: [
          {
            id: 1,
            company: "Vatika Infotech",
            requiredPosition: "Graphic Designer",
            positionsAvailable: 6,
            lastDate: "25th Nov",
            estimatedDuration: "2 Months",
            show: false,
            details:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        ],
        appliedJobs: [
          {
            id: 1,
            company: "Infosys Tech Solutions",
            requiredPosition: "Software Tester",
            positionsAvailable: 1,
            lastDate: "26th Nov",
            show: false,
            estimatedDuration: "6 Months",
            details:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        ],
        postedJobs: [
          {
            id: 1,
            company: "Micrsoft Tech Solutions",
            requiredPosition: "Web Developer",
            positionsAvailable: 2,
            lastDate: "27th Nov",
            show: false,
            estimatedDuration: "4 Months",
            details:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {
            id: 1,
            company: "Micrsoft Tech Solutions",
            requiredPosition: "Web Developer",
            positionsAvailable: 2,
            lastDate: "27th Nov",
            show: false,
            estimatedDuration: "4 Months",
            details:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        ],
        college: "Manipal University Jaipur",
        email: "parth.jawale24@gmail.com",
        pno: "9967346462"
      }
    };
  },
  created() {
    var self = this;
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        self.$router.push("/login");
      }
    });
  },
  methods: {
    showDets(params) {
      if (this.det.show && this.det.params == params) {
        this.det.show = false;
        this.det.detArr = [];
        this.det.params = null;
        return;
      }
      this.det.show = true;
      if (params == "approvedJobs") {
        this.det.detArr = this.userProfile.approvedJobs;
        this.det.params = params;
      } else if (params == "appliedJobs") {
        this.det.detArr = this.userProfile.appliedJobs;
        this.det.params = params;
      } else if (params == "postedJobs") {
        this.det.detArr = this.userProfile.postedJobs;
        this.det.params = params;
      } else {
        this.det.show = false;
        this.det.detArr = [];
        this.det.params = null;
      }
    }
  }
};
</script>