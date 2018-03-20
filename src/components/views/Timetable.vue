<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <!-- <div v-for="(key,item) in getNotifications" :key="key" class="alert alert-dismissible" :class="item.type">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa" :class="item.icon"></i>{{item.title}}</h4>
        <span v-html="item.body"></span>
      </div> -->

      <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title"><strong> Timetable for {{this.subject.className}} {{this.subject.branchName}} {{this.subject.divisionName}}</strong></h3>
    <h4><strong>Subject : </strong>{{this.subject.subject}}</h4>
    <h4><strong>No of Hours: </strong>{{this.subject.hours}}</h4>
            </div>

            <div class="box-body text-center">
              <!-- calendar group -->
            
            <div class="timetable" v-if="loaded>=35">
              <div class="row">
                <button class="btn sub mainbutton"></button>
                <button class="btn sub mainbutton2">Hour1</button>
                <button class="btn sub mainbutton2">Hour2</button>
                <button class="btn sub mainbutton2">Hour3</button>
                <button class="btn sub mainbutton2">Hour4</button>
                <button class="btn sub mainbutton2">Hour5</button>
                <button class="btn sub mainbutton2">Hour6</button>
                <button class="btn sub mainbutton2">Hour7</button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Monday</button>
                <button v-for="(item,key) in classTimetable.monday" :key="key" v-on:click="softLock('monday',key + 1,item)" class="btn sub" v-bind:class="{softLocked: item.softLock}">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Tuesday</button>
                <button v-for="(item,key) in classTimetable.tuesday" :key="key" v-on:click="softLock('tuesday',key + 1,item)" class="btn sub" v-bind:class="{softLocked: item.softLock}">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Wednesday</button>
                <button v-for="(item,key) in classTimetable.wednesday" :key="key"  v-on:click="softLock('wednesday',key + 1,item)" class="btn sub" v-bind:class="{softLocked: item.softLock}">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Thursday</button>
                <button v-for="(item,key) in classTimetable.thursday" :key="key" v-on:click="softLock('thursday',key + 1,item)" class="btn sub" v-bind:class="{softLocked: item.softLock}">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Friday</button>
                <button v-for="(item,key) in classTimetable.friday" :key="key" v-on:click="softLock('friday',key + 1,item)" class="btn sub" v-bind:class="{softLocked: item.softLock}">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>


                <button v-on:click="tryData" class="btn sub mainbutton"> SUBMIT </button>

            </div>
            <div v-else class="timetable">
              <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>

              <h2> Loading  your Timetable</h2>
              <h3> Please wait..!</h3>
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
  data () {
    return {
      subject: JSON.parse(this.$route.params.subject.toString()),
      classTimetable: {
        monday: [],
        tuesday: [],
        thursday: [],
        wednesday: [],
        friday: []
      },
      loaded: 0,
      teacherTimetable: {
        monday: [],
        tuesday: [],
        thursday: [],
        wednesday: [],
        friday: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'getNotifications']),
    classLocation: function () {
      return `/classes/${this.subject.className}/branches/${this.subject.branchName}/divisions/${this.subject.divisionName}/timeTable`
    }
  },
  methods: {
    tryData: function () {
      this.classTimetable['monday'].forEach(d => console.log(d))
    },
    softLock: function (day, index, item) {
      var loc = `${this.classLocation}/${day}/hours/${index}`
      if (this.classTimetable[day][index - 1].softLock === true) {
        firebase.firestore().doc(loc).update({
          softLock: false
        }).then(success => console.log('success' + day + ' ----' + index))
      } else {
        firebase.firestore().doc(loc).update({
          softLock: true
        }).then(success => console.log('success'))
      }
    }
  },
  mounted () {
    // variable initialization
    const classTimetableRef = firebase.firestore().collection(this.classLocation)
    const teacherLocation = `/teachers/${this.subject.tcode}/timeTable`
    const teacherTimeTableRef = firebase.firestore().collection(teacherLocation)

    // fetching class timetable
    classTimetableRef.onSnapshot(timetableSnapshot => {
      timetableSnapshot.forEach(dayDoc => {
        classTimetableRef.doc(dayDoc.id).collection(`hours`).onSnapshot(dailyHours => {
          dailyHours.forEach(hourDoc => {
            this.classTimetable[dayDoc.id][(hourDoc.id - 1)] = {
              subcode: hourDoc.data().subcode,
              tcode: hourDoc.data().tcode,
              softLock: hourDoc.data().softLock
            }
            this.loaded++
          })
        })
      })
    })

    // fetching teacher timetable
    teacherTimeTableRef.onSnapshot(teacherTimetableSnapshot => {
      teacherTimetableSnapshot.forEach(dayDoc => {
        teacherTimeTableRef.doc(dayDoc.id).collection('hours').onSnapshot(dailyHours => {
          dailyHours.forEach(hourDoc => {
            this.teacherTimetable[dayDoc.id][(hourDoc.id - 1)] = {
              subcode: hourDoc.data().subcode,
              tcode: hourDoc.data().tcode
            }
          })
        })
      })
    })
  }
}
</script>
<style lang="scss" scoped>
$h: 7rem;
$w: 10rem;
.sub {
  height: $h;
  min-width: $w;
  border-radius: 1rem;
  margin: .5rem;
  
  &:hover {
    background-color: #00A65A;
  }
}

.softLocked {
  background-color: rgb(228, 212, 70);
}
.subject {
  font-weight: bold;
  font-family: bebas_neue_regularregular;
  font-size: 2.6rem;
}

.tcode {
  display: block;
  margin-left: 3rem;

}
.mainbutton {  
  background-color: #00A65A;
  font-weight: bold;
  width: 14rem;
  font-family: bebas_neue_regularregular;
  font-size: 3rem;
}

.mainbutton2 {  
  background-color: #00A65A;
  font-weight: bold;
  font-family: bebas_neue_regularregular;
  font-size: 3rem;
}
</style>
