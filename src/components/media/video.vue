<template>
  <div class="media_wrap">
    <label> <marquee behavior="scroll" direction="left" scrollamount="5">{{
      videoData.name.length > 25
        ? `${videoData.name.substring(0, 25)}...`
        : videoData.name
    }}</marquee></label>
    <video
      :src="videoData.src"
      controls
      height="150px"
      width="150px"
      controlsList="nodownload nofullscreen noremoteplayback nomute"
    >
      Your browser does not support the video element.
    </video>
  </div>
</template>

<script>
export default {
  props: {
    videoData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>