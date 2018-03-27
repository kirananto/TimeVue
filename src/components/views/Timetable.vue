<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div v-for="(item,key) in getNotifications" :key="key" class="alert alert-dismissible" :class="item.type">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa" :class="item.icon"></i>{{item.title}}</h4>
        <span v-html="item.body"></span>
      </div>

      <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title"><strong> Timetable for {{subject.className}} {{subject.branchName}} {{subject.divisionName}}</strong></h3>
              <h4><strong>Subject : </strong>{{subject.subject}} &nbsp;&nbsp;&nbsp;<strong>No of Hours: </strong>{{subject.hours}} &nbsp;&nbsp;&nbsp; <strong>Your Teacher Code: </strong>{{subject.tcode}}</h4>
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
                <button v-for="(item,keyMon) in classTimetable.monday" :key="keyMon" v-on:click="softLock('monday',keyMon + 1,item)" class="btn sub" v-bind:class="{softLocked: item.softLock}">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Tuesday</button>
                <button v-for="(item,keyTue) in classTimetable.tuesday" :key="keyTue" v-on:click="softLock('tuesday',keyTue + 1,item)" class="btn sub" v-bind:class="{softLocked: item.softLock}">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Wednesday</button>
                <button v-for="(item,keyWed) in classTimetable.wednesday" :key="keyWed"  v-on:click="softLock('wednesday',keyWed + 1,item)" class="btn sub" v-bind:class="{softLocked: item.softLock}">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Thursday</button>
                <button v-for="(item,keyThu) in classTimetable.thursday" :key="keyThu" v-on:click="softLock('thursday',keyThu + 1,item)" class="btn sub" v-bind:class="{softLocked: item.softLock}">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Friday</button>
                <button v-for="(item,keyFri) in classTimetable.friday" :key="keyFri" v-on:click="softLock('friday',keyFri + 1,item)" class="btn sub" v-bind:class="{softLocked: item.softLock}">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>


                <button v-on:click="submit" class="btn sub mainbutton"> SUBMIT </button>

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
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import swal from 'sweetalert'
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
      selectedHours: {
        monday: [],
        tuesday: [],
        thursday: [],
        wednesday: [],
        friday: []
      },
      selectedCount: {
        monday: [0, 0, 0, 0, 0, 0, 0],
        tuesday: [0, 0, 0, 0, 0, 0, 0],
        thursday: [0, 0, 0, 0, 0, 0, 0],
        wednesday: [0, 0, 0, 0, 0, 0, 0],
        friday: [0, 0, 0, 0, 0, 0, 0]
      },
      loaded: 0,
      teacherTimetable: {
        monday: [],
        tuesday: [],
        thursday: [],
        wednesday: [],
        friday: []
      },
      totalSelectedCount: 0
    }
  },
  computed: {
    ...mapGetters(['getNotifications']),
    classLocation: function () {
      return `/classes/${this.subject.className}/branches/${this.subject.branchName}/divisions/${this.subject.divisionName}/timeTable`
    }
  },
  // watch: {
  //   selectedCount: function (val) {
  //     console.log('h')
  //     this.totalSelectedCount = this.selectedCount.monday.reduce((sum, x) => sum + x) + this.selectedCount.tuesday.reduce((sum, x) => sum + x) + this.selectedCount.wednesday.reduce((sum, x) => sum + x) + this.selectedCount.thursday.reduce((sum, x) => sum + x) + this.selectedCount.friday.reduce((sum, x) => sum + x)
  //   }
  // },
  methods: {
    submit: function () {
      var batch = firebase.firestore().batch()
      var subjectRef = firebase.firestore().collection(this.classLocation)
      for (var day in this.selectedHours) {
        if (this.selectedHours.hasOwnProperty(day)) {
          this.selectedHours[day].forEach(hour => {
            batch.set(subjectRef.doc(day).collection('hours').doc(hour.index.toString()), hour)
            batch.set(firebase.firestore().doc(`teachers/${this.subject.tcode}/timeTable/${day}/hours/${hour.index.toString()}`), hour)
          })
        }
      }
      batch.commit().then(success => {
        swal('Successfully submitted', 'Thank you for early submission', 'success')
      }).catch(error => console.log(error))
    },
    // Function to apply softlock when a user clicks the respective hour
    // params
    //  day - corresponding day
    //  index - the corresponding hour
    //  item - details of the hour selected
    softLock: function (day, index, item) {
      if (item.hardLock !== true && this.teacherTimetable[day][index - 1].hardLock !== true) {
        this.selectedCount[day][index - 1] = 0
        this.totalSelectedCount = this.selectedCount.monday.reduce((sum, x) => sum + x) + this.selectedCount.tuesday.reduce((sum, x) => sum + x) + this.selectedCount.wednesday.reduce((sum, x) => sum + x) + this.selectedCount.thursday.reduce((sum, x) => sum + x) + this.selectedCount.friday.reduce((sum, x) => sum + x)
        var cannotSelect = false
        // declaring the softlocks checks for nearby hours
        var checkNearbyinClassSoftLock = true
        var checkNearbyinClassHardLock = true
        var checkNearbyinTeacher = true
        if (index-1 !== 0) {
          if(index === 7) {
            checkNearbyinClassSoftLock = (this.classTimetable[day][index - 2].softLock === true && this.classTimetable[day][index - 2].tcode === this.subject.tcode)
            checkNearbyinClassHardLock = (this.classTimetable[day][index - 2].softLock === true && this.classTimetable[day][index - 2].tcode === this.subject.tcode)
            checkNearbyinTeacher = ((this.teacherTimetable[day][index - 2].hardLock === true) || (this.teacherTimetable[day][index - 1].hardLock === true))
          } else {
            checkNearbyinClassSoftLock = ((this.classTimetable[day][index - 2].softLock === true && this.classTimetable[day][index - 2].tcode === this.subject.tcode) || (this.classTimetable[day][index].softLock === true && this.classTimetable[day][index].tcode === this.subject.tcode))
            checkNearbyinClassHardLock = (this.classTimetable[day][index].hardLock === true && this.classTimetable[day][index].tcode === this.subject.tcode) || (this.classTimetable[day][index - 2].softLock === true && this.classTimetable[day][index - 2].tcode === this.subject.tcode)
            checkNearbyinTeacher = ((this.teacherTimetable[day][index].hardLock === true) || (this.teacherTimetable[day][index - 2].hardLock === true) || (this.teacherTimetable[day][index - 1].hardLock === true))
          }
        } else {
           checkNearbyinClassHardLock = (this.classTimetable[day][index].hardLock === true && this.classTimetable[day][index].tcode === this.subject.tcode)
           checkNearbyinClassSoftLock = ((this.classTimetable[day][index].softLock === true && this.classTimetable[day][index].tcode === this.subject.tcode))
           checkNearbyinTeacher = ((this.teacherTimetable[day][index].hardLock === true) || (this.teacherTimetable[day][index - 1].hardLock === true))
        }
        var checkNearbyinClass = (checkNearbyinClassSoftLock || checkNearbyinClassHardLock)

        if (checkNearbyinClass || checkNearbyinTeacher) {
          cannotSelect = true
        }
        // console.log('second')
        var loc = `${this.classLocation}/${day}/hours/${index}`
        if (this.classTimetable[day][index - 1].softLock === true) {
          // console.log(this.classTimetable[day][index - 1].softLockDetails)
          if (this.classTimetable[day][index - 1].softLockDetails.tcode === this.subject.tcode) {
            // this.selectedCount--
            this.selectedHours[day] = this.selectedHours[day].filter(function (data) {
              return data.index !== index
            })
            firebase.firestore().doc(loc).update({
              softLock: false,
              softLockDetails: null,
              tcode: '',
              subcode: ''
            }).then(success => {
              console.log('successfully removed lock')
            })
          } else {
            swal('Sorry', 'You can only remove your hours', 'error')
          }
        } else {
          if (cannotSelect === false) {
            if (this.subject.hours > this.totalSelectedCount) {
              // this.selectedCount++
              this.selectedHours[day].push({
                index: index,
                day: day,
                subcode: this.subject.subcode,
                tcode: this.subject.tcode,
                softLock: false,
                hardLock: true,
                softLockDetails: null,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              })
              firebase.firestore().doc(loc).update({
                softLock: true,
                hardLock: false,
                tcode: this.subject.tcode,
                subcode: this.subject.subcode,
                softLockDetails: {
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  tcode: this.subject.tcode,
                  subcode: this.subject.subcode
                }
              }).then(success => {
                console.log('successfully softlocked')
              })
            } else {
              swal('Sorry', `Sorry You can only select ${this.subject.hours} Hours`, 'error')
            }
          } else {
            swal('Sorry', 'Sorry cannot select nearby Hours', 'error')
          }
        }
      } else {
        swal('Sorry', 'You cannot modify these', 'error')
      }
    }
  },
  mounted () {
    // variable initialization
    const classTimetableRef = firebase.firestore().collection(this.classLocation)
    const teacherLocation = `/teachers/${this.subject.tcode}/timeTable`
    const teacherTimeTableRef = firebase.firestore().collection(teacherLocation)

    // for (var day in this.classTimetable) {
    //   if (this.classTimetable.hasOwnProperty(day)) {
    //     this.classTimetable[day].forEach(hour => {
    //       firebase.firestore().collection(this.classLocation).doc(day).collection('hours').doc(hour.index.toString()).update({
    //         day: day
    //       }).then(success => {
    //         console.log('success')
    //       })
    //     })
    //   }
    // }

    // fetching class timetable
    for (var dayDoc in this.classTimetable) {
      if (this.classTimetable.hasOwnProperty(dayDoc)) {
        classTimetableRef.doc(dayDoc).collection(`hours`).onSnapshot(dailyHours => {
          dailyHours.forEach(hourDoc => {
            // console.log(hourDoc.data().tcode + hourDoc.data().day + hourDoc.id + '-----')
            if ((hourDoc.data().subcode === this.subject.subcode) && (hourDoc.data().tcode === this.subject.tcode) && ((hourDoc.data().softLock === true) || (hourDoc.data().hardLock === true))) {
              if (hourDoc.data().day === undefined) {
                console.log(hourDoc.data())
              }
              this.selectedCount[hourDoc.data().day][(hourDoc.id - 1)] = 1
              this.totalSelectedCount = this.selectedCount.monday.reduce((sum, x) => sum + x) + this.selectedCount.tuesday.reduce((sum, x) => sum + x) + this.selectedCount.wednesday.reduce((sum, x) => sum + x) + this.selectedCount.thursday.reduce((sum, x) => sum + x) + this.selectedCount.friday.reduce((sum, x) => sum + x)
              // console.log('selected' + hourDoc.data().tcode + hourDoc.data().day + hourDoc.id + '-----')
            }
            this.classTimetable[hourDoc.data().day][(hourDoc.id - 1)] = {
              subcode: hourDoc.data().subcode,
              tcode: hourDoc.data().tcode,
              hardLock: hourDoc.data().hardLock,
              softLock: hourDoc.data().softLock,
              day: hourDoc.data().day,
              softLockDetails: hourDoc.data().softLockDetails
            }
            // console.log(this.classTimetable[dayDoc][(hourDoc.id - 1)])
            this.loaded++
          })
        }, err => {
          console.log('Unable to fetch classTimetable' + err)
        })
      }
    }

    // fetching teacher timetable
    teacherTimeTableRef.onSnapshot(teacherTimetableSnapshot => {
      teacherTimetableSnapshot.forEach(dayDoc => {
        teacherTimeTableRef.doc(dayDoc.id).collection('hours').onSnapshot(dailyHours => {
          dailyHours.forEach(hourDoc => {
            this.teacherTimetable[dayDoc.id][(hourDoc.id - 1)] = {
              subcode: hourDoc.data().subcode,
              tcode: hourDoc.data().tcode,
              hardLock: hourDoc.data().hardLock
            }
          })
        })
      })
    }, err => {
      console.log('Unable to fetch teacherTimetable' + err)
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
  background-color: #6e7e9f;
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
