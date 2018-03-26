<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->

            <div class="box-header with-border">
              <h3 class="box-title"><strong> Timetable </strong></h3>
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
                <button v-for="(item,keyMon) in teacherTimetable.monday" :key="keyMon"  class="btn sub">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Tuesday</button>
                <button v-for="(item,keyTue) in teacherTimetable.tuesday" :key="keyTue" class="btn sub">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Wednesday</button>
                <button v-for="(item,keyWed) in teacherTimetable.wednesday" :key="keyWed" class="btn sub">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Thursday</button>
                <button v-for="(item,keyThu) in teacherTimetable.thursday" :key="keyThu" class="btn sub">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Friday</button>
                <button v-for="(item,keyFri) in teacherTimetable.friday" :key="keyFri" class="btn sub">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>

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
</template>
<script>
import firebase from 'firebase'
require('firebase/firestore')
export default {
data: function () {
    return {
      teacherTimetable: {
        monday: [],
        tuesday: [],
        thursday: [],
        wednesday: [],
        friday: []
      },
      loaded: 0
    }
  },
  mounted () {
    firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}`).get().then(doc => {
      console.log(doc.data().tcode)
      const teacherTimeTableRef = firebase.firestore().collection(`/teachers/${doc.data().tcode}/timeTable`)
      teacherTimeTableRef.get().then(teacherTimetableSnapshot => {
        teacherTimetableSnapshot.forEach(dayDoc => {
          teacherTimeTableRef.doc(dayDoc.id).collection('hours').get().then(dailyHours => {
            dailyHours.forEach(hourDoc => {
              this.loaded++
              this.teacherTimetable[dayDoc.id][(hourDoc.id - 1)] = {
                subcode: hourDoc.data().subcode,
                tcode: hourDoc.data().tcode
              }
            })
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
