<template>
  <v-card>
    <v-card-title>
      Users
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="UserList"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
import router from '../../router'
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Username',
            align: 'left',
            sortable: false,
            value: 'username',
          },
          { text: 'gender', value: 'gender' },
          { text: 'age', value: 'age' },
          { text: 'occupation', value: 'occupation' },
        ],
        // UserList: [
        // ],
      }
    },
    computed: {
           ...mapState({
                UserList: state => state.data.userDetailList
              })
        },
        mounted() {
          // console.log(this.id)
            const params = {
               id: this.id
             };
             this.userDetail(params)
        },
        methods: {
             ...mapActions("data", ['userDetail']),
          goBack() {
            router.go(-1)
          },
          goTo(id) {
            this.$router.push({name: 'user-detail', params:{ id: id}})
      }
        },
  }
</script>