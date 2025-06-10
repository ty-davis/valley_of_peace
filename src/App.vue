<script setup lang="ts">
  import { onMounted } from 'vue'

  import Quote from './components/Quote.vue';
  import Palette from './components/Palette.vue';
  import ServerInfo from './components/ServerInfo.vue';


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
    <ServerInfo/>
    <div>
      <Image src="assets/valley2.png" width="100%" preview/>
    </div>
    <nav>
      <div class="nav">
        <a href="#vision">Vision</a>
        <a href="#palette">Palette</a>
        <a href="#inspo">Inspo</a>
        <a href="#voppa">VOPPA</a>
      </div>
    </nav>
    
    <Quote
        :text='"Power is overrated, especially when no one there to compete with you"'
        :author='"Sun Tzu"'/>


    <div class="word-content">
      <h2 id="vision" class="heading">Vision</h2>
      <Image src="assets/snvop.JPEG" class="responsive-image" style="" preview/>

      <h2 id="palette" class="heading">Palette</h2>
      <Palette/>

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
.responsive-image {
  box-shadow: lightgray 0px 0px 10px 0px;
  border-radius: 10px;
  @media (prefers-color-scheme: dark) {
    box-shadow: #444 0px 0px 10px 0px;
  }

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

.pin-wrapper {
  display: flex;
  justify-content: center;
}

</style>
