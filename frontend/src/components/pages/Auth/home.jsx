import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import requestData from "../../../utils/requestApi"
import styles from "./styles/Home.module.css"
import Image from "../../form/Image"
import colors from "../global_css/Colors.module.css"

function Home() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const pokemonsPerPage = 20 // quantidade por página

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

        if(response.success) {
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
                animated: details.data.sprites.front_default,
                types: details.data.types.map((t) => t.type.name),
              }
            })
          )
          console.log(detailedPokemons)
          setPokemon(detailedPokemons)
        }
      } catch (error) {
        console.error("Erro ao buscar pokemons:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons()
  }, [])

  // calcular índices da página atual
  const indexOfLast = currentPage * pokemonsPerPage
  const indexOfFirst = indexOfLast - pokemonsPerPage
  const currentPokemons = pokemon.slice(indexOfFirst, indexOfLast)

  // quantidade de páginas
  const totalPages = Math.ceil(pokemon.length / pokemonsPerPage)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pokédex</h1>

      {loading ? (
        <p>Carregando Pokémons...</p>
      ) : (
        <>
          <div className={styles.grid}>
            {currentPokemons.map((p) => (
              <div key={p.id} className={styles.card} onClick={() => navigate(`pokemon/detail/${p.id}`)}>
                <Image src={p.animated || p.sprite} alt={p.name} size={130}/>
                <div className={styles.pokemonId}>#{p.id}</div>
                <div className={styles.pokemonName}>{p.name}</div>
                <div className={styles.types}>
                  {p.types.map((type) => (
                    <span
                      key={type}
                      className={`${colors.type} ${colors[type]}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* paginação */}
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀ Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Próxima ▶
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
