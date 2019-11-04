<template>
  <div class="sign-up-page--container">
    <!-- Header -->
    <div class="sign-up-page--header">
      <div class="sign-up-page--header-title">
        {{ title }}
      </div>
    </div>

    <!-- Body -->
    <div class="sign-up-page--body">
      <!-- ID -->
      <div class="sign-up-page--body-input-form">
        <span>아이디 <strong>*</strong></span>
        <input v-model="username" required type="text">
        <span @click="requestSearchUser" class="sign-up-page--body-input-form-button">중복확인</span>
        <span class="sign-up-page--body-input-form-message">{{ usernameMessage }}</span>
      </div>

      <!-- Password -->
      <div class="sign-up-page--body-input-form">
        <span>패스워드 <strong>*</strong></span>
        <input v-model="password" required type="password">
        <span class="sign-up-page--body-input-form-message">{{ passwordMessage }}</span>
      </div>

      <!-- Password Confirm -->
      <div class="sign-up-page--body-input-form">
        <span>패스워드 확인 <strong>*</strong></span>
        <input v-model="passwordConfirm" required type="password">
        <span>{{ confirmPasswordMessage }}</span>
      </div>

      <!-- Name -->
      <div class="sign-up-page--body-input-form">
        <span>이름</span>
        <input v-model="name" type="text">
      </div>

      <!-- Gender -->

      <!-- E-mail -->
    </div>

    <!-- Footer -->
    <div class="sign-up-page--footer">
      <div @click="requestSignUp">
        <span>가입</span>
      </div>
      <div @click="cancelSignUp">
        <span>취소</span>
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
      passwordConfirm: '',
      name: '',

      // Validation Data
      isValidUsername: false,

      // Info Message
      title: '회원가입',
      usernameMessage: '아이디의 중복 여부를 체크해주세요.',
      passwordInvalidationMessage: '비밀번호는 6자리 이상으로 구성되어야 합니다.',
      passwordValidationMessage: '유효한 비밀번호 입니다.',
      passwordNotConfirmMessage: '비밀번호가 일치하지 않습니다.',
      passwordConfirmMessage: '비밀번호가 일치합니다.'
    }
  },
  computed: {
    // Password Validation Message
    passwordMessage() {
      if (this.password.length < 6) {
        return this.passwordInvalidationMessage;
      } else {
        return this.passwordValidationMessage;
      }
    },
    confirmPasswordMessage() {
      if (this.password.length < 6) {
        return '';
      } else if (this.password === this.passwordConfirm) {
        return this.passwordConfirmMessage;
      } else {
        return this.passwordNotConfirmMessage;
      }
    }
  },
  methods: {
    ...mapActions('user', ['signUp', 'searchUser']),

    async requestSignUp() {
      if (this.username.length < 6) {
        alert('아이디는 6자리 이상이어야 합니다.');
      } else if (this.password.length < 6) {
        alert('비밀번호는 6자리 이상으로 구성되어야 합니다.');
      } else if (this.password !== this.passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
      } else if (this.isValidUsername === false) {
        alert('아이디 또는 패스워드가 유효하지 않습니다.');
      } else {
        const params = {
          username: this.username,
          password1: this.password,
          password2: this.passwordConfirm,
          name: this.name
        }
        const status = await this.signUp(params);
        if (status === 201) {
          alert('회원가입이 성공적으로 되었습니다. 로그인 해주세요.')
          this.$router.push({
            name: 'sign-in-page'
          })
        } else {
          alert('요청에 실패하였습니다. 정확한 정보를 입력하였는지 확인해주세요.')
        }
      }
    },
    cancelSignUp() {
      this.$router.push(
      {
        name: 'wine-list-page',
      })
    },
    async requestSearchUser() {
      if (this.username.length < 6) {
        this.usernameMessage = '아이디는 6자리 이상이어야 합니다.';
      } else {
        const response = await this.searchUser(this.username);
        if (response === undefined) {
          alert("요청이 실패하였습니다.");
        } else if (response) {
          this.usernameMessage = '사용 가능한 아이디입니다.';
          this.isValidUsername = true;
        } else {
          this.usernameMessage = '이미 존재하는 아이디입니다.';
        }
      }
    }
  }
}
</script>

<style scoped>
.sign-up-page--container {
  height: 500px;
  padding: 5% 10%;
  margin-bottom: 10%;
}

/* Header */
.sign-up-page--header {
  height: 20%;
  border-bottom: 1px dotted #CAA181;
  display: flex;
  align-items: flex-end;
}

.sign-up-page--header-title {
  font-size: 25px;
  padding-bottom: 10px;
}

/* Body */
.sign-up-page--body {
  height: 60%;
}

.sign-up-page--body-input-form {
  height: 20%;
  display: flex;
  align-items: center;
}

.sign-up-page--body-input-form:not(:last-of-type) {
  border-bottom: 1px dotted #CAA181;
}

.sign-up-page--body-input-form > span:first-child {
  width: 20%;
  padding-left: 1%;
  display: inline-block;
  text-align: start;
  font-size: 15px;
  font-weight: 700;
}

.sign-up-page--body-input-form > input {
  width: 20%;
  margin: 0;
  padding: 0;
  border: 1px dotted grey;
  font-size: 15px;
}

strong {
  color: #F81229;
}

.sign-up-page--body-input-form > span:last-child {
  margin-left: 2%;
  font-size: 10px;
}

.sign-up-page--body-input-form-button {
  margin: 0 0 0 2%;
  padding: 1% 1%;
  width: 10%;
  max-width: 60px;
  background-color: #827265;
  text-align: center;
  white-space: nowrap;
  font-size: 10px;
  color: #ffffff;
  cursor: pointer;
}

/* Footer */
.sign-up-page--footer {
  height: 20%;
  border-top: 1px dotted #CAA181;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign-up-page--footer > div {
  padding: 1% 3%;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
}

.sign-up-page--footer > div:first-child {
  margin-right: 4%;
  background-color: #827265;
}

.sign-up-page--footer > div:last-child {
  background-color: grey;
}
</style>