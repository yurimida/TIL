<template>
  <v-container my-12>
    <v-layout >
      <v-row justify="center" >
        <v-col cols="12">
          <v-row justify="center" my-5>
            <v-img max-width="150px" v-if="UserList[0] && UserList[0].image" :src="UserList[0].image"></v-img>
          </v-row>
          <v-row justify="center" my-5>
            <v-form ref="form" lazy-validation>
              <v-flex v-if="UserList[0]">
                <v-text-field
                  v-model="username=UserList[0].username"
                  label="name"
                  solo
                  required
                ></v-text-field>
                <v-flex>
                  <v-select solo v-model="age=userAge.value" :items="ages" item-text="text" item-value="value" label="Age*" required />
                  <v-select solo v-model="gender=userGender.value" :items="genders" item-text="text" item-value="value" label="Gender*" required />
                  <v-select solo v-model="occupation=userOccupation.value" :items="occupations" label="Occupation*" required />
                </v-flex>
                <v-flex text-xs-center>
                  <v-row justify="center" align="center">
                    <v-btn rounded :color="index" @click="modify">
                      <span class="btnStyle">
                        Modify
                      </span>
                    </v-btn>
                    <v-btn text color="white" @click="goBack"><span class="btnStyle">back</span></v-btn>
                  </v-row>
                </v-flex>
              </v-flex>
            </v-form>
          </v-row>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import {
  mapState,
  mapActions
} from "vuex";
import router from '../../router'
import api from '@/api'
export default {
  props: {
    id: 0
  },
  data() {
    return {
      index:'',

      dialog: false,
      username: "",
      gender: "",
      age: "",
      occupation: "",
      userAge: {
        value: ""
      },
      userGender: {
        value: ""
      },
      userOccupation: {
        value: ""
      },
      ages: [{
          text: "Under 18",
          value: "1"
        },
        {
          text: "18-24",
          value: "18"
        },
        {
          text: "25-34",
          value: "25"
        },
        {
          text: "35-44",
          value: "35"
        },
        {
          text: "45-49",
          value: "45"
        },
        {
          text: "50-55",
          value: "50"
        },
        {
          text: "56+",
          value: "56"
        },
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
  watch: {
    '$route'(to, from) {
      this.jiss()
    },
    getColIndex(){

    },
  },
  computed: {
    ...mapState({
      UserList: state => state.data.userDetailList,
      colors: state => state.data.colors,
      images: state => state.data.images,
      colIndex: state => state.data.colIndex
    }),
    getColIndex(){
      this.index = this.colors[this.colIndex[0]];
      return this.$store.state.colIndex;
    },
  },
  mounted() {
    this.jiss();
    this.setBackground();
  },
  methods: {
    setBackground(){
      var random= Math.floor(Math.random() * this.images.length);
      this.colIndex.push(random);
      if(this.colIndex.length > 1){
        this.colIndex.shift();
      }
      this.index = this.colors[this.colIndex[0]];
      document.getElementById('startBackground').style.backgroundImage=this.images[this.colIndex[0]];
    },
    async modify() {
      // console.log(this.age, this.occupation, this.gender);
      const params = {
        id: this.id,
        username: this.username,
        age: this.age,
        occupation: this.occupation,
        gender: this.gender,
        image: ''
      };
      // console.log(params);
      // console.log('check2');
      const res = await api.modifyUser(params);
      // console.log(res);
      router.go(-1)
    },
    ...mapActions("data", ['userDetail']),
    async jiss() {
      const params = {
        id: this.id,
      };
      await this.userDetail(params)
      this.userAge.value = this.UserList[0].age.toString()
      this.userGender.value = this.UserList[0].gender.toString()
      this.userOccupation.value = this.UserList[0].occupation.toString()
    },
    ...mapActions("data", ['modifyUser']),
    goBack() {
      router.go(-1)
    }
  },
}
</script>
