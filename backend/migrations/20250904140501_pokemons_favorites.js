const up = function(knex) {
  return knex.schema.createTable('pokemons_favorites', function(table) {
    table.increments('id')
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    table.integer('pokemon_id').notNullable()
    table.timestamps(true, true) // created_at e updated_at automáticos
  })
};


const down = function(knex) {
  return knex.schema.dropTable('pokemons_favorites')
}

module.exports = {
  up,
  down
}
