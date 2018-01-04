<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
            <!-- details form -->
            <div class="box-body text-center">
            <div class="row">
              <v-select :value.sync="teacherdetails.tcode" :options="tcodes" class="tcode"></v-select>
              <!-- <div class="input-group">
                    <input v-model="teacherdetails.tcode"  type="text" length="100" placeholder="Enter Teacher Code" >
              </div> -->
            </div>
            <div class="row">
              <div class="input-group">
                    <input v-model="teacherdetails.tname"  type="text" placeholder="Enter Teacher Name" >
              </div>
            </div>
            <div class="row">
              <div class="input-group">
                     <button v-on:click="submit" class="btn tab add-button"> SUBMIT</button>
              </div>
            </div>
              </div>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase'
require('firebase/firestore')
import vSelect from 'vue-select'
export default {
  name: 'Details',
  components: {
    vSelect
  },
  data (router) {
    return {
      teacherdetails: {
        tcode: null,
        tname: null
      }
    }
  },
  computed: {
    tcodes: function () {
      return ['T001', 'T002']
      // TODO dummy data to be replaced with value from database
    }
  },
  methods: {
    submit: function () {
      var branchRef = firebase.firestore().collection('classes').doc('yearOne').collection('branches').doc('CSE')
      branchRef.get().then((querySnapshot) => {
        // querySnapshot.forEach((doc) => {
        console.log(querySnapshot.id + ' => ' + querySnapshot.data())
        // })
      })
      // console.log(this.teacherdetails.tcode)
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
input[type=text] {
    border: none;
    /*background-color: #F0F0F0;*/
    height: 5rem;
    border-radius: 1rem;
    padding-left: 2rem;
}

.tcode {
  width: 40%;
}
.tab {
  border-radius: 1rem;
  color: white;
  background-color: black;
  padding: 2rem; 
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
.detailsForm .input-group {
  padding-bottom: 1em;
  height: 3em;
}
.input-group input {
  height: 3em;
}
</style>
