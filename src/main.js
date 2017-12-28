// Import ES6 Promise
import 'es6-promise/auto'

// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'
// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'
import firebase from 'firebase'
require('firebase/firestore')
// Import Views - Top level
import AppView from './components/App.vue'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

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
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  } else if (requiresAuth && currentUser) {
    db.collection('users').doc(currentUser.uid).get()
    .then((doc) => {
      if (doc.exists) {
        if (to.fullPath === '/details') {
          next('/')
        } else {
          next()
        }
      } else {
        console.log(currentUser.uid + '--' + doc.exists)
        next({
          path: '/details',
          query: {redirect: to.fullPath}
        })
      }
    })
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
