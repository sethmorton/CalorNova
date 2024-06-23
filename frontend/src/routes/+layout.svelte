<script>
	import Header from './Header.svelte';
</script>

<div>
	<main>
		<slot />
	</main>	
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: no-repeat center center fixed;
		background-size: cover;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 2rem;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.6);
		color: white;
		width: 100%;
		box-sizing: border-box;
	}

	footer a {
		color: #28a745;
		font-weight: bold;
		text-decoration: none;
	}

	footer a:hover {
		text-decoration: underline;
	}
</style>
