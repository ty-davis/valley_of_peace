<script setup lang="ts">
  defineProps({
    block: {
      type: String,
      default: 'bedrock'
    },
    blockSize: {
      type: String,
      default: 'normal'
    }
  })
</script>

<template>
  <div>
    <img :src="`/src/assets/block/${block}.png`" :class="`img-${blockSize}`"/>
  </div>
</template>

<style scoped>
div {
  display: inline;
}

img {
  image-rendering: pixelated;
}
.img-normal {
  width: 60px;

  @media only screen and (min-width: 768px) {
    width: 250px;
  }
}
.img-kinda-small {
  width: 45px;
  @media only screen and (min-width: 768px) {
    width: 150px;
  }
}
.img-small {
  width: 30px;
  @media only screen and (min-width: 768px) {
    width: 60px;
  }
}
</style>
