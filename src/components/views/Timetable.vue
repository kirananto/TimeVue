<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div v-for="(key,item) in getNotifications" :key="key" class="alert alert-dismissible" :class="item.type">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa" :class="item.icon"></i>{{item.title}}</h4>
        <span v-html="item.body"></span>
      </div>

      <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">TimeTable</h3>
            </div>

            <div class="box-body text-center">
              <!-- calendar group -->
            
            <div class="timetable">
              <div class="row">
                <button class="btn sub mainbutton"></button>
                <button class="btn sub mainbutton">Hour1</button>
                <button class="btn sub mainbutton">Hour2</button>
                <button class="btn sub mainbutton">Hour3</button>
                <button class="btn sub mainbutton">Hour4</button>
                <button class="btn sub mainbutton">Hour5</button>
                <button class="btn sub mainbutton">Hour6</button>
                <button class="btn sub mainbutton">Hour7</button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Monday</button>
                <button class="btn sub"></button>
                <button class="btn sub">
                  <span class="subject">STLD</span>
                  <span class="tcode">SMN</span>
                </button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Monday</button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub  text-center">
                  <span class="subject">STLD</span>
                  <span class="tcode">SMN</span>
                </button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Monday</button>
                <button class="btn sub">
                  <span class="subject">STLD</span>
                  <span class="tcode">SMN</span>
                </button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Monday</button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub">
                  <span class="subject">STLD</span>
                  <span class="tcode">SMN</span>
                </button>
                <button class="btn sub"></button>
              </div>
              <div class="row">
                <button class="btn sub mainbutton">Monday</button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
                <button class="btn sub"></button>
              </div>

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
export default {
  data () {
    return {
      timetable: [
        [{
          subcode: null,
          tcode: null
        }
        ]
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getNotifications'])
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
$h: 7rem;
$w: 13rem;
.sub {
  height: $h;
  width: $w;
  border-radius: 1rem;
  margin: .5rem;
  
  &:hover {
    background-color: #00A65A;
  }
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
  font-family: bebas_neue_regularregular;
  font-size: 3rem;
}
</style>
