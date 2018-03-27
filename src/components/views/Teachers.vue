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
                    <input v-model="tid"  type="text" placeholder="Enter Teacher ID" >

                    <input v-model="tname"  type="text" placeholder="Teacher Name" >

                    <input v-model="tbranch" type="text" placeholder="Branch" >
             
                    <button v-on:click="addTeacher" class="btn add-button"><i class="fa fa-plus"></i></button>
             
                  </div>
                  <h2> Or</h2>
                  <h3> Upload list as CSV file</h3>
                  <div class="fileinput fileinput-new" data-provides="fileinput">
                    <span class="btn btn-default btn-file chosefile">
                      <span>Choose file</span>
                      <input type="file" @change="onFileChange" />
                    </span>
                    <span v-text="filename" class="filemsg"></span>
                    <button v-on:click="uploadfromcsv" class="btn add-button upload">
                      <span>Upload</span>
                    </button>
                  </div>
                  <h1>List of Teachers</h1>
                  <table class="table text-left tab">
                    <tr class="table-header">
                      <th>Teacher Id</th>
                      <th>Name</th>
                      <th>Branch</th>
                    </tr>
                    <br>
                    <tr v-for="(item,key) in teachers" :key="key" class="table-item">
                      <td v-text="item.tid"></td>
                      <td v-text="item.tname"></td>
                      <td v-text="item.tbranch"></td>
                    </tr>
                  </table>
                  <router-link to="subjects" class="btn rlink"><i class="fa fa-arrow-right" aria-hidden="true"></i>
Assign Subjects</router-link>
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
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import swal from 'sweetalert'
import csv from 'csvtojson'
var db = null
export default {
  data: function () {
    return {
      tid: null,
      tname: null,
      tbranch: null,
      teachers: [],
      file: null,
      filename: 'No File Choosen'
    }
  },
  mounted () {
    db = firebase.firestore()
    db.collection('teachers').onSnapshot((querySnapshot) => {
      this.teachers = []
      querySnapshot.forEach((doc) => {
        this.teachers.push({tid: doc.id, tname: doc.data().tname, tbranch: doc.data().tbranch})
      })
    })
  },
  methods: {
    addTeacher: function () {
      db.collection('teachers').doc(this.tid).set({
        tname: this.tname,
        tbranch: this.tbranch
      }).then((success) => {
        console.log('success')
        swal('Success', 'Successfully Added the Teacher', 'success')
      }).catch(err => {
        swal('Error', 'Failed to Add Teacher', 'error')
      })
      this.tid = null
      this.tname = null
      this.tbranch = null
      // TODO: push to firebase
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.file = files[0]
      this.filename = this.file.name
    },
    uploadfromcsv () {
      const reader = new FileReader()
      reader.onload = function (e) {
        const batch = db.batch()
        csv({noheader: true})
        .fromString(reader.result)
        .on('csv', (csvRow) => {
          batch.set(db.collection('teachers').doc(csvRow[0]), {tname: csvRow[1], tbranch: null})
        })
        .on('done', () => {
          batch.commit().then((success) => {
            swal('Success', 'Successfully Uploaded the Data', 'success')
          }).catch(err => {
            swal('Error', 'Failed to Upload the data', 'error')
          })
        })
      }
      reader.readAsText(this.file)
    }
  }
}
</script>
<style scoped>
.vcenter {
    display: inline-block;
    vertical-align: middle;
    padding-top: 7em;
    color: grey;
    padding-bottom: 18em;
}

.add-button {
    height: 5rem;
    border-radius: 1rem;
    width: 7rem;
    background-color: #222D32;
}

.table-header {
  height: 4rem;
  font-family: bebas_neue_regularregular;
  font-size: 3rem;
}
.table-item {
  height: 3rem;
}
.filemsg {
  margin-left: 1rem;
}

.chosefile {
  border-color: white;
  border-radius: 1rem;
}
.upload {
  margin-left: 7rem;
  height: 4rem;
  width: 15rem;
}
.upload > span {
  color: white;
}

.tab {
  border-radius: 1rem;
  background-color: white;
  color:grey;
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
