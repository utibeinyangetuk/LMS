<template>
	<div v-if="book" class="container">
		<h2><strong>Title:</strong>{{ book.title }}</h2>
		<p><strong>Author:</strong> {{ book.author }}</p>
		<p><strong>Description:</strong> {{ book.description }}</p>
		<div class="buttons">
			<button class="preview" @click="previewBook">Preview</button>
			<button class="loan" @click="loanBook">Loan</button>
			<button class="reserve" @click="reserveBook">Reserve</button>
		</div>
	</div>
	<div v-else>Loading books...</div>
</template>

<script setup>
	import { computed, onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { useLoanstore } from '../../stores/Loanstore'
	import { BookCatalog } from '../../stores/catalog'
	const store = BookCatalog()
	const loanStore = useLoanstore()
	const route = useRoute()

	const book = computed(() => store.singleBook)

	onMounted(() => {
		store.bookData(route.params.id)
	})

	const previewBook = () => {
		console.log('Previewing book', book.value.id)
		// Do something here to preview the book
	}

	const loanBook = () => {
		const userId = sessionStorage.getItem('userId')
		const loanRequest = `user ${userId} wants to loan book ${book.value.id}`
		console.log(loanRequest)
		const requestId = loanStore.addloanRequest(loanRequest)
	}

	const reserveBook = () => {
		console.log('Reserving book', book.value.id)
		// Do something here to reserve the book
	}
</script>
