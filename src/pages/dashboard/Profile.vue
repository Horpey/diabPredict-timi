 <template>
  <div class>
    <div>
      <div class="mt-2">
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <div class="media">
                  <a class="d-flex" href="#">
                    <img
                      src="https://res.cloudinary.com/horpey/image/upload/v1583331535/avatar_lqajeh.png"
                      class="rounded-circle img-raised"
                      alt
                      height="50"
                    />
                  </a>
                  <div class="media-body ml-3">
                    <h5 class="m-0">{{user.firstname}} {{user.lastname}}</h5>
                    <p class="mb-1">{{user.email}}</p>
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#editProfile"
                      class="btn btn-sm btn-dark"
                    >Edit Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h4 class="mt-0">Change Password</h4>
                <hr />
                <form>
                  <div class="form-group cardform">
                    <label for="oldPass">Old Password</label>
                    <input type="password" id="oldPass" value class="form-control" />
                  </div>

                  <div class="form-group cardform">
                    <label for="newPass">New Password</label>
                    <input type="password" id="newPass" value class="form-control" />
                  </div>

                  <div class="form-group cardform">
                    <label for="confirmnewPass">Confirm New Password</label>
                    <input type="password" id="confirmnewPass" value class="form-control" />
                  </div>

                  <div class="form-group mt-3">
                    <button type="submit" class="btn btn-dark">Update Password</button>
                  </div>
                </form>
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
  name: "profile",
  bodyClass: "",
  components: {},
  data() {
    return {
      user: {}
    };
  },
  mounted(){
    this.user = JSON.parse(localStorage.getItem('user')).user;
    console.log(this.user)
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/dashboard/index.scss";
</style>
