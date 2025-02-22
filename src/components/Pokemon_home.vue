<template>
  <div class="card">
    <img :src="this.currentImg" alt="Imagem do Pokémon" class="pokemon-image" />
    <div class="card-content">
      <p class="pokemon-name">{{ formatUpper(name) }}</p>
      <p class="pokemon-types">{{ pokemon.types }}</p>
      <span class="pokemon-index">#{{ index }}</span>
      <button class="btn" @click="changeImage">Alternar Imagem</button>
    </div>
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
       
        this.pokemon.statics = value.data.stats.map(s => s.stat.name + ": " + s.base_stat).join(", ")
        this.pokemon.sprite_front = value.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default
        this.pokemon.sprite_shiny = value.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_shiny
        this.currentImg = this.pokemon.sprite_front
      })
      .catch(error => {
        console.error("Erro ao buscar os dados do Pokémon:", error)
        this.pokemon.types = "Erro ao carregar"
      })
  },

  data() {
    return {
      isFront: true,
      currentImg: '',
      pokemon: {
        types: '',
        games: '',
        statics: '',
        sprite_front: '',
        sprite_shiny: ''
      }
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
    },

    changeImage() {
      if(this.isFront) {
        this.isFront = false
        this.currentImg = this.pokemon.sprite_shiny
      }
      else {
        this.isFront = true
        this.currentImg = this.pokemon.sprite_front
      }
    }
  }
}
</script>

<style scoped>
.card {
  background: linear-gradient(120deg, #e2c9c9, #c40b0b);
  border-radius: 1rem;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  width: 18rem;
  margin: 1rem;
  position: relative;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.pokemon-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  background: #ffffff;
  border-radius: 50%;
  padding: 0.8rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-content {
  margin-top: 0.5rem;
}

.pokemon-name {
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  text-transform: capitalize;
  margin-top: 2rem;
}

.pokemon-types {
  color: #f1f1f1;
  font-size: 1rem;
  margin: 5px 0;
}

.pokemon-index {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #fff;
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  opacity: 1;
}

.btn {
  background: #b91313;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.3s ease-in-out;
}

.btn:hover {
  background: #680404;
  transform: scale(1.07);
}

</style>
