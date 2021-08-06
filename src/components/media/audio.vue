<template>
  <div>
    {{ audioData.name }}
    <audio :src="audioData.src" controls>
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    audioData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>