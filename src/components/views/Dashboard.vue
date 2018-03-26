<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div v-for="(item, key) in getNotifications" class="alert alert-dismissible" :key="key" :class="item.type">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa" :class="item.icon"></i>{{item.title}}</h4>
        <span v-html="item.body"></span>
      </div>

      <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->

            <div class="box-body text-center">
              <!-- calendar group -->
              <div class="vcenter">
                <h1 class="text-center timeVue-time">TIME<span class="timeVue-vue">VUE</span></h1>
                <subjectlist></subjectlist>
              <!-- /input-group -->
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>

    </div>
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>
<script>
const Subjectlist = () => import(/* webpackChunkName: "Subjectlist" */ './Subjectlist.vue')
import { mapGetters } from 'vuex'
export default {
  components: {
    Subjectlist
  },
  computed: {
    ...mapGetters([
      'getNotifications',
      'isCurrentClassSet',
      'getCurrentClass'])
  }
}
</script>
<style scoped>
.vcenter {
    display: inline-block;
    vertical-align: middle;
    padding-top: 6em;
    color: grey;
    padding-bottom: 5em;
}

.timeVue-time {
  color: #35495E;
  font-size: 10rem;
  font-family: 'bebas_neue_regularregular';
}
.timeVue-vue {
  color:#41B883;
  font-family: 'bebas_neuethin';
}

</style>
