<template>
  <div class="wine-detail-page--container">
    <!-- To WineListPage Button -->
    <div class="wine-detail-page--button-container">
      <span @click="toWineListPage">
        <strong>BACK TO LIST</strong>
      </span>

      <!-- Buttons for Bixby Comment Page Test -->
      <!-- <span @click="toWineCommentPage">
        <i class="fas fa-comment"></i>
      </span> -->
    </div>
    
    
    <!-- Wine Name (KOR, ENG) -->
    <div class="wine-detail-page--name-container">
      <div class="wine-detail-page--name">
        <span class="wine-detail-page--name-en">{{ wineEngName }}</span>
        <span class="wine-detail-page--name-ko">({{ wineInfo.wine_ko_name }})</span>
      </div>
    </div>
    

    <div class="wine-detail-page--img-desc-container">
      <!-- Wine Image -->
      <div class="wine-detail-page--image-container">
        <img :src="wineInfo.wine_image" width=160 height=420 alt="..."/>
      </div>

      <!-- CATEGORIES, BRAND, REGION, VARIETAL, ALCOHOL, SIZE, TEMP, FOOD -->
      <div class="wine-detail-page--description-container">
        <div class="wine-detail-page--description-brand">
          <span>BRAND : {{ wineInfo.BRAND || nullInfoMessage }}</span>
        </div>
        <div class="wine-detail-page--description-REGION">
          <span>REGION : {{ region }}</span>
        </div>
        <div class="wine-detail-page--description-VARIETAL">
          <span>VARIETAL : {{ wineInfo.VARIETAL || nullInfoMessage }}</span>
        </div>
        <div class="wine-detail-page--description-categories">
          <span>CATEGORIES : {{ wineInfo.CATEGORIES || nullInfoMessage }}</span>
        </div>
        <div class="wine-detail-page--description-alcohol">
          <span>ALCOHOL : {{ wineInfo.ALCOHOL || nullInfoMessage }}</span>
        </div>
        <div class="wine-detail-page--description-TEMP">
          <span>TEMP : {{ wineInfo.TEMP || nullInfoMessage }}</span>
        </div>
        <div class="wine-detail-page--description-SIZE">
          <span>SIZE : {{ wineInfo.SIZE || nullInfoMessage }}</span>
        </div>
        <div class="wine-detail-page--description-food">
          <span>FOOD : {{ food }}</span>
        </div>
      </div>
    </div>
    

    <!-- tasting_body, tasting_sweetness, tasting_note -->
    <div class="wine-detail-page--tasting-info-container">
      <div class="wine-detail-page--tasting-info-body-sweetness">
        <span>BODY : {{ wineInfo.tasting_body || nullInfoMessage }}</span>
        <span>SWEETNESS : {{ wineInfo.tasting_sweetness || nullInfoMessage }}</span>
      </div>
      <div class="wine-detail-page--tasting-info-sweetness">
        
      </div>
      <div class="wine-detail-page--tasting-info-note">
        <span>{{ wineInfo.tasting_note || nullInfoMessage }}</span>
      </div>
    </div>

    <!-- Comments -->
    <div class="wine-detail-page--comments-container">
      <comments />
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

// Components 
import Comments from '@/components/modules/Comments';

export default {
  components: {
    Comments,
  },
  data() {
    return {
      nullInfoMessage: '정보가 없습니다.'
    }
  },
  computed: {
    ...mapState('wine', ['wineInfo']),
    
    wineEngName() {
      const string = this.wineInfo.wine_en_name.toLowerCase();
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    region() {
      try {
        return this.wineInfo.REGION.join(' > ');
      } catch(error) {
        return this.nullInfoMessage;
      }
      
    },
    food() {
      try {
        return this.wineInfo.FOOD.join(' | ');
      } catch(error) {
        return this.nullInfoMessage;
      }
    }
  },
  methods: {
    ...mapActions('wine', ['getWineInfo']),
    
    toWineListPage() {
      this.$router.push(
      {
        name: 'wine-list-page'
      })
    },
    
    // Methods for Bixby Comment Page Test
    toWineCommentPage() {
      const wineId = this.$route.params;
      this.$router.push(
      {
        name: 'wine-detail-comments',
        params: {
          'wine_id': wineId
        }
      })
    }
  },
}
</script>

<style scoped>
.wine-detail-page--button-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  font-size: 15px;
}
.wine-detail-page--button-container span {
  margin: 0 8%;
  width: 84%;
  padding: 10px;
  background-color: #420101;
  text-align: center;
  color: #FFFFFF;
  transition: 0.5s;
}

.wine-detail-page--button-container span:hover {
  cursor: pointer;
  background-color: #690b22;
}


/* Wine Name */
.wine-detail-page--name-container {
  margin: 30px 10% 0;
  border-bottom: 2px solid #B8B1AB;
  padding-bottom: 20px;
  text-align: center;
}

.wine-detail-page--name {
  height: 20px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.wine-detail-page--name-en {
  font-family: 'Nunito Sans', sans-serif;
  color: #690b22;
}

.wine-detail-page--name-ko {
  font-family: 'Sunflower', sans-serif;
  color: #420101;
}


/* Wine Info (Image, Desc) */
.wine-detail-page--img-desc-container {
  padding: 20px 10%;
  display: flex;
  
}

.wine-detail-page--image-container {
  width: 40%;
  border-right: 1px solid #B8B1AB;
  display: flex;
  justify-content: center;
}

.wine-detail-page--description-container {
  width: 60%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.wine-detail-page--description-container div {
  line-height: 1.3;
  font-family: 'Nunito Sans', 'Sunflower', sans-serif;
  font-weight: 700;
  color: #404549;
}


/* Tasting Note */
.wine-detail-page--tasting-info-container {
  margin: 0 10%;
  padding: 20px 0;
  border-top: 2px solid #B8B1AB;
}

.wine-detail-page--tasting-info-body-sweetness {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 700;
  color: #690b22;
}

.wine-detail-page--tasting-info-note {
  padding: 5px 5%;
  font-size: 15px;
  line-height: 25px;
  font-family: 'Sunflower', sans-serif;
  font-weight: 700;
}

/* Comments */
.wine-detail-page--comments-container {
  margin: 0 10%;
  border-top: 2px solid #B8B1AB;
}
</style>
