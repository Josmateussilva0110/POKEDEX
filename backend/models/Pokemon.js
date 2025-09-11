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


    async findPokemonByIdUser(user_id, pokemon_id) {
        try {
            const result = await knex.select("*").where({pokemon_id: pokemon_id}).andWhere({user_id: user_id}).table("pokemons_favorites")
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

    async findById(id) {
        try {
            var result = await knex.select(["user_id", "pokemon_id"]).where({pokemon_id: id}).table("pokemons_favorites")
            if(result.length > 0) {
                return result[0]
            }
            else {
                return undefined
            }
        } catch(err) {
            console.log('erro em buscar pokémon por id: ', err)
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

    async delete(pokemon_id) {
        try {
            await knex("pokemons_favorites").where({pokemon_id: pokemon_id}).del()
            return true
        } catch(err) {
            console.log('Erro ao retirar o pokemon dos favoritos.', err)
            return false
        }
    }
}

module.exports = new Pokemon()
