<template>
  <div>
   <label> <marquee behavior="scroll" direction="left" scrollamount="5"> {{
        audioData.name.length > 25
          ? `${audioData.name.substring(0, 25)}...`
          : audioData.name
      }} </marquee></label>
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