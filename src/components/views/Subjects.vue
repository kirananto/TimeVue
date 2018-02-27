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
                   <select v-model="selectedClass"  placeholder="Select Class">
                      <option v-for="(option,key) in classList" :key="key" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>
                    <select v-model="selectedBranch"  placeholder="Select Branch">
                      <option v-for="(option,key) in branches" :key="key" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>

                     <select v-model="selecteDivision"  placeholder="Select Class">
                      <option v-for="(option,key) in divisions" :key="key" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>

                    <table>
                      <thead>
                        <td>SUBJECT NAME</td>
                      </thead>
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
  import { mapGetters } from 'vuex'
  import firebase from 'firebase'
  require('firebase/firestore')
  export default {
    data: function () {
      return {
        subCode: null,
        division: null,
        tCode: null,
        branches: null,
        divisions: null,
        selectedClass: null,
        selectedBranch: null,
        selecteDivision: null
      }
    },
    computed: {
      ...mapGetters([
        'isCurrentClassSet',
        'classList'])
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
    height: 5rem;
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

.add-button {
    height: 5rem;
    border-radius: 1rem;
    width: 7rem;
    background-color: #222D32;
}

</style>
