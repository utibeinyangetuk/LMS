import axios from 'axios'
import { defineStore } from 'pinia'
export const GetUsersStore = defineStore('GetUsers', {
	state: () => ({
		users: [],
		lastFetched: null,
	}),
	getters: {
		activeUsers() {
			return this.users.length
		},
	},
	actions: {
		async fetchUsers() {
			// Fetch the data only if the store is empty or if the data is stale (older than 5 minutes)
			if (!this.users.length || this.lastFetched < Date.now() - 5 * 60 * 1000) {
				const { data } = await axios.get('/api/users')
				this.users = data
				this.lastFetched = Date.now()
			}
		},
	},
})
