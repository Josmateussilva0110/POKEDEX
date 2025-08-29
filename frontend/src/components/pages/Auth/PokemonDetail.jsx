import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import requestData from "../../../utils/requestApi"

function PokemonDetail() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const {pokemon_id} = useParams()

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true)
        const response = await requestData(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`, 'GET', null)
        console.log(response)
        if(response.success) {
          setPokemon(response.data)
        }

      } catch(error) {
        console.error("Erro ao buscar pokemon:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemon()
  }, [])

  return (
    <div>
      <h1>Pokémons Detalhes</h1>
        <p>detalhes</p>
        {loading ? (
          <p>Carregando pokemon...</p>
        ): (
          <>
            <p>id: {pokemon_id}</p>
            <p>nome: {pokemon.name}</p>
          </>
        )}
    </div>
  )
}

export default PokemonDetail
