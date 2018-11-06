import { firestore, auth } from "@/scripts/firebase";

export default {
  state: {
    jobs: [
      {
        name: "Infosys Tech Solutions",
        requiredPosition: "Software Tester",
        positionsAvailable: 1,
        lastDate: "26th Nov",
        show: false,
        tag: "Design",
        estimatedDuration: "2 Months",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    ]
  },
  getters: {
    getJobs: state => {
      return state.jobs;
    }
  },
  mutations: {
    setJobs: (state, payload) => {
      state.jobs = payload;
    },
    addJob: (state, payload) => {
      state.jobs.push(payload);
    }
  },
  actions: {
    getJobs: async ({ commit }) => {
      //Firebase code here
      var jobs = [];
      await firestore
        .collection("jobs")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(child) {
            jobs.push(child.data());
          });
          commit("setJobs", jobs);
        });
    },
    addJob: async ({}, payload) => {
      payload.status = "Posted";
      let message;
      let error = false;
      var jobsRef = firestore.collection("jobs").doc();
      payload.jobId = jobsRef.id;
      await firestore
        .collection("jobs")
        .doc(jobsRef.id)
        .set(payload)
        .then(function() {
          message = "Your Job has been posted. Thank you.";
          error = false;
          firestore
            .collection("users")
            .doc(payload.user)
            .get()
            .then(function(doc) {
              var data = doc.data();
              var postedJobs = data.postedJobs;
              if (postedJobs != undefined || postedJobs != null) {
                postedJobs.push(jobsRef.id);
              } else {
                postedJobs = [];
                postedJobs.push(jobsRef.id);
              }
              firestore
                .collection("users")
                .doc(payload.user)
                .update({
                  postedJobs: postedJobs
                });
            });
        })
        .catch(function(error) {
          error = true;
          message = error.message;
        });
      var response = {
        error: error,
        message: message
      };
      return response;
    },
    applyForJob: async ({}, payload) => {
      var response = {
        message: "You've applied for this job successfully.",
        error: false
      };
      var f = 0;
      await firestore
        .collection("jobs")
        .doc(payload.jobId)
        .get()
        .then(
          function(doc) {
            var appliedUsers = [];
            if (
              doc.data().appliedUsers == undefined ||
              doc.data().appliedUsers == null
            ) {
              appliedUsers = [];
            } else {
              appliedUsers = doc.data().appliedUsers;
              for (var i in appliedUsers) {
                if (appliedUsers[i].user == payload.user) {
                  response.message = "You've already applied for this job.";
                  response.error = true;
                  return response;
                }
              }
            }
            if (
              doc.data().approvedUsers != undefined &&
              doc.data().approvedUsers != null &&
              doc.data().approvedUsers.length != 0
            ) {
              for (var i in doc.data().approvedUsers) {
                if (doc.data().approvedUsers[i].user == payload.user) {
                  response.message =
                    "You've been approved for this job already.";
                  response.error = true;
                  return response;
                }
              }
            }
            var child = {
              user: payload.user,
              answer: payload.answer
            };
            appliedUsers.push(child);
            firestore
              .collection("jobs")
              .doc(payload.jobId)
              .update({
                appliedUsers: appliedUsers
              })
              .then(
                function() {
                  firestore
                    .collection("users")
                    .doc(payload.user)
                    .get()
                    .then(
                      function(userDoc) {
                        var appliedJobs = [];
                        if (
                          userDoc.data().appliedJobs != undefined &&
                          userDoc.data().appliedJobs != null &&
                          userDoc.data().appliedJobs.length != 0
                        ) {
                          appliedJobs = userDoc.data().appliedJobs;
                        } else {
                          appliedJobs = [];
                        }
                        var childT = {
                          jobId: payload.jobId,
                          answer: payload.answer
                        };
                        appliedJobs.push(childT);
                        firestore
                          .collection("users")
                          .doc(payload.user)
                          .update({
                            appliedJobs: appliedJobs
                          })
                          .then(
                            function() {
                              response.message =
                                "You've applied for this job successfully.";
                              response.error = false;
                            },
                            function(e) {
                              response.message = e.message;
                              response.error = true;
                            }
                          );
                      },
                      function(e) {
                        response.message = e.message;
                        response.error = true;
                      }
                    );
                },
                function(e) {
                  response.message = e.message;
                  response.error = true;
                }
              );
          },
          function(e) {
            response.message = e.message;
            response.error = true;
          }
        );
      return response;
    },
    approveCandidate({}, payload) {
      var i;
      var approvedUsers = [];
      var response = {
        message: payload.user.name.split(" ")[0] + " has been approved.",
        error: false
      };
      if (
        payload.job.approvedUsers != undefined &&
        payload.job.approvedUsers != null
      ) {
        approvedUsers = payload.job.approvedUsers;
        for (i in approvedUsers) {
          if (approvedUsers[i].user == payload.user.uid) {
            response.error = true;
            response.message = "This user has already been approved.";
            return response;
          }
        }
      }
      for (i in payload.job.appliedUsers) {
        if (payload.job.appliedUsers[i].user == payload.user.uid) break;
      }
      var appliedUsers = payload.job.appliedUsers.filter(
        user => user.user !== payload.user.uid
      );
      approvedUsers.push(payload.job.appliedUsers[i]);
      firestore
        .collection("jobs")
        .doc(payload.job.jobId)
        .update({
          approvedUsers: approvedUsers,
          appliedUsers: appliedUsers
        })
        .then(
          function() {
            firestore
              .collection("users")
              .doc(payload.user.uid)
              .get()
              .then(
                function(doc) {
                  var data = doc.data();
                  var approvedJobs = [];
                  if (
                    data.approvedJobs != undefined &&
                    data.approvedJobs != null &&
                    data.approvedJobs.length != 0
                  ) {
                    approvedJobs = data.approvedJobs;
                  }
                  var child = payload.job.appliedUsers[i];
                  var appliedJobs = data.appliedJobs.filter(
                    job => job.jobId !== payload.job.jobId
                  );
                  delete child["user"];
                  child.jobId = payload.job.jobId;
                  approvedJobs.push(child);
                  firestore
                    .collection("users")
                    .doc(payload.user.uid)
                    .update({
                      approvedJobs: approvedJobs,
                      appliedJobs: appliedJobs
                    })
                    .then(
                      function() {
                        response.error = false;
                      },
                      function(error) {
                        response.error = true;
                        response.message = error.message;
                      }
                    );
                },
                function(error) {
                  response.error = true;
                  response.message = error.message;
                }
              );
          },
          function(error) {
            response.error = true;
            response.message = error.message;
          }
        );
      return response;
    }
  }
};
