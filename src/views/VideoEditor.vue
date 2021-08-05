<template>
  <div>
    <div v-dragscroll="true">
      <!-- tracks component -->
      <div>
        <!-- track left bar -->
        <div v-for="(track, i) in tracksData" :key="i">
          <span>V01</span>
          <i class="fas fa-angle-up"></i>
          <i class="fas fa-angle-down"></i>
          <!-- <button @click="removeTrack(i)">minus</button> -->
          <div @click="removeTrack(i)">
            <i class="fas fa-minus"></i>
          </div>

          <!-- single track section -->
          <div>single track {{ i }}</div>
          <!-- single track section -->
        </div>

        <!-- <button @click="addTrack">Plus</button> -->
        <div @click="addTrack">
          <i class="fas fa-plus"></i>
        </div>

        <!-- track left bar -->
      </div>
      <!-- tracks component -->

      <!-- timeline component -->
      <timeLine
        v-dragscroll.x="true"
        startTime="00:00:00:00"
        endTime="00:01:00:00"
        :interVal="interval"
      ></timeLine>
      <!-- timeline component -->

      <!-- change interval -->
      <div>
        <div
          v-if="!isChangingInterval"
          @click="isChangingInterval = !isChangingInterval"
        >
          ...
        </div>

        <div v-if="isChangingInterval">
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
  },
};
</script>

<style lang="scss">
</style>