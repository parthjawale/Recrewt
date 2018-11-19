<template>
<v-app>
    <!-- Parallax 1 -->
    <section>
        <v-parallax :src="manipal" height="700">
            <v-layout align-center column justify-center class="white--text">
                <!-- <img :src="logo" alt="Vuetify.js" height="200"> -->
                <!-- <h1 class="black--text text-xs-center">ReCrewt</h1>
                <div class="subheading black--text mb-3 text-xs-center">The Best Way to get start your work</div> -->
                <!-- <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
                    Get Started
                </v-btn> -->
            </v-layout>
        </v-parallax>
    </section>

    <!-- About ReCrewt -->
    <section>
        <v-layout row wrap class="my-5">
            <v-flex xs12 class="my-3">
                <div class="">
                    <h1 class="text-xs-center" style="font-family:'Monospace'; font-size:40px;">ABOUT ReCrewt</h1>
                    <div class="sunheading text-xs-center mb-5">" The best way to start Work "</div>
                    <h2 class="ml-2 mr-2 px-5 font-weight-light" style="text-align: justify;">ReCrewt is an online portal providina a working envieonment to or for an individual and caters to the need of students of Manipal University Jaipur. Many people face problem that they want to work on projects but don't have people with specific skill-set. ReCrewt helps them in meeting the right people to create a working environment conducve for the neede task. ReCrewt welcomes students who requires an individual (another person) with a particular skill-set and also students with a particular skill and willing to work or looking for work.</h2>

                </div>
            </v-flex>
        </v-layout>
    </section>

    <!-- How ReCrwt Works -->
    <!-- Hire -->
    <section>
        <v-layout row wrap class="my-3" justify-center>
            <v-flex xs12 sm4 class="my-3">
                <div class="text-xs-center">
                    <h1 class="mb-5 " style="font-family:'Monospace'; font-size:40px;">HOW ReCrewt WORKS </h1>
                    <h2 class="">
                        Want to Hire Candidate(s)?</h2>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-layout row wrap align-center>
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0 transparent">
                            <v-card-text class="text-xs-center">
                                <v-icon size=100 class="grey--text">picture_in_picture</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline font-weight-light text-xs-center">Post a Job</div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0 transparent">
                            <v-card-text class="text-xs-center">
                                <v-icon size=100 class="green--text">done_all</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline font-weight-light">Approve Candidates</div>
                            </v-card-title>
                            <v-card-text>

                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0 transparent">
                            <v-card-text class="text-xs-center">
                                <v-icon size=100 class="brown--text">fas fa-briefcase</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline font-weight-light text-xs-center">Start Your Work</div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </section>

    <!-- Parallax 2 -->
    <section>
        <v-parallax :src="college" height="340">
        </v-parallax>
    </section>

    <!-- Work -->
    <section>
        <v-layout row wrap justify-center>
            <v-flex xs12 sm4 class="my-5">
                <div class="text-xs-center">
                    <h2 class="">
                        Want to work in project(s) ?</h2>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-layout row wrap align-center>
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0 transparent">
                            <v-card-text class="text-xs-center">
                                <v-icon size=100 class="black--text">search</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline font-weight-light text-xs-center">Search a Job</div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0 transparent">
                            <v-card-text class="text-xs-center">
                                <v-icon size=100 class="orange--text">thumb_up</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline font-weight-light">Wait for Approval</div>
                            </v-card-title>
                            <v-card-text>

                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0 transparent">
                            <v-card-text class="text-xs-center">
                                <v-icon size=100 class="light-blue--text">fas fa-briefcase</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline font-weight-light  text-xs-center">Start Working</div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </section>

    <!-- Contact US -->
    <section>
        <v-layout row wrap class="my-5">
            <v-flex xs12 class="my-3">
                <div class="">
                    <h1 class="text-xs-center mb-5 " style="font-family:'Monospace'; font-size:40px;">CONTACT US</h1>
                </div>
            </v-flex>
            <!-- Parth -->
            <v-flex xs12 sm3>
                <v-card class="elevation-0 transparent">
                    <v-card-title primary-title>
                        <v-layout row wrap justify-center>
                            <v-flex xs12 class="text-xs-center">
                                <v-avatar size=150>
                                    <img
                                        :src="parth"
                                        alt="Parth"
                                    >
                                    </v-avatar>
                            </v-flex>
                            <v-flex xs12 class="text-xs-center mt-2">
                                <h2 class="headine">Parth Jawale</h2>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-list class="transparent">
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="green--text" left>fab fa-whatsapp</v-icon>
                                    <a href="tel:9967346462" style="text-decoration:none; color:black"><span class="ml-4">+91-9967346462</span></a>
                                </v-flex>
                            </v-layout>
                        </v-list-tile>
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="primary--text">place</v-icon>
                                    <span class="ml-4">Manipal University Jaipur</span>
                                </v-flex>
                            </v-layout>
                        </v-list-tile>
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="error--text">fas fa-envelope</v-icon>
                                    <span class="ml-4">parth.jawale24@gmail.com</span>
                                </v-flex>
                            </v-layout>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
            <!-- Pushpit -->
            <v-flex xs12 sm3>
                <v-card class="elevation-0 transparent">
                    <v-card-title primary-title>
                        <v-layout row wrap justify-center>
                            <v-flex xs12 class="text-xs-center">
                                <v-avatar size=150>
                                    <img
                                        :src="pushpit"
                                        alt="Puhpit"
                                    >
                                    </v-avatar>
                            </v-flex>
                            <v-flex xs12 class="text-xs-center mt-2">
                                <h2 class="headine">Pushpit Kaushik</h2>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-list class="transparent">
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="green--text" left>fab fa-whatsapp</v-icon>
                                    <a href="tel:9660431991" style ="text-decoration:none; color:black"><span class="ml-4">+91-9660431991</span></a>
                                    </v-flex>
                            </v-layout>
                        </v-list-tile>
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="primary--text">place</v-icon>
                                    <span class="ml-4">Manipal University Jaipur</span>
                                </v-flex>
                            </v-layout>
                        </v-list-tile>
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="error--text">fas fa-envelope</v-icon>
                                    <span class="ml-4">pushpitkaushik95@gmail.com</span>
                                </v-flex>
                            </v-layout>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
            <!-- Rajul -->
            <v-flex xs12 sm3>
                <v-card class="elevation-0 transparent">
                    <v-card-title primary-title>
                        <v-layout row wrap justify-center>
                            <v-flex xs12 class="text-xs-center">
                                <v-avatar size=150>
                                    <img
                                        :src="rajul"
                                        alt="Rajul"
                                    >
                                    </v-avatar>
                            </v-flex>
                            <v-flex xs12 class="text-xs-center mt-2">
                                <h2 class="headine">Rajul Saxena</h2>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-list class="transparent">
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="green--text" left>fab fa-whatsapp</v-icon>
                                     <a href="tel:8285437376" style="text-decoration:none; color:black"><span class="ml-4">+91-8285437376</span></a>                                    
                                </v-flex>
                            </v-layout>
                        </v-list-tile>
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="primary--text">place</v-icon>
                                    <span class="ml-4">Manipal University Jaipur</span>
                                </v-flex>
                            </v-layout>
                        </v-list-tile>
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="error--text">fas fa-envelope</v-icon>
                                    <span class="ml-4">rajulsaxena13@gmail.com</span>
                                </v-flex>
                            </v-layout>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
            <!-- Lokesh -->
            <v-flex xs12 sm3>
                <v-card class="elevation-0 transparent">
                    <v-card-title primary-title>
                        <v-layout row wrap justify-center>
                            <v-flex xs12 class="text-xs-center">
                                <v-avatar size=150>
                                    <img
                                        :src="lokesh"
                                        alt="Lokesh"
                                    >
                                    </v-avatar>
                            </v-flex>
                            <v-flex xs12 class="text-xs-center mt-2">
                                <h2 class="headine">Lokesh Dugar</h2>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-list class="transparent">
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="green--text" left>fab fa-whatsapp</v-icon>
                                    <a href="tel:9830588848" style="text-decoration:none; color:black"><span class="ml-4">+91-9830588848</span></a>   
                                </v-flex>
                            </v-layout>
                        </v-list-tile>
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="primary--text">place</v-icon>
                                    <span class="ml-4">Manipal University Jaipur</span>
                                </v-flex>
                            </v-layout>
                        </v-list-tile>
                        <v-list-tile>
                            <v-layout row wrap>
                                <v-flex class="ml-3">
                                    <v-icon class="error--text">fas fa-envelope</v-icon>
                                    <span class="ml-4">lokeshdugarld@gmail.com</span>
                                </v-flex>
                            </v-layout>
                        </v-list-tile>w
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </section>

</v-app>
</template>

<script>
// import logo from "../../assets/logo.png";
// import manipal from "/static/assets/manipal.jpg";
// import college from "/static/assets/college.jpg";
// import rajul from "/static/assets/rajul.jpg";
// import lokesh from "/static/assets/lokesh.jpeg";
// import parth from "/static/assets/parth.jpg";
// import pushpit from "/static/assets/pushpit.jpg";
import { auth } from "@/scripts/firebase";
export default {
  data() {
    return {
      // logo: logo,
      manipal: "/static/assets/manipal.jpg",
      college: "/static/assets/college.jpg",
      rajul: "/static/assets/rajul.jpg",
      lokesh: "/static/assets/lokesh.jpeg",
      parth: "/static/assets/parth.jpg",
      pushpit: "/static/assets/pushpit.jpg"
    };
  },
  created() {
    var self = this;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        self.isSignedIn = true;
        self.user = user;
      } else self.isSignedIn = false;
    });
  }
};
</script>
