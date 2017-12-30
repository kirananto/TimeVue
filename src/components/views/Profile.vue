<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <div class="text-center col-md-4 card ">
            <!-- details form -->
            <img class="logo-profile" v-bind:src="getUser.photoURL" >
            <h1 v-text="getUser.displayName"></h1>
            <h5 v-text="getUser.email"></h5>

          </div>
          <div class="text-center col-md-6 card">
            <!-- details form -->
            
            <h1>More Details</h1>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
// require('firebase/firestore')
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data (router) {
    return {
      section: 'Profile',
      loading: '',
      response: '',
      username: '',
      subject: ''
    }
  },
  methods: {
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  },
  computed: {
    ...mapGetters([
      'getUser'])
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
    color: black;
}

.card {
  background-color: #fff;
  margin-left: 1rem;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-radius: 1rem;
   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    height:50rem;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.vertical-10p {
  padding-top: 5%;
}
.logo-profile {
  width: 20em;
  border-radius: 5rem;
  margin-top:6rem;
  padding: 1em;
  margin-bottom: 1rem;
}
.detailsForm .input-group {
  padding-bottom: 1em;
  height: 3em;
}
.input-group input {
  height: 3em;
}
</style>
