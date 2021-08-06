<template>
  <div>
   <label> {{ audioData.name }} </label> 
    <audio :src="audioData.src" controls controlsList="nodownload">
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