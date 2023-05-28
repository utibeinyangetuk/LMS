<script setup>
	import axios from 'axios'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { useAuthenticationStore } from '../../stores/authentication'
	const store = useAuthenticationStore()
	const router = useRouter()
	const email = ref('')
	const password = ref('')
	const message = ref('')
	let messageType = ''
	let isValid = true
	const Login = async () => {
		isValid = true // reset isValid before checking again
		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			// check email validity
			isValid = false
			message.value = 'Please enter a valid email address'
			messageType = 'error'
		} else if (!password.value || password.value.length < 4) {
			// check password length
			isValid = false
			message.value = 'Password must be at least 4 characters long'
			messageType = 'error'
		}

		if (isValid) {
			const userData = { email: email.value, password: password.value }
			await axios
				.post('/api/login', userData)
				.then((res) => {
					if (res.data.success) {
						message.value = res.data.success
						messageType = 'success'
						// updates the states in the store
						store.is_Admin = res.data.user.is_Admin
						store.isLoggedin = true
						store.user = res.data.user
						// store the needed values in the session storage
						sessionStorage.setItem('isLoggedin', 'true')
						sessionStorage.setItem('is_Admin', store.is_Admin)
						sessionStorage.setItem('email', store.user.email)
						sessionStorage.setItem('userId', store.user.id)
						setTimeout(() => {
							router.push('/account')
						}, 2000)
					} else if (res.data.error) {
						message.value = res.data.error
						messageType = 'error'
						router.push('/login')
					}
				})
				.catch((e) => {
					return e
				})
		}
	}
</script>

<template>
	<div class="container">
		<div class="wrapper">
			<div :class="['message', messageType]">
				<p>{{ message }}</p>
			</div>
			<h1>Login to Your Account</h1>
			<form @submit.prevent.trim="Login">
				<input type="email" placeholder="email" v-model="email" />
				<input type="password" placeholder="password" v-model="password" />
				<button type="submit">login</button>
			</form>
		</div>
	</div>
</template>
<style scoped>
	@media only screen and (max-width: 600px) {
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-height: 100vh;
		}

		.wrapper {
			border: 1px solid;
			border-radius: 5px;
			padding: 20px;
			margin: 10px;
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		}

		.message {
			width: 100%;
			padding: 10px;
			margin-bottom: 10px;
			border-radius: 4px;
			text-align: center;
			letter-spacing: 1px;
			text-transform: lowercase;
		}

		.success {
			background-color: #4caf50;
			color: #fff;
		}

		.error {
			background-color: #f44336;
			color: #fff;
		}

		h1 {
			font-size: 24px;
			margin-bottom: 20px;
			text-align: center;
		}

		.container input {
			width: 100%;
			margin-bottom: 15px;
			padding: 15px;
			border-radius: 5px;
			border: 1px solid #838080;
		}

		.container input::placeholder {
			text-transform: capitalize;
			letter-spacing: 1px;
			font-size: 14px;
		}

		button {
			width: 100%;
			margin-top: 10px;
			padding: 13px;
			border-radius: 4px;
			border: none;
			background-color: #0077cc;
			color: #fff;
			cursor: pointer;
			letter-spacing: 1px;
			text-transform: uppercase;
			font-size: 20px;
			font-weight: bold;
		}
	}
</style>
