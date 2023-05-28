<template>
	<div class="container">
		<div class="content">
			<h1>Welcome to ABUAD Library Management System</h1>
			<p>Manage and organize your library efficiently with our system.</p>
			<div class="cta">
				<router-link to="/register" class="btn register">Register</router-link>
				<router-link to="/login" class="btn login">Login</router-link>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.container {
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		width: 100%;
	}

	.nav-links router-link {
		margin-right: 20px;
		text-decoration: none;
		color: #333333;
		font-size: 18px;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 80px;
		margin-bottom: 80px;
	}

	h1 {
		font-size: 48px;
		font-weight: bold;
		color: #333333;
		text-align: center;
		margin-bottom: 20px;
		animation: slide-up 1s ease-in-out;
	}

	p {
		font-size: 24px;
		color: #999999;
		text-align: center;
		margin-bottom: 40px;
		animation: slide-up 1s ease-in-out;
	}

	.cta {
		display: flex;
		justify-content: center;
		align-items: center;
		animation: fade-in 1s ease-in-out;
	}

	.btn {
		background-color: #3366ff;
		color: white;
		font-size: 18px;
		font-weight: bold;
		padding: 12px 24px;
		border-radius: 8px;
		transition: background-color 0.3s ease-in-out;
		margin: 0 10px;
		text-decoration: none;
      letter-spacing: 2px;
	}

	.btn:hover {
		background-color: #254eda;
		cursor: pointer;
	}

	.register {
		background-color: #f9a826;
	}

	.login {
		background-color: #2ecc71;
	}

	@keyframes slide-up {
		from {
			transform: translateY(20%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
