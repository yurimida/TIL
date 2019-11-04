<template>
  <div class="comments--container">
    <!-- Star Rating -->
    <div class="comments--star-rating-container">
      <div class="comments--star-rating">
        <span
          :key="`star${num}`"
          class="comments--star-rating-star"
          v-for="num in starArray"
          @mouseover="setRatingUnset(num)"
          @mouseleave="setRatingUnset(0)"
          @click="setRatingSet"
        >
          <i v-if="starState(num)" class="fas fa-star"></i>
          <i v-else class="far fa-star"></i>
        </span>
      </div>
      <div class="comments--star-rating-number">
        <span>
          {{ ratingNumber }}
        </span>
      </div> 
    </div>

    <!-- Input Form -->
    <div class="comments--input-form">
      <input v-model="comment" type="text" :placeholder="infoMessage">
      <div 
        @click="addComment"
        @keyup.enter="addComment"
        class="comments--input-button">
        <span><i class="far fa-edit"></i></span>
      </div>
    </div>

    <!-- Comments -->
    <div class="comments--comments">
      <div 
        :key="`comment${idx}`" 
        v-for="(comment, idx) in wineComments"
        v-if="idx <= numComments"
        class="comments--comment"
      >
        <!-- Rating -->
        <div class="comments--comments-rating-container">
          <span v-for="num in starArray">
          <i v-if="num <= comment.rating" class="fas fa-star"></i>
          <i v-else class="far fa-star"></i>
          </span>
          <span>{{ comment.rating }}</span>
        </div>
        
        <!-- Comment (+User) -->
        <div class="comments--comments-comment-container">
          <!-- Comment -->
          <div class="comments--comments-comment">
            <span>{{ comment.comment }}</span>
          </div>
          <!-- User -->
          <div class="comments--comments-user">
            <span>{{ comment.user }}</span>
            
          </div>
        </div>
        <!-- Delete Button -->
        <div class="comments--comments-delete-button">
          <span 
            @click="removeComment"
            v-if="username === comment.user"
          >
            <i class="fas fa-times"></i>
          </span>
        </div>
      </div> 
    </div>

    <div class="comments--showmore-button">
      <span
        v-if="numComments < wineComments.length"
        @click="showMoreComment"
      >
        <i class="fas fa-plus"></i> More
      </span>
    </div>  
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      // Comment, Rating
      infoMessage: '와인에 대한 평가를 작성해주세요.',
      starArray : [1, 2, 3, 4, 5],
      comment: '',
      ratingUnset: 0,
      ratingSet: 0,

      // Comments
      numComments: 4,
    }
  },
  computed: {
    ...mapState('user', ['username', 'isSigned']),
    ...mapState('wine', ['wineComments']),

    ratingNumber() {
      return this.ratingUnset > 0 ? this.ratingUnset : this.ratingSet;
    }
  },
  methods: {
    ...mapActions('user', ['createComment', 'deleteComment']),

    setRatingUnset(num) {
      this.ratingUnset = num;
    },

    setRatingSet(num) {
      this.ratingSet = this.ratingUnset;
      this.ratingUnset = 0;
    },

    starState(num) {
      if (this.ratingUnset > 0) {
        if (num > this.ratingUnset) {
          return false
        } else {
          return true
        }
      } else {
        if (this.ratingSet >= 0) {
          if (num > this.ratingSet) {
            return false
          } else {
            return true
          }
        }
      }
    },

    async addComment() {
      if (!this.useranme && !this.isSigned) {
        alert("로그인 하셔야 댓글을 남길 수 있습니다.")
      } else if (this.comment.length === 0) {
        alert("댓글을 입력하셔야 작성이 가능합니다.");
      } else if (this.ratingSet === 0) {
        alert("평점을 입력해주세요.");
      } else {
        const params = {
          username: this.username,
          wineId: this.$route.params.wine_id,
          rating: this.ratingSet,
          comment: this.comment
        }
        const status = await this.createComment(params);
        if (status !== 200) {
          alert("댓글 작성에 실패했습니다.");
        } else {
          this.comment = '';
        }
      }
    },

    async removeComment() {
      const params = {
        username: this.username,
        wineId: this.$route.params.wine_id
      }
      const status = await this.deleteComment(params);
      if (status !== 200) {
        alert("댓글이 삭제되지 않았습니다.")
      }
    },

    showMoreComment() {
      this.numComments += 5;
    },
  }
}
</script>

<style scoped>
.comments--container {
  padding: 20px 10px;
}

/* Star Rating */
.comments--star-rating-container {
  display: flex;
  padding: 20px 0;
  font-size: 20px;
}

.comments--star-rating {
  color: #F8C629;
}

.comments--star-rating-star {
  margin-right: 5px;
}

.comments--star-rating-number {
  margin-left: 10px;
  font-weight: 700;
  line-height: 1.1;
}

/* Comment Input Form */
.comments--input-form {
  height: 30px;
  display: flex;
  justify-content: space-between;
}

.comments--input-form > input {
  width: 90%;
  padding-left: 5px;
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: 1px solid #228AE6;
  background-color: #F8F8F8;
  font-size: 15px;
}

.comments--input-button {
  width: 8%;
  margin: 0 1%;
  border-radius: 5px;
  background-color: #F8F8F8;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  color: #228AE6;
  transition: 0.3s;
}

.comments--input-button:hover {
  color: #41B883;
  cursor: pointer;
}


/* Comments */
.comments--comments {
  margin-top: 50px;
  padding: 10px 0;
}

.comments--comment {
  padding: 20px 0;
  border-bottom: 1px dotted #B49580;
  display: flex;
  font-family: 'Sunflower', sans-serif;
  font-weight: 700;
}

.comments--comments-rating-container {
  width: 20%;
}

.comments--comments-rating-container .fa-star {
  color: #F8C629;
}

.comments--comments-comment-container {
  width: 75%;
  line-height: 1.3;
}

.comments--comments-comment {
  font-size: 15px;
  color: #00103F;
}

.comments--comments-user {
  margin-top: 3px;
  font-size: 12px;
  color: #B49580;
}

.comments--comments-delete-button {
  width: 5%;
  text-align: center;
  transition: all 1s;
  font-size: 20px;
  line-height: 2;
}

.comments--comments-delete-button:hover {
  color: #DA113B;
}

.comments--showmore-button {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.comments--showmore-button > span {
  padding: 10px;
  border-radius: 7px;
  border: 1.5px solid #B49580;
  background-color:#B49580;
  color: #FFFFFF;
  transition: 0.5s;
}

.comments--showmore-button > span:hover {
  background-color: #FFFFFF;
  color: #B49580;
  cursor: pointer;
}
</style>