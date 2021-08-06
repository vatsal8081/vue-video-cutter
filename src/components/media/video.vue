<template>
  <div>
    {{ videoData.name }}
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