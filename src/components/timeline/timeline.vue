<template>
  <div class="video-time-details-wrap">
    <div class="video-time-details">
      <ul>
        <li v-for="(item, i) in intervalsData" :key="i">
          {{ item }}
        </li>
      </ul>
      <div class="video-current-time"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  created() {
    this.computeInterval();
  },

  props: {
    startTime: {
      type: String,
      default: "00:00:00:00",
    },
    endTime: {
      type: String,
      required: true,
    },
    interVal: {
      type: Object,
      default: () => {
        return {
          hours: "00",
          minutes: "00",
          seconds: "05",
          milliseconds: "00",
        };
      },
    },
  },

  watch: {
    interVal: {
      deep: true,
      handler() {
        this.computeInterval();
      },
    },
  },

  data() {
    return {
      intervalsData: [],
    };
  },

  methods: {
    computeInterval() {
      let startTime = moment(this.startTime, "HH:mm:ss.SSS");
      let endTime = moment(this.endTime, "HH:mm:ss.SSS");

      let tmp = startTime;
      this.intervalsData = [];
      while (tmp < endTime) {
        tmp = tmp.add({
          hours: this.interVal.hours,
          minutes: this.interVal.minutes,
          seconds: this.interVal.seconds,
          milliseconds: this.interVal.milliseconds,
        });

        this.intervalsData.push(tmp.format("HH:mm:ss.SSS"));

        console.log("tmp", tmp.format("HH:mm:ss.SSS"));
      }
    },
  },
};
</script>

<style>
</style>