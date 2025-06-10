<script setup lang="ts">
  import { ref } from 'vue';
  import { blocks } from '../data/blocks.ts';
  import BlockPic from './BlockPic.vue';

  const blocksData = blocks.map((block, index) => ({
    label: block,
    value: index
  }))

  const exportDialog = ref(false);
  const importDialog = ref(false);

  const importText = ref("");
  const selectedBlocks = ref([267, 300]);

  const visibleBlocks = ref<Array<{ label: string; value: number }>>([]);

  const loading = ref(false);

  const onLazyLoad = (event: any) => {
    loading.value = true;
    setTimeout(() => {
      const { first, last } = event;
      visibleBlocks.value = blocksData.slice(first, last);
      loading.value = false;
    }, 300);
  };

  const showExportDialog = () => {
    exportDialog.value = true;
  }
  const showImportDialog = () => {
    importText.value = "";
    importDialog.value = true;
  }

  const copyPalette = () => {
    navigator.clipboard.writeText(formatExport());
  }

  const updateSelectedBlocksFromImportText = () => {
    const objArray = JSON.parse(importText.value);
    selectedBlocks.value = blocksData
      .filter(block => objArray.includes(block.label))
      .map(block => block.value);
  }

  const getColsCount = () => {
    return window.innerWidth < 768 ? 40 : 90;
  }

  const formatExport = () => {
    const obj = selectedBlocks.value.map(block =>
      blocksData.find(b => b.value === block)?.label
    ).filter(Boolean);
    return JSON.stringify(obj, null, 2);
  }

</script>

<template>
  <div class="blocks-show-wrapper">
    <BlockPic 
         v-for="blockValue in selectedBlocks"
         :key="blockValue"
         :block="blocksData.find(b => b.value === blockValue)?.label"
    />
  </div>

  <div style="margin: 10px; display: flex; justify-content: center; gap: 30px;">
    <MultiSelect
      v-model="selectedBlocks"
      :options="blocksData"
      optionLabel="label"
      optionValue="value"
      :filter="true"
      :virtualScrollerOptions="{
        itemSize: 38,
        showLoader: true,
        loading: loading,
        delay: 100,
        onLazyLoad: onLazyLoad,
        lazy: true
      }"
      :loading="loading"
      :virtualScroll="true"
      display="chip"
      showClear
      placeholder="Select Blocks"
      class="flex-multiselect"
      />
  </div>
  <div style="display: flex; justify-content: center; gap: 30px;">
    <Button label="Export Palette" @click.prevent="showExportDialog"> </Button>
    <Button label="Import Palette" severity="secondary" @click.prevent="showImportDialog"> </Button>
  </div>
  <Dialog v-model:visible="importDialog" header="Import Palette" :modal="true">
    <div class="blocks-wrapper">
      <div class="blocks-header">
        <span>
          Paste the Palette into the box below
        </span>
      </div>
      <div style="blocks-text">
        <Textarea v-model="importText" :cols="getColsCount()" rows="4"/>
      </div>
    </div>
    <Button label="Accept" @click.prevent="updateSelectedBlocksFromImportText"/>
  </Dialog>
  <Dialog v-model:visible="exportDialog" header="Export Palette" :modal="true">
    <div class="blocks-wrapper">
      <div class="blocks-header">
        <span>
          Copy the text below
        </span>
        <Button label="Copy" @click.prevent="copyPalette"/> 
      </div>
      <div class="blocks-text">
        <p>
          {{ formatExport() }};
        </p>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.blocks-show-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 60px;
  @media only screen and (min-width: 768px) {
    min-height: 250px;
  }
}
.blocks-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 10px;
}
.blocks-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.5em;
  background-color: #eee;
  @media (prefers-color-scheme: dark) {
    background-color: #555;
  }
}
.blocks-text {
  padding: 0.5em;
  max-width: 400px;
  font-family: 'Courier New', Courier, monospace; 
  background-color: #ddd;
  @media (prefers-color-scheme: dark) {
    background-color: #444;
  }
}
.flex-multiselect ::v-deep(.p-multiselect-label) {
  display: flex;
  flex-wrap: wrap;
  padding-right: 2.5rem;
  gap: 8px;
}
</style>
