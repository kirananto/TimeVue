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
                    
                    <table class="table tble table-responsive">
                      <thead>
                        <tr>
                          <th scope="col"> SUBJECT NAME</th>
                          <th scope="col"> HOURS</th>
                          <th scope="col"> TEACHER</th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>
                          {{tabledata[0].Name}} 
                        </td>
                        <td>
                          <input type="text" name="HOURS">
                        </td>
                        <td>
                          <v-select v-model="selected" :options="teachers">
                          <select v-model="teachers"  placeholder="Select Teacher">
                          <option v-for="(option,key) in teachers" :key="key" v-bind:value="option">
                            {{ option }}
                          </option>  
                          </select>
                          </v-select>
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
  import firebase from 'firebase'
  require('firebase/firestore')
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
      addSubject: function () {
        // TODO code for adding subject here
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
            this.tabledata.push({
              Name: doc.data().Name
              // Hours: doc.data().Hours
              // Teachers: doc.data().Teachers
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

select {
    -webkit-appearance: button;
    -moz-appearance: button;
    -webkit-user-select: none;
    -moz-user-select: none;
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
}

.tble {
  width: 120rem;
}

.add-button {
    height: 5rem;
    border-radius: 1rem;
    width: 7rem;
    background-color: #222D32;
}

</style>
