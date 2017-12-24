<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/timeVue_without.svg" class="center-block logo">
          <br>
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="checkCreds">

              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Sign In using Google</button>
            </form>

            <!-- errors -->
            <div v-if=response class="text-red"><p>{{response}}</p></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase'
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
    checkCreds () {
      var provider = new firebase.auth.GoogleAuthProvider()
      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')
      this.toggleLoading()
      /* Making API call to authenticate a user */

      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken
          // The signed-in user info.
          var user = result.user
          console.log(user)
          this.$store.commit('SET_USER', user)
          this.$router.push('/')
          // ...
        }).catch((error) => {
            // Handle Errors here.
          this.$store.commit('TOGGLE_LOADING')
          console.log(error.message)
          this.response = error.message
          this.toggleLoading()
            // ...
        })

          // firebase.auth().signInWithEmailAndPassword(username, password).then(
          //   (user) => {
          //     this.$store.commit('SET_USER', user)
          //     this.$router.push('/')
          //   },
          //   (err) => {
          //     this.$store.commit('TOGGLE_LOADING')
          //     console.log(err.message)
          //     this.response = err.message
          //     this.toggleLoading()
          //   }
          // )
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #ECEFF1 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
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
