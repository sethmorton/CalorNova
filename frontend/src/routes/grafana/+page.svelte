<script>
  import { onMount } from 'svelte';

  export let dashboardUrl = "https://s1acker.grafana.net/d/panel-geomap/geomap-examples";
  export let orgId = "1";
  export let from = "now-6h";
  export let to = "now";
  export let theme = "dark";
  export let width = "100%";
  export let height = "600px";

  let iframeLoaded = false;
  let iframeError = false;
  let loading = true;

  $: fullUrl = `${dashboardUrl}?orgId=${orgId}&from=${from}&to=${to}&theme=${theme}`;

  function handleIframeLoad() {
    iframeLoaded = true;
    loading = false;
  }

  function handleIframeError() {
    iframeError = true;
    loading = false;
  }

  onMount(() => {
    // Set a timeout to consider loading failed if it takes too long
    setTimeout(() => {
      if (loading) {
        handleIframeError();
      }
    }, 10000); // 10 seconds timeout
  });
</script>

<div class="dashboard-container" style="width: {width}; height: {height};">
  {#if loading}
    <div class="loading">Loading Grafana Dashboard...</div>
  {/if}

  {#if !iframeError}
    <iframe
      src={fullUrl}
      on:load={handleIframeLoad}
      on:error={handleIframeError}
      class:hidden={!iframeLoaded}
      {width}
      {height}
      frameborder="0"
      title="Grafana Dashboard"
    ></iframe>
  {/if}

  {#if iframeError}
    <img
      src={fullUrl}
      alt="Grafana Dashboard"
      on:error={() => console.error("Failed to load Grafana dashboard as image")}
      {width}
      {height}
    />
  {/if}
</div>

<style>
  .dashboard-container {
    position: relative;
    overflow: hidden;
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    color: #333;
    font-size: 1.2em;
  }

  .hidden {
    display: none;
  }

  iframe, img {
    border: none;
    width: 100%;
    height: 100%;
  }
</style>