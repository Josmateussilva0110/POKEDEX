import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import requestData from "../../../utils/requestApi"
import Image from "../../form/Image"
import colors from "../global_css/Colors.module.css"

function PokemonDetail() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const {pokemon_id} = useParams()
  let total_stats = 0

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true)
        const response = await requestData(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`, 'GET', null)
        console.log(response.data)
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

    total_stats = pokemon.stats 
      ? pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0) 
        : 0;

  return (
    <div>
      <h1>Pokémons Detalhes</h1>
        <p>detalhes</p>
        {loading ? (
          <p>Carregando pokemon...</p>
        ): (
          <>
            <Image src={pokemon.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default} alt={pokemon.name} size={200}></Image>
            <p>id: {pokemon_id}</p>
            <p>nome: {pokemon.name}</p>
            <div className={colors.types}>
              {pokemon.types && pokemon.types.map((type, index) => (
                <span key={index} className={`${colors.type} ${colors[type.type.name]}`}>
                  {type.type.name}{" "}
                </span> 
              ))}
            </div>

            <div>
            <h2>Status</h2>
            <ul>
              {pokemon.stats && pokemon.stats.map((s, index) => (
                <li key={index}>
                  {s.stat.name}: {s.base_stat}
                </li>
              ))}
            </ul>
          </div>
          <p>Total: {total_stats}</p>
          <p>Altura: {pokemon.height / 10} m</p>
          <p>Peso: {pokemon.weight / 10} kg</p>
          </>
        )}
    </div>
  )
}

export default PokemonDetail
