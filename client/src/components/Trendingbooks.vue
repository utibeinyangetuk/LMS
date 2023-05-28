<script setup>
	import { ref, onMounted, computed } from 'vue'
	import { bookStore } from '../stores/books'
	const store = bookStore()
	const books = store.Trendingbooks
	const shuffledBooks = ref([])
	const shuffleBooks = () => {
		shuffledBooks.value = books.sort(() => Math.random() - 0.5)
	}

	const mostReadBooks = computed(() => {
		return books.sort((a, b) => b.reads - a.reads)
	})

	onMounted(() => {
		setInterval(shuffleBooks, 3000)
	})
</script>

<template>
	<transition-group name="book-list" tag="ul" mode="out-in">
		<li
			v-for="(book, index) in shuffledBooks"
			:key="book.id"
			:class="[{ 'first-item': index === 0 }, { 'last-item': index === shuffledBooks.length - 1 }]"
		>
			<b>{{ book.title }}</b> by <b>{{ book.author }}</b> with {{ book.reads }} reads.
		</li>
	</transition-group>
</template>

<style scoped>
	li {
		transition: background-color 1s ease-in-out, transform 1s ease-in-out;
		border: 1px solid #fdf5e5;
		padding: 10px;
		border-radius: 5px;
		margin-bottom: 7px;
		list-style: number;
		margin-left: 5px;
	}

	.first-item {
		background-color: green;
		transition-delay: 0.5s;
	}

	.last-item {
		background-color: red;
		transition-delay: 0.5s;
	}

	li:not(.first-item):not(.last-item) {
		background-color: #4caf4f72;
		transition-delay: 0.2s;
	}

	/* Hover state */
	.book-list li:hover {
		background-color: #4caf50;
	}

	/* Enter animation */
	.book-list-enter-active {
		transition: transform 1s ease-in-out, background-color 1.5s ease-in-out;
	}

	.book-list-enter {
		transform: translateX(-100%);
		opacity: 0;
		background-color: #8bc34a;
	}

	/* Leave animation */
	.book-list-leave-active {
		transition: transform 1s ease-in-out, background-color 1s ease-in-out;
	}

	.book-list-leave-to {
		transform: translateX(100%);
		opacity: 0;
		background-color: #ff5722;
	}

	/* Move animation */
	.book-list-move {
		transition: transform 1.5s ease-in-out;
	}
</style>
