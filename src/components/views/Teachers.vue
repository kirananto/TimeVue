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
                    <input v-model="SubId"  type="text" placeholder="Enter Subject ID" >

                    <input v-model="tname"  type="text" placeholder="Teacher Name" >

                    <input v-model="tbranch" type="text" placeholder="Branch" >
             
                    <button v-on:click="addTeacher" class="btn add-button"><i class="fa fa-plus"></i></button>
             
                  </div>
                  <h1>List of Teachers</h1>
                  <table class="table text-center tab">
                    <tr>
                      <th>TeacherId</th>
                      <th>Name</th>
                      <th>Branch</th>
                    </tr>
                    <tr v-for="item in teachers">
                      <td v-text="item.tid"></td>
                      <td v-text="item.tname"></td>
                      <td v-text="item.tbranch"></td>
                    </tr>
                  </table>
                  <router-link to="subjects" class="btn rlink">Assign Subjects</router-link>
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

.add-button {
    height: 5rem;
    border-radius: 1rem;
    width: 7rem;
    background-color: #222D32;
}

.tab {
  border-radius: 1rem;
  background-color: #F0F0F0;
  padding: 7rem; 
}

.rlink {
  color:white;
  background-color: #222D32;
}
input[type=text] {
    border: none;
    background-color: #F0F0F0;
    height: 5rem;
    border-radius: 1rem;
    padding-left: 2rem;
}
</style>
