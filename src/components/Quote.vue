<script setup lang="ts">
  defineProps({
    text: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    fontSize: {
      type: String,
      default: "xx-large"
    },
    blockName: {
      type: String,
      default: 'bedrock'
    }
  })
</script>

<template>
  <div class="quote" :style="{
      '--quote-background': `url(src/assets/block/${blockName}.png)`,
      '--quote-fontsize': `${fontSize}`
    }">
    <p style="text-shadow: 0 0 10px black;">{{ text }}</p>
    <span style="font-size: smaller;">- {{ author }}</span>
  </div>
</template>

<style scoped>
.quote {
  display: block;
  font-size: var(--quote-fontsize, xx-large);
  padding: 1em 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    var(--quote-background, url('src/assets/block/bedrock.png'));
  background-size: 64px 64px;
  image-rendering: pixelated;
  color: white;
}
</style>
