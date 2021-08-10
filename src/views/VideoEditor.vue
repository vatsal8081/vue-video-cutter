<template>
  <div>
    <div class="video-main-wrap">
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

              <div class="video-track-left-controls">
                <div class="video-track-add" @click="addTrack">
                  <i class="fas fa-plus"></i>
                </div>
              </div>
              <!-- change interval -->
              <div
                class="video-timer-btn"
                @click="isChangingInterval = !isChangingInterval"
              >
                <i class="far fa-clock"></i>
              </div>
              <!-- change interval -->
              <div class="video-timer-btn-wrap">
                <!-- <p v-if="isChangingInterval">dvdfgdfgdfg</p> -->
                <div div v-if="isChangingInterval" class="video-timer">
                  <div class="modal_filed_wrap">
                    <div class="modal_filed">
                      <span>Hours</span>
                      <input type="number" v-model="inputInterval.hours" />
                    </div>
                    <div class="modal_filed">
                      <span>Minute</span>
                      <input type="number" v-model="inputInterval.minutes" />
                    </div>
                    <div class="modal_filed">
                      <span>Second</span>
                      <input type="number" v-model="inputInterval.seconds" />
                    </div>
                    <div class="modal_filed">
                      <span>Milliseconds</span>
                      <input
                        type="number"
                        v-model="inputInterval.milliseconds"
                      />
                    </div>
                    <div class="modal_filed">
                      <span>&nbsp;</span>
                      <button @click="changeInterval">Set</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="video-track-details">
              <div class="video-track-details-in">
                <draggable
                  v-model="tracksData"
                  tag="div"
                  @end="generateTrackTitle"
                >
                  <div
                    class="video-current-track"
                    v-for="(track, i) in tracksData"
                    :key="i"
                  >
                    <!-- audio tracks -->
                    <draggable
                      :list="track.medias"
                      tag="div"
                      :group="{ name: 'row' }"
                      @end="generateTrackTitle"
                    >
                      <div
                        class="audio-track-wrap"
                        v-for="(media, mediaIndex) in track.medias"
                        :key="mediaIndex"
                      >
                        <!-- <div class="track-arrow-btn">
                            <div
                              class="track-arrow-btn-up"
                              @click="upMedia(i, mediaIndex)"
                            >
                              <i class="fas fa-arrow-up"></i>
                            </div>
                            <div
                              class="track-arrow-btn-down"
                              @click="downMedia(i, mediaIndex)"
                            >
                              <i class="fas fa-arrow-down"></i>
                            </div>
                            <div
                              class="track-arrow-btn-left"
                              @click="leftMedia(i, mediaIndex)"
                            >
                              <i class="fas fa-arrow-left"></i>
                            </div>
                            <div
                              class="track-arrow-btn-right"
                              @click="rightMedia(i, mediaIndex)"
                            >
                              <i class="fas fa-arrow-right"></i>
                            </div>
                          </div> -->
                        <template v-if="media.mediaType === 'audio'">
                          <audioPlayer :audioData="media"></audioPlayer>
                        </template>
                        <template v-if="media.mediaType === 'video'">
                          <videoPlayer :videoData="media"></videoPlayer>
                        </template>
                        <!-- <label>{{media.name}}</label> -->
                      </div>
                    </draggable>

                    <!-- audio tracks -->
                  </div>
                </draggable>
                <div class="progress_wrp">
                  <seekBar></seekBar>
                </div>
                <!-- tracks component -->
                <div class="video-timer-wrap">
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
          </div>
          <!-- track left bar -->
        </div>
      </div>

      <!-- <draggable
        v-model="rows"
        tag="div"
        class="row wrap fill-height align-center sortable-list"
        style="background: grey"
      >
        <div
          v-for="(data, i) in rows"
          :key="i"
          class="sortable"
          xs12
          my-2
          style="background: red"
        >
          <draggable
            :list="data.items"
            tag="div"
            :group="{ name: 'row' }"
            class="row wrap justify-space-around"
          >
            <div
              v-for="(item, index) in data.items"
              :key="index"
              xs4
              pa-3
              class="row-v"
            >
              <div style="height: 100px">{{ item.title }}</div>
            </div>
          </draggable>
        </div>
      </draggable> -->

      <!-- <p>abcsaoidfhdsfh</p>
      <draggable v-model="tracksData">
        <transition-group>
          <div v-for="(el, i) in tracksData" :key="i">
            {{ el.title }}
          </div>
        </transition-group>
      </draggable> -->
      <!-- <xns-seek-bar
        :bar-color="'#ffdd00'"
        :current-value="33"
        :total-value="100"
        :listen="true"
      ></xns-seek-bar> -->

      <div></div>
    </div>
  </div>
</template>




<script>
import timeLine from "@/components/timeline/timeline.vue";
import audioPlayer from "@/components/media/audio.vue";
import videoPlayer from "@/components/media/video.vue";
import { dragscroll } from "vue-dragscroll";
import seekBar from "../components/seek/seekBar.vue";
// import draggable from "vuedraggable";
import draggable from "vuedraggable";
// audioPlayer, videoPlayer,
export default {
  components: { timeLine, audioPlayer, videoPlayer, seekBar, draggable },
  directives: {
    dragscroll,
  },

  data() {
    return {
      rows: [
        {
          index: 1,
          items: [
            {
              title: "item 1",
            },
          ],
        },
        {
          index: 2,
          items: [
            {
              title: "item 2",
            },
            {
              title: "item 3",
            },
          ],
        },
      ],

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
    chnage() {
      console.log("change1");
    },
    change2() {
      console.log("chnage2");
    },
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
      this.tracksData.splice(i, 1);
      this.generateTrackTitle();
    },

    addMedia(event, i) {
      console.log("audio ", event.target.files, i);
      let file = event.target.files;
      let blobUrl = URL.createObjectURL(new Blob(file));

      this.tracksData[i].medias.push({
        name: file[0].name,
        size: file[0].size,
        type: file[0].type,
        lastModifiedDate: file[0].lastModifiedDate,
        mediaType: file[0].type.split("/")[0],
        src: blobUrl,
      });

      this.generateTrackTitle();
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

    generateTrackTitle() {
      this.mediaLastTrackName.audio = 0;
      this.mediaLastTrackName.video = 0;
      this.tracksData.forEach((el) => {
        if (el.medias[0]?.mediaType === "audio") {
          console.log("in");
          this.mediaLastTrackName.audio += 1;
          el.title = `A${this.mediaLastTrackName.audio}`;
        }

        if (el.medias[0]?.mediaType === "video") {
          this.mediaLastTrackName.video += 1;
          el.title = `V${this.mediaLastTrackName.video}`;
        }
        if (!el.medias[0]?.mediaType) {
          el.title = "";
        }
      });
    },

    // media change methods
    upMedia(trackIndex, mediaIndex) {
      console.log("up", trackIndex, mediaIndex);
      if (trackIndex === 0) return;

      if (!this.tracksData[trackIndex - 1].medias[mediaIndex]) {
        this.tracksData[trackIndex - 1].medias.push(
          this.tracksData[trackIndex].medias[mediaIndex]
        );
        this.tracksData[trackIndex].medias.splice(mediaIndex, 1);
        this.generateTrackTitle();
        return;
      }

      if (this.tracksData[trackIndex - 1].medias[mediaIndex]) {
        let [a, b] = [
          this.tracksData[trackIndex].medias[mediaIndex],
          this.tracksData[trackIndex - 1].medias[mediaIndex],
        ];
        console.log("tmp", a, b);
        this.tracksData[trackIndex].medias[mediaIndex] = b;
        this.tracksData[trackIndex - 1].medias[mediaIndex] = a;
        console.log("tmp2", this.tracksData);
        this.generateTrackTitle();
        this.$forceUpdate();
        return;
      }
    },
    downMedia(trackIndex, mediaIndex) {
      console.log("Down", trackIndex, mediaIndex);
      if (trackIndex === this.tracksData.length - 1) return;

      if (!this.tracksData[trackIndex + 1].medias[mediaIndex]) {
        this.tracksData[trackIndex + 1].medias.push(
          this.tracksData[trackIndex].medias[mediaIndex]
        );
        this.tracksData[trackIndex].medias.splice(mediaIndex, 1);
        this.generateTrackTitle();
        return;
      }

      if (this.tracksData[trackIndex + 1].medias[mediaIndex]) {
        let [a, b] = [
          this.tracksData[trackIndex].medias[mediaIndex],
          this.tracksData[trackIndex + 1].medias[mediaIndex],
        ];
        console.log("tmp", a, b);
        this.tracksData[trackIndex].medias[mediaIndex] = b;
        this.tracksData[trackIndex + 1].medias[mediaIndex] = a;
        console.log("tmp2", this.tracksData);
        this.generateTrackTitle();
        this.$forceUpdate();
        return;
      }
    },
    leftMedia(trackIndex, mediaIndex) {
      console.log("left", trackIndex, mediaIndex);
      if (!this.tracksData[trackIndex].medias[mediaIndex - 1]) return;

      let [a, b] = [
        this.tracksData[trackIndex].medias[mediaIndex],
        this.tracksData[trackIndex].medias[mediaIndex - 1],
      ];
      this.tracksData[trackIndex].medias[mediaIndex] = b;
      this.tracksData[trackIndex].medias[mediaIndex - 1] = a;
      this.$forceUpdate();
    },
    rightMedia(trackIndex, mediaIndex) {
      console.log("right", trackIndex, mediaIndex);
      if (!this.tracksData[trackIndex].medias[mediaIndex + 1]) return;

      let [a, b] = [
        this.tracksData[trackIndex].medias[mediaIndex],
        this.tracksData[trackIndex].medias[mediaIndex + 1],
      ];
      this.tracksData[trackIndex].medias[mediaIndex] = b;
      this.tracksData[trackIndex].medias[mediaIndex + 1] = a;
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}


.video-timer-btn-wrap {
  width: 120px;
}

// .video-time-details-wrap {
//   width: calc(100% - 120px);
//   display: flex;
// }

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
  background-color: rgb(254, 111, 66);
  border-radius: 0px 10px 10px 0px;
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
  // overflow-x: auto;
  background-color: #fe955b;
  display: flex;
  position: relative;
  box-shadow: inset 0 0 4px 0px #c7913b;
  // width: 100%;
}

.video-time-details::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(75, 100, 121);
}

.video-time-details::-webkit-scrollbar {
  height: 6px;
  background-color: rgb(25, 50, 72);
}

.video-time-details::-webkit-scrollbar-thumb {
  background-color: rgba(240, 240, 240, 0.541);
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
  // width: calc(100% - 120px);
  background-color: #f7bb74;
}

.video-track-details-wrap {
  display: flex;
  min-height: 150px;
}

.video-track-controls {
  display: flex;
  min-height: 100px;
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
// .video-current-track {
//   // overflow-x: auto;
//   min-height: 98px;
//   box-shadow: inset 0 0 2px 0px #c7913b;
//   // background-color: rgba(255, 255, 255, 0.6);
//   display: flex;
//   align-items: center;
// }

.video-current-track > div {
  // overflow-x: auto;
  min-height: 98px;
  //box-shadow: inset 0 0 2px 0px #c7913b;
  // background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  margin: 0 -15px;
  flex-wrap: wrap;
}

.video-current-track::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.video-current-track::-webkit-scrollbar {
  height: 3px;
  background-color: #f5f5f5;
}

.video-current-track::-webkit-scrollbar-thumb {
  background-color: #af5e1b;
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
  align-items: flex-end;
}
.video-track-info .video-track-left-controls {
  padding-bottom: 7px;
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

.audio-track {
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-track label {
  margin: 0px 16px;
}

.track-arrow-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #af5e1b;
  position: relative;
}

.track-arrow-btn .track-arrow-btn-up {
  height: 16px;
  width: 14px;
  position: absolute;
  top: 0;
  left: 10px;
}

.track-arrow-btn .track-arrow-btn-down {
  height: 16px;
  width: 14px;
  position: absolute;
  bottom: 0;
  left: 10px;
}

.track-arrow-btn .track-arrow-btn-left {
  height: 16px;
  width: 14px;
  position: absolute;
  top: 10px;
  left: 0px;
}

.track-arrow-btn .track-arrow-btn-right {
  height: 16px;
  width: 14px;
  position: absolute;
  top: 10px;
  right: 0px;
}

.track-arrow-btn .track-arrow-btn-right svg path,
.track-arrow-btn .track-arrow-btn-left svg path,
.track-arrow-btn .track-arrow-btn-up svg path,
.track-arrow-btn .track-arrow-btn-down svg path {
  fill: #fff;
}
.video-current-track video {
  height: 110px;
    aspect-ratio: auto;
    width: 240px;
    object-fit: cover;
}
.video-current-track {
  padding: 10px 0;
  // align-items: unset;
}
.video-current-track .audio-track-wrap[draggable="true"] {
    zoom: 0.5;
}

.video-current-track .audio-track-wrap {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.video-current-track .audio-track-wrap > div {
  display: flex;
  height: 140px;
  flex-wrap: wrap;
  justify-content: center;
}

.video-current-track .audio-track-wrap div label {
  font-size: 14px;
  padding: 0 10px;
  max-width: 200px;
  margin-bottom: auto;
}

.video-current-track .audio-track-wrap {
  position: relative;
  padding: 20px 30px 20px;
  z-index: 9;
}
.video-current-track .audio-track-wrap > div >*:not(label){
  margin-top: auto;
}

.video-current-track .audio-track-wrap .track-arrow-btn {
  display: block !important;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: unset;
}

.video-current-track .audio-track-wrap .track-arrow-btn:hover > div {
  opacity: 1;
}

.video-current-track .audio-track-wrap .track-arrow-btn > div {
  width: 20px;
  height: 20px;
  background-color: #af5e1b;
  text-align: center;
  line-height: 20px;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 20px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s;
}
.video-current-track .audio-track-wrap .track-arrow-btn .track-arrow-btn-up {
  right: 0;
  top: 0;
  margin: 0 auto;
  left: 0;
}

.video-current-track .audio-track-wrap .track-arrow-btn .track-arrow-btn-down {
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: -5px;
}

.video-current-track .audio-track-wrap .track-arrow-btn .track-arrow-btn-left {
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
}

.video-current-track .audio-track-wrap .track-arrow-btn .track-arrow-btn-right {
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}
// .media_wrap {
//   flex-wrap: wrap;
// }
.media_wrap > label {
  width: 100%;
}
.video-current-track .audio-track-wrap {
  // min-width: 25%;
  // width: 100%;
  min-width: 350px;
}

// .video-current-track .audio-track-wrap div {
//   justify-content: center;
// }
.video-current-track {
  min-height: 156px;
}

.video-track-controls {
  min-height: 178px;
}
.video-track-info-wrap,
.video-track-details-wrap {
  background-color: #1d3d59;
}
.video-track-left-controls {
  background-color: transparent;
}
.video-track-left-controls {
  padding-bottom: 0;
}
.video-track-details-wrap {
  padding: 20px;
}
.video-track-add {
  background-color: #fe6f42;
  color: #eae8d8;
  width: 55px;
  height: 55px;
  border-radius: 50px;
  padding: 0;
  line-height: 55px;
  box-shadow: 0 0 7px #0f2d48;
  margin-top: 20px !important;
  position: relative;
  left: 45%;
  transform: translateX(-50%);
}
.video-track-controls {
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10px 10px 0;
}

.video-track-controls .video-track-title {
  width: 100%;
  background-color: rgb(253, 185, 58);
  color: #000;
  font-weight: 700;
  border-radius: 13px;
  margin-bottom: 8px;
}

.video-track-controls > div:not(.video-track-title) {
  width: 46%;
  box-shadow: unset;
  border-radius: 10px;
}

.video-track-controls .video-remove-btn {
  justify-content: space-evenly;
}

.video-track-controls .video-remove-btn > div {
  background-color: rgba(0, 0, 0, 0.18);
  width: calc(100% - 20px);
  height: 30px;
  line-height: 32px;
  border-radius: 4px;
  padding: 0;
  position: relative;
}
.video-track-controls .video-remove-btn > div input {
  width: 100%;
  height: 100%;
}
.video-track-controls .video-remove-btn > div svg {
  width: unset !important;
  font-size: 15px;
}
.video-timer-btn {
  background-color: rgb(254, 111, 66);
  box-shadow: unset;
  border: unset;
}

.video-time-details ul:after {
  border: unset;
}

// .video-time-details {
//   background-color: rgb(254, 111, 66);
// }

.video-current-time {
  background-color: rgba(0, 0, 0, 0.302);
  opacity: unset;
}

.video-track-details {
  background-color: #1d3d59;
}

.video-current-track {
  // background-color: #203548;
  border: none;
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid #636363;
  padding: 0 15px;
}

.video-current-track .audio-track-wrap div label {
  color: #fff;
  max-width: 100%;
}
.video-current-track:not(:first-child) {
  margin-top: 5px;
}
.video-main-wrap {
  width: 100%;
  // overflow-x: auto;
}

.video-timer-wrap {
  padding: 95px 0 0 0;
  background-color: #19334a;
  // width: 100%;
}
.video-timer-btn {
  border-radius: 10px 0 0 10px;
}

.video-time-details-wrap {
  // width: 100%;
  // overflow: hidden;
  // border-radius: 0 10px 10px 0;
}
// .video-time-details-wrap ul {
//   height: unset;
// }
// .video-time-details-wrap ul > li {
//   padding: 7px 25px;
// }

.video-timer {
  background-color: rgba(0, 0, 0, 0.81);
}
.modal_filed_wrap {
  max-width: 1240px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
}

.modal_filed {
  max-width: 19%;
  width: 100%;
}

.modal_filed span {
  display: block;
  color: #666;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 3px;
}
// *:focus-visible{outline: none;}
.modal_filed input {
  width: -webkit-fill-available;
  margin: 0;
  max-width: 100%;
  display: block;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
}
.modal_filed button {
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  width: 100%;
}
//--Start video cutter line
.video-track-details {
  // position: relative;
  overflow: hidden;
}
.video-track-details .video-track-details-in {
  overflow-x: auto;
  background-color: #203548;
  position: relative;
}
.video-track-details .progress_wrp {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.video-track-details .progress_wrp .progress-wrapper {
  margin: 0;
  height: 100%;
  background: transparent;
}
.video-track-details .progress_wrp > div {
  height: 100%;
}
.video-track-details .progress_wrp .progress-wrapper .progress {
  border-right: 2px solid #fdb93a;
  background: transparent;
}
.video-track-details .progress_wrp .progress-wrapper .progress:after {
  content: "";
  width: 0;
  height: 0;
  display: inline-block;
  border: 9px solid transparent;
  border-bottom: none;
  border-top: 9px solid #fdb93a;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto -10px 0 auto;
  z-index: 3;
}
.video-track-details-in::-webkit-scrollbar-track {
  background-color: rgb(75, 100, 121);
}

.video-track-details-in::-webkit-scrollbar {
  height: 6px;
  background-color: rgb(25, 50, 72);
}

.video-track-details-in::-webkit-scrollbar-thumb {
  background-color: rgba(240, 240, 240, 0.541);
}
//--End video cutter line

.video-current-track .audio-track-wrap {
  max-width: 33.33%;
  flex: 0 0 33.33%;
  width: 100%;
  padding: 0 15px;
  min-height: 156px;
}
</style>