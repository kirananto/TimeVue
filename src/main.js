// Import ES6 Promise
import 'es6-promise/auto'

// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'
import firebase from 'firebase'
require('firebase/firestore')
// Import Views - Top level
import AppView from './components/App.vue'

Vue.use(VueRouter)

firebase.initializeApp(store.state.config)

var db = firebase.firestore()

let app
// Routing logic
var router = new VueRouter({
  routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  if (!store.getters.getUser && currentUser) {
    currentUser.isAdmin = false
    store.commit('SET_USER', currentUser)
  }
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let details = to.matched.some(record => record.meta.details)
  let requireAdmin = to.matched.some(record => record.meta.requireAdmin)
  // console.log(to.fullPath)
  if (requiresAuth && !currentUser) {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  } else if (requiresAuth && currentUser) {
    if (requireAdmin) {
      if (store.getters.getUser.isAdmin) {
        next()
      } else {
        next({
          path: '/accessdenied'
        })
      }
    } else {
      db.collection('users').doc(currentUser.uid).get()
      .then((doc) => {
        if (doc.exists) {
          // console.log(to.fullPath)
          // console.log(store.getters.isisCurrentClassSet)
          if (to.fullPath === '/details') {
            next('/profile')
          } else if (to.fullPath === '/' && store.getters.isCurrentClassSet) {
            next('/timetable')
          } else if (to.fullPath === '/timetable' && !store.getters.isCurrentClassSet) {
            next('/')
          } else {
            next()
          }
        } else {
          if (!details) {
            console.log(currentUser.uid + '--' + doc.exists)
            next({
              path: '/details'
            })
          } else {
            next()
          }
        }
      })
    }
  } else {
    if (currentUser && to.fullPath === '/login') {
      console.log('Already Logged In')
      next('/')
    } else {
      next()
    }
  }
})

sync(store, router)
// Start out app!
// eslint-disable-next-line no-new
firebase.auth().onAuthStateChanged(
  function (user) {
    if (!app) {
      app = new Vue({
        el: '#root',
        router,
        store,
        render: h => h(AppView)
      })
    }
  })
