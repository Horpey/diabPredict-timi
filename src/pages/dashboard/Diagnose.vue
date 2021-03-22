 <template>
  <div class>
    <div class="mt-2">
      <div class="row">
        <div class="col-md-7">
          <div class="card" style="min-height: 494px;">
            <div class="card-body mx-3">
              <router-link to="/dashboard/patients" class="text-dark">
                <span class="fa fa-arrow-left mr-2" style="font-size: 14px;"></span>
                <span class="pt-1">Back</span>
              </router-link>
              <h3 class="text-capitalize font-weight-bold mb-3">Diagnosis</h3>
              <hr />
              <form @submit.prevent="makeDiagnose">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group cardform">
                      <label for="bs_fast">
                        Blood Sugar (Before Meal)
                        <span class="fa fa-info-circle ml-2"></span>
                      </label>
                      <input required v-model="bs_fast" id="bs_fast" value class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group cardform">
                      <label for="afterMeal">
                        Blood Sugar (After Meal)
                        <span class="fa fa-info-circle ml-2"></span>
                      </label>
                      <input required v-model="bs_pp" id="afterMeal" value class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group cardform">
                      <label for="plasma">
                        Plasma Glucose
                        <span class="fa fa-info-circle ml-2"></span>
                      </label>
                      <input required v-model="plasma_r" id="plasma" value class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group cardform">
                      <label for="plasmam">
                        Plasma Glucose (Morning)
                        <span class="fa fa-info-circle ml-2"></span>
                      </label>
                      <input required v-model="plasma_f" id="plasmam" value class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group cardform">
                      <label for="HbA1c">
                        HbA1c
                        <span class="fa fa-info-circle ml-2"></span>
                      </label>
                      <input required v-model="hbA1c" id="HbA1c" value class="form-control" />
                    </div>
                  </div>
                </div>

                <div class="form-group mt-3">
                  <button :disabled="btndisable" type="submit" class="btn btn-dark btn-lg">
                    Make
                    Diagnosis
                    <img
                      v-if="rloading"
                      class="ml-2"
                      src="/img/loaderlight.svg"
                      alt="logo"
                      height="20"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card">
            <div class="card-body" style="min-height: 495px;">
              <h3 class="text-capitalize text-center font-weight-bold mb-3">Report</h3>
              <div class="ml-loading" v-if="mlloading">
                <div class="w-100 text-center text-light">
                  <svg
                    class="gear"
                    style="width:64px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                  >
                    <path
                      id="p"
                      fill="#064dc8"
                      d="M94.1 58.8c.6-2.8.9-5.8.9-8.8s-.3-6-.9-8.8l-11.7-.4c-.7-2.6-1.7-5-3-7.3l8-8.5c-3.3-4.9-7.5-9.2-12.5-12.5l-8.5 8c-2.3-1.3-4.7-2.3-7.3-3l-.3-11.6C56 5.3 53 5 50 5s-6 .3-8.8.9l-.4 11.7c-2.6.7-5 1.7-7.3 3l-8.5-8c-4.9 3.3-9.2 7.5-12.5 12.5l8 8.5c-1.3 2.3-2.3 4.7-3 7.3l-11.6.3C5.3 44 5 47 5 50s.3 6 .9 8.8l11.7.4c.7 2.6 1.7 5 3 7.3l-8 8.5c3.3 4.9 7.5 9.2 12.5 12.5l8.5-8c2.3 1.3 4.7 2.3 7.3 3l.4 11.7c2.7.5 5.7.8 8.7.8s6-.3 8.8-.9l.4-11.7c2.6-.7 5-1.7 7.3-3l8.5 8c4.9-3.3 9.2-7.5 12.5-12.5l-8-8.5c1.3-2.3 2.3-4.7 3-7.3l11.6-.3zM50 66.9c-9.3 0-16.9-7.6-16.9-16.9S40.7 33.1 50 33.1 66.9 40.7 66.9 50 59.3 66.9 50 66.9z"
                    />
                  </svg>
                  <svg
                    class="gear"
                    style="width:64px;margin:64px 0 0 -12px;animation-direction:reverse"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                  >
                    <use href="#p" />
                  </svg>
                  <h5 class="font-weight-bold mt-2 mb-0 text-black">Please wait..</h5>
                  <div class="text-muted">Our ML Engine is processing the data.</div>
                </div>
              </div>

              <div class v-else>
                <table class="table">
                  <tbody>
                    <tr>
                      <th>Time of check</th>
                      <th>Blood sugar level</th>
                    </tr>
                    <tr>
                      <td>Fasting or before breakfast</td>
                      <td class="text-info">{{reportData.bl1}} mg/dl</td>
                    </tr>
                    <tr>
                      <td>2 hours after meal</td>
                      <td class="text-danger">{{reportData.bl2}} mg/dl</td>
                    </tr>
                    <tr>
                      <td>Plasma Glucose (any Time)</td>
                      <td class="text-info">{{reportData.pl1}} mmol/L</td>
                    </tr>
                    <tr>
                      <td>Plasma Glucose (Morning)</td>
                      <td class="text-danger">{{reportData.bl2}} mmol/L</td>
                    </tr>
                  </tbody>
                </table>

                <table class="table">
                  <tbody>
                    <tr>
                      <th class="text-info">Diabetic Status</th>
                      <th>{{reportData.ds}}</th>
                    </tr>
                    <tr>
                      <th class="text-info">Diabetic Type</th>
                      <th>{{reportData.dt}}</th>
                    </tr>
                  </tbody>
                </table>
                <div class="text-right">
                  <p
                    v-if="sendingdb"
                    class="font-weight-bold d-inline-block mr-3"
                  >Sending Data to Database...</p>
                  <a href="#" class="btn btn-outline-primary text-dark">
                    <span class="fa fa-file-download mr-2"></span>
                    Download Report
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>  
 <script>
export default {
  name: "diagnose",
  bodyClass: "",
  components: {},
  data() {
    return {
      rloading: false,
      mlloading: false,
      btndisable: false,
      patientID: "",
      age: "",
      bs_fast: "",
      bs_pp: "",
      plasma_r: "",
      plasma_f: "",
      hbA1c: "",
      sendingdb: false,
      reportData: {
        patientID: "",
        bl1: "",
        bl2: "",
        pl1: "",
        pl2: "",
        hba1c: "",
        ds: "",
        dt: ""
      }
    };
  },
  methods: {
    makeDiagnose() {
      let patientID = this.patientID;
      let age = this.age;
      let bs_fast = this.bs_fast;
      let bs_pp = this.bs_pp;
      let plasma_r = this.plasma_r;
      let plasma_f = this.plasma_f;
      let hbA1c = this.hbA1c;

      this.mlloading = true;

      this.btndisable = true;
      this.rloading = true;

      this.$store
        .dispatch("makeDiagnosis", {
          age,
          bs_fast,
          bs_pp,
          plasma_r,
          plasma_f,
          hbA1c
        })
        .then(resp => {
          this.rloading = false;
          this.btndisable = false;
          this.mlloading = false;

          this.reportData.bl1 = this.bs_fast;
          this.reportData.bl2 = this.bs_pp;
          this.reportData.pl1 = this.plasma_r;
          this.reportData.pl2 = this.plasma_f;
          this.reportData.hba1c = this.hbA1c;
          this.reportData.patientID = this.$route.params.id;
          if (resp.data.prediction == "Normal") {
            this.reportData.ds = "negative";
            this.reportData.dt = "";
          } else {
            this.reportData.ds = "positive";
            this.reportData.dt = resp.data.prediction;
          }
          console.log(this.reportData);
          this.sendtoDB();
        })
        .catch(err => {
          this.rloading = false;
          this.mlloading = false;
          this.btndisable = false;
          this.$toast.error("Unable to make diagnosis, Please try again");
        });
    },
    sendtoDB() {
      console.log(this.reportData);
      this.sendingdb = true;
      let reportdat = this.reportData;
      this.$store
        .dispatch("senttoDB", reportdat)
        .then(resp => {
          console.log(resp);
          this.sendingdb = false;
        })
        .catch(err => {
          this.sendingdb = false;
        });
    }
  },
  mounted() {
    let patientId = this.$route.params.id;
    let patientDob = this.$route.query.dob;
    var moment = require("moment");
    this.age = moment(patientDob)
      .fromNow(true)
      .replace(" years", "");
    // console.log(this.age);
  }
};
</script>
<style>
@keyframes r {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(45deg);
  }
}
#splash {
  transition: all 0.3s linear;
}
#splash.hidden {
  opacity: 0;
  z-index: -1;
  visibility: hidden;
}
svg.gear {
  animation: r 0.5s infinite linear;
}
</style>
<style lang="scss" scoped>
@import "../../assets/scss/dashboard/index.scss";
</style>
