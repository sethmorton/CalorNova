<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let regions = ["California", "Arizona", "Texas", "Nevada", "Oregon"];
	let selectedRegion = writable("");
	let powerConsumption = writable("");
	let zipCode = writable("");
	let step = writable(0);

	function nextStep() {
		step.update(n => n + 1);
	}

	function prevStep() {
		step.update(n => n - 1);
	}

	function generateReport() {
		alert(`Generating report for ${$selectedRegion} with power consumption of ${$powerConsumption} GWh`);
	}
</script>

<svelte:head>
	<title>Power Savings Analysis</title>
	<meta name="description" content="Analyze power savings and environmental sustainability based on power grid region and consumption" />
</svelte:head>

<!-- <section> -->
	{#if $step === 0}
		<div class="carousel-step">
			<h2>Select Power Grid Region</h2>
			<select bind:value={$selectedRegion}>
				<option value="" disabled selected>Select a region</option>
				{#each regions as region}
					<option value={region}>{region}</option>
				{/each}
			</select>
			<button on:click={nextStep} disabled={!$selectedRegion}>Next</button>
		</div>
	{/if}

	{#if $step === 1}
		<div class="carousel-step">
			<h2>Enter Zip Code</h2>
			<input type="number" bind:value={$zipCode} placeholder="Enter zip code" />
			<div class="buttons">
				<button on:click={prevStep}>Back</button>
				<button on:click={nextStep} disabled={!$zipCode}>Next</button>
			</div>
		</div>
	{/if}

	{#if $step === 2}
		<div class="carousel-step">
			<h2>Enter Power Consumption</h2>
			<input type="number" bind:value={$powerConsumption} placeholder="Enter power consumption in GWh" />
			<div class="buttons">
				<button on:click={prevStep}>Back</button>
				<button on:click={nextStep} disabled={!$powerConsumption}>Next</button>
			</div>
		</div>
	{/if}

	{#if $step === 3}
		<div class="carousel-step">
			<h2>Generate Analysis Report</h2>
			<p>Region: {$selectedRegion}</p>
			<p>Zip Code: {$zipCode}</p>
			<p>Power Consumption: {$powerConsumption} GWh</p>
			<div class="buttons2">
				<button on:click={prevStep}>Back</button>
				<button on:click={generateReport}>Generate Report</button>
			</div>
		</div>
	{/if}
<!-- </section> -->

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		background: url('/path/to/environmental-background.jpg') no-repeat center center fixed;
		background-size: cover;
		color: #fff;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}

	.carousel-step {
		text-align: center;
		background: gray(0, 0, 0, 0.6);
		padding: 1rem;
		border-radius: 1rem;
		width: 50%;
		height: 50%;
		animation: fadeIn 0.5s ease-in-out;
	}

	select, input {
		margin: 1rem 0;
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: none;
		width: 100%;
		max-width: 300px;
	}

	.buttons, .buttons2 {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 1rem;
	}

	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #28a745;
		color: white;
		cursor: pointer;
	}

	button[disabled] {
		background-color: #6c757d;
		cursor: not-allowed;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
