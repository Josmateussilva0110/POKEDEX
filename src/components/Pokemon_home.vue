<template>
  <div>
    <p> {{ index }} - {{ formatUpper(name) }}</p>
    <small>{{ url }}</small>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  created() {
    axios.get(this.url).then(value => {
        if (value.data.types && value.data.types.length > 0) {
          this.pokemon.types = value.data.types.map(t => t.type.name).join(" / ")
        } else {
          this.pokemon.types = "Desconhecido"
        }
        this.pokemon.games = value.data.game_indices.map(g => g.version.name).join(", ")
        this.pokemon.statics = value.data.stats.map(s => s.stat.name + ": " + s.base_stat).join(", ")
        this.pokemon.sprite_front = value.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default
        this.pokemon.sprite_shiny = value.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_shiny

        console.log(this.pokemon)
        //console.log(value)
      })
      .catch(error => {
        console.error("Erro ao buscar os dados do Pokémon:", error)
        this.pokemon.types = "Erro ao carregar"
      })
  },


  data() {
    return {
      pokemon: {}
    }
  },


  props: {
    index: Number,
    name: String,
    url: String
  },


  methods: {
    formatUpper(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
