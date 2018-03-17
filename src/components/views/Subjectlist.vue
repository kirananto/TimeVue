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
              <h1>SELECT CLASS</h1>
              <button v-on:click="fetchSubjects" class="btn btn-primary" align="center">Confirm
              </button>
              <div>
                <tr v-for="item in subjects">
                  <td>
                    {{item.subject}}
                  </td>
                  <td>
                    {{item.className}}
                  <td>
                    {{item.branchName}}
                  </td>
                  <td>
                    {{item.divisionName}}
                  </td>
                </tr>
              </div>
              <div class="vcenter">   
                <div class="row">
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
<script type="text/javascript">
import firebase from 'firebase'
require('firebase/firestore')
export default {
  data: function () {
    return {
      teacherDetails: null,
      subjects: []
    }
  },
  mounted () {
    firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}`).get().then(doc => {
      firebase.firestore().doc(`teachers/${doc.data().tcode}`).get().then(docum => {
        this.teacherDetails = docum.id
      })
    })
  },
  methods: {
    fetchSubjects: function () {
      this.subjects = []
      firebase.firestore().collection(`teachers/${this.teacherDetails}/Subjects`).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.data().Name.get().then(doc1 => {
            this.subjects.push({
              className: doc.data().Name.path.split('/')[1],
              branchName: doc.data().Name.path.split('/')[3],
              divisionName: doc.data().Name.path.split('/')[5],
              subject: doc1.data().Name
            })
          })
        })
      })
    }
  }
}
</script>
