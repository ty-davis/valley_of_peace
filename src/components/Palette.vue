<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { blocks } from '../data/blocks.ts';
  import BlockPic from './BlockPic.vue';
  import axios from 'axios';
  const backendURL = 'http://localhost:8080';
  var ax = axios.create({
    baseURL: backendURL,
  })

  const blocksData = blocks.map((block, index) => ({
    label: block,
    value: index
  }))

  const exportDialog = ref(false);
  const importDialog = ref(false);
  const authorizeDialog = ref(false);

  const importText = ref("");
  const selectedBlocks = ref([267, 300]);

  const visibleBlocks = ref([]);
  const serverPalettes = ref([]);

  const authPassword = ref("");
  const authorized = ref(false);
  const newPaletteName = ref("");


  const loading = ref(false);

  const onLazyLoad = (event) => {
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

  const deletePalette = (id: number) => {
    ax.delete(`/palettes/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Couldn't delete palette");
        }

        serverPalettes.value = serverPalettes.value.filter(x => x.id !== id)
        
      }).catch(error => {
        console.log(error);
      })
  }

  const newPalette = () => {
    console.log("Saving a new palette")
    if (!newPaletteName.value) {
      console.log("IT NEEDS A NAME!");
      return;
    }
    ax.post('/palettes', {'name': newPaletteName.value, 'blockIds': JSON.stringify(selectedBlocks.value) })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Couldn't create new palette");
        }
        const newData = response.data;
        newData.blockIds = JSON.parse(newData.blockIds);

        serverPalettes.value.push(newData);
      })
  }
  
  const loadPalette = (palette) => {
    console.log("Loading palette:", palette);
    selectedBlocks.value = palette.blockIds;
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

  const authorize = () => {
    fetch('http://localhost:8080/authorize', {headers: { Password: authPassword.value }}).then(response => {
      if (response.status !== 200) {
        throw new Error('Bad password');
      }
      console.log("We good.")
      authorized.value = true;
      ax = axios.create({
        baseURL: backendURL,
        headers: {
          'Password': authPassword.value
        }

      })
    })  
    .catch(error => {
      console.log(error);
    })
  }
  const loadServerPalettes = () => {
    axios.get('http://localhost:8080/palettes')
      .then((response) => {
        serverPalettes.value = response.data.map(palette => ({
        ...palette,
        blockIds: JSON.parse(palette.blockIds)
        }));
        console.log(serverPalettes.value);
      })
    
  }


  onMounted(() => {
    loadServerPalettes();
  })

</script>

<template>
  <template v-if="authorized">
    <Button disabled> Authorized! </Button>
  </template>
  <template v-else>
    <Button @click="authorizeDialog = true">
      Authorize
    </Button>
  </template>
  <div>
    Shared palettes:
    <div class="shared-palettes-wrapper">
      <div v-for="palette in serverPalettes" class="shared-palettes-card" @click="loadPalette(palette)">
        <div>
          {{ palette.name }}
        </div>

        <div class="blocks">
          <BlockPic 
            v-for="blockId in palette.blockIds.slice(0, 4)"
            :key="blockId"
            :block="blocksData.find(b => b.value === blockId)?.label"
            blockSize="small"
          />
          <div v-if="palette.blockIds.length > 4" class="block-ellipsis">
            ...
          </div>
          <span class="delete-button-wrapper">
            <span class="delete-button-wrapper-2">
              <Button @click.stop="deletePalette(palette.id)" v-if="authorized" class="delete-button" severity="danger">&times;</Button>
            </span>
          </span>
        </div>

      </div>
    </div>
  </div>


  <div class="blocks-show-wrapper">
    <BlockPic 
         v-for="blockValue in selectedBlocks"
         :key="blockValue"
         :block="blocksData.find(b => b.value === blockValue)?.label"
         :blockSize="selectedBlocks.length > 15 ? 'small' : 4 ? 'kinda-small' : 'normal'"
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
  <div v-if="authorized" style="display: flex; justify-content: center; margin: 10px;">
    <InputText v-model="newPaletteName"/>&nbsp;
    <Button label="Save as New Palette" @click.prevent="newPalette"/>
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
  <Dialog v-model:visible="authorizeDialog" header="Authorize" :modal="true">
    <InputText v-model="authPassword"/>&nbsp;
    <Button @click="authorize">Submit</Button>
  </Dialog>
</template>

<style scoped>
.blocks-show-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2em;
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
.shared-palettes-wrapper {
  display: flex;
  gap: 10px;
}
.shared-palettes-card {
  display: inline-flex;
  flex-direction: column;
  padding: 0.7em;
  background-color: #444;
  border-radius: 1em;
  transition: 0.3s;
}
.shared-palettes-card:hover {
  background-color: #555;
  transition: 0.3s;
  cursor: pointer;
}
.blocks {
  display: flex;
}
.block-ellipsis {
  align-items: center;
  min-width: 40px;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
}
.delete-button-wrapper {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
</style>
