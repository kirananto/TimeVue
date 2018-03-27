<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/timeVue_without.svg" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1>You are lost</h1>
            <h4>This page doesn't exist.</h4>
            <router-link to="/">Take me home.</router-link>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'NotFound'
  }
</script>

<style scoped>

.vertical-10p {
  padding-top: 30%;
}

.logo {
  height: 30rem;
}
h1,h4 {
  color: white;
}

h1 {
  font-size: 5rem;
}

h4 {
  font-size: 1.5rem;
}
</style>
