 <template>
  <div class>
    <div>
      <div class="mt-2">
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body mx-3 my-2">
                <div class="mb-4">
                  <a href="#" @click="$router.back()" class="text-dark">
                    <span class="fa fa-arrow-left mr-2" style="font-size: 14px;"></span>
                    <span class="pt-1">Back</span>
                  </a>
                </div>
                <div class="text-center my-5" v-if="loading">
                  <img src="/img/loadertheme.svg" alt="loading" height="50" />
                </div>
                <div v-else>
                  <p class="mb-2">
                    <span class="fa fa-calendar mr-2"></span>
                    {{formatDate(patientData.created_at)}}
                  </p>
                  <h3 class="text-capitalize font-weight-bold mb-0">{{patientData.name}}</h3>
                  <p class="font-weight-bold">{{patientData.gender}}</p>
                  <p>{{getAge(patientData.dob)}}</p>
                  <p>
                    <span class="badge badge-danger text-capitalize">
                      <span
                        :class="{fa:true,'mr-2':true, 'fa-plus':getStatus(patientData.diagnosis) == 'positive',  'fa-minus':getStatus(patientData.diagnosis) == 'negative'}"
                      ></span>
                      {{getStatus(patientData.diagnosis)}}
                    </span>

                    <span
                      v-if="getStatus(patientData.diagnosis) == 'positive'"
                      class="badge badge-info text-capitalize"
                    >{{getType(patientData.diagnosis)}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="card" v-if="!loading">
              <div class="card-body">
                <div class>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th>Time of check</th>
                        <th>Blood sugar level</th>
                      </tr>
                      <tr>
                        <td>Fasting or before breakfast</td>
                        <td class="text-info">
                          <span v-if="patientData.diagnosis">
                            {{patientData.diagnosis.blood_sugar_before}}
                            mg/dl
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>2 hours after meal</td>
                        <td class="text-danger">
                          <span
                            v-if="patientData.diagnosis"
                          >{{patientData.diagnosis.blood_sugar_after}} mg/dl</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Plasma Glucose (any Time)</td>
                        <td class="text-info">
                          <span
                            v-if="patientData.diagnosis"
                          >{{patientData.diagnosis.plasma_glucose}} mmol/L</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Plasma Glucose (Morning)</td>
                        <td class="text-danger">
                          <span
                            v-if="patientData.diagnosis"
                          >{{patientData.diagnosis.plasma_glucose_morning}} mmol/L</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table class="table">
                    <tbody>
                      <tr>
                        <th class="text-info">Diabetic Status</th>
                        <th>
                          <span class="text-capitalize">{{getStatus(patientData.diagnosis)}}</span>
                        </th>
                      </tr>
                      <tr>
                        <th class="text-info">Diabetic Type</th>
                        <th>
                          <span class="text-capitalize">{{getType(patientData.diagnosis)}}</span>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-right">
                    <!-- <a href="#" class="btn btn-dark">
                                                        <span class="fa fa-save mr-2"></span>
                    Save</a>-->
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
  </div>
</template>  
 <script>
var moment = require("moment");
export default {
  name: "listPatient",
  bodyClass: "",
  components: {},
  data() {
    return {
      loading: true,
      patientData: {}
    };
  },
  methods: {
    getAge(dob) {
      let age = moment(dob).fromNow(true);
      return age;
    },
    formatDate(date) {
      let formatted = moment(date).format("dddd, MMMM Do YYYY");
      return formatted;
    },
    getStatus(diagnose) {
      if (diagnose.result) {
        return diagnose.result.status;
      } else {
        return "";
      }
    },
    getType(diagnose) {
      if (diagnose.result) {
        return diagnose.result.type;
      } else {
        return "";
      }
    }
  },
  mounted() {
    let id = this.$route.params.id;
    this.$store
      .dispatch("sendPatientData", id)
      .then(resp => {
        console.log(resp.data.data);
        this.patientData = resp.data.data;
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/dashboard/index.scss";
</style>
