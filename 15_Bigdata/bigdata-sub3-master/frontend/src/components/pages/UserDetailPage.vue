<template>
  <v-container fluid my-12>
    <div class="detailContents">
      <v-row >
        <v-col cols="12">
          <v-row justify="center">
            <v-card width="300px" color="rgba(255, 255, 255, 0.8)" style="margin: 0 1%">
              <v-row justify="center">
                <v-col cols="12" v-if="isModify">
                  <v-row justify="center">
                    <v-img :src="modiImage"
                      aspect-ratio="1.8" contain >
                    </v-img>
                  </v-row>
                  <v-row justify="center" style="width:290px; margin: auto">
                    <v-text-field
                      label="Select Image"
                      @click="pickFile"
                      v-model="imageName"
                      prepend-icon="mdi-paperclip"
                    ></v-text-field>

                    <input
                      type="file"
                      style="display: none"
                      ref="image"
                      accept="image/*"
                      @change="onFilePicked"
                    />
                  </v-row>
                </v-col>
                <v-col cols="12" v-else style="margin-top: 5%">
                  <v-img v-if="UserList[0] && UserList[0].image" :src="UserList[0].image"
                    aspect-ratio="1.8" contain >
                  </v-img>
                </v-col>

              </v-row>
            </v-card>
            <v-card width="300px" color="rgba(255, 255, 255, 0.8)" style="margin: 0 1%">
              <v-flex xs12 ma-3 v-if="isModify">
                <v-text-field  v-model="modiName"
                  label="이름" hide-details filled
                ></v-text-field>
                <v-select v-model="modiGender" :items="genders"
                  item-text="text" item-value="value" label="Gender*" hide-details filled/>
                <v-select v-model="modiAge" :items="ages"
                  item-text="text" item-value="value" label="Age*" hide-details filled/>
                <v-select v-model="modiJob" :items="occupations"
                  label="Occupation*" hide-details filled/>
              </v-flex>
              <v-flex xs12 ma-3 v-else>
                <v-text-field v-if="UserList[0]" v-model="UserList[0].username"
                  label="이름" hide-details readonly
                ></v-text-field>
                <v-text-field v-if="UserList[0]" v-model="UserList[0].gender"
                  label="성별" hide-details readonly
                ></v-text-field>
                <v-text-field v-if="UserList[0]" v-model="UserList[0].age"
                  label="나이" hide-details readonly
                ></v-text-field>
                <v-text-field v-if="UserList[0]" v-model="UserList[0].occupation"
                  label="직업" hide-details readonly
                ></v-text-field>
              </v-flex>
              <v-flex xs12 ma-3 v-if="isModify">
                <v-row justify="center">
                  <v-btn :color="index" rounded v-on:click="modifyAction" style="margin: 1% 1%">
                    <span class="btnStyle">
                      수정
                    </span>
                  </v-btn>
                  <v-btn rounded v-on:click="modifyActivate" style="margin: 0 1%">
                    취소
                  </v-btn>
                </v-row>
              </v-flex>
              <v-flex xs12 ma-3 v-else-if="!isModify && id == user.user_id">
                <v-row justify="center">
                  <v-btn :color="index" rounded v-on:click="modifyActivate">
                    <span class="btnStyle">
                      프로필 변경
                    </span>
                  </v-btn>
                </v-row>
              </v-flex>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row justify="center">
            <v-card width="300px" height="185px" color="rgba(255, 255, 255, 0.8)" style="margin: 1% 1%">
              <v-row align="center" justify="center">
                <v-flex xs12>
                  <v-row justify="center" style="margin-top: 5%">
                    <h2>영화</h2>
                  </v-row>
                </v-flex>
                <v-flex xs12>
                  <v-row align="center" justify="center">
                  <v-dialog v-model="dialog" scrollable max-width="400px">
                    <template v-slot:activator="{ on }">
                      <v-btn class="img_scale" v-if="UserList[0]" text v-on="on">
                        <v-row justify="center" >
                          <v-col style="padding:0px">
                            <v-icon :color="index" size="50">mdi-movie-open</v-icon>
                            <h1>{{ UserList[0].movies.length }}</h1>
                          </v-col>
                        </v-row>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title text-center>관람한 영화</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text v-if="UserList[0]" style="height: 300px;">
                        <div v-for="movie in UserList[0].movies">
                          <router-link class="watchedMovie" :to="{ name: 'movie-detail', params: {id: movie[0]}}" style="text-decoration: none; color: black">
                            {{ movie[1] }}
                          </router-link>
                        </div>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn color="blue darken-1" text height="24px" @click="dialog=false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-row>
                </v-flex>
              </v-row>
            </v-card>
            <v-card width="300px" height="185px" color="rgba(255, 255, 255, 0.8)" style="margin: 1% 1%;">
              <v-row justify="center" align="center">
                <v-flex xs12>
                  <v-row align="center" justify="center" style="margin-top: 5%">
                    <h2>구독</h2>
                  </v-row>
                </v-flex>
                <v-flex xs12>
                  <v-img src="https://i.imgur.com/RxA9Kq0.png" aspect-ratio="4" contain></v-img>
                </v-flex>
                <v-flex xs12>
                  <v-row justify="center" align="center">
                    <template v-if="dday > 0">
                      <h1>D-{{dday}}</h1>
                    </template>
                    <template v-else>
                      <v-btn rounded v-if="user.user_id==id" :color="index" style="margin-bottom: 4%" @click="update_subscribe">
                        <span class="btnStyle">
                        구독 갱신
                        </span>
                      </v-btn>
                    </template>
                  </v-row>
                </v-flex>
              </v-row>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row justify="center" align="center">
            <v-card width="635px" height="180px" color="rgba(255, 255, 255, 0.8)">
              <v-flex xs12>
                <v-row justify="center" align="center" style="margin-top: 3%">
                  <h2>나와 비슷한 사용자들</h2>
                </v-row>
              </v-flex>
              <v-row justify="center" align="center">
                <template v-for="user in UserList.slice(1, UserList.length)">
                  <router-link :to="{name: 'user-detail', params: {id: user.id}}" style="text-decoration: none; color: black">
                    <div class ="img_scale" style="margin: 10% 10% 5% 10%">
                      <v-img :src="user.image" width="80px"></v-img>
                      <v-flex xs12>
                        <v-row justify="center" align="center">
                          {{ user.username }}
                        </v-row>
                      </v-flex>
                    </div>
                  </router-link>
                </template>
              </v-row>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-flex>
            <v-row justify="center" align="center">
              <v-btn rounded :color="index" @click="goBack">
                <span class="btnStyle">BACK
                </span>
              </v-btn>
            </v-row>
          </v-flex>
        </v-col>
      </v-row>
    </div>

    <!-- <div id="startBackground"></div> -->
    <!-- <div class="darker"></div> -->
  </v-container>
</template>

<script>
import {mapState,mapActions} from "vuex";
import router from '../../router'
import axios from "axios";
import api from '@/api'
import Swal from 'sweetalert2'
export default {
  props: {
    id: 0
  },
  data() {
    return {
      dialog: false,
      user: '',
      ratings: [],

      isModify:false,
      modiAge:'',
      modiGender:'',
      modiJob:'',
      modiName:'',
      modiImage:'',
      imageName:'',
      dday:'',

      userAge: {
        value: ""
      },
      ages: [{ text: "Under 18", value: "1" },
        {text: "18-24",value: "18"},
        {text: "25-34",value: "25"},
        {text: "35-44",value: "35"},
        {text: "45-49",value: "45"},
        {text: "50-55",value: "50"},
        {text: "56+",value: "56"},
      ],
      genders: [{
          text: "Male",
          value: "M"
        },
        {
          text: "Female",
          value: "F"
        },
      ],
      occupations: ["other", "academic/educator", "artist", "clerical/admin", "college/grad student", "customer service", "doctor/health care", "executive/managerial", "farmer", "homemaker", "K-12 student", "lawyer", "programmer", "retired",
        "sales/marketing", "scientist", "self-employed", "technician/engineer", "tradesman/craftsman", "unemployed", "writer"
      ],
    }
  },

  computed: {
    ...mapState({
      UserList: state => state.data.userDetailList,
      RatingList: state => state.data.ratingList,
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
    '$route'(to, from) {
      this.jiss()
    },
    getColIndex(){

    },
  },
  mounted() {
    this.jiss();
    this.getUser();
    this.setBackground();
    // this.ee()
  },
  methods: {
    getDday(){
      var currentTime = new Date();
      const params= {
        y1 : currentTime.getFullYear(),
        m1 : currentTime.getMonth()+1,
        d1 : currentTime.getDate(),
        y2 : this.UserList[0].subscribe.substring(0,4),
        m2 : this.UserList[0].subscribe.substring(5,7),
        d2 : this.UserList[0].subscribe.substring(8,10),
      }
      this.dday = this.dateDiff(params);
    },
    dateDiff(params) {
      var diffDate_1 =new Date(params.y1, params.m1, params.d1);
      var diffDate_2 =new Date(params.y2, params.m2, params.d2);

      var diff = diffDate_2.getTime() - diffDate_1.getTime();
      diff = Math.ceil(diff / (1000 * 3600 * 24));

      return diff;
    },

    /* 2019.10.08 이찬호
    * 프로필 수정 할 수 있게 된다.
    */
    modifyActivate(){
      this.isModify = !this.isModify;
      if(this.isModify){
        this.modiName = this.UserList[0].username;
        this.modiAge = this.UserList[0].age.toString();
        this.modiGender = this.UserList[0].gender ;
        this.modiJob = this.UserList[0].occupation;
        this.modiImage = this.UserList[0].image;
        this.imageName = this.UserList[0].image;
      }
    },

    /* 2019.10.08 이찬호
    * 수정된 정보를 DB에 저장한다.
    */
    async modifyAction(){
      this.isModify = !this.isModify;
      var params = {
        id: this.id,
        username: this.modiName,
        age: this.modiAge,
        occupation: this.modiJob,
        gender: this.modiGender,
        image: this.modiImage,
      };
      console.log(params)
      const res = await api.modifyUser(params);
      params = {
        id: this.id,
      };
      this.userDetail(params);
      Swal.fire({
        type: 'success',
        title: '수정되었습니다.',
        showConfirmButton: false,
        timer: 1000
      })
    },

    async jiss() {
      const params = {
        id: this.id,
      };
      await this.userDetail(params)
      this.user = this.$store.state.currentUser;
      this.getDday();
    },
    ...mapActions("data", ['userDetail']),
    ...mapActions("data", ['getRating']),
    goBack() {
      router.go(-1)
    },
    async update_subscribe() {
      let params = {};
      params = {
        user_id: this.UserList[0].id,
      };
      const res = await api.updateSubscribe(params);
      this.jiss()
      if (res) {
        Swal.fire(
          'Good job!',
          '구독이 갱신되었습니다!',
          'success'
        )
      }
    },
    getUser() {
      this.user = this.$store.state.currentUser;
    },


    // 이미지 변경해서 imgur에 올리기
    pickFile() {
      this.$refs.image.click();
    },
    setImageUrl(url){
      this.modiImage = url;
    },
    onFilePicked(e) {
      this.modiImage = '';
      const files = e.target.files;
      this.loading = true;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }

        let formData = new FormData();
        formData.append('image', files[0]); //required

        axios({
           method: 'POST',
           url: 'https://api.imgur.com/3/image',
           data: formData,
           headers: {
           Authorization: "Client-ID aac995cb6f223ce"
           },
           mimeType: 'multipart/form-data'
           }).then(res => {
             this.modiImage = res.data.data.link;
             this.loading = false;
           }).catch(e => {
             console.log(e)
        });

      } else {
        this.imageName = "";
        this.modiImage = "";
      }
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
}
</script>
<style>
.detailContents{
  z-index: 4;
}
.watchedMovie:hover {
  background-color: #fdc23e;
  font-weight: bold;
  color: #000000;
}

</style>
