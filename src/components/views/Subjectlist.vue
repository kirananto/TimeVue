<template>
  <div class="container container-table">
    <h1>SELECT CLASS</h1>
    <center>
      <!-- check for passing props -->
    <router-link v-for="(item,key) in subjects" :key="key"  :to="{ path:`/timetable/${JSON.stringify(item)}` }" class="btn btn-primary subject-button"  align="center">
      {{item.subject}} || {{item.className}} -  {{item.branchName}} - {{item.divisionName}}
    </router-link>
    <!-- check for passing props -->
    </center>
  </div>
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
        firebase.firestore().collection(`teachers/${docum.id}/Subjects`).get().then(querySnapshot => {
          querySnapshot.forEach(subdoc => {
            subdoc.data().Name.get().then(doc1 => {
              this.subjects.push({
                className: subdoc.data().Name.path.split('/')[1],
                branchName: subdoc.data().Name.path.split('/')[3],
                divisionName: subdoc.data().Name.path.split('/')[5],
                subcode: subdoc.data().Name.path.split('/')[7],
                subject: doc1.data().Name,
                tcode: doc.data().tcode,
                hours: doc1.data().Hours,
                type: doc1.data().Type
              })
            })
          })
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.subject-button {
  margin-top: 2rem;
  max-width: 65rem;
  display: block;
  background-color: #00a65a;

}

.vcenter {
  margin-bottom: 5rem;
}
</style>
