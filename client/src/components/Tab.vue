<template>
	<div class="square-tab" @click="navigateToBooks">
		<div class="square-tab-header">{{ header }}</div>
		<div class="square-tab-content" v-if="text">
			<div class="square-tab-content-text">
				{{ text }} <span>{{ value }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router'
	const router = useRouter()

	const props = defineProps({
		header: {
			type: String,
			required: false,
		},
		text: {
			type: String,
			required: false,
		},
		value: {
			type: Number,
			required: false,
		},
		routePath: {
			type: String,
			required: true,
		},
	})

	const navigateToBooks = () => {
		router.push(props.routePath)
	}
</script>

<style scoped>
	@media screen and (max-width: 600px) {
		.square-tab {
			text-align: center;
			width: 47vw; /* Set width to 90% of viewport width */
			max-width: 600px; /* Set a maximum width of 600 pixels */
			margin: 0 auto;
			height: 200px;
			background-color: #fdf5e5;
			box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			border: 3px solid;
			border-radius: 5px;
		}
	}
	.square-tab-header {
		width: 100%;
		font-size: 1.2em;
		font-weight: bold;
		margin-bottom: 1rem;
		letter-spacing: 1px;
	}
	.square-tab-content {
		display: flex;
		align-items: center;
		border: 1px solid;
		padding: 10px;
		border-radius: 5px;
	}
	.square-tab-content-text {
		font-size: 1.2rem;
		font-weight: bold;
		letter-spacing: 2px;
		text-align: center;
	}
	span {
		display: inline-block;
		padding: 0.25em 0.5em;
		border-radius: 10%; /* Create a squircle shape */
		background-color: black; /* Set the background color to black */
		color: white; /* Set the text color to white */
	}
</style>
