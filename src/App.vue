<template>
  <div id="app">

    <div class="title">
      <h1>Pokédex</h1>
    </div>


    <div class="container">
      <div v-for="(value, index) in pokemons" :key="index">
        <Pokemon_home :name="value.name" :url="value.url" :index="index+1"/>
      </div>
    </div>
  </div>

</template>

<script>

import axios from 'axios'
import Pokemon_home from './components/Pokemon_home.vue'

export default {
  name: 'App',
  data() {
    return {
      pokemons: []
    }
  },


  created: function() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(data => {
      console.log("Pegou os pokemons")
      this.pokemons = data.data.results
    })
  },
  components: {
    Pokemon_home
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #1c2733;
  background-color: rgb(14, 13, 13);
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(295px, 1fr));
  max-width: 1100px; 
  margin: 0 auto;
  gap: 3rem;
  padding: 2rem;
}


.title {
  color: #f5e507;
  padding: 1rem;
  margin-bottom: 1.5rem;
}


</style>
