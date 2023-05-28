import axios from 'axios'
import { defineStore } from 'pinia'

export const BookCatalog = defineStore('BookCatalog', {
	id: 'BookCatalog',
	state: () => ({
		books: [],
		lastFetched: null,
		singleBook: null,
	}),

	getters: {
		Availablebooks() {
			return this.books.length
		},
	},
	actions: {
		async fetchBooks() {
			// caching the data for 5 minute
			if (!this.books.length || this.lastFetched < Date.now() - 5 * 60 * 1000) {
				const { data } = await axios.get('/api/books')
				this.books = data
				this.lastFetched = Date.now()
			}
		},
		async bookData(bookId) {
			try {
				const response = await axios.get(`/api/books/${bookId}`)
				this.singleBook = response.data
			} catch (error) {
				console.log(error)
			}
		},
	},
})
