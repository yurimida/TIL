<template>
<v-container>
  <v-layout justify-center>
    <v-card style="width:700px;">
      <v-card-title style="margin-left: 10%;">
        Users
        <div class="flex-grow-1" />
        <v-text-field v-model="search" label="Search" single-line hide-details color="#263040" />
      </v-card-title>
      <v-data-table :headers="headers" :items="UserList" :search="search">
        <template v-slot:item.username="props">
          <div :return-value.sync="props.item.username">
            <router-link v-model="props.item.username" :to="{name:'user-detail', params:{id:props.item.id}}" style="text-decoration: none;">
              <div style="color:black">{{ props.item.username }}</div>
            </router-link>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-layout>
</v-container>
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
      }
    },
    computed: {
           ...mapState({
                UserList: state => state.data.userList
              })
        },
        mounted() {
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
