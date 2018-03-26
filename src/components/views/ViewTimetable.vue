<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->

            <div class="box-header with-border">
              <h3 class="box-title"><strong> Timetable for {{subject.className}} {{subject.branchName}} {{subject.divisionName}}</strong></h3>
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
                <button v-for="(item,keyMon) in classTimetable.monday" :key="keyMon"  class="btn sub">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Tuesday</button>
                <button v-for="(item,keyTue) in classTimetable.tuesday" :key="keyTue" class="btn sub">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Wednesday</button>
                <button v-for="(item,keyWed) in classTimetable.wednesday" :key="keyWed" class="btn sub">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Thursday</button>
                <button v-for="(item,keyThu) in classTimetable.thursday" :key="keyThu" class="btn sub">
                  <span class="subject">{{item.subcode}}</span>
                  <span class="tcode">{{item.tcode}}</span>
                </button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Friday</button>
                <button v-for="(item,keyFri) in classTimetable.friday" :key="keyFri" class="btn sub">
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
const firebase = () => import(/* webpackChunkName: "Firebase" */ 'firebase')
require('firebase/firestore')
export default {
  data: function () {
    return {
      subject: JSON.parse(this.$route.params.subject.toString()),
      classTimetable: {
        monday: [],
        tuesday: [],
        thursday: [],
        wednesday: [],
        friday: []
      },
      loaded: 0
    }
  },
  computed: {
    classLocation: function () {
      return `/classes/${this.subject.className}/branches/${this.subject.branchName}/divisions/${this.subject.divisionName}/timeTable`
    }
  },
  mounted () {
    const classTimetableRef = firebase.firestore().collection(this.classLocation)
    for (var dayDoc in this.classTimetable) {
      if (this.classTimetable.hasOwnProperty(dayDoc)) {
        classTimetableRef.doc(dayDoc.toString()).collection(`hours`).get().then(dailyHours => {
          console.log(dailyHours.size)
          dailyHours.forEach(hourDoc => {
            // console.log(hourDoc.data().tcode + hourDoc.data().day + hourDoc.id + '-----')
            // if ((hourDoc.data().subcode === this.subject.subcode) && (hourDoc.data().tcode === this.subject.tcode) && ((hourDoc.data().softLock === true) || (hourDoc.data().hardLock === true))) {
            //   if (hourDoc.data().day === undefined) {
            //     console.log(hourDoc.data())
            //   }
            //   // this.selectedCount[hourDoc.data().day][(hourDoc.id - 1)] = 1
            //   // this.totalSelectedCount = this.selectedCount.monday.reduce((sum, x) => sum + x) + this.selectedCount.tuesday.reduce((sum, x) => sum + x) + this.selectedCount.wednesday.reduce((sum, x) => sum + x) + this.selectedCount.thursday.reduce((sum, x) => sum + x) + this.selectedCount.friday.reduce((sum, x) => sum + x)
            //   // console.log('selected' + hourDoc.data().tcode + hourDoc.data().day + hourDoc.id + '-----')
            // }
            if (hourDoc.data().hardLock === true) {
              this.classTimetable[hourDoc.data().day][(hourDoc.id - 1)] = {
                subcode: hourDoc.data().subcode,
                tcode: hourDoc.data().tcode,
                hardLock: hourDoc.data().hardLock,
                softLock: hourDoc.data().softLock,
                day: hourDoc.data().day,
                softLockDetails: hourDoc.data().softLockDetails
              }
            } else {
              this.classTimetable[hourDoc.data().day][(hourDoc.id - 1)] = {
                subcode: '',
                tcode: '',
                hardLock: hourDoc.data().hardLock,
                softLock: hourDoc.data().softLock,
                day: hourDoc.data().day,
                softLockDetails: hourDoc.data().softLockDetails
              }
            }
            // console.log(this.classTimetable[dayDoc][(hourDoc.id - 1)])
            this.loaded++
          })
        }).catch(err => console.log(err))
      }
    }
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
