<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/timeVue_without.svg" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1>Sorry</h1>
            <h4> Seems like you have no Network</h4>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'NoNetwork'
  }
</script>

<style scoped>

.vertical-10p {
  padding-top: 15%;
}

.logo {
  height: 30rem;
}
h1,h4 {
  color: white;
}

h1 {
  font-size: 7m;
}

h4 {
  font-size: 1.5rem;
}
</style>
