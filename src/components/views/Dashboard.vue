<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="alert alert-success alert-dismissible">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-check"></i> Welcome to timeVue</h4>
        check it out on github. <a href="https://github.com/kirananto/timeVue" target="_blank"><i class="fa fa-github fa-2x"></i></a>
      </div>

      <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">TimeTable</h3>
            </div>

            <div class="box-body text-center">
              <!-- calendar group -->
              <div class="vcenter" v-if="!this.$store.getters.isCurrentClassSet">
              <h3 >  Please Select the class and semester </h3>
              <h4>Is CurrentClass set ? {{this.$store.getters.isCurrentClassSet}}</h4>
              <h4>Value : {{this.$store.getters.getCurrentClass}}</h4>
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

<style>
.vcenter {
    display: inline-block;
    vertical-align: middle;
    padding-top: 14em;
    color: grey;
    padding-bottom: 18em;
}

</style>
