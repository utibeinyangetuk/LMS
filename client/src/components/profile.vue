<script setup>
	import axios from 'axios'
	import { onMounted, ref } from 'vue'
	import { useRouter } from 'vue-router'
	import Dialog from '../components/dialog.vue'

	const router = useRouter()
	const user = ref({})
	const username = ref('')
	const greeting = ref('')
	const Oldpassword = ref('')
	const Newpassword = ref('')
	const showDialog = ref(false)

	// get hours function block
	const time0fday = new Date().getHours()
	if (time0fday >= 0 && time0fday <= 11) {
		greeting.value = 'Good morning'
	} else if (time0fday >= 12 && time0fday <= 17) {
		greeting.value = 'Good afternoon'
	} else {
		greeting.value = 'Good evening'
	}

	const deleteUserAccount = async () => {
		try {
			const userId = sessionStorage.getItem('userId')
			await axios.delete(`/api/deleteuser/${userId}`).then((res) => {
				if (res.data.success) {
					sessionStorage.clear()
					router.push('/register')
				}
			})
		} catch (error) {
			console.error('Error deleting account:', error)
		}
	}

	const updatePassword = async () => {
		try {
			const userId = sessionStorage.getItem('userId')
			const payLoad = { userId: userId, Oldpassword: Oldpassword.value, Newpassword: Newpassword.value }
			await axios.post(`/api/user/${userId}/updatepassword`, payLoad).then((res) => {
				if (res.data.success) {
					console.log('password change successful')
					sessionStorage.clear()
					router.push('/login')
				}
			})
		} catch (error) {
			console.log('An error has occured', error)
		}
	}

	onMounted(async () => {
		const response = await axios.get('/api/user')
		user.value = response.data
		username.value = response.data.username
	})
</script>
<template>
	<div class="container">
		<div class="wrapper">
			<h1>{{ greeting }}, {{ user.username }}.</h1>
			<div class="details">
				<h3><span>username:</span> {{ user.username }}</h3>
				<h3><span>Email:</span> {{ user.email }}</h3>
			</div>
			<div class="actions">
				<button @click="showDialog = true" class="update">update information</button>
				or
				<button class="delete" @click="deleteUserAccount">delete account</button>
			</div>
		</div>
	</div>
	<Dialog :open="showDialog" class="dialogbox">
		<div class="close">
			<i class="uil uil-times" @click="showDialog = false"></i>
		</div>
		<div class="input_wrapper">
			<input type="text" placeholder="username" v-model="username" />
			<input type="text" placeholder="enter your old password" v-model="Oldpassword" />
			<input type="text" placeholder="enter your new password" v-model="Newpassword" />
		</div>
		<button @click="updatePassword">save changes</button>
	</Dialog>
</template>
<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 90vh;
	}

	.wrapper {
		padding: 10px;
		border-radius: 5px;
		margin-top: -250px;
	}

	.wrapper h1 {
		text-transform: capitalize;
		letter-spacing: 1px;
		margin-bottom: 20px;
	}

	.details {
		padding: 10px;
		display: flex;
		flex-direction: column;
		border: 1px solid;
		margin-bottom: 8px;
		border-radius: 5px;
		background-color: #232323;
		color: #fff;
	}

	.details span {
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 1px;
		font-size: 20px;
		color: gray;
	}

	.details h3 {
		margin-bottom: 15px;
	}

	.actions {
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.actions button {
		padding: 20px;
		border-radius: 5px;
		border: 1px solid;
		text-transform: capitalize;
		font-size: 18px;
		letter-spacing: 1px;
		font-weight: bold;
		color: #fff;
	}

	.update {
		background-color: teal;
	}

	.delete {
		background-color: tomato;
	}

	.dialogbox {
		position: fixed;
		top: 25%;
		left: 5%;
		padding: 10px;
		border-radius: 5px;
		min-width: 360px;
	}

	input::placeholder {
		text-transform: capitalize;
		letter-spacing: 1px;
		font-size: 14px;
		color: rgba(128, 128, 128, 0.723);
	}

	.dialogbox input[type='text'] {
		display: block;
		width: 100%;
		margin-bottom: 10px;
		padding: 15px;
		border-radius: 3px;
		border: 1px solid #ccc;
	}

	.close {
		font-size: 34px;
		text-align: right;
		width: fit-content;
		border-radius: 5px;
		margin-bottom: 10px;
	}

	.input_wrapper {
		display: flex;
		flex-direction: column;
	}

	.dialogbox button {
		width: 100%;
		padding: 13px;
		font-size: 20px;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
		background-color: teal;
		border: none;
		border-radius: 5px;
		color: #fff;
	}
</style>
