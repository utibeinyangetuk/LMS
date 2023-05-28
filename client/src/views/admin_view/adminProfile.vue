<template>
	<navbar :Links="navlinks" />
	<profile />
</template>
<script setup>
	import navbar from '../../components/Navbar.vue'
	import profile from '../../components/profile.vue'
	const navlinks = [
		{ name: 'Home', link: '/account' },
		{ name: 'Catalog', link: '/catalog' },
	]
</script>
