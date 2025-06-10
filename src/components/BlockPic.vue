<script setup lang="ts">
  defineProps({
    block: {
      type: String,
      default: 'bedrock'
    }
  })

</script>

<template>
  <div>
    <img :src="`assets/block/${block}.png`"/>
  </div>
</template>

<style scoped>
div {
  display: inline;
}

img {
  width: 60px;
  image-rendering: pixelated;

  @media only screen and (min-width: 768px) {
    width: 250px;
  }
}
</style>
