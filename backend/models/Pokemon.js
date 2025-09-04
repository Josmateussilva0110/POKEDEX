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

    async getPokemonsIds(user_id) {
        try {
            const result = await knex.select("pokemon_id").where({user_id}).table("pokemons_favorites")
            if(result.length > 0) {
                return result
            }
            else {
                return undefined
            }
        } catch(err) {
            console.log('erro ao buscar ids de pokemons', err)
            return undefined
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
