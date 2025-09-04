const knex = require("../database/connection")

class Pokemon {

    async pokemonExists(id) {
        try {
            const result = await knex.select("*").where({pokemon_id: id}).table("pokemons_favorites")
            if(result.length > 0) {
                return true
            }
            else {
                return false
            }
        } catch(err) {
            console.log('erro ao buscar pokemon', err)
            return false
        }
    }


    async save(user_id, pokemon_id) {
        try {
            await knex.insert({user_id, pokemon_id}).table("pokemons_favorites")
            return true
        } catch(err) {
            console.log('erro ao adicionar aos favoritos', err)
            return false
        }
    }
}

module.exports = new Pokemon()
