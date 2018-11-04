import { firestore, auth } from "@/scripts/firebase";

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
    loginUser: async ({ commit }, payload) => {
      let message;
      try {
        await auth
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(function(user) {
            commit("setUser", user.user);
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
      return message;
    },
    signUpUser: async ({ commit }, payload) => {
      let noError = true;
      let message;
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
        return (
          "Hello " + payload.name.split(" ")[0] + ". Thank you for signing up."
        );
      else return message;
    }
  }
};
