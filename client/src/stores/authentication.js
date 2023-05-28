import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore('Authentication', {
	state: () => ({
		is_Admin: sessionStorage.getItem('is_Admin'),
		user: {},
		isLoggedin: false,
	}),
	getters: {},
	actions: {
		logout() {
			this.user = {}
			this.isLoggedin = false
			this.is_Admin = false
			sessionStorage.removeItem('is_admin')
			sessionStorage.clear()
		},
	},
})
