<script setup>
	import navbar from '../../components/Navbar.vue'
	import { UserMessagesStore } from '../../stores/User-messages'
	const store = UserMessagesStore()
	const messages = store.messages
	const numUnread = store.unreadMessages
</script>
<template>
	<navbar />
	<h1>My Messages ({{ numUnread }} unread)</h1>
	<ul>
		<li v-for="message in messages" :key="message.id">
			<div v-if="!message.read" style="font-weight: bold">{{ message.subject }}</div>
			<div v-else>{{ message.subject }}</div>
			<div>{{ message.body }}</div>
		</li>
	</ul>
</template>
