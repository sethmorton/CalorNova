<script>
  import { writable } from "svelte/store";

  let regions = ["California", "Arizona", "Texas", "Nevada", "Oregon"];
  let selectedRegion = writable("");
  let powerConsumption = writable("");
  let zipCode = writable("");
  let step = writable(0);

  function nextStep() {
    step.update((n) => n + 1);
  }

  function prevStep() {
    step.update((n) => n - 1);
  }

  function generateReport() {
    alert(
      `Generating report for ${$selectedRegion} with power consumption of ${$powerConsumption} GWh`
    );
  }
</script>

<svelte:head>
  <title>Power Savings Analysis</title>
  <meta
    name="description"
    content="Analyze power savings and environmental sustainability based on power grid region and consumption"
  />
</svelte:head>

<h1 style="font-size: 3rem; font-family: 'DM Sans', sans-serif;">CalorNova</h1>
<p style="font-size: 1.2rem;">
  Analyze power savings and environmental sustainability based on your region
  and consumption.
</p>

<section>
  {#if $step === 0}
    <div class="step">
      <h2>Select Power Grid Region</h2>
      <select bind:value={$selectedRegion}>
        <option value="" disabled selected>Select a region</option>
        {#each regions as region}
          <option value={region}>{region}</option>
        {/each}
      </select>
      <div class="buttons">
        <button on:click={nextStep} disabled={!$selectedRegion}>Next</button>
      </div>
    </div>
  {/if}

  {#if $step === 1}
    <div class="step">
      <h2>Enter Zip Code</h2>
      <input type="number" bind:value={$zipCode} placeholder="Enter zip code" />
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
        <button on:click={nextStep} disabled={!$powerConsumption}>Next</button>
      </div>
    </div>
  {/if}

  {#if $step === 3}
    <div class="step">
      <h2>Generate Analysis Report</h2>
      <p>Region: {$selectedRegion}</p>
      <p>Zip Code: {$zipCode}</p>
      <p>Power Consumption: {$powerConsumption.toLocaleString()} KWh</p>
      <div class="buttons">
        <button on:click={prevStep}>Back</button>
        <button on:click={generateReport}>Generate Report</button>
      </div>
    </div>
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
  }

  button:hover {
    background-color: #9575cd; /* Lighter purple on hover */
  }

  button[disabled] {
    background-color: #757575; /* Dark grey for disabled state */
    cursor: not-allowed;
  }
</style>
