import { useState, useEffect } from "react"
import requestData from "../../../utils/requestApi"

function PokemonDetail() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const pokemonId = 25 // Sinnoh

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setLoading(true)
        const response = await requestData(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
          "GET",
          null
        )
        console.log(response.data)
        setPokemon(response.data)
      } catch (error) {
        console.error("Erro ao buscar pokemons:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [])

  return (
    <div>
      <h1>Pokémons Detalhes</h1>
      {loading ? (
        <p>Carregando os pokemons...</p>
      ) : (
        <ul>
          {pokemon.map((p) => (
            <li key={p.id}>{p.species.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PokemonDetail
