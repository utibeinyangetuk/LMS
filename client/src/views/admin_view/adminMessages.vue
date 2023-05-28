<template>
	<div>
		<h2>Loan Request</h2>
		<ul>
			<li v-for="request in loanRequests" :key="request.id">
				{{ request.request }}
				<button @click="approveLoan(request.id)" v-if="!request.approved">Approve</button>
				<button @click="rejectLoan(request.id)" v-if="!request.approved">Approve</button>
			</li>
		</ul>
	</div>
</template>
<script setup>
	import { computed } from 'vue'
	import { useLoanstore } from '../../stores/Loanstore'
	const loanStore = useLoanstore()
	const loanRequests = computed(() => loanStore.getloanRequests)

	const approveLoan = (requestId) => {
		const result = loanStore.approveloanRequest(requestId)
		if (result) {
			console.log(`loan request ${requestId} has been approved`)
		} else {
			console.log(`loan request ${requestId} not found`)
		}
	}

	const rejectLoan = (requestId) => {
		const result = loanStore.rejectloanRequest(requestId)
		if (result) {
			console.log(`loan request ${requestId} has been rejected`)
		} else {
			console.log(`loan request ${requestId} not found`)
		}
	}
</script>
