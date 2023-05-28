<template>
	<navbar />
	<searchbar :list="storeCatalog" />
	<div class="container">
		<h2>Currently in stock</h2>
		<table v-if="store.books.length > 0">
			<thead>
				<tr>
					<th>ID</th>
					<th>TITLE</th>
					<th>AUTHOR</th>
					<th>DESCRIPTION</th>
					<th>IN STOCK</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="book in store.books" :key="book.id">
					<td>{{ book.id }}</td>
					<td>
						<router-link :to="`/book-details/${book.id}`">{{ book.title }}</router-link>
					</td>
					<td>{{ book.author }}</td>
					<td>{{ book.description }}</td>
					<td>{{ book.in_stock }}</td>
				</tr>
			</tbody>
		</table>
		<div v-else>
			<p>No books available at the moment.</p>
		</div>
	</div>
</template>
<script setup>
	import { onMounted, watchEffect } from 'vue'
	import Navbar from '../../components/Navbar.vue'
	import searchbar from '../../components/Searchbar.vue'
	import { BookCatalog } from '../../stores/catalog'
	const store = BookCatalog()

	const storeCatalog = store.books

	onMounted(() => {
		store.fetchBooks()
	})

	watchEffect(() => {
		store.books
	})
</script>
<style scoped>
	.container {
		width: 100%;
		margin: 0 auto;
	}
	.container h2 {
		background-color: #232323;
		padding: 20px;
		color: #fdf5e5;
		letter-spacing: 1px;
		text-align: center;
		font-size: 150%;
		width: 95%;
		text-transform: uppercase;
		overflow: hidden;
		margin: 10px;
		border-radius: 5px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1em;
	}

	th,
	td {
		padding: 0.5em;
		border: 1px solid #ddd;
		text-align: left;
	}

	th {
		background-color: #fdf5e5;
	}

	.active {
		background-color: green;
		color: white;
	}

	.inactive {
		background-color: red;
		color: white;
	}
</style>
