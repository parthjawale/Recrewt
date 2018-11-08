import { firestore, auth } from "@/scripts/firebase";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  state: {
    user: null
  },
  getters: {
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    getUser: ({ commit }) => {
      commit("setUser", auth.currentUser);
    },
    resetPassword: async ({}, payload) => {
      var response = {
        message:
          "Password reset link has been mailed to the email associated with this account.",
        error: false
      };
      await auth
        .sendPasswordResetEmail(payload.email)
        .then(function() {
          response.message =
            "Password reset link has been mailed to the email associated with this account.";
          response.email = false;
        })
        .catch(function(error) {
          response.error = true;
          response.message = error.message;
        });
      return response;
    },
    changePassword: async ({}, payload) => {
      const user = auth.currentUser;
      var response = {
        message: "Password Successfully Changed",
        error: false
      };
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        payload.oldPassword
      );
      await user
        .reauthenticateAndRetrieveDataWithCredential(credential)
        .then(function() {
          user
            .updatePassword(payload.newPassword)
            .then(function() {
              response.error = false;
              response.message = "Password Successfully Changed.";
            })
            .catch(function(error) {
              response.error = true;
              response.message = error.message;
            });
        })
        .catch(function(error) {
          response.error = true;
          response.message = error.message;
        });
      return response;
    },
    loginUser: async ({ commit }, payload) => {
      let message;
      let errorValue = true;
      try {
        await auth
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(function(user) {
            commit("setUser", user.user);
            errorValue = false;
            message =
              "Hello " +
              user.user.displayName.split(" ")[0] +
              ". Welcome back.";
          })
          .catch(function(error) {
            if (error.code == "auth/invalid-email") {
              message = "Invalid Email.";
            } else if (error.code == "auth/user-disabled") {
              message = "User is Disabled.";
            } else if (error.code == "auth/user-not-found") {
              message = "User not found. Please Sign Up.";
            } else if (error.code == "auth/wrong-password") {
              message = "Wrong Password. Please try again.";
            } else {
              message = error.message;
            }
          });
      } catch (ex) {
        alert(ex);
      }
      var response = {
        errorValue: errorValue,
        message: message
      };
      return response;
    },
    saveNewDetails: async ({ commit }, payload) => {
      let message;
      let error = false;
      await firestore
        .collection("users")
        .doc(payload.uid)
        .update(payload)
        .then(function() {
          message = "Details updated successfully.";
          commit("setUser", payload);
        })
        .catch(function(error) {
          message = error.message;
        });
      var response = {
        message: message,
        error: error
      };
      return response;
    },
    signUpUser: async ({ commit }, payload) => {
      let noError = true;
      let message;
      payload.college = "Manipal University Jaipur";
      try {
        await auth
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then(
            function(user) {
              delete payload["password"];
              var userProf = auth.currentUser;
              userProf
                .updateProfile({
                  displayName: payload.name
                })
                .then(function() {
                  payload.uid = user.user.uid;
                  firestore
                    .collection("users")
                    .doc(user.user.uid)
                    .set(payload)
                    .then(
                      function() {
                        commit("setUser", user.user);
                      },
                      function(error) {
                        noError = false;
                        message = error.message;
                      }
                    );
                });
            },
            function(error) {
              noError = false;
              message = error.message;
            }
          );
      } catch (ex) {
        alert(ex);
      }
      if (noError)
        message =
          "Hello " + payload.name.split(" ")[0] + ". Thank you for signing up.";
      var response = {
        errorValue: noError,
        message: message
      };
      return response;
    }
  }
};
