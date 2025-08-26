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

        // filtra apenas os que estão entre 387 e 493
        const sinnohPokemons = response.data.results.filter((p) => {
          const id = parseInt(p.url.split("/")[6])
          return id >= startId && id <= endId
        })

        setPokemon(sinnohPokemons)
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
          {pokemon.map((p) => {
            const id = p.url.split("/")[6]
            return (
              <li key={id}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={p.name}
                />
                #{id} - {p.name} - {p.url}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Home
