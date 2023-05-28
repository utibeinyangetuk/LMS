<script setup>
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { useAuthenticationStore } from '../stores/authentication'

	const props = defineProps({
		Links: {
			type: Array,
			required: true,
		},
	})

	const store = useAuthenticationStore()
	const isOpen = ref(false)
	const navbar = ref(null)

	const logout = () => store.logout()
	function handleClickOutside(event) {
		if (navbar.value && !navbar.value.contains(event.target)) {
			isOpen.value = false
		}
	}

	onMounted(() => {
		document.addEventListener('click', handleClickOutside)
	})
	onBeforeUnmount(() => {
		document.removeEventListener('click', handleClickOutside)
	})
</script>
<template>
	<nav ref="navbar">
		<div class="logo">
			<h1>BEEMO</h1>
		</div>
		<ul :class="{ open: isOpen }">
			<li v-for="(item, index) in Links" :key="index">
				<router-link :to="item.link">{{ item.name }}</router-link>
			</li>
			<li><button class="logout" @click="logout">Logout</button></li>
		</ul>
		<div class="hamburger" @click="isOpen = !isOpen">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</nav>
</template>
<style scoped>
	nav {
		background-color: #231f20;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	@media screen and (max-width: 600px) {
		nav {
			padding: 10px;
			color: #231f20;
			background-color: #fdf5e5;
			display: flex;
			border-bottom: 1px solid rgba(128, 128, 128, 0.198);
		}
		ul {
			border: 3px solid #231f20;
			background-color: #fdf5e5;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 63px;
			right: 0;
			transform: translateX(-100%);
			transition: transform 0.7s ease-in-out;
			text-transform: uppercase;
			letter-spacing: 1px;
		}

		li {
			margin: 20px;
			font-size: 20px;
			font-weight: bold;
		}
		a {
			color: gray;
		}
		a:hover {
			color: #f38069;
		}
		a.router-link-active {
			border-bottom: 1px solid;
			color: #f38069;
		}
		ul.open {
			transform: translate(0);
		}
		.hamburger {
			display: block;
			background-color: transparent;
			border: none;
			padding: 5px;
			cursor: pointer;
		}
		.hamburger span {
			display: block;
			background-color: #231f20;
			width: 30px;
			height: 5px;
			margin: 5px 0;
			border-radius: 5px;
		}
		.logout {
			background-color: #f44336;
			box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
			border: none;
			padding: 10px;
			color: #fff;
			font-weight: bold;
			border-radius: 5px;
			letter-spacing: 2px;
			font-size: 20px;
			text-transform: uppercase;
			cursor: pointer;
		}
	}
</style>
