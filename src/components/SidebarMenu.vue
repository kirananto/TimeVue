<template>
  <ul class="sidebar-menu">
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>
    <li class="header">SELECT YEAR</li>
    <div class="container">
      <div class="row col-md-4">
        <div v-for="(item,key) in classList">
          <div v-if="key%2 === 0"><br><br></div> 
          <button v-on:click="setsem(item)" 
            class="btn col-md-3 classbutton" 
            v-bind:class="{'classbutton-pressed': item === getCurrentClass.semester }"> 
              <strong>{{item}}</strong>
          </button>
        </div>
      </div>
    </div>
    <br>
    <li class="header">SELECT BRANCH</li>
    <div class="container" v-if="getCurrentClass.semester">
      <div class="row col-md-3">
        <a v-if="branchloading">
        <br>
        <span class="select-item">Loading...</span>
        </a>
        <div v-for="(item,key) in branchList">
          <div v-if="key%3 === 0"><br><br></div>
          <button v-on:click="setbranch(item)" 
            class="btn col-md-2 classbutton"
            v-bind:class="{'classbutton-pressed': item === getCurrentClass.branch }">
              <strong>{{item}}</strong>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <a>
        <br>
        <span class="select-item">Please select semester first</span>
      </a>
    </div>

    <br>
    <li class="header">SELECT DIVISION</li>
    <div class="container" v-if="getCurrentClass.branch">
      <div class="row col-md-4">
        <a v-if="divloading">
        <br>
        <span class="select-item">Loading...</span>
        </a>
        <div v-for="(item,key) in divisionList">
         <br><br>
          <button v-on:click="setdiv(item)"
            class="btn col-md-6 classbutton"
            v-bind:class="{'classbutton-pressed': item === getCurrentClass.division }"> 
              <strong>{{item}}</strong>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <a>
        <br>
        <span class="select-item">Please select branch first</span>
      </a>
    </div>
    <br>
    <router-link tag="li" class="pageLink" to="/details">
      <a>
        <i class="fa fa-user"></i>
        <span class="page">Profile</span>
      </a>
    </router-link>
    <li>
      <a v-on:click="logout">
        <i class="fa fa-sign-out"></i>
        <span>Log Out</span>
      </a>
    </li>
  </ul>
</template>
<script>
import firebase from 'firebase'
require('firebase/firestore')
var db = null
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarName',
  data () {
    return {
      branchloading: null,
      divloading: null
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    setbranch: function (branch) {
      // console.log('SEtting Branch')
      this.$store.commit('TOGGLE_CLASS_BRANCH', branch)
      this.loaddivisions()
    },
    setsem: function (sem) {
      // console.log('SEtting semester')
      this.$store.commit('TOGGLE_CLASS_SEM', sem)
      this.loadbranches()
    },
    setdiv: function (div) {
      // console.log('SEtting division')
      this.$store.commit('TOGGLE_CLASS_DIV', div)
      this.$router.replace('timetable')
    },
    loadclasses: function () {
      const classes = []
      db = firebase.firestore()
      db.collection('classes').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          classes.push(doc.id)
          // console.log(doc.id)
        })
        this.$store.commit('SET_CLASSLIST', classes)
      })
    },
    loadbranches: function () {
      const branches = []
      this.$store.commit('SET_BRANCHLIST', branches)
      this.branchloading = true
      db.collection(`classes/${this.getCurrentClass.semester}/branches`).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          branches.push(doc.id)
          // console.log(doc.id)
        })
        this.branchloading = false
        this.$store.commit('SET_BRANCHLIST', branches)
      })
    },
    loaddivisions: function () {
      const divisions = []
      this.$store.commit('SET_DIVLIST', divisions)
      this.divloading = true
      const currentbranch = `classes/${this.getCurrentClass.semester}/branches/${this.getCurrentClass.branch}/divisions`
      db.collection(currentbranch).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          divisions.push(doc.id)
          // console.log(doc.id)
        })
        this.divloading = false
        this.$store.commit('SET_DIVLIST', divisions)
      })
    }
  },
  created () {
    this.loadclasses()
  },
  computed: {
    ...mapGetters([
      'getCurrentClass',
      'divisionList',
      'classList',
      'branchList'
    ])
  }
}
</script>
<style>
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  .select-item {
    margin-left: 3rem;
  }

  .classbutton {
    margin-left: 1rem;
  }
  .classbutton-pressed {
    background-color: #00A65A;
  }

  .classbutton:hover {
    background-color: #00A65A;
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
