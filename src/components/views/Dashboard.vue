<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div v-for="item in getNotifications" class="alert alert-dismissible" :class="item.type">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa" :class="item.icon"></i>{{item.title}}</h4>
        <span v-html="item.body"></span>
      </div>

      <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">TimeTable</h3>
            </div>

            <div class="box-body text-center">
              <!-- calendar group -->
              <div class="vcenter" v-if="!isCurrentClassSet">
              <h3 >  Please Select the class and semester </h3>
              <h4>Is CurrentClass set ? {{isCurrentClassSet}}</h4>
              <h4>Value : {{getCurrentClass}}</h4>
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

import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getNotifications',
      'isCurrentClassSet',
      'getCurrentClass'])
  }
}
</script>
<style>
.vcenter {
    display: inline-block;
    vertical-align: middle;
    padding-top: 14em;
    color: grey;
    padding-bottom: 18em;
}

</style>
