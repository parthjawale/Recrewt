import Login from "@/components/Auth/Login";
import SignUp from "@/components/Auth/Signup";

export default [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  }
];
