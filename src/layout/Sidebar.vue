<template>
  <div>
    <div class="sidebar">
      <div class="logo">
        <router-link to="/dashboard" class="simple-text logo-normal">Diab.Predict</router-link>
        <div class="dateTime">
          <p id="CurrentDate">{{datee}}</p>
          <h3 id="time">{{timee}}</h3>
        </div>
      </div>
      <div class="sidebar-wrapper" id="sidebar-wrapper">
        <ul class="nav">
          <li>
            <router-link to="/dashboard" class="campaignlist">
              <span class="fa fa-home"></span>
              <p>Home</p>
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/patients" class="campaignlist">
              <span class="fa fa-users"></span>
              <p>Patients</p>
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/profile" class="campaignlist">
              <span class="fa fa-user"></span>
              <p>Profile</p>
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/support" class="campaignlist">
              <span class="fa fa-question-circle"></span>
              <p>Support</p>
            </router-link>
          </li>

          <li class="active-pro">
            <a @click="logout" class="btn bg-white text-dark mb-2 mx-5">
              <span class="text-left">Logout</span>
              <span class="fas fa-sign-out-alt float-right mt-2 ml-5"></span>
            </a>
            <p class="text-center copyright">
              ©
              2020,
              Diab.Predict. All rights reserved.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
var moment = require("moment");
export default {
  name: "sidebar",
  bodyClass: "",
  components: {},
  computed: {
    datee() {
      return moment().format("dddd, MMMM Do YYYY");
    },
    timee() {
      return moment().format("h:mm a");
    }
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
        this.$toast.info("Successfully logged out");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/dashboard/index.scss";
</style>
