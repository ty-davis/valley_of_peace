<script setup lang="ts">
  import { ref } from 'vue';
  import { onMounted } from 'vue'

  import HelloWorld from './components/HelloWorld.vue';
  import Quote from './components/Quote.vue';
  import BlockPic from './components/BlockPic.vue';

  import { blocks } from './data/blocks';

  const selectedBlocks = ref(['cherry_planks', 'bedrock']);


  onMounted(() => {
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = '//assets.pinterest.com/js/pinit.js'
    document.body.appendChild(script)
  })


</script>

<template>
  <!-- <div class="main-content"> -->
  <Card>
  <template #title>

    <h1 style="margin-bottom: 10px;">The Valley of Peace</h1>
    <span style="margin-bottom: 30px; display: block;">Welcome to the Soverign Nation of the Valley of Peace</span>
  </template>
  <template #content>
    <div>
      <Image src="src/assets/valley.PNG" width="100%" preview/>
    </div>
    <nav>
      <div class="nav">
        <a href="#vision">Vision</a>
        <a href="#palette">Pallete</a>
        <a href="#inspo">Inspo</a>
        <a href="#voppa">VOPPA</a>
      </div>
    </nav>
    
    <Quote
        :text='"Power is overrated, especially when no one there to compete with you"'
        :author='"Sun Tzu"'/>

    <div class="word-content">
      <h2 id="vision" class="heading">Vision</h2>
      <Image src="src/assets/snvop.JPEG" class="responsive-image" style="box-shadow: lightgray 0px 0px 10px 0px; border-radius: 10px;" preview/>

      <h2 id="palette" class="heading">Palette</h2>

      <div style="display: flex; justify-content: center; flex-wrap: wrap;">
        <BlockPic 
             v-for="block in selectedBlocks"
             :key="block"
             :block="block"
        />
      </div>

      <div style="margin: 10px; display: flex; justify-content: center; gap: 30px;">
        <MultiSelect
            v-model="selectedBlocks"
            :options="blocks"
            :filter="true"
            display="chip"
            showClear
            placeholder="Select Blocks"
            class="flex-multiselect"
            />
        <!-- <Button label="Export Palette"> </Button> -->
        <!-- <Button label="Import Palette" severity="secondary"> </Button> -->
      </div>

      <h2 id="inspo" class="heading">Inspo</h2>

        Check out <a href="https://www.pinterest.com/taylorknight02/minecraft-architecture/">Taylor's board</a> for inspiration.
        <div class="pin-wrapper">
          <a data-pin-do="embedBoard" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="https://www.pinterest.com/taylorknight02/minecraft-architecture/"></a>
        </div>


      <h2 id="voppa" class="heading">Valley of Peace Protection Agency</h2>
      <div>
        What is a sovereign nation?
      </div>
    </div>
    <Quote
        :text='"A \"soverign nation\" refers to a community with a homogenous population living in a continuous territory under a single government that holds complete independence and the monopoly of jurisdiction, and the legitimate use of violence internally."'
        :author='"ChatGPT"'
        :blockName='"stone"'
        :fontSize='"large"'
        />
    <div class="word-content">
      <p>
        As a community we strive to be peaceful. 
      </p>
      <p>
      - VOPPA
      </p>
    </div>


  </template>
  </Card>
  <!-- </div> -->
</template>

<style scoped>
::v-deep(.p-card-body) {
  padding: 0;
}
::v-deep(.responsive-image img) {
  width: 70%;
  margin: 0 auto;
}
.word-content {
  padding: 2em;
  text-align: left;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: larger;
  align-items: center;

}
.nav a {
  text-decoration: none;
  color: #333;
  padding: 0.5em;
  background-color: #aaa;
  margin: 0.5em;
  border-radius: 10px;
  transition: 0.1s ease-out;
}
.nav a:hover {
  transition: 0.1s ease-out;
  background-color: #ccc;
}
.heading {
  border-bottom: solid gray;
  border-width: 0.10em;
  text-align: left;
}

.flex-multiselect ::v-deep(.p-multiselect-label) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pin-wrapper {
  display: flex;
  justify-content: center;
}

</style>
