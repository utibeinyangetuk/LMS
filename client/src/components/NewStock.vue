<template>
	<div>
		<ul>
			<slot v-for="(book, index) in books" :book="book" :index="index" :key="index">
				<li>{{ book }}</li>
			</slot>
		</ul>
	</div>
</template>

<script setup>
	import { bookStore } from '../stores/books'
	const store = bookStore()
	const books = store.books
</script>
