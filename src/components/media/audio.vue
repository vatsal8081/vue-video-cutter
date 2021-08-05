<template>
  <div>
    <audio :src="audioSrc" controls>
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    audioSrc: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>