<template>
  <ul class="sidebar-menu">
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>
    <li class="header">SELECT CLASS</li>
    <div class="container">
      <div class="row col-md-2">
        <div v-for="(item,key) in this.$store.getters.classList">
          <div v-if="key%3 === 0"><br><br></div> 
          <button v-on:click="setsem(item)"class="btn col-md-3 classbutton"> <strong>{{item}}</strong>
          </button>
        </div>
      </div>
    </div>
    <br>
    <li class="header">SELECT BRANCH</li>
    <div class="container" v-if="this.$store.getters.getCurrentClass.semester">
      <div class="row col-md-3">
        <div v-for="(item,key) in this.$store.getters.branchList">
          <div v-if="key%3 === 0"><br><br></div>
          <button v-on:click="setbranch(item)" class="btn col-md-2 classbutton"><strong>{{item}}</strong>
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
    <div class="container" v-if="this.$store.getters.getCurrentClass.branch">
      <div class="row col-md-4">
        <div v-for="(item,key) in this.$store.getters.divisionList">
         <br><br>
          <button v-on:click="setdiv(item)"class="btn col-md-6 classbutton">  <strong>{{item}}</strong>
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
    <router-link tag="li" class="pageLink" to="/setting">
      <a>
        <i class="fa fa-cog"></i>
        <span class="page">Settings</span>
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
export default {
  name: 'SidebarName',
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    setbranch: function (branch) {
      console.log('SEtting Branch')
      this.$store.commit('TOGGLE_CLASS_BRANCH', branch)
    },
    setsem: function (sem) {
      console.log('SEtting semester')
      this.$store.commit('TOGGLE_CLASS_SEM', sem)
    },
    setdiv: function (div) {
      console.log('SEtting division')
      this.$store.commit('TOGGLE_CLASS_DIV', div)
    }
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
