<template>
  <div class="search-form--container">
    <!-- Header -->
    <div class="search-form--header-container">
      <span>SEARCH</span>
    </div>

    <!-- Search Form -->
    <div class="search-form--search-form-container">

      <!-- Input Form -->
      <div class="search-form--input-form">
        <!-- Select Box -->
        <div class="search-form--select-box-container">
          <div class="search-form--select-box-categories">
            <select ref="categories">
              <option value="">CATEGORIES</option>
              <option :value="category" v-for="category in categories">{{ category }}</option>
            </select>
          </div>
          <div class="search-form--select-box-region">
            <select ref="region">
              <option value="">REGION</option>
              <option :value="region" v-for="region in regions">{{ region }}</option>
            </select>
          </div>
          <div class="search-form--select-box-varietal">
            <select ref="varietal">
              <option value="">VARIETAL</option>
              <option :value="varietal" v-for="varietal in varietals">{{ varietal }}</option>
            </select>
          </div>
        </div>
        <!-- Text Search Bar -->
        <div class="search-form--text-search-bar">
          <input ref="keyword" type="text" :placeholder="infoMessage">
        </div>
      </div>

      <!-- Button -->
      <div @click="searchWines" class="search-form--button">
        <span>SEARCH <i class="fas fa-search"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { modifyKeyword } from '@/mixins/modifyKeyword';

export default {
  data() {
    return {
      infoMessage: '브랜드명, 와인명, 혹은 음식명을 입력해주세요.',
      categories: ['레드', '화이트', '스파클링', '로제', '주정강화'],
      regions : ['프랑스', '이탈리아', '독일', '스페인', '미국', '칠레', '아르헨티나', '호주', '뉴질랜드', '남아프리카', '캐나다', '포르투갈'],
      varietals: ['까베르네 소비뇽', '메를로', '까르미네르', '시라', '피노 누아', '말벡', '산지오베제', '샤르도네', '소비뇽 블랑', '리슬링', '모스까또', '기타 품종']
    }
  },
  methods: {
    ...mapActions('wine', ['getWineList']),

    async searchWines() {
      // 다양한 키워드에 대응할 수 있도록 키워드를 조정하는 과정을 거침.
      const keyword = this.$refs.keyword.value;
      const modifiedKeywordList = keyword.length ? modifyKeyword(keyword) : undefined;

      const params = {
        'CATEGORIES': this.$refs.categories.value || undefined,
        'VARIETAL': this.$refs.varietal.value || undefined,
        'REGION': this.$refs.region.value || undefined,
        'KEYWORD': modifiedKeywordList
      }
      
      const status = await this.getWineList(params);
    },
  }
}
</script>

<style scoped>
.search-form--container {
  min-height: 210px;
  background-color: #B8B1AB;
}

.search-form--header-container {
  height: 70px;
  line-height: 70px;
  text-align: center;
  letter-spacing: 2px;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #252220;
}

.search-form--search-form-container {
  padding: 20px 20px;
  display: flex;
}

.search-form--select-box-container select {
  padding-left: 5px;
}

.search-form--input-form{
  width: 80%;
}

.search-form--button {
  width: 20%;
  background-color: #827265;
  line-height: 100px;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
}

.search-form--select-box-container {
  display: flex;
  height: 50px;
}

.search-form--select-box-categories {
  width: 30%;
  border-width: 1px 1px 1px 1px;
  border-color:#827265;
  border-style: solid;
}

.search-form--select-box-region {
  width: 30%;
  border-width: 1px 1px 1px 0px;
  border-color:#827265;
  border-style: solid;
}

.search-form--select-box-varietal {
  width: 40%;
  border-width: 1px 1px 1px 0px;
  border-color:#827265;
  border-style: solid;
}

.search-form--text-search-bar {
  height: 50px;
  border-width: 0px 1px 1px 1px;
  border-color:#827265;
  border-style: solid;
}

.search-form--text-search-bar input {
  width: 96%;
  padding: 0 2%;
}

select {
  border: 0;
  width: 100%;
  height: 100%;
}

input {
  margin: 0;
  padding: 0 0 0 10px;
  border: 0;
  width: 100%;
  height: 100%;
}
</style>