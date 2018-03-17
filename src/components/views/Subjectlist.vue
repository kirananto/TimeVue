<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <div class="text-center col-md-12 card ">
            <h1>SELECT CLASS</h1>
            <center>
            <button v-for="(item,key) in subjects" :key="key" class="btn btn-primary subject-button"  align="center">
              {{item.subject}} || {{item.className}} -  {{item.branchName}} - {{item.divisionName}}
            </button>
            </center>
          </div>
        </div>
      </div>
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
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.subject-button {
  margin-top: 2rem;
  display: block;
}

.vcenter {
  margin-bottom: 10rem;
}
</style>
