<template>
	<!-- TODO: FIll in links for the navbar and also add the option to edit and delete users -->
	<navbar />
	<div class="container">
		<h2>Registered Users</h2>
		<table v-if="store.users.length > 0">
			<thead>
				<tr>
					<th>ID</th>
					<th>Username</th>
					<th>Email</th>
					<th>Admin</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in store.users" :key="user.id">
					<td>{{ user.id }}</td>
					<td>{{ user.username }}</td>
					<td>{{ user.email }}</td>
					<td :class="{ active: user.is_Admin, inactive: !user.is_Admin }">
						{{ user.is_Admin ? 'True' : 'False' }}
					</td>
				</tr>
			</tbody>
		</table>
		<div v-else>
			<p>No users found.</p>
		</div>
	</div>
</template>
<script setup>
	import { onMounted, watchEffect } from 'vue'
	import { GetUsersStore } from '../../stores/GetUsers'
	import navbar from '../../components/Navbar.vue'
	const store = GetUsersStore()
	const users = store.users

	onMounted(() => {
		store.fetchUsers()
	})
	watchEffect(() => {
		// re-render the component when the users state changes
		store.users
		console.log(users)
	})
</script>
<style scoped>
	.container {
		max-width: 800px;
		margin: 0 auto;
	}
	.container h2 {
		background-color: #232323;
		padding: 20px;
		color: #fdf5e5;
		letter-spacing: 1px;
		text-align: center;
		font-size: 2em;
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
