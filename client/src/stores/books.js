import { defineStore } from 'pinia'

export const bookStore = defineStore('books', {
	id: 'book',
	state: () => ({
		books: [
			{ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
			{ title: 'To Kill a Mockingbird', author: 'Harper Lee' },
			{ title: 'Pride and Prejudice', author: 'Jane Austen' },
			{ title: 'Introduction to industrial chemistry', author: 'mark Austen' },
		],
		Trendingbooks: [
			{ id: 1, title: 'Book 1', author: 'Author 1', reads: 100 },
			{ id: 2, title: 'Book 2', author: 'Author 2', reads: 120 },
			{ id: 3, title: 'Book 3', author: 'Author 3', reads: 30 },
			{ id: 4, title: 'Book 4', author: 'Author 4', reads: 410 },
			{ id: 5, title: 'Book 5', author: 'Author 5', reads: 500 },
			{ id: 6, title: 'Fluid Mechanics 1st Edition', author: 'swipa', reads: 720 },
		],
	}),

	getters: {
		getBookByIndex: (state) => (index) => {
			return state.books[index]
		},
	},
	actions: {
		addBook(book) {
			this.books.push(book)
		},
		removeBook(index) {
			this.books.splice(index, 1)
		},
	},
})
