<template>
  <div class="query_div">
    <div class="quries">

    </div>
    <div class="now_query">{{ txt }}</div>
    <input v-model="queryText" type="text" />
    <input v-model="conditionText" type="text" @keydown.enter="addQuery" />
    <button @click="addQuery">추가</button>
    <button @click="chk">확인</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'HelloWorld',
  data () {
    return {
      queries: {},
      queryCnt: 0,
      txt: "",
      queryText: "",
      conditionText: ""
    }
  },
  watch: {
    queryCnt: function() {
      this.txt = this.queries
    },
  },
  methods: {
    ...mapActions("wine", ["getWines"]),
    addQuery() {
      this.queries[this.queryText] = this.conditionText;
      this.queryCnt += 1;
      this.queryText = "";
      this.conditionText = "";
    },
    async chk() {

      await this.getWines(this.queries);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
