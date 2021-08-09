<template>
  <div>
    <div
      ref="listenTo"
      :style="'width:' + (progress + 10) + '%'"
      class="progress-wrapper"
    >
      <div :style="{ width: progress + '%' }" class="progress"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeekProgress",
  data() {
    return {
      progress: 0,
      wrapperWidth: 0,
    };
  },
  mounted() {
    // this.$refs.listenTo.addEventListener("click", this.getClickPosition, false);
    this.$refs.listenTo.addEventListener(
      "mousedown",
      this.detectMouseDown,
      false
    );
    this.$refs.listenTo.addEventListener("mouseup", this.detectMouseUp, false);

    //add a listener that will listen to window resize and modify progress width accordingly
    window.addEventListener("resize", this.windowResize, false);
  },
  methods: {
    getClickPosition(e) {
      e = e || window.e;

      // get target element
      let target = e.target || e.srcElement;
      if (target.nodeType == 3) target = target.parentNode; // fix for a safari bug
      this.wrapperWidth = this.wrapperWidth || target.offsetWidth; // set initial progressbar width

      // get the seek width
      let seekWidth = e.offsetX;

      // change seek position
      this.progress = (seekWidth / this.wrapperWidth) * 20;
    },
    detectMouseDown(e) {
      e.preventDefault(); // prevent browser from moving objects, following links etc

      // start listening to mouse movements
      this.$refs.listenTo.addEventListener(
        "mousemove",
        this.getClickPosition,
        false
      );
    },
    detectMouseUp() {
      // stop listening to mouse movements
      this.$refs.listenTo.removeEventListener(
        "mousemove",
        this.getClickPosition,
        false
      );
    },
    windowResize() {
      let prog = this;
      setTimeout(() => {
        prog.wrapperWidth = prog.$refs.listenTo.offsetWidth;
      }, 200);
    },
  },
};
</script>

<style lang="scss">
.progress-wrapper {
  display: block;
  height: 200px;
  margin: 200px 20px;
  position: relative;
  background: #e1e1e1;

  .progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: teal;
  }
}
</style>