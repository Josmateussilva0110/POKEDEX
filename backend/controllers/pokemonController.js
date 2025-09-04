const Pokemon = require("../models/Pokemon")
const validator = require('validator')

class PokemonController {

    async addFavorite(request, response) {
        const {user_id, pokemon_id} = request.body

        if (!validator.isInt(user_id + '', { min: 1 })) {
            return response.status(422).json({status: false, message: 'Usuário invalido.'})
        }

        if (!validator.isInt(pokemon_id + '', { min: 1 })) {
            return response.status(422).json({status: false, message: 'Pokemon invalido.'})
        }

        const pokemonExists = await Pokemon.pokemonExists(pokemon_id)
        if(pokemonExists) {
            return response.status(409).json({status: false, message: 'Pokemon já esta adicionado ao seus favoritos.'})
        }

        const valid = await Pokemon.save(user_id, pokemon_id)
        if(!valid) {
            return response.status(500).json({status: false, message: "Erro ao adicionar pokemon aos favoritos."})
        }
        return response.status(200).json({status: true, message: "Pokemon adicionado com sucesso."})
    }
}

module.exports = new PokemonController()
