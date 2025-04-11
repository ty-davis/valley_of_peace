<script setup lang="ts">
import { ref } from 'vue';

import HelloWorld from './components/HelloWorld.vue';
import Quote from './components/Quote.vue';
import BlockPic from './components/BlockPic.vue';

import { blocks } from './data/blocks';

const selectedBlocks = ref(['cherry_planks', 'bedrock']);


</script>

<template>
  <div class="main-content">
    <h1 style="margin-bottom: 10px;">The Valley of Peace</h1>
    <span style="margin-bottom: 30px; display: block;">Welcome to the Soverign Nation of the Valley of Peace</span>
    <div>
      <Image src="src/assets/valley.PNG" width="100%" preview/>
    </div>
    <nav>
      <div class="nav">
        <a href="#vision">Vision</a>
        <a href="#palette">Pallete</a>
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

      <div style="margin: 10px;">
        <MultiSelect
            v-model="selectedBlocks"
            :options="blocks"
            :filter="true"
            display="chip"
            showClear
            placeholder="Select Blocks"
            class="flex-multiselect"
            />
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


  </div>
</template>

<style scoped>
.main-content {
  background-color: white;
  border-radius: 10px;
  padding-top: 0.5em;
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
  align-items: baseline;

}
.nav a {
  text-decoration: none;
  color: gray;
  padding: 0.5em;
  background-color: #cacaca;
  margin: 0.5em;
  border-radius: 10px;
  transition: 0.1s ease-out;
}
.nav a:hover {
  transition: 0.1s ease-out;
  font-size: x-large;
}
.heading {
  text-align: left;
}

.flex-multiselect ::v-deep(.p-multiselect-label) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

</style>
