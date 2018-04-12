<template >
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container login">
          <img src="/static/img/timeVue_without.svg" class="center-block logo">

            <h1 class="text-center timeVue-time">TIME<span class="timeVue-vue">VUE</span></h1>
          <div class="text-center col-md-4 col-sm-offset-4 spacing-logo">
            <!-- login form -->
            <div class="row">
          
              <button v-on:click="signin" v-bind:class="'btn btn-primary g-button btn-lg ' + loading"><img src="https://cdn.rawgit.com/firebase/firebaseui-web/master/image/google.svg" viewBox="0 0 60 55" width="25px" /><span class="goog" >Signin with Google</span></button>
          

          </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      response: ''
    }
  },
  methods: {
    signin () {
      var provider = new firebase.auth.GoogleAuthProvider()
      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')
      this.toggleLoading()
      /* Making API call to authenticate a user */

      firebase.auth().signInWithRedirect(provider)
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  },
  mounted () {
    firebase.auth().getRedirectResult().then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken
          // The signed-in user info.
          firebase.firestore().doc(`users/${result.user.uid}`).get()
          .then((doc) => {
            var user = result.user
            if (doc.exists) {
              user.isAdmin = doc.data().isAdmin
              this.$store.commit('SET_USER', user)
              if (doc.data().isAdmin) {
                this.$router.push('/teachers')
              } else {
                this.$router.push('/')
              }
            } else {
              user.isAdmin = false
              this.$store.commit('SET_USER', user)
              this.$router.push('/')
            }
          })
          // ...
        }).catch((error) => {
            // Handle Errors here.
          this.$store.commit('TOGGLE_LOADING')
          console.log(error.message)
          this.response = error.message
          this.toggleLoading()
            // ...
        })
  }
}
</script>

<style scoped>
html, body, .container-table {
  height: 100%;
}
.g-button {
  background-color: white !important;
  border-color: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin-left: 1rem;
}
.g-button:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.timeVue-time {
  color: #35495E;
  font-size: 8rem;
  font-family: 'bebas_neue_regularregular';
}
.timeVue-vue {
  color:#41B883;
  font-family: 'bebas_neuethin';
}
.goog {
  color: black;
  padding-left: 1rem;
}
.spacing-logo {
  margin-top: 5rem;
}
.container-table {
    display: table;
    color: black;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 20em;
  padding: 1em;
  margin-bottom: 1rem;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 3em;
}
.input-group input {
  height: 3em;
}
</style>
