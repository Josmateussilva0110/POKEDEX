import { useState, useEffect } from "react"
import requestData from "../../../utils/requestApi"

function Home() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  // intervalo da geração de Sinnoh
  const startId = 387
  const endId = 493

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setLoading(true)
        const response = await requestData(
          "https://pokeapi.co/api/v2/pokemon",
          "GET",
          { limit: 1000, offset: 0 }
        )

        // filtra ids de Sinnoh
        const sinnohPokemons = response.data.results.filter((p) => {
          const id = parseInt(p.url.split("/")[6])
          return id >= startId && id <= endId
        })

        const detailedPokemons = await Promise.all(
          sinnohPokemons.map(async (p) => {
            const details = await requestData(p.url, "GET")
            return {
              id: details.data.id,
              name: details.data.name,
              types: details.data.types.map((t) => t.type.name),
              sprite: details.data.sprites.front_default, // normal
              animated: details.data.sprites.versions["generation-v"]["black-white"].animated.front_default // animado
            }
          })
        )

        console.log(detailedPokemons)

        setPokemon(detailedPokemons)
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
      <h1>Pokémons da Região de Sinnoh</h1>
      {loading ? (
        <p>Carregando os pokemons...</p>
      ) : (
        <ul>
          {pokemon.map((p) => (
            <li key={p.id}>
              <img
                src={p.animated || p.sprite}
                alt={p.name}
              />
              #{p.id} - {p.name}
              <br />
              Tipos: {p.types.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home
