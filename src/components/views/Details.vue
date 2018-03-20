<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
            <!-- details form -->
            <div class="box-body text-center">
            <div class="row">
              <v-select v-model="tcode" :options="tcodes" class="tcode"></v-select>
              <!-- <div class="input-group">
                    <input v-model="teacherdetails.tcode"  type="text" length="100" placeholder="Enter Teacher Code" >
              </div> -->
            </div>
            <div class="row">
              <div class="input-group">
                    <input v-model="tname"  type="text" placeholder="Teacher Name" >
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
</template>

<script>
import firebase from 'firebase'
require('firebase/firestore')
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'
export default {
  name: 'Details',
  components: {
    vSelect
  },
  data (router) {
    return {
      tcode: null,
      tname: null,
      tbranch: null,
      teachers: []
    }
  },
  mounted () {
    const userRef = firebase.firestore().collection('teachers')
    userRef.onSnapshot((querySnapshot) => {
      this.teachers = []
      querySnapshot.forEach((doc) => {
        this.teachers.push({
          tcode: doc.id,
          tname: doc.data().tname,
          tbranch: doc.data().tbranch
        })
      })
    })
  },
  watch: {
    tcode: function () {
      const t = this.teachers.filter((teacher) => teacher.tcode === this.tcode)
      this.tname = t[0].tname
      this.tbranch = t[0].tbranch
    }
  },
  computed: {
    tcodes: function () {
      let tcodes = []
      for (let a of this.teachers) {
        tcodes.push(a.tcode)
      }
      return tcodes
    },
    ...mapGetters([
      'getUser'])
  },
  methods: {
    submit: function () {
      firebase.firestore().collection('teachers').doc(this.tcode).set({
        tname: this.tname,
        tbranch: this.tbranch
      }).then((success) => {
        console.log('data pushed to teachers')
      })
      firebase.firestore().collection('users').doc(this.getUser.uid).set({
        tcode: this.tcode,
        tname: this.tname,
        tbranch: this.tbranch
      }).then((success) => {
        console.log('data pushed to the user')
      })
      // TODO push teacher details
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
