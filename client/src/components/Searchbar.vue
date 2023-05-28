<template>
	<div>
		<input type="text" v-model="searchQuery" placeholder="Search for a material that interests you..." />
		<ul v-if="showResults && hasResults">
			<li v-for="book in filteredBooks" :key="book.id">{{ book.title }}</li>
		</ul>
		<p v-else-if="showResults && !hasResults">No search results found.</p>
	</div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { BookCatalog } from '../stores/catalog';

const store = BookCatalog();
const searchQuery = ref('');
const searchResults = ref(store.books);
const showResults = ref(false);

watch(searchQuery, () => {
	searchResults.value = store.books.filter((book) => {
		const query = searchQuery.value.toLowerCase();
		return book.title.toLowerCase().includes(query);
	});
	showResults.value = searchQuery.value.trim().length > 0;
});

const filteredBooks = computed(() => { return searchResults.value; });
const hasResults = computed(() => { return filteredBooks.value.length > 0; });


</script>

<style scoped>
@media screen and (max-width: 600px) {
	div {
		margin: 5px;
	}

	div > input {
		width: 100%;
		padding: 20px;
		border: 5px solid;
		border-radius: 5px;
	}

	div > input::placeholder {
		font-size: 15px;
		letter-spacing: 1px;
	}

	ul {
		border: 1px solid;
		border-radius: 5px;
		margin: 5px;
		padding: 10px;
		width: 98%;
	}

	li {
		border: 1px solid;
		padding: 3px;
		border-radius: 3px;
		margin-bottom: 5px;
	}

	li:hover {
		background-color: rgba(172, 255, 47, 0.635);
	}

	p {
		border: 3px solid;
		border-radius: 5px;
		margin-top: 5px;
		padding: 5px;
		font-weight: bold;
		letter-spacing: 1px;
		text-transform: uppercase;
		text-align: center;
		background-color: rgba(255, 0, 0, 0.336);
	}
}
</style>
