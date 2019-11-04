<template>
  <v-container justify-center fill-height >
      <v-flex sm6>
        <v-flex ma-5 style="color:white">회원가입</v-flex>
        <v-flex xs12 text-xs-center mx-5>
          <v-flex xs12 text-xs-center>
            <v-text-field v-model="username" label="username*"
              solo hide-details @keyup.enter="registerAction" style="margin: 2% 0; opacity: 0.7">
            <template v-slot:append>
              <v-fade-transition>
              <template v-if="username.length >= 4">
                <v-icon small color="green darken-2">mdi-check-circle-outline</v-icon>
              </template>
              <template v-else-if="username.length > 0 && username.length <4">
                <v-icon small color="red darken-2">mdi-close-circle-outline</v-icon>
              </template>
              </v-fade-transition>
            </template>
            </v-text-field>

            <v-text-field v-model="password" label="Password*" type="password"
              solo hide-details @keyup.enter="registerAction" style="margin: 2% 0; opacity: 0.7">
              <template v-slot:append>
                <v-fade-transition>
                  <template v-if="password.length >= 4">
                    <v-icon small color="green darken-2">mdi-check-circle-outline</v-icon>
                  </template>
                  <template v-else-if="password.length > 0 && password.length <4">
                    <v-icon small color="red darken-2">mdi-close-circle-outline</v-icon>
                  </template>
                </v-fade-transition>
              </template>
            </v-text-field>

            <v-flex text-sm-center my-5>
              <v-divider style="background:gray"></v-divider>
            </v-flex>

            <v-select
              v-model="age"
              :items="ages"
              item-text="text"
              item-value="value"
              label="Age*"
              solo hide-details
              style="margin: 2% 0; opacity: 0.7"
            >
              <template v-slot:append>
                <v-fade-transition>
                  <template v-if="age!=''">
                    <v-icon small color="green darken-2">mdi-check-circle-outline</v-icon>
                  </template>
                  <template v-else>
                    <v-icon small color="red darken-2">mdi-close-circle-outline</v-icon>
                  </template>
                </v-fade-transition>
              </template>
            </v-select>
            <v-select
              v-model="gender"
              :items="genders"
              item-text="text"
              item-value="value"
              label="Gender*"
              solo hide-details
              style="margin: 2% 0; opacity: 0.7"
              >
                <template v-slot:append>
                  <v-fade-transition>
                    <template v-if="gender!=''">
                      <v-icon small color="green darken-2">mdi-check-circle-outline</v-icon>
                    </template>
                    <template v-else>
                      <v-icon small color="red darken-2">mdi-close-circle-outline</v-icon>
                    </template>
                  </v-fade-transition>
                </template>
              </v-select>
            <v-select
              v-model="occupation"
              :items="occupations"
              label="Occupation*"
              solo hide-details
              style="margin: 2% 0; opacity: 0.7"
              >
                <template v-slot:append>
                  <v-fade-transition>
                    <template v-if="occupation!=''">
                      <v-icon small color="green darken-2">mdi-check-circle-outline</v-icon>
                    </template>
                    <template v-else>
                      <v-icon small color="red darken-2">mdi-close-circle-outline</v-icon>
                    </template>
                  </v-fade-transition>
                </template>
              </v-select>
          </v-flex>
        </v-flex>
        <v-flex text-sm-center ma-5>
          <v-btn v-if="username.length >= 4 &&password.length >=4 && occupation && gender && age" rounded block :color="index" @click="registerAction"><span class="btnText" >회원가입</span></v-btn>
          <v-btn v-else rounded dark disabled block>회원가입</v-btn>
        </v-flex>
      </v-flex>
  </v-container>

</template>

<style>
.loginModal_btn {
  width: 100px;
}
</style>


<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import api from '@/api'
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    userCheck: false,
    user: {},
    // login Data
    credentials: {},
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

    isRegister: false,
    index: '',
  }),
  mounted() {
    if(this.userCheck) {
      this.getUser()
    }
    this.setBackground();
  },

  computed:{
    ...mapState({
      movie: state=> state.data.movie,
      colors: state => state.data.colors,
      images: state => state.data.images,
      colIndex: state => state.data.colIndex
    }),
    getColIndex(){
      this.index = this.colors[this.colIndex[0]];
      return this.$store.state.colIndex;
    }
  },
  watch: {
    getColIndex(){

    },
  },
  methods: {
    ...mapActions("data", ['matrix']),
    ...mapActions("data", ["Register"]),

    /* 작성일 : 2019.10.04
    작성자 : 이찬호
    기능 : 회원가입 버튼을 누르면 회원 정보를 등록하고 로그인 한다.
          회원가입이 완료 되면 rating page로 이동해 rating을 준다.
    */
    async registerAction(){
      const param = {
        username : this.username,     password : this.password,
        age : this.age,               occupation : this.occupation,
        gender : this.gender,         image : this.image
      };
      var params = [];
      let res = '';
      params.push(param);
      await axios.post('api/auth/signup-many/', {
        params,
      }).then(async res => {
        console.log("성공!")
        this.credentials.username = this.username;
        this.credentials.password = this.password;
        await this.login();
        this.goTo('rating-page');
      }).catch(e => {
        this.errorAlert('이미 존재하는 사용자입니다.')
      })
    },

    /* 작성일 : 2019.10.04
    작성자 : 이찬호
    기능 : 에러메세지 창
    변수 : 에러메세지로 표시할 내용
    */
    errorAlert(text){
      Swal.fire({
        title: 'Error!',
        text: text,
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      })
    },

    /* 작성일 : 2019.10.04
    작성자 : 이찬호
    기능 : router 이동
    변수 : 이동할 페이지 이름
    */
    goTo(page){
      this.$router.push({name:page});
    },

    async register() {
      try{
        await this.profile.push({'username': this.username, 'password':this.password, 'gender': this.gender, 'occupation': this.occupation, 'age': this.age, 'image': this.image.target.value});
        await this.$store.dispatch("data/Register", this.profile);
        this.credentials.username = this.username;
        this.credentials.password = this.password;
        this.isRegister = true;
        await this.login();
      }catch{
        console.log('에러 profile 초기화')
      }finally {
        this.profile = [];
        this.username = '';
        this.password = '';
        this.gender = '';
        this.occupation = '';
        this.age = '';
        this.image.target.value = '';
      }
    },
    async login() {
      if (this.credentials.username && this.credentials.password) {
        axios.post('http://52.79.194.10:8000/auth/', this.credentials).then(async res => {
          this.$session.start();
          this.$session.set('token', res.data.token);
          this.userCheck = true;
          this.getUser();
          this.getUserInfo();
          this.$router.push({name:'rating-page'});
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
       async getUserInfo(){
        const params = {
          id: this.user.user_id,
        };
        let res = await api.userDetail(params);

        this.$store.state.currentUserInfo = res.data[0];
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
    async postMatrix () {
    const params= {
        id: this.$store.state.currentUser.user_id
    }
    const res = await this.matrix(params);

    },

    setBackground(){
      var random= Math.floor(Math.random() * this.images.length);
      this.colIndex.push(random);
      if(this.colIndex.length > 1){
        this.colIndex.shift();
      }
      this.index = this.colors[this.colIndex[0]];
      document.getElementById('startBackground').style.backgroundImage=this.images[this.colIndex[0]];
    },
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

.cc-selector input:active +.imagecard-cc{opacity: .9;}
.cc-selector input:checked +.imagecard-cc{
    -webkit-filter: none;
       -moz-filter: none;
            filter: none;
}

</style>
