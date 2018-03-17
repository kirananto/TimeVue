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
              
              <div class="vcenter">
                  
                 <div class="row">
                   <!-- {{classList}} -->
                   <select v-model="selectedClass" class="selecCl" placeholder="Select Class">
                      <option v-for="(option,key) in classList" :key="key" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>
                    <select v-model="selectedBranch"  class="selecCl" placeholder="Select Branch">
                      <option v-for="(option,key) in branches" :key="key" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>

                     <select v-model="selectedDivision"  class="selecCl" placeholder="Select Class">
                      <option v-for="(option,key) in divisions" :key="key" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <!--<router-link to="subjects" class="btn rlink">Assign Subjects</router-link> -->

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
      teacherDetails: null
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
    fetchsubjects: function () {
       firebase.firestore().collection(`teachers/${this.teacherDetails}/Subjects`).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log('each data fetched')
          })
       })
    }
  }
}
</script>
