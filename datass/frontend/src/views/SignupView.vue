<template>
  <div
    class="d-flex justify-content-center align-items-center w-100"
    id="signuppage"
  >
    <form @submit.prevent="signupSubmit" class="col-12 col-sm-6 col-md-4">
      <div class="d-flex justify-content-center">
        <b-icon icon="emoji-laughing" style="zoom:2;"></b-icon>
      </div>

      <div class="floating-label-group mt-5">
        <b-form-input
          type="text"
          id="username"
          class="p-0"
          autocomplete="off"
          required
          v-model="username"
          :state="usernamevalidation"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="usernamevalidation">
          Cannot be empty
        </b-form-invalid-feedback>
        <span class="floating-label">User</span>
      </div>

      <div class="floating-label-group mt-5">
        <b-form-input
          type="text"
          id="displayname"
          class="p-0"
          autocomplete="off"
          required
          v-model="displayname"
          :state="displaynamevalidation"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="displaynamevalidation">
          Cannot be empty
        </b-form-invalid-feedback>
        <span class="floating-label">Display Name</span>
      </div>

      <div class="floating-label-group mt-5">
        <b-form-input
          type="email"
          id="email"
          class="p-0"
          autocomplete="off"
          required
          v-model="email"
          :state="emailvalidation"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="emailvalidation">
          Invalid e-mail.
        </b-form-invalid-feedback>
        <span class="floating-label">Email</span>
      </div>

      <div class="floating-label-group mt-5">
        <b-form-input
          type="password"
          id="password"
          class="p-0"
          autocomplete="off"
          required
          v-model="password"
          :state="passwordvalidation"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="passwordvalidation">
          Cannot be empty
        </b-form-invalid-feedback>
        <span class="floating-label">Password</span>
      </div>

      <div class="floating-label-group mt-5">
        <b-form-input
          type="password"
          id="confirmpassword"
          class="p-0"
          autocomplete="off"
          required
          v-model="confirmpassword"
          :state="confirmpasswordvalidation"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="confirmpasswordvalidation">
          Password must match
        </b-form-invalid-feedback>
        <span class="floating-label">Confirm Password</span>
      </div>

      <br />
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn signup-btn" :disabled="!email || !password || password != confirmpassword">
          <b-spinner v-if="showSignupSpinner"></b-spinner>
          <span v-if="!showSignupSpinner">SIGN UP</span>
        </button>
      </div>
    </form>
    <SignupModal v-if="showInvalidModal" v-on:showInvalidModal="(value) => showInvalidModal = value"></SignupModal>
  </div>
</template>

<script>
import axios from 'axios';
import SignupModal from './SignupModal.vue';

export default {
  name: 'SignupView',
  components: {
    SignupModal,
  },
  data() {
    return {
      username: '',
      displayname: '',
      email: '',
      password: '',
      confirmpassword: '',
      showSignupSpinner: false,
      showInvalidModal: false,
      avatar: `https://www.gravatar.com/avatar/${Date.now()}?s=40&d=retro&r=g`,
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    usernamevalidation() {
      return this.username.length > 0;
    },
    displaynamevalidation() {
      return this.displayname.length > 0;
    },
    emailvalidation() {
      return this.email.length > 0;
    },
    passwordvalidation() {
      return this.password.length > 0;
    },
    confirmpasswordvalidation() {
      return this.confirmpassword.length > 0 && this.password === this.confirmpassword;
    },
  },
  setModalShow(value) {
    this.showInvalidModal = value;
  },
  methods: {
    async signupSubmit() {
      this.showSignupSpinner = true;
      console.log('showSignupSpinner ', this.showSignupSpinner);
      if (this.password === this.confirmpassword && this.password && this.username) {
        await axios.post('http://192.168.111.112:3030/users', {
          email: this.email, password: this.password, display: this.displayname, avatar: this.avatar,
        })
          .then((res) => {
            console.log('res', res);
            this.showSignupSpinner = false;
            this.$router.push('/login');
          })
          .catch((err) => {
            if (err) {
              this.showSignupSpinner = false;
              this.showInvalidModal = true;
              console.log('showInvalidModal ', this.showInvalidModal);
            }
          });
      }
    },
  },
};
</script>

<style scoped>
#signuppage {
  height: calc(100vh - 60px);
}
.floating-label-group {
  position: relative;
  margin-top: 15px;
  margin-bottom: 25px;
}
.floating-label-group .floating-label {
  font-size: 16px;
  color: #1976d2;
  position: absolute;
  pointer-events: none;
  top: 0px;
  left: 0px;
  transition: all 0.3s ease;
}
.floating-label-group .form-control.is-invalid:focus ~ .floating-label {
  top: -15px;
  bottom: 0px;
  left: 0px;
  font-size: 12px;
  opacity: 1;
  color: red;
}
.floating-label-group .form-control.is-invalid ~ .floating-label {
   font-size: 16px;
    color: red;
    position: absolute;
    pointer-events: none;
    top: 0px;
    left: 0px;
    transition: all 0.3s ease;
}

.floating-label-group .form-control.is-valid ~ .floating-label {
  top: -15px;
  bottom: 0px;
  left: 0px;
  font-size: 12px;
  opacity: 1;
  color: #1976d2;
}

.form-control {
  background-color: transparent;
  border: none;
  border-radius: inherit;
  outline: none;
  width: 100%;
  font-size: 1em;
  box-sizing: border-box;
  padding-bottom: 5px;
  border-bottom: 2px solid #797979;
}

.form-control:focus {
  border-bottom: solid 2px #1976d2;
  transition: 1s;
  -webkit-box-shadow: none !important;
}

.form-control.is-valid, .form-control.is-valid:focus{
  background: none;
  border-color: #1976d2
}

.form-control.is-invalid{
  background: none;
}

.form-control.is-invalid:focus{
  background: none;
}

.signup-btn{
  background-color: #f5f5f5;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  color: rgba(0,0,0,.87);
  padding: 0 16px;
  min-width: 88px;
  font-weight: 500;
  margin: 6px 8px;
  height: 36px;
  border-radius: 2px;
}
</style>
