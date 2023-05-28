<script setup>
	import { UserMessagesStore } from '../../stores/User-messages'
	import navbar from '../Navbar.vue'
	import NewSlot from '../NewStock.vue'
	import searchbar from '../Searchbar.vue'
	import squareTab from '../Tab.vue'
	import Trendingbooks from '../Trendingbooks.vue'
	import { BookCatalog } from '../../stores/catalog'
	const store = UserMessagesStore()
	const numUnread = store.unreadMessages
	const Catalogstore = BookCatalog()

	const userLinks = [
		{ name: 'Home', link: '/account' },
		{ name: 'About', link: '/about' },
		{ name: 'News', link: '/news' },
		{ name: 'Account', link: '/profile' },
	]
</script>

<template>
	<navbar :Links="userLinks" />
	<searchbar />
	<div class="container">
		<div class="grid">
			<squareTab header="LOANS /  RESERVATIONS" routePath="loans" />
			<squareTab header="CATALOG" text="In Stock:" :value="Catalogstore.Availablebooks" routePath="catalog" />
			<squareTab header="MY ACCOUNT" routePath="profile" />
			<squareTab header="MESSAGES" text="Unread:" :value="numUnread" routePath="user-message" />
		</div>
	</div>
	<section class="trending">
		<h1 class="marquee">New in stock</h1>
		<div class="new-arrival">
			<NewSlot>
				<template v-slot="{ book }">
					<li>{{ book.title }} by {{ book.author }}</li>
				</template>
			</NewSlot>
		</div>
	</section>
	<div class="trending-2">
		<h1 class="marquee">Trending books</h1>
		<div class="new-arrival">
			<Trendingbooks />
		</div>
	</div>
</template>
<style scoped>
	@media screen and (max-width: 600px) {
		.container {
			display: flex;
			justify-content: center;
			padding-bottom: 10px;
		}

		.grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 4px;
		}

		.marquee {
			background-color: #232323;
			padding: 20px;
			color: #fdf5e5;
			letter-spacing: 5px;
			text-align: center;
			font-size: 2em;
			width: 95%;
			text-transform: capitalize;
			overflow: hidden;
			font-family: cursive;
			margin: 10px;
			border-radius: 5px;
		}

		.new-arrival {
			border: 1px solid;
			margin: 10px;
			margin-top: -8px;
			border-radius: 5px;
			padding: 15px;
			background-color: #232323;
			color: #fdf5e5;
		}

		.new-arrival li {
			border: 1px solid;
			list-style: number;
			padding: 10px;
			border-radius: 5px;
			margin-bottom: 5px;
			margin-left: 6px;
			text-transform: capitalize;
		}
	}
</style>
