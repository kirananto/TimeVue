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
              <div class="vcenter">
                 
                 <div class="row">
                    <input v-model="tid" type="text" placeholder="Enter Teacher ID" >

                    <input v-model="tname" type="text" placeholder="Teacher Name" >

                    <input v-model="tbranch" type="text" placeholder="Branch" >

                    <button v-on:click="addTeacher"><i class="fa fa-plus"></i></button>
                  </div>
                  <div v-for="item in teachers">
                      <!-- TODO: THEME IT -->
                      {{item.tid}} - {{item.tname}} - {{item.tbranch}}
                  </div>

                  <router-link to="subjects" class="btn">Go to Students</router-link>
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
import firebase from 'firebase'
require('firebase/firestore')
export default {
  data: function () {
    return {
      tid: null,
      tname: null,
      tbranch: null,
      teachers: []
    }
  },
  mounted () {
    firebase.firestore().collection('teachers').onSnapshot((querySnapshot) => {
      this.teachers = []
      querySnapshot.forEach((doc) => {
        this.teachers.push({tid: doc.id, tname: doc.data().tname, tbranch: doc.data().tbranch})
        console.log('fetched data')
      })
    })
  },
  methods: {
    addTeacher: function () {
      firebase.firestore().collection('teachers').doc(this.tid).set({
        tname: this.tname,
        tbranch: this.tbranch
      }).then((success) => {
        console.log('pushed data')
      })
      this.tid = null
      this.tname = null
      this.tbranch = null
      // TODO: push to firebase
    }
  }
}
</script>
<style scoped>
.vcenter {
    display: inline-block;
    vertical-align: middle;
    padding-top: 14em;
    color: grey;
    padding-bottom: 18em;
}
</style>
