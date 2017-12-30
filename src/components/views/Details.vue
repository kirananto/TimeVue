<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- details form -->
            <h1>Enter Details</h1><br>
            
            <form class="ui form detailsForm"  @submit.prevent="submit">
<div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="username" placeholder="Username" type="text" v-model="username">
              </div>
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="username" placeholder="Subject" type="text" v-model="subject">
              </div>
              <input type="submit">
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
require('firebase/firestore')
export default {
  name: 'Details',
  data (router) {
    return {
      section: 'Details',
      loading: '',
      response: '',
      username: '',
      subject: ''
    }
  },
  methods: {
    submit () {
      console.log('hello')
      var db = firebase.firestore()
      var currentUser = firebase.auth().currentUser
      console.log(typeof currentUser.uid)
      db.collection('users').doc(currentUser.uid).set({userData: {username: this.username, subject: this.subject}})
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
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
}
.container-table {
    display: table;
    color: black;
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
.detailsForm .input-group {
  padding-bottom: 1em;
  height: 3em;
}
.input-group input {
  height: 3em;
}
</style>
