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
                   <select v-model="selectedClass" class="selecCl">
                      <option value="" selected disabled hidden>Select Class</option>
                      <option v-for="(option,key) in classList" :key="key" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>
                    <select v-model="selectedBranch"  class="selecCl">
                      <option value="" selected disabled hidden>Select Branch</option>
                      <option v-for="(option,key) in branches" :key="key" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>

                     <select v-model="selectedDivision"  class="selecCl">
                      <option value="" selected disabled hidden>Select Division</option>                       
                      <option v-for="(option,key) in divisions" :key="key" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>
                    
                    <table class="table tble table-responsive" v-if="tabledata">
                      <thead>
                        <tr>
                          <th scope="col"> SUBJECT NAME</th>
                          <th scope="col"> HOURS</th>
                          <th scope="col"> TYPE</th>
                          <th scope="col"> TEACHER</th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item,key) in tabledata" :key="key">
                        <td>
                          <input type="text" v-model="item.Name"> 
                        </td>
                        <td>
                          <input type="number" v-model="item.Hours" name="HOURS">
                        </td>
                        <td>
                          <select v-model="item.Type">
                            <option value="" selected hidden>Select Type</option>
                            <option value="Theory">Theory</option>
                            <option value="Lab">Lab</option>
                          </select>
                        </td>
                        <td >
                          <div v-for="(i,k) in item.Teacher" :key="k">
                            <v-select v-model="i.data" :options="teachers">
                              <select v-model="teachers"  placeholder="Select Teacher">
                              <option v-for="(option,key) in teachers" :key="key" v-bind:value="option">
                                {{ option }}
                              </option>
                              </select>
                            </v-select>
                            <i v-on:click="item.Teacher.splice(key-1, 1)" class="fa fa-trash" aria-hidden="true"></i>
                          </div>
                        </td>
                        <td></td>
                        
                        <td v-on:click="item.Teacher.push({})">
                          <i class="fa fa-plus-circle plusbutton" ></i>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5">
                         <button v-on:click="assignTeacher" class="btn btn-primary confirm" align="center">Confirm</button>
                        </td>
                      </tr> 
                      </tbody>                  
                    </table>
                    <!-- <input v-model="tCode" type="text" placeholder="Teacher Code" >
             
                    <button v-on:click="addSubject" class="btn add-button"><i class="fa fa-plus"></i></button> -->
             
                  </div>
                <!--   <h1>List of Teachers</h1>
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
                  <router-link to="subjects" class="btn rlink">Assign Subjects</router-link> -->

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
  import vSelect from 'vue-select'
  import { mapGetters } from 'vuex'
  import * as firebase from 'firebase/app'
  import 'firebase/auth'
  import 'firebase/firestore'
  import swal from 'sweetalert'
  export default {
    components: {
      vSelect
    },
    data: function () {
      return {
        subCode: null,
        division: null,
        tCode: null,
        branches: null,
        divisions: null,
        teachers: null,
        selectedClass: null,
        selectedBranch: null,
        selectedDivision: null,
        tabledata: null,
        selected: null
      }
    },
    computed: {
      ...mapGetters([
        'isCurrentClassSet',
        'classList'])
    },
    mounted () {
      // db = firebase.firestore()
      firebase.firestore().collection('teachers').onSnapshot((querySnapshot) => {
        this.teachers = []
        querySnapshot.forEach((doc) => {
          this.teachers.push({
            tid: doc.id,
            label: doc.data().tname,
            tname: doc.data().tname,
            tbranch: doc.data().tbranch
          })
        })
        console.log(this.teachers)
      })
    },
    methods: {
      assignTeacher: function () {
        var batch = firebase.firestore().batch()
        console.log(this.tabledata)
        var counter = 0
        var p = new Promise((resolve, reject) => {
          this.tabledata.forEach(data => {
            // update subject data
            console.log(data.Name)
            if(data.Name && data.Id && data.Type) {
               batch.update(firebase.firestore().doc(`/classes/${this.selectedClass}/branches/${this.selectedBranch}/divisions/${this.selectedDivision}/subjects/${data.Id}`), {
                Name: data.Name,
                Hours: parseInt(data.Hours),
                Type: data.Type
              })

              firebase.firestore().collection(`/classes/${this.selectedClass}/branches/${this.selectedBranch}/divisions/${this.selectedDivision}/subjects/${data.Id}/Teachers`).get().then(q => {
                counter++
                q.forEach(d => {
                  batch.delete(firebase.firestore().doc(`/classes/${this.selectedClass}/branches/${this.selectedBranch}/divisions/${this.selectedDivision}/subjects/${d.data().subject}/Teachers/${d.id}`))
                })
                if (counter !== this.tabledata.length) {
                  console.log(counter)
                  resolve()
                }
              })
              // push teacher to subjects database
              if(data.Teacher[0].data) {
                console.log(data.Teacher[0].data.label)
                batch.set(firebase.firestore().doc(`/classes/${this.selectedClass}/branches/${this.selectedBranch}/divisions/${this.selectedDivision}/subjects/${data.Id}/Teachers/${data.Teacher[0].data.tid}`), {
                  Name: firebase.firestore().doc(`/teachers/${data.Teacher[0].data.tid}`),
                  subject: data.Id,
                  tid: data.Teacher[0].data.tid,
                  tname: data.Teacher[0].data.tname,
                  tbranch: data.Teacher[0].data.tbranch,
                  label: data.Teacher[0].data.label
                })
              }
              
              // push subjects to teachers
              batch.set(firebase.firestore().doc(`/teachers/${data.Teacher.tid}/Subjects/${data.Id}`), {
                Name: firebase.firestore().doc(`/classes/${this.selectedClass}/branches/${this.selectedBranch}/divisions/${this.selectedDivision}/subjects/${data.Id}`)
              })
            }
          })
        })
        p.then(success => batch.commit().then(success => {
          swal('Success', 'Assigned Subjects', 'success')
          }).catch(err => {
            swal('Error', 'Failed to Push Data', 'error')
          }))
      },
      addTeacher: function () {
        console.log('this is keyer')
      }
    },
    watch: {
      selectedClass: function (val) {
        this.branches = []
        this.divisions = []
        firebase.firestore().collection(`classes/${val}/branches`).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.branches.push(doc.id)
            })
          })
      },
      selectedBranch: function (val) {
        this.divisions = []
        const currentbranch = `classes/${this.selectedClass}/branches/${val}/divisions`
        console.log(currentbranch)
        firebase.firestore().collection(currentbranch).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.divisions.push(doc.id)
            })
          })
      },
      selectedDivision: function (val) {
        this.tabledata = []
        console.log('fetching')
        firebase.firestore().collection(`/classes/${this.selectedClass}/branches/${this.selectedBranch}/divisions/${val}/subjects`)
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
            firebase.firestore().collection(`/classes/${this.selectedClass}/branches/${this.selectedBranch}/divisions/${val}/subjects/${doc.id}/Teachers`).get()
            .then(qS => {
              let Teacher = []
              qS.forEach(d => {
                Teacher.push({ data: {
                  tid: d.data().tid,
                  tname: d.data().tbranch,
                  tbranch: d.data().tbranch,
                  label: d.data().label

                }})
              })
              if (qS.size == 0) {
                Teacher = [{}]
              }
               this.tabledata.push({
                  Name: doc.data().Name,
                  Id: doc.id,
                  Hours: doc.data().Hours,
                  Type:  doc.data().Type,
                  Teacher: Teacher
                  // Hours: doc.data().Hours
                  // Teachers: doc.data().Teachers
                })
            })
            console.log(doc.data())
          })
          // console.log(this.tabledata)
        }).catch(err => console.log(err))
      }
    }
  }
</script>
<style scoped>
  .vcenter {
    display: inline-block;
    vertical-align: middle;
    color: grey;
    padding-bottom: 18em;
}
input[type=text] {
    border: none;
    background-color: #F0F0F0;
    height: 4rem !important;
    border-radius: 1rem;
    padding-left: 2rem;
}

input[type=number] {
    border: none;
    background-color: #F0F0F0;
    height: 4rem !important;
    border-radius: 1rem;
    padding-left: 2rem;
}

select {
    -webkit-appearance: button;
    -moz-appearance: button;
    -webkit-user-select: none;
    -moz-user-select: none;
    height: 4rem !important;
    border-radius: 1rem;
    user-select: none;
    -webkit-padding-end: 20px;
    -moz-padding-end: 20px;
    -webkit-padding-start: 2px;
    -moz-padding-start: 2px;
    background-color: #F0F0F0; /* fallback color if gradients are not supported */
    background-position: center right;
    background-repeat: no-repeat;
    text-transform: uppercase;
    border: none;
    border-radius: 2px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    color: #555;
    font-size: inherit;
    margin: 0;
    overflow: hidden;
    padding-top: 2px;
    padding-bottom: 2px;
    content:'2';  
    text-overflow: ellipsis;
    white-space: nowrap;
}

.selecCl {
  margin-left: 2rem;
  min-width: 15rem;
}

.confirm {
  height: 5rem;
  border-radius: 5rem;
  width: 100%;
  background-color: #222D32;
  margin-top: 3rem;
}

.tble {
  width: 100rem;
  max-width: 80rem;
  margin-top: 5rem;
}

.teach {
  width: 100rem;
  max-width: 70rem;
}

.add-button {
    height: 5rem;
    border-radius: 1rem;
    width: 7rem;
    background-color: #222D32;
}

.plusbutton {
  width: 5rem;
}
.bottom_circle {
  margin-top: 0rem;
}

</style>
