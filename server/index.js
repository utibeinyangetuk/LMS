const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const app = express()
dotenv.config()
const port = process.env.PORT

// middlewares
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(
	session({
		secret: 'my-secret-key',
		resave: false,
		saveUninitialized: false,
	})
)
app.use(passport.initialize())
app.use(passport.session())

const knex = require('knex')({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},
})

// setting up passport strategy
passport.use(
	new localStrategy({ usernameField: 'email' }, (email, password, done) => {
		knex('users')
			.where({ email })
			.first()
			.then((user) => {
				if (!user) {
					return done(null, false, { error: 'Email does not exist' })
				}
				bcrypt.compare(password, user.password, (error, result) => {
					if (error) {
						return done(error)
					}
					if (!result) {
						return done(null, false, { error: 'Incorrect email or password' })
					}
					return done(null, user)
				})
			})
			.catch((e) => {
				done(e)
			})
	})
)
passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	knex('users')
		.where({ id })
		.first()
		.then((user) => {
			done(null, user)
		})
		.catch((error) => {
			done(error)
		})
})

app.post('/api/register', async (req, res) => {
	const { username, email, password, is_Admin } = req.body

	try {
		const user = await knex('users').select('*').where({ email }).first()
		if (user) {
			res.json({ error: 'Email already exist' })
		} else {
			const hashedPassword = await bcrypt.hash(password, 10)
			await knex('users')
				.insert({ username, email, password: hashedPassword, is_Admin })
				.then(() => {
					console.log(req.body)
					res.status(201).json({ success: 'Account created successfully' })
				})
		}
	} catch (error) {
		res.json({ error: 'An error has occured in the server' })
		console.log(error)
	}
})

app.post('/api/login', async (req, res, next) => {
	passport.authenticate('local', (err, user) => {
		if (err) {
			return next(err)
		}
		// throw error if credentials are wrong
		if (!user) {
			console.log('Incorrect email or password')
			res.json({ error: 'Incorrect email or password ' })
		} else {
			req.login(user, (err) => {
				if (err) {
					return next(err)
				}
				res.json({ success: 'Login successful', user: user })
			})
		}
	})(req, res, next)
})

app.post('/api/logout', (req, res) => {
	req.logout() //clears the active session
	res.json({ success: 'You have just been logged out' })
})

// Get all the users
app.get('/api/users', async (req, res) => {
	const users = await knex('users').select('*')
	res.send(users)
})

// get the current user
app.get('/api/user', async (req, res) => {
	const userId = req.user.id
	const userData = await knex('users').where({ id: userId }).first()
	res.json(userData)
})

// update user password
app.post('/api/user/:id/updatepassword', async (req, res) => {
	const { id } = req.params
	const { Oldpassword, Newpassword } = req.body
	try {
		// retrieve the user from  the database
		const user = await knex('users').where({ id: id }).first()
		console.log(user)
		console.log(req.body)
		// check if the user exists
		if (!user) {
			console.log('user not found')
		}
		// compare the stored password with the one the user wants to change
		const passwordMatch = await bcrypt.compare(Oldpassword, user.password)
		if (!passwordMatch) {
			console.log('incorrect password')
		} else {
			const hashedPassword = await bcrypt.hash(Newpassword, 10)
			// update the user's password in the database
			await knex('users').where('id', id).update('password', hashedPassword)
			// return a success message
			return res.send({ success: 'password update successful' })
		}
	} catch (error) {
		console.log(error)
		return res.send({ error: 'Failed to update password' })
	}
})

// delete a user's account
app.delete('/api/deleteuser/:id', async (req, res) => {
	const userId = req.params.id
	try {
		await knex('users').where({ id: userId }).del()
		res.json({ success: 'Account deleted successfully' })
		console.log('Account deleted successfully')
	} catch (error) {
		console.log(error)
	}
})

// get all books
app.get('/api/books', async (req, res) => {
	const books = await knex('books').select('*')
	res.send(books)
})

// Define route to get a book by ID
app.get('/api/books/:id', (req, res) => {
	const id = req.params.id
	// Use Knex.js to query the database for the book with the given ID
	knex('books')
		.where('id', id)
		.first()
		.then((book) => {
			if (!book) {
				// If no book is found, return a 404 error
				return res.status(404).json({
					error: {
						message: `Book with ID ${id} not found`,
					},
				})
			}
			// If the book is found, return it as JSON
			res.json(book)
		})
		.catch((error) => {
			// If there is an error, return a 500 error
			console.log(error)
			res.status(500).json({
				error: {
					message: 'Internal server error',
				},
			})
		})
})

app.listen(port, () => console.log(`Server running on port ${port}!`))
