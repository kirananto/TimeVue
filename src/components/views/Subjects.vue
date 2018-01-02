<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">

      <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->

            <div class="box-body text-center">
              <!-- calendar group -->
              <div class="vcenter" v-if="isCurrentClassSet">
                 
                 <div class=" input-group">
                    <input v-model="SubId" class="form-control" type="text" placeholder="Enter Subject ID" >

                    <input v-model="tname" class="form-control" type="text" placeholder="Teacher Name" >

                    <input v-model="tbranch" class="form-control"  type="text" placeholder="Branch" >
                    <div class="input-group-btn">
                    <button v-on:click="addTeacher"><i class="fa fa-plus"></i></button>
                    </div>
                  </div>
        
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
    data: function () {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'isCurrentClassSet'])
    }
  }
</script>
