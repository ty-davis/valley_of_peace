<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  const serverData = ref(null);

  onMounted(async () => {
    try {
      const response = await fetch(`https://api.mcsrvstat.us/bedrock/3/mc.ty-davis.com`);
      const data = await response.json();
      serverData.value = data;
      console.log("Server data:", data);
    } catch (error) {
      console.error("ERROR:", error)
    }
    
  })

</script>

<template>
  <div v-if="serverData">
    <div>Server Info:</div>
    <div class="tag-wrapper">
      <span class="tag">{{ serverData.hostname }}</span>
      <span class="tag">{{ serverData.motd.html[0] }}</span>
      <span class="tag">{{ serverData.players.online }} / {{ serverData.players.max }} online</span>
      <span class="tag">Version: {{ serverData.version }}</span>
    </div>
  </div>
</template>

<style scoped>
.tag-wrapper {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 0.5em;
}
.tag {
  padding: 0.5rem;
  border-radius: 10px;
  background-color: #eee;
  @media (prefers-color-scheme: dark) {
    background-color: #333;
  }
}
</style>
