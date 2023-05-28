<template>
	<p>oops, you just hit a dead end. you will be redirected in the next 3 seconds.</p>
</template>
<script setup>
	import { onMounted } from 'vue'
	import { useRouter } from 'vue-router'
	const router = useRouter()

	onMounted(() => {
		setTimeout(() => {
			router.push('/account')
		}, 3000)
	})
</script>
