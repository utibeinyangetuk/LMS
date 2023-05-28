
exports.up = function (knex) {}
exports.up = async function (knex) {
	return await knex.schema.createTable('books', function (table) {
		table.increments('id').primary()
		table.string('title').notNullable()
		table.string('author').notNullable()
		table.text('description')
		table.integer('in_stock').notNullable()
		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())
	})
}

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists('books')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
