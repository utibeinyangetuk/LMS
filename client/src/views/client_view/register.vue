<script setup>
	import axios from 'axios'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	const router = useRouter()
	const username = ref('')
	const email = ref('')
	const password = ref('')
	const is_Admin = ref(false)
	const message = ref('')
	let messageType = ''
	let isValid = true
	const Register = async () => {
		isValid = true
		if (!username.value) {
			isValid = false
			message.value = 'username cannot be empty'
			messageType = 'error'
		} else if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			isValid = false
			message.value = 'Email is not valid'
			messageType = 'error'
		} else if (!password.value || password.value.length < 4) {
			// check password length
			isValid = false
			message.value = 'Password must be at least 4 characters long'
			messageType = 'error'
		}

		if (isValid) {
			const userData = {
				username: username.value,
				email: email.value,
				password: password.value,
				is_Admin: is_Admin.value,
			}
			await axios
				.post('/api/register', userData)
				.then((res) => {
					if (res.data.success) {
						message.value = res.data.success
						messageType = 'success'
						setTimeout(() => {
							router.push('/login')
						}, 2000)
					} else if (res.data.error) {
						message.value = res.data.error
						messageType = 'error'
					}
				})
				.catch((e) => {
					console.log(e)
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
			<h1>Create Your Account</h1>
			<form @submit.prevent.trim="Register">
				<input type="text" placeholder="username" v-model="username" />
				<input type="email" placeholder="email" v-model="email" />
				<input type="password" placeholder="password" v-model="password" />
				<button type="submit">create account</button>
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
			border-radius: 5px;
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
			text-align: center;
			margin-bottom: 10px;
			margin-top: 10px;
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
			padding: 13px;
			font-size: 18px;
			border: none;
			background-color: #0077cc;
			border-radius: 5px;
			color: #fff;
			cursor: pointer;
			letter-spacing: 1px;
			text-transform: uppercase;
			font-weight: bold;
		}
	}
</style>
