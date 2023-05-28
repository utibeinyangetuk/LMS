<script setup>
	import { GetUsersStore } from '../../stores/GetUsers'
	import { BookCatalog } from '../../stores/catalog'
	import navbar from '../Navbar.vue'
	import tabWrapper from '../Tab.vue'
	const catalog = BookCatalog()
	const store = GetUsersStore()
	const active = store.activeUsers
	const CustomLinks = [
		{ name: 'Home', link: '/account' },
		{ name: 'dashboard', link: '/dashboard' },
	]
</script>

<template>
	<navbar :Links="CustomLinks" />
	<div class="container">
		<tabWrapper header="USERS" text="Active:" :value="active" routePath="Active-users" />
		<tabWrapper header="SETTINGS" routePath="settings" />
		<tabWrapper header="CATALOG" routePath="catalog" text="in stock" :value="catalog.Availablebooks" />
		<tabWrapper header="LOANS" routePath="loan-request" />
		<tabWrapper header="MESSAGES" routePath="admin-messages" />
		<tabWrapper header="MY ACCOUNT" routePath="profile" />
	</div>
</template>
<style scoped>
	.container {
		margin: 10px;
		margin-top: 20px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 10px;
		text-transform: capitalize;
	}
</style>
