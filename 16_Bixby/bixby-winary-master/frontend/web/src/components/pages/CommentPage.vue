<template>
  <div class="comment-page--container">
    <!-- Wine Info -->
    <div class="comment-page--wine-information">
      <!-- Image -->
      <div class="comment-page--wine-information-image-container">
        <img :src="wineInfo.wine_image">
      </div>

      <!-- Name -->
      <div class="comment-page--wine-information-name-container">
        <div class="comment-page--wine-information-name-en">
          {{ wineEngName }}
        </div>
        <div class="comment-page--wine-information-name-ko">
          {{ wineInfo.wine_ko_name }}
        </div>
      </div>
    </div>

    <!-- Message -->
    <div class="comment-page--message">
      <span>총 <strong>{{ numComments }}</strong>개의 댓글이 있습니다.</span>
    </div>

    <!-- Comments -->
    <div class="comment-page--comments">
      <div 
        :key="`comment${idx}`" 
        v-for="(comment, idx) in comments"
        v-if="idx <= count"
        class="comment-page--comment"
      >
        <span>{{ comment }}</span>
      </div>
      <div class="comment-page--showmore-button">
        <span @click="showMoreComment"><i class="fas fa-plus"></i> More</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      count: 4,
      comments: [
        '개인적으로는 너무 달다고 느낌;;',
        '어제 매운 불닭 케이크와 같이 먹었는데 잘 어울림!!',
        '엄청 맛있는건 아니지만 가성비는 이게 갑인듯??',
        '최근에 먹어본 것 중에선 그나마 괜찮았던 것 같음',
        '내 입엔 존맛인데 생각보다 사람들 평이 별로네..',
        '맛없다;; 그냥 소주에 포도주스 타서 먹는게 훨씬 나을듯..',
        '아직 안 먹어봤는데 평가 보니까 걸러야겠네.',
        '아니 이거 저만 맛있는건가요?? 왜 다들 맛없다고 하지..',
        '으어어.. 테스트용 댓글 지어내기 어렵다... ㅠㅠ',
        '사실 작성자는... 와알못입니다. 와린이입니다.',
        '이 것은 열 한번째 댓글입니다. 더보기 테스트 가즈아.'
      ],
      wineInfo: {}
    }
  },
  computed: {
    numComments() {
      return this.comments.length;
    },
    wineEngName() {
      try {
        const string = this.wineInfo.wine_en_name.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
      } catch(error) {
        return
      }
    }
  },
  methods: {
    showMoreComment() {
      this.count += 5;
    }
  },
  async created() {
    const BASE_URL = 'http://localhost:8000/api'
    const wineId = this.$route.params.wine_id
    const response = await axios.get(`${BASE_URL}/wine_detail_info/${wineId}`)
    this.wineInfo = response.data.wine[0];
  }
}
</script>

<style scoped>
.comment-page--container {
  padding: 10vh 0;
}

.comment-page--wine-information {
  margin-bottom: 10vh;
}

.comment-page--wine-information-image-container {
  display: flex;
  justify-content: center;
}

.comment-page--wine-information-image-container > img {
  width: 35vw;
  height: 95vw;
}

.comment-page--wine-information-name-container {
  padding-left: 2vw;
  text-align: center;
  font-weight: 700;
  font-size: 4vw;
}

.comment-page--wine-information-name-en {
  font-family: 'Nunito Sans', sans-serif;
  color: #690b22;
  margin-bottom: 1vh;
}

.comment-page--wine-information-name-ko {
  font-family: 'Sunflower', sans-serif;
  color: #420101;
}

.comment-page--message {
  padding-left: 2vw;
  font-family: 'Sunflower', sans-serif;
  font-size: 5vw;
  font-weight: 600;
}

.comment-page--message strong {
  font-weight: 700;
  color: #52151C;
}

.comment-page--comments {
  margin-top: 3vh;
}

.comment-page--comment {
  padding: 2vh 0 2vh 2vw;
  border-bottom: 1px dotted #B49580;
  font-family: 'Sunflower', sans-serif;
  font-size: 3vw;
  line-height: 1.2;
  font-weight: 700;
}

.comment-page--showmore-button {
  cursor: pointer;
  margin-top: 3vh;
  padding: 1vh 0;
  background-color: #52151C;
  text-align: center;
  font-size: 5vw;
  font-weight: 700;
  color: #FFFFFF;
}
</style>
