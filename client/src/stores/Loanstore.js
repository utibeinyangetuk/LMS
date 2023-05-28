import { defineStore } from 'pinia'

export const useLoanstore = defineStore('Loanstore', {
	state: () => ({
		loanRequests: [],
	}),
	getters: {
		getloanRequests() {
			return this.loanRequests
		},
	},
	actions: {
		addloanRequest(request) {
			const loanRequest = {
				id: this.loanRequests.length + 1,
				request,
				approved: false,
			}
			this.loanRequests.push(loanRequest)
			return loanRequest.id
		},
		approveloanRequest(requestId) {
			const request = this.loanRequests.find((req) => req.id === requestId)
			if (request) {
				request.approved = true
				return true
			}
			return false
		},
		rejectloanRequest(requestId) {
			const index = this.loanRequests.findIndex((req) => req.id === requestId)
			if (index !== -1) {
				this.loanRequests.splice(index, 1)
				return true
			}
			return false
		},
	},
})
