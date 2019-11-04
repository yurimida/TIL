<template>
  <div class="navbar--container">
    <!-- Mobile -->
    <div class="navbar--home-button-mobile">
      <span>WINERY</span>
    </div>

    <!-- Web -->
    <div class="navbar--home-button-web">
      <span @click="toWineListPage">WINERY</span>
    </div>
    <div class="navbar--user-button">
      <div v-if="!isSigned" @click="toSignInPage">
        로그인
      </div>
      <div v-else @click="requestSignOut">
        로그아웃
      </div>
      <div @click="toSignUpPage">
        회원가입
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['userInfo', 'isSigned'])
  },
  methods: {
    ...mapActions('user', ['signOut']),

    async requestSignOut() {
      const status = await this.signOut();
      if (status===200) {
        alert("성공적으로 로그아웃 되었습니다.")
        this.$router.push(
          {
            name: 'wine-list-page'
          }
        )
      } else {
        alert("로그아웃에 실패하였습니다. 연결을 확인 후 다시 시도해주세요.")
      }
    },
    toWineListPage() {
      this.$router.push(
        {
          name: 'wine-list-page',
        }
      )
    },
    toSignInPage() {
      this.$router.push(
      {
        name: 'sign-in-page',
      })
    },
    toSignUpPage() {
      this.$router.push(
      {
        name: 'sign-up-page',
      })
    }
  }
}
</script>

<style scoped>
.navbar--container {
  height: 10vh;
  background-color: #290101;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar--home-button-web, .navbar--home-button-mobile {
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 3px;
  font-size: 25px;
  font-family: 'Bitter', serif;
  font-weight: 500;
  color: #B8B1AB;
  cursor: pointer;
}

.navbar--home-button-mobile {
  display: none;
}

.navbar--user-button {
  width: 40%;
  display: flex;
  justify-content: flex-end;
}

.navbar--user-button > div {
  margin-right: 5%;
  font-weight: 700;
  color: #FFFFFF;
  cursor: pointer;
}

@media (max-width: 450px) {
  .navbar--container {
    justify-content: center;
  }
  .navbar--home-button-web, .navbar--user-button {
    display: none;
  }
  .navbar--home-button-mobile {
    display: flex;
  }
}


</style>