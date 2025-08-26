import { useState, useEffect } from "react"
import requestData from "../../../utils/requestApi"

function PokemonDetail() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  return (
    <div>
      <h1>Pokémons Detalhes</h1>
        <p>detalhes</p>
    </div>
  )
}

export default PokemonDetail
