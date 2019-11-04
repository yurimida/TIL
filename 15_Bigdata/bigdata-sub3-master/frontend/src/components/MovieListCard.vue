<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 5 : 2" @click="goTo">
      <v-layout align-center>
        <v-flex text-center>
          <v-container grid-list-lg pa-0>
            <v-layout column>
              <v-list-item>
                <v-list-item-content>
                  <v-img
                    class="white--text"
                    height="400px"
                    :src="poster"
                   >
                  </v-img>
                  <v-list-item-title style="font-size: 20px; padding: 7px;">
                    <span v-html="highlight(title)"></span>
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ genres }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-text>
                <v-layout justify-center>
                  <v-rating
                    :value="rating"
                    color="#CA7C7C"
                    background-color="#CA7C7C"
                    half-increments
                    dense
                    readonly
                  />
                  <div class="grey--text ml-4">{{ rating.toFixed(1) }}</div>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout justify-center>
                  <v-icon color="black">mdi-eye</v-icon>
                  <div class="grey--text mx-4">{{ viewCnt }}</div>
                  <v-icon color="black">mdi-eye-check</v-icon>
                  <div class="grey--text mx-4">{{ watchCnt }}</div>
                </v-layout>
              </v-card-text>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-card>
  </v-hover>
</template>

<script>

export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    },
    genres: {
      // type: Array,
      // default: () => new Array()
    },
    poster: {
      type: String,
      default: ""
    },
    rating: {
      type: Number,
      default: 0.0
    },
    viewCnt: {
      type: Number,
      default: 0
    },
    watchCnt: {
      type: Number,
      default: 0
    },
  },
  computed: {
    genresStr: function() {
      return this.genres.join(" / ");
    },
  },
   methods: {
      goTo() {
        this.$router.push({name: 'movie-detail', params:{ id: this.id}})
      },
      highlight(value) {
        var iQuery = new RegExp(this.$store.state.data.searchInput, "ig");
        return value.toString().replace(iQuery, function(matchedTxt, a, b) {
          return ('<span class=\'highlight\'>' + matchedTxt + '</span>');
        });
      }
  },
};
</script>
