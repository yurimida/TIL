<template>
  <v-layout row justify-center>
    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on }">
        <v-btn v-if="userCheck" text v-on="on" style="background-color: transparent; color: white;">{{ user.username }}</v-btn>
          <v-btn v-else text disabled ></v-btn>
      </template>
      <v-list>
        <v-list-item>
            <router-link :to="{name: 'user-detail', params: {id: user.user_id}}" style="text-decoration: none; color: black">마이페이지</router-link>
        </v-list-item>
        <v-list-item>
          <router-link :to="{name:'update-rating'}" style="text-decoration: none; color: black">평가한 영화</router-link>
        </v-list-item>

        <v-list-item>
          <v-list-item-title @click="logout" style="cursor: pointer;">로그아웃</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialog" max-width="600px" persistent>

      <template v-slot:activator="{ on }">
        <v-btn v-if="!userCheck" text style="background-color: transparent; color: white;" v-on="on">login</v-btn>
      </template>
      <v-tabs fixed-tabs internal-activator>
        <v-tab internal-activator >Sign in</v-tab>
        <v-tab>Register</v-tab>
        <v-flex text-xs-right>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
        </v-flex>

        <!-- Login page 내용들 -->
        <v-tab-item>

          <v-form ref="form" v-model="validLogin" lazy-validation>
            <v-layout aapi_movielign-center row fill-height elevation-5 style="min-height:400px;" white pa-4 column>
              <v-flex sm8 align-center justify-center>
                <v-flex xs12 text-xs-center my-5>
                  <v-flex xs12 text-xs-center>
                    <v-text-field v-model="credentials.username" label="username*" :rules="[rules.required]" autofocus @keyup.esc="dialog=false" @keyup.enter="login" />
                  </v-flex>
                  <v-flex xs12 text-xs-center>
                    <v-text-field v-model="credentials.password" label="Password*" type="password" :rules="[rules.required]" autocomplete="on" @keyup.esc="dialog=false" @keyup.enter="login" />
                  </v-flex>
                </v-flex>
                <v-flex text-sm-center>
                  <v-btn rounded class="loginModal_btn" :disabled="!validLogin" @click="login">Log in</v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-form>
        </v-tab-item>

        <!-- Register 내용들 -->
        <v-tab-item>
          <v-form ref="form" v-model="validRegister" lazy-validation>
            <v-layout aapi_movielign-center justify-center row fill-height elevation-5 style="min-height:400px;" white pa-4>
              <v-flex v-model="image" sm10>
                <div class="cc-selector">
                  <input id="user1" type="radio" name="image-card" value="https://i.imgur.com/NLL5Wop.png">
                  <label class="imagecard-cc user1" for="user1" />
                  <input id="user2" type="radio" name="image-card" value="https://i.imgur.com/XsrbaXg.png">
                  <label class="imagecard-cc user2" for="user2" />
                  <input id="user3" type="radio" name="image-card" value="https://i.imgur.com/yS9Qq3c.png">
                  <label class="imagecard-cc user3" for="user3" />
                  <input id="user4" type="radio" name="image-card" value="https://i.imgur.com/7cf1GCh.png">
                  <label class="imagecard-cc user4" for="user4" />
                  <input id="user5" type="radio" name="image-card" value="https://i.imgur.com/YwioUo7.png">
                  <label class="imagecard-cc user5" for="user5" />
                  <input id="user6" type="radio" name="image-card" value="https://i.imgur.com/wflKtsz.png">
                  <label class="imagecard-cc user6" for="user6" />
                  <input id="user7" type="radio" name="image-card" value="https://i.imgur.com/sJXD3UJ.png">
                  <label class="imagecard-cc user7" for="user7" />
                </div>
              </v-flex>
              <v-flex sm8 align-content-center>
                <v-flex sm12>
                  <v-text-field v-model="username" label="Name*" :rules="[rules.required]" autofocus @keyup.esc="dialog=false" />
                </v-flex>
                <v-flex sm12>
                  <v-text-field v-model="password" label="Password*" type="password" :rules="[rules.required]" autocomplete="on" @keyup.esc="dialog=false" />
                </v-flex>
                <v-flex sm12>
                  <v-select
                    v-model="age"
                    :items="ages"
                    item-text="text"
                    item-value="value"
                    label="Age*"
                    required
                  />
                  <v-select
                    v-model="gender"
                    :items="genders"
                    item-text="text"
                    item-value="value"
                    label="Gender*"
                    required
                  />
                  <v-select
                    v-model="occupation"
                    :items="occupations"
                    label="Occupation*"
                    required
                  />
                </v-flex>

                <v-flex text-sm-center>
                  <template>
                    <v-btn rounded class="loginModal_btn" :disabled="!validRegister" @click="register">Register</v-btn>
                  </template>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-form>
        </v-tab-item>

      </v-tabs>
    </v-dialog>
  </v-layout>
</template>

<style>
.loginModal_btn {
  width: 100px;
}
</style>


<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import {
  mapState,
  mapActions
} from "vuex";
import api from '@/api'

export default {
  data: () => ({

    closeCheck:false,
    dialog: false,
    userCheck: false,
    user: {},
    // login Data
    credentials: {},
    validLogin: true,
    validRegister: true,
    // Register Data
    profile: [],
    username: "",
    password: "",
    gender: "",
    age: "",
    occupation: "",
    image: '',
    ages: [
      {text:"Under 18", value:"1"},
      {text:"18-24", value:"18"},
      {text:"25-34", value:"25"},
      {text:"35-44", value:"35"},
      {text:"45-49", value:"45"},
      {text:"50-55", value:"50"},
      {text:"56+", value:"56"},
    ],
    genders: [
      {text:"Male", value:"M"},
      {text:"Female", value:"F"},
    ],
    occupations: ["other","academic/educator","artist","clerical/admin","college/grad student","customer service","doctor/health care","executive/managerial","farmer","homemaker","K-12 student","lawyer","programmer","retired","sales/marketing","scientist","self-employed","technician/engineer","tradesman/craftsman","unemployed","writer"],
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 6 || "Min 6 characters",
    },
  }),
  mounted() {
    this.checkLoggedIn();
    if(this.userCheck) {
      this.getUser()
    }
  },
  methods: {
    async register() {
      try{
        await this.profile.push({'username': this.username, 'password':this.password, 'gender': this.gender, 'occupation': this.occupation, 'age': this.age, 'image': this.image.target.value});
        await this.$store.dispatch("data/Register", this.profile);
        this.credentials.username = this.username;
        this.credentials.password = this.password;
        await this.login();
        this.$router.push({name:'rating-page'});

      }catch{
        console.log('에러 profile 초기화')
      }finally {
        this.dialog = false;
        this.profile = [];
        this.username = '';
        this.password = '';
        this.gender = '';
        this.occupation = '';
        this.age = '';
        this.image.target.value = '';
      }
    },
    close(){
      dialog = false;
      closeCheck = true;
    },
    async login() {
      console.log("가자");
      if (this.$refs.form.validate()) {
        // await this.login(this.credentials)
        axios.post('http://52.79.194.10:8000/auth/', this.credentials).then(res => {
          this.$session.start();
          this.$session.set('token', res.data.token);
          this.dialog = false;
          this.userCheck = true;
          this.getUser();
          this.postMatrix()
          const Toast = Swal.mixin({
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: 'success',
              title: 'Signed in successfully.'
            })
        }).catch(e => {
          console.log(e);
          Swal.fire({
            title: 'Error!',
            text: '다시 입력해주세요.',
            type: 'error',
            confirmButtonText: 'Ok'
          })
        })
      }
    },
    checkLoggedIn() {
      if (this.$session.has("token")) {
        this.userCheck = true
      }
      else {
        this.userCheck = false
      }
    },
    getUser() {
      let token = this.$session.get("token")
      // parseJwt
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      this.user = JSON.parse(jsonPayload)
      this.$store.state.currentUser = this.user
      // return JSON.parse(jsonPayload);
    },
    logout() {
      this.$session.start();
      if (this.$session.has("token")) {
        // this.$session.remove("token")
        this.$session.destroy();
        this.userCheck = false;
        this.credentials = {};
        this.$router.push({name:'home'});
        this.$store.state.currentUser = ''
      }
      const Toast = Swal.mixin({
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: 'success',
              title: 'Signed out successfully.'
            })
    },
       closeDialog() {
          this.dialog = false;
    },
      async postMatrix () {
            const params= {
                id: this.$store.state.currentUser.user_id
            }
            const res = await this.matrix(params);

        },
        ...mapActions("data", ['matrix']),
        ...mapState({
            movie: state=> state.data.movie
        }),


  }

};
</script>

<style>
.loginModal_btn {
  width: 120px;
}
.cc-selector input{
  margin:0;padding:0;
  -webkit-appearance:none;
  -moz-appearance:none;
       appearance:none;
}
.user1{background-image:url(https://i.imgur.com/NLL5Wop.png);}
.user2{background-image:url(https://i.imgur.com/XsrbaXg.png);}
.user3{background-image:url(https://i.imgur.com/yS9Qq3c.png);}
.user4{background-image:url(https://i.imgur.com/7cf1GCh.png);}
.user5{background-image:url(https://i.imgur.com/YwioUo7.png);}
.user6{background-image:url(https://i.imgur.com/wflKtsz.png);}
.user7{background-image:url(https://i.imgur.com/sJXD3UJ.png);}

.cc-selector input:active +.imagecard-cc{opacity: .9;}
.cc-selector input:checked +.imagecard-cc{
    -webkit-filter: none;
       -moz-filter: none;
            filter: none;
}
.imagecard-cc{
    cursor:pointer;
    background-size:contain;
    background-repeat:no-repeat;
    display:inline-block;
    width:70px;height:70px;
    -webkit-transition: all 100ms ease-in;
       -moz-transition: all 100ms ease-in;
            transition: all 100ms ease-in;
    -webkit-filter: brightness(1.8) grayscale(1) opacity(.2);
       -moz-filter: brightness(1.8) grayscale(1) opacity(.2);
            filter: brightness(1.8) grayscale(1) opacity(.2);
}
.imagecard-cc:hover{
    -webkit-filter: brightness(1.2) grayscale(.6) opacity(.9);
       -moz-filter: brightness(1.2) grayscale(.6) opacity(.9);
            filter: brightness(1.2) grayscale(.6) opacity(.9);
}

</style>
