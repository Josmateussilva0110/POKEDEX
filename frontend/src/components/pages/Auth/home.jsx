import { useState, useEffect } from "react"
import requestData from "../../../utils/requestApi"
import styles from "./styles/Home.module.css"

function Home() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  const startId = 650
  const endId = 1100

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setLoading(true)
        const response = await requestData(
          "https://pokeapi.co/api/v2/pokemon",
          "GET",
          { limit: 1000, offset: 0 }
        )

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
              sprite: details.data.sprites.front_default,
              animated:
                details.data.sprites.front_default,
              types: details.data.types.map((t) => t.type.name),
            }
          })
        )
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
    <div className={styles.container}>
      <h1 className={styles.title}>Pokédex - Sinnoh Region</h1>

      {loading ? (
        <p>Carregando Pokémons...</p>
      ) : (
        <div className={styles.grid}>
          {pokemon.map((p) => (
            <div key={p.id} className={styles.card}>
              <img src={p.animated || p.sprite} alt={p.name} />
              <div className={styles.pokemonId}>#{p.id}</div>
              <div className={styles.pokemonName}>{p.name}</div>
              <div className={styles.types}>
                {p.types.map((type) => (
                  <span
                    key={type}
                    className={`${styles.type} ${styles[type]}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
