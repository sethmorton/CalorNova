<script>
  import { writable } from "svelte/store";
  import { Circle2 } from "svelte-loading-spinners";
  import { analysisStore, zipCode, region, powerConsumption } from "../stores";
  import { goto } from "$app/navigation";
  let regions = ["California", "Arizona", "Texas", "Nevada", "Oregon"];
  // let selectedRegion = writable("");
  // let powerConsumption = writable("");
  // let zipCode = writable("");
  let step = writable(0);
  let isLoading = writable(false);

  function nextStep() {
    step.update((n) => n + 1);
  }

  function prevStep() {
    step.update((n) => n - 1);
  }

  async function generateReport() {
    isLoading.set(true);
    console.log(
      `https://vulgegl7rd.execute-api.us-east-2.amazonaws.com/fuel-mix-analysis?zip_code=${$zipCode}&power_kwh=${$powerConsumption}`
    );
    const analysis = await fetch(
      `https://vulgegl7rd.execute-api.us-east-2.amazonaws.com/fuel-mix-analysis?zip_code=${$zipCode}&power_kwh=${$powerConsumption}`
    ).then((res) => res.json());
    isLoading.set(false);
    analysisStore.set(analysis);
    goto("/analysis");

  }
</script>

<svelte:head>
  <title>Power Savings Analysis</title>
  <meta
    name="description"
    content="Analyze power savings and environmental sustainability based on power grid region and consumption"
  />
</svelte:head>

<h1 style="font-size: 3rem; font-family: 'DM Sans', sans-serif;">Volta</h1>
<p style="font-size: 1.2rem;">
  Analyze power savings and environmental sustainability based on your region
  and consumption.
</p>

<section>
  {#if $isLoading}
    <div class="loading">
      <Circle2
        size="60"
        unit="px"
        colorOuter="#673ab7"
        colorCenter="#9575cd"
        colorInner="#c7a4ff"
        durationOuter="1s"
        durationCenter="1.5s"
        durationInner="2s"
      />
      <p>Generating report...</p>
    </div>
  {:else}
    {#if $step === 0}
      <div class="step">
        <h2>Select Power Grid Region</h2>
        <select bind:value={$region}>
          <option value="" disabled selected>Select a region</option>
          {#each regions as region}
            <option value={region}>{region}</option>
          {/each}
        </select>
        <div class="buttons">
          <button on:click={nextStep} disabled={!$region}>Next</button>
        </div>
      </div>
    {/if}

    {#if $step === 1}
      <div class="step">
        <h2>Enter Zip Code</h2>
        <input
          type="number"
          bind:value={$zipCode}
          placeholder="Enter zip code"
        />
        <div class="buttons">
          <button on:click={prevStep}>Back</button>
          <button on:click={nextStep} disabled={!$zipCode}>Next</button>
        </div>
      </div>
    {/if}

    {#if $step === 2}
      <div class="step">
        <h2>Enter Power Consumption</h2>
        <input
          type="number"
          bind:value={$powerConsumption}
          placeholder="Enter power consumption in KWh"
        />
        <div class="buttons">
          <button on:click={prevStep}>Back</button>
          <button on:click={nextStep} disabled={!$powerConsumption}>Next</button
          >
        </div>
      </div>
    {/if}

    {#if $step === 3}
      <div class="step">
        <h2>Generate Analysis Report</h2>
        <p>Region: {$region}</p>
        <p>Zip Code: {$zipCode}</p>
        <p>Power Consumption: {$powerConsumption.toLocaleString()} KWh</p>
        <div class="buttons">
          <button on:click={prevStep}>Back</button>
          <button on:click={generateReport}>Generate Report</button>
        </div>
      </div>
    {/if}
  {/if}
</section>

<style>
  body {
    font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #212121; /* Dark background */
    color: #ffffff; /* White text */
  }

  .hero {
    background-color: #673ab7; /* Purple */
    color: white;
    padding: 3rem 1rem;
    text-align: center;
    border-bottom: 1px solid #9575cd; /* Lighter purple */
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .step {
    background-color: #424242; /* Dark grey */
    padding: 2rem;
    border-radius: 1rem; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 1.5rem;
    width: 100%;
    max-width: 400px;
    text-align: center;
  }

  select,
  input {
    margin: 1rem 0;
    padding: 0.75rem;
    border-radius: 0.5rem; /* More rounded input fields */
    border: 1px solid #757575; /* Dark grey border */
    width: 100%;
    max-width: 300px;
    font-size: 1rem;
    background-color: #212121; /* Dark background for inputs */
    color: #ffffff; /* White text */
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem; /* Rounded buttons */
    background-color: #673ab7; /* Purple */
    color: white;
    cursor: pointer;
    font-size: 1rem;
    margin-right: 0.5rem;
    transition: background-color 0.3s ease;
    font-family: "Quicksand", sans-serif;
  }

  button:hover {
    background-color: #9575cd; /* Lighter purple on hover */
  }

  button[disabled] {
    background-color: #757575; /* Dark grey for disabled state */
    cursor: not-allowed;
  }
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    text-align: center;
  }
</style>
