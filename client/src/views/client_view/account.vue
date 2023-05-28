<template>
	<div v-if="store.isLoggedin">
		<div v-if="isAdmin">
			<adminPage />
		</div>
		<div v-else>
			<userPage />
		</div>
	</div>
</template>

<script setup>
	import { watchEffect } from 'vue'
	import { useRouter } from 'vue-router'
	import adminPage from '../../components/pages/admin.vue'
	import userPage from '../../components/pages/user.vue'
	import { useAuthenticationStore } from '../../stores/authentication'

	const store = useAuthenticationStore()
	const router = useRouter()

	let isAdmin = false // add this line

	if (sessionStorage.getItem('isLoggedin')) {
		store.isLoggedin = sessionStorage.getItem('isLoggedin') === 'true'
		store.user.email = sessionStorage.getItem('email')
		isAdmin = sessionStorage.getItem('is_Admin') === 'true'
	}

	watchEffect(() => {
		sessionStorage.setItem('isLoggedin', store.isLoggedin.toString())
		sessionStorage.setItem('email', store.user.email)
		if (!store.isLoggedin) {
			router.push('/login')
		}
	})
</script>
