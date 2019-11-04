<template>
  <div class="wine-list-page--container">
    <!-- Wine Search Form -->
    <div class="wine-list-page--search-form-container">
      <search-form />
    </div>

    <!-- Wine List -->
    <div v-if ="wineList.length" class="wine-list-page--wine-list-container">
      <div class="wine-list-page--wine-count-info">
        <span>
          총 <strong>{{ wineList.length }}</strong>개의 와인이 있습니다.
        </span>
      </div>

      <!-- Wine Sorting Form -->
      <div class="wine-list-page--sorting-form-container">
        <sorting-form />
      </div>

      <div 
        :key="wineInfo._id" 
        class="wine-list-page--wineinfo" 
        v-for="(wineInfo, idx) in wineList"
        v-if="idx+1 <= currentPage*20 && idx+1 > (currentPage-1)*20"
        @click="toWineDetailPage(wineInfo._id)"
      >
        <wine-info-box :info="wineInfo" />
      </div>
    </div>

    <!-- Wine Not Found -->
    <div v-else class="wine-list-page--not-found-container">
      <div class="wine-list-page--not-found-message">
        <span>{{ notFoundMessage }}</span>
      </div>
      <div class="wine-list-page--not-found-image">
        <img src="../../static/image/sadness.jpg" width=407 height=263>
      </div>
    </div>
    

    <!-- Page Buttons -->
    <div class="page-buttons-container">
      <div v-show="index > 1" @click="showFirstPageList" class="page-button">
        <i class="fas fa-backward"></i>
      </div>

      <div v-show="index > 1" @click="showPrevPageList" class="page-button">
        <i class="fas fa-caret-left"></i>
      </div>

      <div class="page-button" 
        v-for="pageNumber in pageArray" 
        :key="`page${pageNumber}`"
        v-show="pageNumber <= lastPage"
        @click="changeCurrentPage(pageNumber)"
        :class="{'current-page' :pageNumber === currentPage}"
      >
        {{ pageNumber }}
      </div>

      <div v-show="index + 10 <= lastIndex" @click="showNextPageList" class="page-button">
        <i class="fas fa-caret-right"></i>
      </div>

      <div v-show="index + 10 <= lastIndex" @click="showLastPageList" class="page-button">
        <i class="fas fa-forward"></i>
      </div>
    </div>
  </div>
</template>


<script>
// Plugins
import { mapState } from 'vuex';

// Components
import WineInfoBox from '@/components/modules/WineInfoBox';
import SearchForm from '@/components/modules/SearchForm';
import SortingForm from '@/components/modules/SortingForm';
import Pagenation from '@/mixins/pagenation';

export default {
  components: {
    WineInfoBox,
    SearchForm,
    SortingForm
  },
  data() {
    return {
      notFoundMessage: '와인을 찾지 못했어요..',
    }
  },
  computed: {
    ...mapState('wine', ['wineList']),
    
  },
  methods: {
    toWineDetailPage(wineId) {
      this.$router.push(
      {
        name: 'wine-detail-info',
        params: {
          'wine_id': wineId
        }
      })
    }
  },
  mixins: [Pagenation],
}
</script>

<style scoped>
.wine-list-page--container {
  margin-bottom: 10%;
}

.wine-list-page--wine-list-container {
  margin-top: 50px;
  padding: 10px;
}

/* Wine List */
.wine-list-page--wine-count-info {
  height: 40px;
  margin: 0 10px 10px 10px;
}

.wine-list-page--wine-count-info span {
  font-weight: 700;
}

.wine-list-page--wine-count-info span strong {
  color: #690b22;
}

.wine-list-page--wineinfo {
  width: 20%;
  min-width: 190px;
  max-width: 230px;
  margin: 1%;
  display: inline-block;
}

/* Not Found */
.wine-list-page--not-found-container {
  padding: 10% 20%;
  font-weight: 700;
}

.wine-list-page--not-found-message {
  text-align: center;
  font-size: 20px;
  margin-bottom: 30px;
}

.wine-list-page--not-found-image {
  text-align: center;
}

.wine-list-page--not-found-image > img {
  /* border: 1px solid #1867C0; */
}

/* Pagenation */
.data-list-container {
  padding: 3vh 2vw;
  box-shadow: 1px 1px 3px gray;
}

.page-buttons-container {
  display: flex;
  justify-content: center;
  margin: 2vh 20vw;
}

.page-button {
  margin: 0 2vh;
  font-size: 15px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: #690b22;
}

.page-button:hover {
  cursor: pointer;
  transform: scale(1.2);
  color: #1867C0;
}

.current-page {
  transform: scale(1.1);
  color: #1867C0;
}
</style>
