<template>
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">
          <!-- Input Addons -->
          <div class="box-header with-border">
            <h3 class="box-title"><strong>SELECT YOUR TEACHER ENTRY</strong></h3>
          </div>
          <div class="box-body text-center">
            <!-- calendar group -->
            <div class="vcenter">
              <div class="row">
                <div class="vsele">
                  <v-select v-model="tcode" :options="tcodes" class="tcode"></v-select>
                </div>
                <input v-model="tname"  type="text" placeholder="Teacher Name" >
                <button v-on:click="submit" class="btn tab"> SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import swal from 'sweetalert'
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'
export default {
  name: 'Details',
  components: {
    vSelect
  },
  data (router) {
    return {
      tcode: null,
      tname: null,
      tbranch: null,
      teachers: []
    }
  },
  mounted () {
    const userRef = firebase.firestore().collection('teachers')
    userRef.onSnapshot((querySnapshot) => {
      this.teachers = []
      querySnapshot.forEach((doc) => {
        this.teachers.push({
          tcode: doc.id,
          tname: doc.data().tname,
          tbranch: doc.data().tbranch
        })
      })
    })
  },
  watch: {
    tcode: function () {
      const t = this.teachers.filter((teacher) => teacher.tcode === this.tcode)
      this.tname = t[0].tname
      this.tbranch = t[0].tbranch
    }
  },
  computed: {
    tcodes: function () {
      let tcodes = []
      for (let a of this.teachers) {
        tcodes.push(a.tcode)
      }
      return tcodes
    },
    ...mapGetters([
      'getUser'])
  },
  methods: {
    submit: function () {
      var batch = firebase.firestore().batch()
      batch.set(firebase.firestore().collection('teachers').doc(this.tcode), {
        tname: this.tname,
        tbranch: this.tbranch
      })
      batch.set(firebase.firestore().collection('users').doc(this.getUser.uid), {
        tcode: this.tcode,
        tname: this.tname,
        tbranch: this.tbranch
      })
      batch.commit().then((success) => {
        swal('Success', 'Updated User Details', 'success')
      }).catch(err => swal('Error', 'Failed to Update', 'error'))
    }
  }
}
</script>

<style>
.vsele {
  display: inline;
}
input[type=text] {
    border: none;
    background-color: #F0F0F0;
    height: 5rem;
    border-radius: 1rem;
    padding-left: 2rem;
}

.tcode {
  width: 40%;
  margin-left: 2rem;
}
.tab {
  border-radius: 1rem;
  color: white;
  background-color: black;
  padding: 2rem; 
}

.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.detailsForm .input-group {
  padding-bottom: 1em;
  height: 3em;
}
.input-group input {
  height: 3em;
}
</style>
