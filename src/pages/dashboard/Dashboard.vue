<template>
  <div>
    <div class="wrapper">
      <sidebar />
      <div class="main-panel" id="main-panel">
        <div class="content pt-3">
          <div class="row">
            <div class="col-md-6">
              <h4 class="text-capitalize font-weight-bold mt-1">Diad.Predict</h4>
            </div>
            <div class="col-md-6">
              <div class="text-right">
                <button type="button" class="btn btn-theme" @click="patientModal = true">
                  <span class="fa fa-user mr-2"></span>
                  Add Patient
                </button>

                <a class="btn btn-dark-sm" @click="logout">
                  Logout
                  <span class="fas fa-sign-out-alt ml-2"></span>
                </a>
              </div>
            </div>
          </div>

          <sidebar />
          <fade-transition>
            <router-view />
          </fade-transition>

          <!-- <home /> -->
        </div>
      </div>
    </div>

    <!-- Modal -->

    <modal :show.sync="patientModal" headerClasses="justify-content-center">
      <h5 slot="header" class="title title-up modal-title">Add New Patient</h5>
      <form @submit.prevent="addPatient">
        <div class="form-group cardform">
          <label for="pName">Patient's Name</label>
          <input type="text" id="pName" v-model="name" required class="form-control" />
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group cardform">
              <label for="dob">Date of Birth</label>
              <fg-input>
                <el-date-picker
                  v-model="dob"
                  popper-class="date-picker-primary"
                  type="date"
                  required
                  placeholder="Select date"
                ></el-date-picker>
              </fg-input>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group cardform">
              <label for="gender">Gender</label>
              <select
                v-model="gender"
                required
                class="form-control"
                id="gender"
                style="height: 48px;"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group mt-3">
          <button type="submit" :disabled="btndisable" class="btn btn-dark">
            Add Patient
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
    </modal>
  </div>
</template>
<script>
import Sidebar from "../../layout/Sidebar";
import { FadeTransition } from "vue2-transitions";
import { Modal } from "../../components";
import { DatePicker } from "element-ui";

import Home from "./Home";
export default {
  name: "dashboard",
  bodyClass: "",
  components: {
    sidebar: Sidebar,
    home: Home,
    "fade-transition": FadeTransition,
    modal: Modal,
    [DatePicker.name]: DatePicker
  },
  data() {
    return {
      user: "",
      firstname: "",
      patientModal: false,
      name: "",
      gender: "",
      dob: "",
      btndisable: false,
      rloading: false
    };
  },
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
        this.$toast.info("Successfully logged out");
      });
    },

    addPatient() {
      this.btndisable = true;
      this.rloading = true;
      var moment = require("moment");
      this.dob = moment(this.dob).format("YYYY-MM-DD");
      console.log(this.name);
      console.log(this.gender);
      console.log(this.dob);
      let name = this.name;
      let gender = this.gender;
      let dob = this.dob;
      this.$store
        .dispatch("addPatient", { name, gender, dob })
        .then(resp => {
          this.rloading = false;
          this.btndisable = false;
          this.name = "";
          this.gender = "";
          this.dob = "";
          this.patientModal = false;
          this.$toast.success("Successfully added a patient!");
          location.reload();
        })
        .catch(err => {
          this.rloading = false;
          this.btndisable = false;
          if (err.response) {
            if (err.response.data.status == 401) {
              this.$toast.error(err.response.data.message);
            } else {
              this.$toast.error("Unable add patient, please try again");
            }
          } else {
            this.$toast.error("Unable to add patient, please try again");
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/dashboard/index.scss";
</style>
