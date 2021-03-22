 <template>
  <div class>
    <div>
      <div class="text-center mt-5" v-if="loading">
        <img src="/img/loadertheme.svg" alt="loading" height="50" />
      </div>
      <div class="mt-2" v-if="!loading">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <div class>
                  <form class="form-inline">
                    <div class="form-group">
                      <small id="helpId" class="mr-2">Sort by</small>
                      <label for></label>
                      <select
                        class="form-control mr-3"
                        id="gender"
                        style="height: 48px; width: 120px"
                      >
                        <option value="gender">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>

                      <select class="form-control" id="status" style="height: 48px; width: 120px">
                        <option value="status">Status</option>
                        <option value="diab">Diabetes</option>
                        <option value="nondiab">Non-Diabetes</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-4">
                <div class="cardform">
                  <input class="form-control" placeholder="Search Patient" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <table class="table sitetable table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Patient's Name</th>
                  <th>Age</th>
                  <th>Diabetic Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(patient, index) in patients" :key="index">
                  <td>{{index + 1}}</td>
                  <td>{{ formatData(patient.created_at) }}</td>
                  <td>{{patient.name}}</td>
                  <td>{{getAge(patient.dob)}}</td>
                  <td>
                    <!-- <p v-if="patient.diagnosis">{{patient.diagnosis.result}}</p> -->

                    <span
                      v-if="patient.diagnosis"
                      :class="{badge:true, 'badge-danger':getStatus(patient.diagnosis) == 'negative','badge-info':getStatus(patient.diagnosis) == 'positive'}"
                    >
                      <span
                        :class="{fa:true,'pr-1':true, 'fa-plus':getStatus(patient.diagnosis) == 'positive',  'fa-minus':getStatus(patient.diagnosis) == 'negative'}"
                      ></span>
                      {{getStatus(patient.diagnosis)}}
                    </span>
                  </td>
                  <td>
                    <router-link
                      :to="{path: '/dashboard/diagnose/' + patient.uuid, query: {dob: patient.dob}}"
                      class="btn btn-sm btn-dark"
                    >
                      <span class="small font-weight-bold">Diagnose</span>
                    </router-link>
                    <router-link
                      :to="{path: '/dashboard/patients/' + patient.uuid, query: {dob: patient.dob}}"
                      class="ml-2 btn btn-sm btn-secondary"
                    >
                      <span class="small font-weight-bold">View</span>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>  
 <script>
export default {
  name: "patients",
  bodyClass: "",
  components: {},
  data() {
    return {
      loading: true,
      patients: []
    };
  },
  methods: {
    getPatients() {
      this.$store
        .dispatch("getPatients")
        .then(resp => {
          this.loading = false;
          console.log(resp.data.data);
          this.patients = resp.data.data;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          this.$toast.info("Unable to load patients data, Try again!");
        });
    },
    formatData(created) {
      var moment = require("moment");
      return moment(created).format("Do MMM YYYY");
    },
    getAge(dob) {
      var moment = require("moment");
      return moment(dob).fromNow(true);
    },
    getStatus(diagnose) {
      if (diagnose.result) {
        return diagnose.result.status;
      } else {
        return "";
      }

      // return diagnose.result;
    }
    // startFrom(arr) {
    //   return arr.reverse().slice();
    // }
  },
  mounted() {
    this.getPatients();
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/dashboard/index.scss";
</style>
