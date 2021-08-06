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
                <div class="video-track-title current-track">
                  {{ track.title }}
                </div>
                <div class="video-swap-btn-wrap">
                  <div v-if="i !== 0" @click="swapTrack('up', i)">
                    <i class="fas fa-angle-up"></i>
                  </div>
                  <div
                    v-if="i !== tracksData.length - 1"
                    @click="swapTrack('down', i)"
                  >
                    <i class="fas fa-angle-down"></i>
                  </div>
                </div>
                <div class="video-remove-btn">
                  <div class="video-remove" @click="removeTrack(i)">
                    <i class="far fa-trash-alt"></i>
                  </div>
                  <div class="audio-file">
                    <input
                      type="file"
                      @input="addMedia($event, i)"
                      accept="audio/*,video/*"
                    /><i class="fas fa-file-audio"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="video-track-details">
              <div
                class="video-current-track"
                v-for="(track, i) in tracksData"
                :key="i"
              >
                <!-- audio tracks -->
                <div
                  class="audio-track-wrap"
                  v-for="(media, mediaIndex) in track.medias"
                  :key="mediaIndex"
                >
                  <div>
                    <template v-if="media.mediaType === 'audio'">
                      <audioPlayer :audioData="media"></audioPlayer>
                    </template>
                    <template v-if="media.mediaType === 'video'">
                      <videoPlayer :videoData="media"></videoPlayer>
                    </template>
                    <!-- <label>{{media.name}}</label> -->
                  </div>
                </div>
                <!-- audio tracks -->
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
            <span>Hours</span>
            <input type="number" v-model="inputInterval.hours" />
            <span>Minute</span>
            <input type="number" v-model="inputInterval.minutes" />
            <span>Second</span>
            <input type="number" v-model="inputInterval.seconds" />
            <span>Milliseconds</span>
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
import audioPlayer from "@/components/media/audio.vue";
import videoPlayer from "@/components/media/video.vue";
import { dragscroll } from "vue-dragscroll";

export default {
  components: { timeLine, audioPlayer, videoPlayer },
  directives: {
    dragscroll,
  },

  data() {
    return {
      mediaLastTrackName: {
        audio: 0,
        video: 0,
      },
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
      this.tracksData.push({
        title: "",
        medias: [],
      });
    },

    removeTrack(i) {
      console.log("i is", i);
      this.tracksData.splice(i, 1);
    },

    addMedia(event, i) {
      console.log("audio ", event.target.files, i);
      let file = event.target.files;
      console.log("tmp", event.target.value);
      let blobUrl = URL.createObjectURL(new Blob(file));

      this.tracksData[i].medias.push({
        name: file[0].name,
        size: file[0].size,
        type: file[0].type,
        lastModifiedDate: file[0].lastModifiedDate,
        mediaType: file[0].type.split("/")[0],
        src: blobUrl,
      });

      this.generateTrackTitle(this.tracksData[i]);
      console.log("blob", this.tracksData);
      event.target.value = null;
    },

    swapTrack(swapTo, i) {
      let [a, b] = [
        this.tracksData[i],
        this.tracksData[swapTo === "up" ? i - 1 : i + 1],
      ];
      this.tracksData[i] = b;
      this.tracksData[swapTo === "up" ? i - 1 : i + 1] = a;
      this.$forceUpdate();
    },

    generateTrackTitle(track) {
      if (track.medias[0].mediaType === "audio") {
        this.mediaLastTrackName.audio += 1;
        track.title = `A${this.mediaLastTrackName.audio}`;
        return;
      }

      if (track.medias[0].mediaType === "video") {
        this.mediaLastTrackName.video += 1;
        track.title = `V${this.mediaLastTrackName.video}`;
        return;
      }
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
  width: 120px;
}

.video-time-details-wrap {
  width: calc(100% - 120px);
  display: flex;
}

.video-timer {
  background-color: rgba(247, 187, 116, 0.5);
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
  cursor: pointer;
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
  width: 120px;
  background-color: #f7bb74;
  padding-bottom: 90px;
}
.video-track-add:first-child {
  margin-top: 0;
}
.video-track-details {
  width: calc(100% - 120px);
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
  width: 68px;
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
  width: 25px;
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
  width: 27px;
  align-items: center;
  box-shadow: inset 0 0 2px 0px #ffffff;

  background-color: #fe955b;
  justify-content: center;
  color: #fff;
  flex-flow: column;
  cursor: pointer;
}

.video-swap-btn-wrap svg path {
  fill: #fff;
}

.video-swap-btn-wrap div:first-child {
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
  margin-right: 13px;
  margin-left: 10px;
}

.video-timer button {
  background-color: #fe955b;
  font-size: 18px;
  width: 140px;
  border: 0;
  padding: 7px;
  color: #fff;
  border-radius: 36px;
  cursor: pointer;
}

.video-timer button:hover {
  background-color: #f7bb74;
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
.video-remove-btn .svg-inline--fa.fa-w-14:hover {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-1px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(2px, 0, 0);
  }
}

.video-remove {
  height: 22px;
}

.audio-file {
  height: 17px;
  position: relative;
}

.audio-file input[type="file"] {
  position: absolute;
  left: 0;
  right: 0;
  opacity: 0;
  width: 17px;
  cursor: pointer;
}
.video-swap-btn-wrap div:last-child {
  border: 0px;
}
.audio-track-wrap audio {
  height: 32px;
}
</style>