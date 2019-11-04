<template>
  <div class="sign-in-page--container">
    <!-- Header: Welcome Message -->
    <div class="sign-in-page--header">
      <div class="sign-in-page--header-message">
        <span>{{ headerMessage }}</span>
      </div>
      <div class="sign-in-page--header-sub-message">
        <span>{{ headerSubMessage }}</span>
      </div>
    </div>

    <!-- Body: Sign-In Input Form -->
    <div class="sign-in-page--body">
      <div class="sign-in-page--body-input-form-container">
        <!-- ID, Password Form -->
        <div class="sign-in-page--body-input-form">
          <div class="sign-in-page--body-input-form-id">
            <input v-model="username" type="text" placeholder="아이디">
          </div>
          <div class="sign-in-page--body-input-form-password">
            <input v-model="password" type="password" placeholder="비밀번호">
          </div>
        </div>
        <!-- Sign In Button -->
        <div class="sign-in-page--body-button"
             @click="requestSignIn"
        >
          <span>로그인</span>
        </div>
      </div>
      <!-- Search ID / PW buttons -->
    </div>
    
    <!-- Footer: Sign-Up Button -->
    <div class="sign-in-page--footer">
      <div class="sign-in-page--footer-message">
        <span>{{ footerMessage }}</span>
      </div>
      <div class="sign-in-page--footer-button-container">
        <div class="sign-in-page--footer-button"
             @click="toSignUpPage"
        >
          <span>회원가입</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      // Input Value
      username: '',
      password: '',

      // Info Message
      headerMessage: 'WELCOME TO WINERY',
      headerSubMessage: 'WINERY에서 다양한 와인에 대한 정보들을 확인해보세요.',
      footerMessage: '아래의 버튼을 클릭하시면 회원가입 페이지로 이동할 수 있습니다.'
    }
  },
  methods: {
    ...mapActions('user', ['signIn']),

    async requestSignIn() {
      const params = {
        username: this.username,
        password: this.password,
      }
      const status = await this.signIn(params);
      if (status===200) {
        alert("정상적으로 로그인 되었습니다.")
        this.$router.push(
          {
            name: 'wine-list-page'
          }
        )
      } else {
        alert("잘못된 아이디 또는 잘못된 비밀번호 입니다.")
      }
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
.sign-in-page--container {
  height: 500px;
  padding: 5% 30%;
  margin-bottom: 10%;
}

/* Header */
.sign-in-page--header {
  height: 30%;
  border-bottom: 1px dotted #CAA181;
}

.sign-in-page--header-message {
  height: 60%;
  padding-bottom: 6%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 20px;
  font-weight: 700;
}

.sign-in-page--header-sub-message {
  height: 40%;
  text-align: center;
  font-size: 15px;
  line-height: 1.3;
}


/* Body */
.sign-in-page--body {
  height: 50%;
  padding: 5% 0;
}

.sign-in-page--body-input-form-container {
  display: flex;
  height: 100%;
}

.sign-in-page--body-input-form {
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sign-in-page--body-input-form > div {
  height: 40%;
}

.sign-in-page--body-input-form input {
  width: 90%;
  height: 100%;
  margin: 0;
  padding: 0 0 0 10px;
  border: 1px dotted grey;
  font-size: 110%;
}

.sign-in-page--body-button {
  width: 30%;
  height: 70%;
  display: flex;
  justify-content: center;
  background-color: #827265;
  align-items: center;
  text-align: center;
  color: #FFFFFF;
  font-weight: 700;
  cursor: pointer;
}


/* Footer */
.sign-in-page--footer {
  height: 20%;
  padding: 5% 0;
  border-top: 1px dotted #CAA181;
}

.sign-in-page--footer-message {
  padding: 0 10%;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
}

.sign-in-page--footer-button-container {
  margin-top: 5%;
  display: flex;
  justify-content: center;
}

.sign-in-page--footer-button {
  width: 40%;
  padding: 2% 5%;
  background-color: #827265;
  text-align: center;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
}
</style>