import { useEffect, useState, useContext } from "react"
import Input from "../../form/Input"
import Image from "../../form/Image"
import requestData from "../../../utils/requestApi"
import useFlashMessage from "../../../hooks/useFlashMessage"
import ImageUpload from "../../form/ImageUpload"
import { Context } from "../../../context/UserContext"
import styles from "../../pages/Auth/styles/Home.module.css"
import Colors from "../global_css/Colors.module.css"
import ConfirmModal from "../../form/ConfirmModal"

function Profile() {
  const { contextUser, updateUser } = useContext(Context)
  const [activeTab, setActiveTab] = useState("edit")
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pokemonsFavoritos, setPokemonsFavoritos] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const { setFlashMessage } = useFlashMessage()

  // Pega os dados do usuário da sessão
  useEffect(() => {
    console.log('context user: ', contextUser)
    if (contextUser) {
      setUser(contextUser)
    }
  }, [contextUser])

  // Pega os pokémons favoritos
  useEffect(() => {
    async function fetchFavorites() {
      if (!user?.id) return
      setLoading(true)
      const response = await requestData(`/pokemons/${user.id}`, 'GET', {}, true)
      if (response.success) {
        const ids = response.data.pokemons.map(p => p.pokemon_id)
        if (ids.length === 0) {
          setPokemonsFavoritos([])
          setLoading(false)
          return
        }

        // Buscar detalhes dos pokémons
        const responseAll = await requestData("https://pokeapi.co/api/v2/pokemon", "GET", { limit: 1000, offset: 0 })
        if (responseAll.success) {
          const favorites = responseAll.data.results.filter(p => ids.includes(parseInt(p.url.split("/")[6])))
          const detailedPokemons = await Promise.all(
            favorites.map(async (p) => {
              const details = await requestData(p.url, "GET")
              return {
                id: details.data.id,
                name: details.data.name,
                sprite: details.data.sprites.front_default,
                animated: details.data.sprites.front_default,
                types: details.data.types.map(t => t.type.name),
              }
            })
          )
          setPokemonsFavoritos(detailedPokemons)
        }
      } else {
        setFlashMessage(response.message, 'error')
      }
      setLoading(false)
    }

    fetchFavorites()
  }, [user])

  // Form handlers
  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  function onFileChange(event) {
    const file = event.target.files[0]
    setPreview(file)
    setUser(prev => ({ ...prev, [event.target.name]: file }))
  }

  async function submitForm(event) {
    event.preventDefault()
    if (!user?.id) return

    const response = await updateUser(user.id, user)
    if (response.success) {
      setFlashMessage(response.data.message, 'success')
    } else {
      setFlashMessage(response.message, 'error')
    }
  }

  // Remover pokémon favorito
  const handleFavoriteClick = (p) => {
    setSelectedPokemon(p)
    setModalOpen(true)
  }

  const removePokemon = async () => {
    if (!selectedPokemon || !user?.id) return
    const response = await requestData(`/pokemon/${selectedPokemon.id}`, 'DELETE', { user_id: user.id }, true)
    if (response.success) {
      setFlashMessage(response.data.message, 'success')
      setPokemonsFavoritos(prev => prev.filter(p => p.id !== selectedPokemon.id))
    } else {
      setFlashMessage(response.message, 'error')
    }
    setModalOpen(false)
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Perfil</h1>

        {/* Botões das abas */}
        <div className="flex gap-4 border-b mb-4">
          <button
            className={`pb-2 ${activeTab === "edit" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            onClick={() => setActiveTab("edit")}
          >
            Editar Dados
          </button>
          <button
            className={`pb-2 ${activeTab === "favorites" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            Pokémons Favoritos
          </button>
        </div>

        {/* Conteúdo das abas */}
        {activeTab === "edit" && (
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
            {(user.photo || preview) && (
              <div className="flex justify-center mb-6">
                <Image
                  src={preview ? URL.createObjectURL(preview) : `${import.meta.env.VITE_API_URL}/images/users/${user.photo}`}
                  alt={user.name}
                  size={100}
                />
              </div>
            )}
            <form onSubmit={submitForm} className="space-y-5">
              <Input text="Seu Nome" type="text" name="name" handleOnChange={handleChange} value={user.name || ""}/>
              <Input text="Seu Email" type="text" name="email" handleOnChange={handleChange} value={user.email || ""}/>
              <ImageUpload onFileChange={onFileChange} />
              <button type="submit" className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700">Editar</button>
            </form>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className={styles.container}>
            {loading ? (
              <p>Carregando Pokémons...</p>
            ) : pokemonsFavoritos.length === 0 ? (
              <p>Não há pokémons adicionados aos favoritos.</p>
            ) : (
              <div className={styles.grid}>
                {pokemonsFavoritos.map(p => (
                  <div key={p.id} className={styles.card} onClick={() => handleFavoriteClick(p)}>
                    <Image src={p.animated || p.sprite} alt={p.name} size={130}/>
                    <div className={styles.pokemonId}>#{p.id}</div>
                    <div className={styles.pokemonName}>{p.name}</div>
                    <div className={styles.types}>
                      {p.types.map(type => <span key={type} className={`${Colors.type} ${Colors[type]}`}>{type}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={removePokemon}
        title="Confirmar favorito"
        message={`Deseja retirar o pokemon ${selectedPokemon?.name} dos seus favoritos?`}
      />
    </>
  )
}

export default Profile
