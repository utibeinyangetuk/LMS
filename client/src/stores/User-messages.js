import { defineStore } from 'pinia'

export const UserMessagesStore = defineStore('user-messages', {
	id: 'user-messages',
	state: () => ({
		messages: [
			{
				id: Date.now(),
				subject: 'Loan Overdue',
				body: 'Your loan is overdue. Please make a payment as soon as possible.',
				read: false,
			},
		],
	}),
	getters: {
		unreadMessages() {
			return this.messages.filter((m) => !m.read).length
		},
	},
	actions: {
		new_Message(message) {
			this.messages.push(message)
		},
		markAsRead(message) {
			message.read = true
		},
	},
})
