const bcrypt = require('bcryptjs')
exports.seed = async function (knex) {
	// Deletes all existing entries
	await knex('users').del()
	// inserts new entries
	await knex('users').insert([
		{
			id: 1,
			username: 'admin',
			email: 'admin@gmail.com',
			password: await bcrypt.hash('12345', 5),
			is_Admin: true,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 2,
			username: 'user',
			email: 'user@gmail.com',
			password: await bcrypt.hash('12345', 5),
			is_Admin: false,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
	])
}
