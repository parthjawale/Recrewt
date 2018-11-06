<template>
  <div>
    <preloader v-if="preloaderLoading"></preloader>
    <v-container v-if="!authorised && !preloaderLoading">
      <div class="text-xs-center" style="position: absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
      <h2 class="display-2 pb-4 text-xs-center">You Don't Belong Here</h2>
        <h4 class="body-2 font-weight-regular">You're trying to access a page which you are unauthorized to access.</h4>
        <v-btn flat color="blue" @click="goTo('/dashboard')">Take me to safety</v-btn>
      </div>
    </v-container>
    <v-container v-if="authorised && !preloaderLoading">
      <h2 class="display-2 text-xs-center font-weight-thin">Job Admin</h2>
      <v-layout row wrap class="mt-5 pt-5">
        <v-flex xs12 sm6>
          <p class="title font-weight-regular">Name: <span class="blue--text text--darken-3">{{ job.name }}</span></p>
        </v-flex>
        <v-flex xs12 sm6>
          <p class="title font-weight-regular">Purpose: <span class="blue--text text--darken-3">{{ job.purpose }}</span></p>
        </v-flex>
        <v-flex xs12 sm6>
          <p class="title font-weight-regular">Main Specialisation: <span class="blue--text text--darken-3">{{ job.specialisation }}</span></p>
        </v-flex>
        <v-flex xs12 sm6>
          <p class="title font-weight-regular">Other Skills Required: <span class="blue--text text--darken-3">{{ job.otherSkills }}</span></p>
        </v-flex>
        <v-flex xs12 sm6>
          <p class="title font-weight-regular">Last Date: <span class="blue--text text--darken-3">{{ job.lastDate }}</span></p>
        </v-flex>
        <v-flex xs12 sm6>
          <p class="title font-weight-regular">Positions Available: <span class="blue--text text--darken-3">{{ job.positionsAvailable }}</span></p>
        </v-flex>
        <v-flex xs12 sm6>
          <p class="title font-weight-regular">Duration: <span class="blue--text text--darken-3">{{ job.estimatedDuration }} Months</span></p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <h3 class="headline font-weight-regular text-xs-center mt-4 pb-4">Applications</h3>
        </v-flex>
        <v-flex xs12>
          <div class="mt-2 pt-5 text-xs-center" v-if="users == null || users.length == 0 || job == null">
            <v-progress-circular
              :size="55"
              :width="7"
              color="blue"
              v-if="job.appliedUsers.length > 0"
              indeterminate
              class="pb-4"
            ></v-progress-circular>
            <p class="headline" v-else>There are no Applications yet.</p>
          </div>
        </v-flex>
        <v-flex xs12 v-for="(user,index) in users" :key="index">
          <v-card>
            <v-card-title>
               <h2 class="font-weight-regular headline">
                {{ user.name }}
              <br>
              <span class="grey--text text--darken-2 font-weight-light subheading">
                Specialisation: <span class="blue--text text--darken-3 font-weight-light subheading">{{ user.specialisation }}</span>
              </span>
            </h2>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 sm6 md4>
                  <p class="subheading">
                    Age: <span class="blue--text text--darken-3">{{ user.age }}</span>
                  </p>
                </v-flex>
                
                <v-flex xs12 sm6 md4>
                  <p class="subheading">
                    College: <span class="blue--text text--darken-3">{{ user.college }}</span>
                  </p>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <p class="subheading">
                    CGPA: <span class="blue--text text--darken-3">{{ user.cgpa }}</span>
                  </p>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <p class="subheading">
                    12th Percentage: <span class="blue--text text--darken-3">{{ user.twelfthPercent }}%</span>
                  </p>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <p class="subheading">
                    Email: <a :href="`mailto:${user.email}`" class="no-class blue--text text--darken-3">{{ user.email }}</a>
                  </p>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <p class="subheading">
                    Mobile No: <a :href="`tel:${user.pno}`" class="no-class blue--text text--darken-3">+91-{{ user.pno }}</a>
                  </p>
                </v-flex>
                <v-flex xs12 class="mt-4">
                  <h2 class="title font-weight-regular">Why do you want this Job?</h2>
                  <br>
                  <h3 class="body-1 font-weight-regular">ANSWER:<br>
                   <span class="subheading font-weight-regular">{{ getAns(user.uid) }}</span>
                   </h3>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
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
  data() {
    return {
      jobId: null,
      job: null,
      authorised: false,
      preloaderLoading: true,
      users: []
    };
  },
  created() {
    this.jobId = this.$route.params.id;
    var self = this;
    self.preloaderLoading = true;
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        self.$router.push("/login");
      }
      if (user) {
        firestore
          .collection("jobs")
          .doc(self.jobId)
          .get()
          .then(function(doc) {
            var data = doc.data();
            if (data.user != user.uid) {
              self.authorised = false;
              self.preloaderLoading = false;
            } else {
              self.authorised = true;
              self.job = data;
              if (
                data.appliedUsers == undefined ||
                data.appliedUsers == null ||
                data.appliedUsers.length == 0
              ) {
                self.users = [];
                self.job.appliedUsers = [];
                self.preloaderLoading = false;
              } else {
                firestore
                  .collection("users")
                  .get()
                  .then(function(querySnapshot) {
                    querySnapshot.forEach(function(child) {
                      for (var i in data.appliedUsers) {
                        if (child.data().uid == data.appliedUsers[i].user) {
                          console.log("Child Data", child.data());
                          self.users.push(child.data());
                        }
                      }
                    });
                    self.preloaderLoading = false;
                  });
              }
            }
          });
      }
    });
  },
  methods: {
    goTo(param) {
      this.$router.push(param);
    },
    getAns(uid) {
      for (var i in this.job.appliedUsers) {
        if (this.job.appliedUsers[i].user == uid)
          return this.job.appliedUsers[i].answer;
      }
    }
  }
};
</script>

<style scoped>
a.no-class {
  color: initial;
  text-decoration: initial;
}
</style>

