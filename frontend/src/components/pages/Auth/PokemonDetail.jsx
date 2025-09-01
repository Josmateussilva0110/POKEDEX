import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import requestData from "../../../utils/requestApi"
import Image from "../../form/Image"

function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const { pokemon_id } = useParams()
  let total_stats = 0

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true)
        const response = await requestData(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`, 'GET', null)
        if (response.success) setPokemon(response.data)
      } catch (error) {
        console.error("Erro ao buscar pokemon:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemon()
  }, [pokemon_id])

  total_stats = pokemon?.stats?.reduce((acc, s) => acc + s.base_stat, 0) || 0

  const typeColors = {
    fire: "from-red-400 to-red-600",
    water: "from-blue-400 to-blue-600",
    grass: "from-green-400 to-green-600",
    electric: "from-yellow-300 to-yellow-500",
    poison: "from-purple-400 to-purple-600",
    normal: "from-gray-300 to-gray-500",
    flying: "from-indigo-300 to-indigo-500",
    bug: "from-lime-400 to-lime-600",
    fighting: "from-orange-500 to-orange-700",
    ground: "from-amber-400 to-amber-600",
    rock: "from-stone-400 to-stone-600",
    ghost: "from-violet-500 to-violet-700",
    ice: "from-cyan-200 to-cyan-400",
    dragon: "from-indigo-600 to-indigo-800",
    dark: "from-gray-700 to-gray-900",
    steel: "from-gray-400 to-gray-600",
    fairy: "from-pink-400 to-pink-600"
  }

  return (
    <div className="flex items-center justify-center p-1 bg-gradient-to-b from-gray-100 to-gray-300 h-screen">
      {loading ? (
        <p className="text-gray-600 text-base animate-pulse">Carregando Pokémon...</p>
      ) : (
        <div className="max-w-4xl w-full max-h-[95vh] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col lg:flex-row overflow-y-auto relative -translate-y-14">

          {/* Glow decorativo */}
          <div className="absolute inset-0 pointer-events-none">
            {pokemon.types?.map((type, idx) => (
              <span
                key={idx}
                className={`absolute top-0 left-0 w-full h-full rounded-2xl opacity-20 blur-2xl bg-gradient-to-r ${typeColors[type.type.name] || 'from-gray-400 to-gray-500'}`}
              />
            ))}
          </div>

          {/* Imagem */}
          <div className="flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 p-2 flex items-center justify-center relative z-5">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              size={140}
              className="transform hover:rotate-9 transition-transform duration-700"
            />
          </div>

          {/* Infos */}
          <div className="p-3 flex-1 relative z-10 overflow-y-auto max-h-[70vh]">
            <h2 className="text-2xl font-bold mb-1 capitalize text-gray-900">{pokemon.name}</h2>
            <p className="text-gray-500 mb-2 text-sm font-semibold">ID: #{pokemon_id}</p>

            {/* Tipos */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {pokemon.types?.map((type, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded-full font-semibold text-white text-xs capitalize bg-gradient-to-r ${typeColors[type.type.name] || 'from-gray-400 to-gray-500'}`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            {/* Status */}
            <div className="mb-3">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Status</h3>
              <ul className="space-y-1">
                {pokemon.stats?.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="capitalize text-gray-700 w-20 text-xs">{s.stat.name}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                        style={{ width: `${(s.base_stat / 255) * 100}%` }}
                      />
                    </div>
                    <span className="w-4 text-right font-medium text-gray-800 text-xs">{s.base_stat}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-bold text-gray-900 text-xs">Total: {total_stats}</p>
            </div>

            {/* Altura e Peso */}
            <div className="flex justify-between text-gray-700 font-medium text-xs mt-2">
              <p>Altura: {pokemon.height / 10} m</p>
              <p>Peso: {pokemon.weight / 10} kg</p>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default PokemonDetail
