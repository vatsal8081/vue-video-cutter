<template>
  <div>
    <div class="video-main-wrap" v-dragscroll="true">
      <!-- tracks component -->
      <div class="video-track-details-wrap">
        <!-- track left bar -->
        <div class="video-track-info-wrap">
          <div class="video-track-info">
            <div class="video-track-left-controls">
              <div
                class="video-track-controls"
                v-for="(track, i) in tracksData"
                :key="i"
              >
                <div class="video-track-title current-track">V01</div>
                <div class="video-swap-btn-wrap">
                  <i class="fas fa-angle-up"></i>
                  <i class="fas fa-angle-down"></i>
                </div>
                <div class="video-remove-btn" @click="removeTrack(i)">
                  <i class="far fa-trash-alt"></i>
                </div>
              </div>
            </div>
            <div class="video-track-details">
              <div
                class="video-current-track"
                v-for="(track, i) in tracksData"
                :key="i"
              >
                <input type="file" @change="prevFile" />
                <audio controls>
                  <source src="horse.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
          <div class="video-track-left-controls">
            <div class="video-track-add" @click="addTrack">
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </div>

        <!-- track left bar -->
      </div>
      <!-- tracks component -->
      <div class="video-timer-wrap">
        <!-- change interval -->
        <div class="video-timer-btn-wrap">
          <div
            class="video-timer-btn"
            @click="isChangingInterval = !isChangingInterval"
          >
            <i class="far fa-clock"></i>
          </div>

          <!-- <p v-if="isChangingInterval">dvdfgdfgdfg</p> -->
          <div div v-if="isChangingInterval" class="video-timer">
            <span>H</span>
            <input type="number" v-model="inputInterval.hours" />
            <span>M</span>
            <input type="number" v-model="inputInterval.minutes" />
            <span>S</span>
            <input type="number" v-model="inputInterval.seconds" />
            <span>MS</span>
            <input type="number" v-model="inputInterval.milliseconds" />
            <button @click="changeInterval">Set</button>
          </div>
        </div>
        <!-- change interval -->
        <!-- timeline component -->
        <timeLine
          v-dragscroll.x="true"
          startTime="00:00:00:00"
          endTime="00:01:00:00"
          :interVal="interval"
        ></timeLine>
        <!-- timeline component -->
      </div>
    </div>
  </div>
</template>

<script>
import timeLine from "@/components/timeline/timeline.vue";
import { dragscroll } from "vue-dragscroll";

export default {
  components: { timeLine },
  directives: {
    dragscroll,
  },

  data() {
    return {
      tmp: "",
      isChangingInterval: false,
      inputInterval: {
        hours: "00",
        minutes: "00",
        seconds: "05",
        milliseconds: "00",
      },
      interval: {
        hours: "00",
        minutes: "00",
        seconds: "05",
        milliseconds: "00",
      },

      tracksData: [],
    };
  },

  methods: {
    changeInterval() {
      this.interval = { ...this.inputInterval };
      this.isChangingInterval = !this.isChangingInterval;
    },

    addTrack() {
      this.tracksData.push({});
    },

    removeTrack(i) {
      console.log("i is", i);
      this.tracksData.splice(i, 1);
    },

    prevFile(event) {
      console.log("audio ", event.target.files);
    },
  },
};
</script>

<style lang="scss">
.video-timer-wrap {
  display: flex;
  width: 100%;
}

.video-timer-btn-wrap {
  width: 100px;
}

.video-time-details-wrap {
  width: calc(100% - 100px);
  display: flex;
}

.video-timer {
  background-color: rgba(154, 154, 154, 0.5);
  padding: 10px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0px;
  top: 0px;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}

.video-timer svg path {
  fill: #fff;
}
.video-time-details ul {
  display: flex;
  margin-top: 0px;
  margin-bottom: 0;
  height: 40px;
  align-items: center;
  padding-left: 0;
  position: relative;
  z-index: 2;
}
.video-time-details ul:after {
  content: "";
  width: 100%;
  height: calc(100% - 2px);
  border: 1px solid #f8b064;
  position: absolute;
  left: 0;
  right: 0;
  border-left: 0px;
}

.video-timer-btn {
  background-color: #fe955b;
  padding: 10px;
  box-shadow: inset 0 0 4px 0px #c7913b;
  border: 1px solid #f8b064;
}

.video-timer-btn svg path {
  fill: #fff;
}

.video-time-details {
  overflow-x: auto;
  background-color: #fe955b;
  display: flex;
  position: relative;
  box-shadow: inset 0 0 4px 0px #c7913b;
  width: 100%;
}

.video-time-details ul li {
  display: inline-block;
  width: 147px;
  color: #ffffff;
}
.video-current-time {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  background-color: #f9c78e;
  width: 25%;
  z-index: 1;
      opacity: 0.5;
}

.video-track-left-controls {
  width: 100px;
  background-color: #f7bb74;
  padding-bottom: 90px;
}
.video-track-add:first-child {
  margin-top: 0;
}
.video-track-details {
  width: calc(100% - 100px);
  background-color: #f7bb74;
}

.video-track-details-wrap {
  display: flex;
  min-height: 150px;
}

.video-track-controls {
  display: flex;
  min-height: 50px;
  margin-top: -2px;
}

.video-track-title {
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 2px 0px #ffd188;
  background-color: #fe955b;
  color: #fff;
  border-right: 0px;
}
.video-track-title.current-track {
  background-color: #af5e1b;
}
.video-swap-btn-wrap {
  display: flex;
  flex-flow: column;
  width: 23px;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 2px 0px #ffffff;
   
  background-color: #fe955b;
  
}

body .video-swap-btn-wrap .svg-inline--fa.fa-w-10 {
  width: 100%;
  height: 20px;
  cursor: pointer;
}

.video-remove-btn {
  display: flex;
  width: 22px;
  align-items: center;
  box-shadow: inset 0 0 2px 0px #ffffff;
  
  background-color: #fe955b;
  justify-content: center;
  color: #fff;
  
  cursor: pointer;
}

.video-swap-btn-wrap svg path {
  fill: #fff;
}

.video-swap-btn-wrap svg:first-child {
  border-bottom: 1px solid #f8b064;
}

.video-remove-btn .svg-inline--fa.fa-w-14 {
  width: 10px;
}

.video-track-add {
  box-shadow: inset 0 0 2px 0px #ffffff;
  background-color: #fe955b;
  justify-content: center;
  margin-top: -2px;
  padding-top: 8px;
  padding-bottom: 10px;
  min-height: 34px;
  display: flex;
  align-items: center;
  border-right: 0px;
  cursor: pointer;
}
.video-track-add svg path {
  fill: #fff;
}
.video-current-track {
  min-height: 48px;
  box-shadow: inset 0 0 2px 0px #c7913b;
  background-color: #ffffff;
    opacity: 0.6;
}
.video-timer input {
  padding: 10px;
  border-radius: 6px;
  border: 0;
  margin-bottom: 13px;
}

.video-timer button {
  background-color: #7d7d7d;
  font-size: 18px;
  width: 140px;
  border: 0;
  padding: 7px;
  color: #fff;
  border-radius: 36px;
  cursor: pointer;
}

.video-timer button:hover {
  background-color: #9a9a9a;
}
.video-main-wrap {
  margin-bottom: 20px;
}
.video-track-info-wrap {
  width: 100%;
  background-color: #f7bb74;
}

.video-track-info {
  display: flex;
}
.video-track-info .video-track-left-controls {
  padding-bottom: 0px;
}
.video-track-left-controls.video-track-not-show {
  margin-top: -52px;
  position: relative;
}
</style>