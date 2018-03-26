<template>
  <div :class="['wrapper', classes]">
    <header class="main-header">
  <span class="logo-mini">
              <a href="/"><img src="/static/img/timeVue_without.svg" alt="Logo" class="img-responsive center-block logo"></a>
      </span>
      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <!-- The user image in the navbar-->
                <img v-bind:src="userData.photoURL" class="user-image" alt="User Image">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs"><strong>{{ userData.displayName }}</strong></span>
              </a>
               <ul class="dropdown-menu">
                <li class="user-header">
                <img v-bind:src="userData.photoURL" class="img-circle" alt="User Image">

                <p>
                  <strong>{{userData.displayName}}</strong>
                </p>
              </li>
               <li class="user-footer">
                <div class="pull-left">
                  <router-link to="/details" class="btn btn-default btn-flat">Profile</router-link>
                </div>
                <div class="pull-right">
                  <a href="#" v-on:click="logout" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
    <!-- Left side column. contains the logo and sidebar -->
    <sidebar :display-name="userData.displayName" :picture-url="userData.photoURL" />
  
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{$route.name.toUpperCase() }}
          <!-- <small>{{ $route.meta.description }}</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="javascript:;">
              <i class="fa fa-home"></i>Home</a>
          </li>
          <li class="active">{{$route.name.toUpperCase()}}</li>
        </ol>
      </section>
  
      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->
  
    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}}
        <a href="javascript:;">timeVue</a>.</strong> All rights reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
import firebase from 'firebase'
const Sidebar = () => import(/* webpackChunkName: "Sidebar" */ './Sidebar.vue')
require('firebase/firestore')
import 'hideseek'

export default {
  name: 'Dash',
  components: {
    Sidebar
  },
  data: function () {
    return {
      // section: 'Dash',
      year: new Date().getFullYear(),
      classes: {
        fixed_layout: false,
        hide_logo: false
      },
      error: ''
    }
  },
  computed: {
    userData: () => firebase.auth().currentUser
  },
  mounted () {
    this.$store.commit('SET_USER', firebase.auth().currentUser)
  },
  methods: {
    changeloading: () => {
      this.$store.commit('TOGGLE_SEARCHING')
    },
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style lang="scss">
.wrapper.fixed_layout {
  .main-header {
    position: fixed;
    width: 100%;
  }

  .content-wrapper {
    padding-top: 50px;
  }

  .main-sidebar {
    position: fixed;
    height: 100vh;
  }
}

.wrapper.hide_logo {
  @media (max-width: 767px) {
    .main-header .logo {
      display: none;
    }
  }
}

.logo-mini,
.logo-lg {
  text-align: left;

  img {
    padding: .4em !important;
  }
}

.logo-lg {
  img {
    display: -webkit-inline-box;
    width: 25%;
  }
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>
