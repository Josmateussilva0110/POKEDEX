import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Star, StarOff } from "lucide-react"
import requestData from "../../../utils/requestApi"
import styles from "./styles/Home.module.css"
import Image from "../../form/Image"
import colors from "../global_css/Colors.module.css"
import ConfirmModal from "../../form/ConfirmModal"
import useFlashMessage from "../../../hooks/useFlashMessage"

function Home() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState([])
  const [token] = useState(() => JSON.parse(localStorage.getItem('token')))
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')))
  const { setFlashMessage } = useFlashMessage()

  // modal
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const navigate = useNavigate()
  const pokemonsPerPage = 20 

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

  // abrir modal para confirmar favorito
  const handleFavoriteClick = (p) => {
    setSelectedPokemon(p)
    setModalOpen(true)
  }

  // confirmar favorito (chama backend aqui)
  const confirmFavorite = async () => {
    const formData = {}
    formData.pokemon_id = selectedPokemon.id
    formData.user_id = user.id
    if (selectedPokemon) {
        // exemplo de chamada para o backend
        const response = await requestData(
          "/pokemon", 
          "POST", 
          formData,
          token
        )
        if(response.success) {
          setFlashMessage(response.data.message, 'success')
        }
        else {
          setFlashMessage(response.message, 'error')
        }
        //console.log(response.data)
        // atualiza localmente
        setFavorites((prev) => [...prev, selectedPokemon.id])
    }
    setModalOpen(false)
  }

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
              <div 
                key={p.id} 
                className={styles.card} 
                onClick={() => navigate(`pokemon/detail/${p.id}`)}
              >
                {/* Estrela de favoritos */}
                <div
                  className={styles.favoriteIcon}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleFavoriteClick(p)
                  }}
                >
                  {favorites.includes(p.id) ? (
                    <Star className={styles.starFilled} />
                  ) : (
                    <StarOff className={styles.starEmpty} />
                  )}
                </div>

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

      {/* Modal de confirmação */}
      <ConfirmModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmFavorite}
        title="Confirmar favorito"
        message={`Deseja adicionar ${selectedPokemon?.name} aos seus favoritos?`}
      />
    </div>
  )
}

export default Home
