<template>
  <div class="page-header clear-filter" filter-color="dark">
    <div
      class="page-header-image"
      style="
        background-image: url('img/pexels-tima-miroshnichenko-5452201.jpg');
        background-position: 30% 29%;
      "
    ></div>
    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <div class="text-left text-white" style="margin-top: 18%">
              <h1 class="mb-1">
                Diagnosis Tool for Diabetes<br />
                in the 21st Century
              </h1>
              <p>
                Built for the Medics, Get high accuracy diabetes diagnosis on
                patient's data.
              </p>
              <p class="mt-5">
                <a href="#" class="text-white">
                  Learn More
                  <i class="larrow now-ui-icons arrows-1_minimal-down"></i>
                  <!-- <span class="fa fa-arrow-down larrow"></span> -->
                </a>
              </p>
            </div>
          </div>
          <div class="col-md-5">
            <div class="card ncardbody text-left">
              <div class="card-body">
                <div v-if="!loginCond" class="formins">
                  <h5 class="trackcamp">Create Account</h5>
                  <div class="mt-4">
                    <form @submit.prevent="submitSignup">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group cardform">
                            <label for="fname">First Name</label>
                            <input
                              v-model="firstname"
                              type="text"
                              id="fname"
                              value
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group cardform">
                            <label for="lname">Last Name</label>
                            <input
                              v-model="lastname"
                              type="text"
                              id="lname"
                              value
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group cardform">
                        <label for="email">Email address</label>
                        <input
                          v-model="email"
                          type="email"
                          id="email"
                          value
                          class="form-control"
                        />
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group cardform mt-1">
                            <label for="password">Password</label>
                            <input
                              v-model="password"
                              type="password"
                              id="password"
                              value
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group cardform mt-1">
                            <label for="confirmPassword"
                              >Confirm Password</label
                            >
                            <input
                              v-model="password_confirmation"
                              type="password"
                              id="confirmPassword"
                              value
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group mt-3">
                        <button
                          :disabled="btndisable"
                          type="submit"
                          class="btn btn-cust btn-block"
                        >
                          <span v-if="!rloading">Create Account</span>
                          <img
                            v-if="rloading"
                            class="ml-2"
                            src="img/loaderlight.svg"
                            alt="logo"
                            height="20"
                          />
                        </button>
                      </div>
                    </form>
                    <div class="small mt-4">
                      <p>
                        Already have an account?
                        <a href="#" @click="login" class="text-theme"
                          >Login here</a
                        >
                      </p>
                    </div>
                  </div>
                </div>

                <div v-if="loginCond" class="formins">
                  <h5 class="trackcamp">Login Here</h5>
                  <div class="mt-4">
                    <form @submit.prevent="submitLogin">
                      <div class="form-group cardform">
                        <label for="email">Email address</label>
                        <input
                          type="email"
                          id="email"
                          v-model="email"
                          value
                          class="form-control"
                        />
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group cardform mt-1">
                            <label for="password">Password</label>
                            <input
                              type="password"
                              v-model="password"
                              id="password"
                              value
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="form-group mt-3">
                        <button
                          type="submit"
                          :disabled="btndisable"
                          class="btn btn-cust btn-block"
                        >
                          <span v-if="!rloading">Login</span>
                          <img
                            v-if="rloading"
                            class="ml-2"
                            src="img/loaderlight.svg"
                            alt="loading"
                            height="20"
                          />
                        </button>
                      </div>
                    </form>
                    <div class="small mt-4">
                      <p>
                        Don't have an account?
                        <a href="#" @click="login" class="text-theme"
                          >Create account</a
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from "@/components";
import MainFooter from "@/layout/MainFooter";
export default {
  name: "index",
  bodyClass: "login-page",
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      loginCond: false,
      rloading: false,
      email: "",
      password: "",
      btndisable: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    login() {
      this.loginCond = !this.loginCond;
    },
    submitLogin() {
      if (this.email && this.password) {
        let email = this.email;
        let password = this.password;
        this.rloading = true;
        this.btndisable = true;
        this.$store
          .dispatch("login", { email, password })
          .then((resp) => {
            this.rloading = false;
            this.btndisable = false;
            this.$toast.success("Login Successful!");
            this.$router.push("/dashboard");
          })
          .catch((err) => {
            this.rloading = false;
            this.btndisable = false;
            if (err.response) {
              // console.log(err.response.data)
              if (err.response.data.status == 401) {
                this.$toast.error(err.response.data.message);
              } else {
                this.$toast.error("Unable to Login, please try again");
              }
            } else {
              this.$toast.error("Unable to Login, please try again");
            }
          });
      } else {
        this.$toast.info("Kindly fill in all fields");
      }
    },
    submitSignup() {
      if (
        this.firstname &&
        this.lastname &&
        this.email &&
        this.password &&
        this.password_confirmation
      ) {
        if (this.password == this.password_confirmation) {
          let firstname = this.firstname;
          let lastname = this.lastname;
          let email = this.email;
          let password = this.password;
          let password_confirmation = this.password_confirmation;

          this.rloading = true;
          this.btndisable = true;

          this.$store
            .dispatch("signup", {
              firstname,
              lastname,
              email,
              password,
              password_confirmation,
            })
            .then((resp) => {
              this.rloading = false;
              this.btndisable = false;
              console.log(resp);
              this.$toast.success("Account Created Successfully!");
              this.$router.push("/dashboard");
            })
            .catch((err) => {
              this.rloading = false;
              this.btndisable = false;

              if (err.response) {
                // console.log(err.response.data)
                if (err.response.data.status == 422) {
                  this.$toast.error(err.response.data.data.email[0]);
                } else {
                  this.$toast.error("Account creation failed, Try again!");
                }
              } else {
                this.$toast.error("Account creation failed, Try again!");
              }
            });
        } else {
          this.$toast.info("Password does not match, Try again");
        }
      } else {
        this.$toast.info("Kindly fill in all fields");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/main.scss";
@import "../assets/scss/landing.scss";
</style>
