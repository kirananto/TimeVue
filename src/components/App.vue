<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        section: 'Head'
      }
    },
    methods: {
      logout () {
        this.$store.commit('SET_USER', null)
        this.$router.push('/login')
      }
    }
  }
</script>
