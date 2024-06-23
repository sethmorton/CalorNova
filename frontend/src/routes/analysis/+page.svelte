<script lang="ts">
  import { writable } from 'svelte/store';
  import ChartComponent from '../../components/ChartComponent.svelte';
  import Report from './Report.svelte'; // Assuming you have the Report component

  export let user = "John Doe"; // Replace with the actual user name

  // Create a store to handle the report view state
  let showReport = writable(false);

  // Parse the provided JSON data
  const jsonData = JSON.parse(
    `{"hourlyResults":[{"hour":0,"hourlyCost":174.7877,"totalRenewable":0.4825176410147927,"totalCredit":2470.9962073706956,"normalizedCost":24.654917205070063,"normalizedCredit":66.0097809188748,"renewableScore":48.251764101479274,"combinedScore":46.30548740847471,"recommendation":"Maintain normal operations"},{"hour":1,"hourlyCost":201.02509999999998,"totalRenewable":0.46225617583518586,"totalCredit":2352.9658098249793,"normalizedCost":20.850364165447175,"normalizedCredit":62.8567365473293,"renewableScore":46.225617583518584,"combinedScore":43.310906098765024,"recommendation":"Maintain normal operations"},{"hour":2,"hourlyCost":291.0398,"totalRenewable":0.4674304109070252,"totalCredit":2379.911475099413,"normalizedCost":7.797786528343536,"normalizedCredit":63.57655855926648,"renewableScore":46.74304109070252,"combinedScore":39.37246205943751,"recommendation":"Slightly decrease compute"},{"hour":3,"hourlyCost":290.9361,"totalRenewable":0.4708136020750542,"totalCredit":2397.199152844871,"normalizedCost":7.812823542308664,"normalizedCredit":64.0383787017539,"renewableScore":47.08136020750542,"combinedScore":39.644187483855994,"recommendation":"Slightly decrease compute"},{"hour":4,"hourlyCost":290.9361,"totalRenewable":0.4708136020750542,"totalCredit":2397.199152844871,"normalizedCost":7.812823542308664,"normalizedCredit":64.0383787017539,"renewableScore":47.08136020750542,"combinedScore":39.644187483855994,"recommendation":"Slightly decrease compute"},{"hour":5,"hourlyCost":290.9361,"totalRenewable":0.49416554830198123,"totalCredit":2534.1196005732095,"normalizedCost":7.812823542308664,"normalizedCredit":67.69604872605514,"renewableScore":49.41655483019812,"combinedScore":41.64180903285398,"recommendation":"Maintain normal operations"},{"hour":6,"hourlyCost":291.21543333333335,"totalRenewable":0.5060966129927817,"totalCredit":2604.0755136035536,"normalizedCost":7.772318824524078,"normalizedCredit":69.56483932935052,"renewableScore":50.60966129927817,"combinedScore":42.64893981771759,"recommendation":"Maintain normal operations"},{"hour":7,"hourlyCost":344.81579999999997,"totalRenewable":0.5364864021307143,"totalCredit":2782.54853409351,"normalizedCost":0,"normalizedCredit":74.33253785811824,"renewableScore":53.64864021307143,"combinedScore":42.660392690396556,"recommendation":"Maintain normal operations"},{"hour":8,"hourlyCost":179.88664999999997,"totalRenewable":0.5598461057613598,"totalCredit":2898.9901620801033,"normalizedCost":23.91554418330017,"normalizedCredit":77.4431401044126,"renewableScore":55.984610576135985,"combinedScore":52.447764954616254,"recommendation":"Maintain normal operations"},{"hour":9,"hourlyCost":106.9398,"totalRenewable":0.6644903284360997,"totalCredit":3517.3662714844863,"normalizedCost":34.493198977541056,"normalizedCredit":93.96233644534243,"renewableScore":66.44903284360997,"combinedScore":64.96818942216449,"recommendation":"Slightly increase compute"},{"hour":10,"hourlyCost":-0.1108,"totalRenewable":0.7015360908550419,"totalCredit":3711.5734617857966,"normalizedCost":50.016066549154644,"normalizedCredit":99.15035496452121,"renewableScore":70.15360908550419,"combinedScore":73.10667686639334,"recommendation":"Slightly increase compute"},{"hour":11,"hourlyCost":-0.0998,"totalRenewable":0.7067936742589074,"totalCredit":3743.3788947239796,"normalizedCost":50.014471494635686,"normalizedCredit":100,"renewableScore":70.67936742589073,"combinedScore":73.56461297350882,"recommendation":"Slightly increase compute"},{"hour":12,"hourlyCost":-55.85095,"totalRenewable":0.7013472786400944,"totalCredit":3713.524604810178,"normalizedCost":58.09866456235475,"normalizedCredit":99.20247747413762,"renewableScore":70.13472786400943,"combinedScore":75.8119566335006,"recommendation":"Slightly increase compute"},{"hour":13,"hourlyCost":-113.41109999999999,"totalRenewable":0.6949293011098612,"totalCredit":3679.6449530897494,"normalizedCost":66.44517159596515,"normalizedCredit":98.29742210375608,"renewableScore":69.49293011098612,"combinedScore":78.07850793690245,"recommendation":"Slightly increase compute"},{"hour":14,"hourlyCost":-0.1031,"totalRenewable":0.6930900336688589,"totalCredit":3671.780960521955,"normalizedCost":50.01495001099137,"normalizedCredit":98.08734471674944,"renewableScore":69.30900336688589,"combinedScore":72.4704326982089,"recommendation":"Slightly increase compute"},{"hour":15,"hourlyCost":-0.11005000000000001,"totalRenewable":0.694535806565356,"totalCredit":3680.567517731317,"normalizedCost":50.01595779543745,"normalizedCredit":98.32206734185549,"renewableScore":69.45358065653559,"combinedScore":72.59720193127617,"recommendation":"Slightly increase compute"},{"hour":16,"hourlyCost":260.03000000000003,"totalRenewable":0.6703008937270163,"totalCredit":3550.146138727608,"normalizedCost":12.294361221266527,"normalizedCredit":94.83801235646439,"renewableScore":67.03008937270162,"combinedScore":58.054154316810845,"recommendation":"Maintain normal operations"},{"hour":17,"hourlyCost":238.15370000000001,"totalRenewable":0.5271872709240654,"totalCredit":2768.875857013497,"normalizedCost":15.466533146102933,"normalizedCredit":73.9672882410067,"renewableScore":52.71872709240654,"combinedScore":47.38418282650539,"recommendation":"Maintain normal operations"},{"hour":18,"hourlyCost":238.15370000000001,"totalRenewable":0.518040986666803,"totalCredit":2725.176062640966,"normalizedCost":15.466533146102933,"normalizedCredit":72.79989921623759,"renewableScore":51.8040986666803,"combinedScore":46.69017700967361,"recommendation":"Maintain normal operations"},{"hour":19,"hourlyCost":228.6055,"totalRenewable":0.3580239862935465,"totalCredit":1843.3206998598203,"normalizedCost":16.851069469554474,"normalizedCredit":49.24216200657237,"renewableScore":35.80239862935465,"combinedScore":33.9652100351605,"recommendation":"Slightly decrease compute"},{"hour":20,"hourlyCost":267.1371,"totalRenewable":0.3572169283234191,"totalCredit":1839.6860118970849,"normalizedCost":11.263796496564254,"normalizedCredit":49.14506555801735,"renewableScore":35.72169283234191,"combinedScore":32.04351829564117,"recommendation":"Slightly decrease compute"},{"hour":21,"hourlyCost":271.944825,"totalRenewable":0.34910345901341566,"totalCredit":1794.1899992215274,"normalizedCost":10.566652543183935,"normalizedCredit":47.92969265682156,"renewableScore":34.910345901341564,"combinedScore":31.135563700449023,"recommendation":"Slightly decrease compute"},{"hour":22,"hourlyCost":220.3763,"totalRenewable":0.4189371678649577,"totalCredit":2152.8884026258206,"normalizedCost":18.044344255686653,"normalizedCredit":57.51190203214963,"renewableScore":41.89371678649577,"combinedScore":39.14998769144402,"recommendation":"Slightly decrease compute"},{"hour":23,"hourlyCost":202.2533,"totalRenewable":0.45850648890149637,"totalCredit":2349.918445500319,"normalizedCost":20.672269078157086,"normalizedCredit":62.77532976457068,"renewableScore":45.850648890149635,"combinedScore":43.09941591095913,"recommendation":"Maintain normal operations"}],"totalDailyCredit":67560.0438899693,"totalDailyCost":4219.487208333334,"netDailyCost":-63340.556681635964,"averageRenewableShare":0.5401860748476203}`
  );

  const hourlyData = jsonData.hourlyResults;

  // Calculate cumulative sum of hourly costs
  const cumulativeHourlyCost = hourlyData.map((d, index) => {
    return hourlyData.slice(0, index + 1).reduce((sum, data) => sum + (data.hourlyCost || 0), 0);
  });
</script>

<div class="layout">
  <aside class="sidebar">
    <h3>CalorNova</h3>
    <ul>
      <li><button on:click={() => window.location.href = 'https://s1acker.grafana.net/d/panel-geomap/geomap-examples?orgId=1&from=1719117949252&to=1719139549252'}>Grafana</button></li>
      <li><button on:click={() => showReport.set(false)}>Dashboards</button></li>
      <li><button on:click={() => showReport.set(true)}>View Report</button></li>
    </ul>
  </aside>

  <div class="dashboard">
    {#if $showReport}
      <Report data={jsonData} />
    {:else}
      <ChartComponent {hourlyData} {cumulativeHourlyCost} />
    {/if}
  </div>
</div>

<style>
  .layout {
    display: flex;
    min-height: 100vh;
  }

  .sidebar {
    width: 100%;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
  }

  .sidebar h3 {
    margin-top: 0;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar ul li {
    margin: 10px 0;
  }

  .sidebar ul li button {
    width: 100%;
    padding: 10px;
    background-color: #34495e;
    color: white;
    border: none;
    cursor: pointer;
  }

  .sidebar ul li button:hover {
    background-color: #1abc9c;
  }

  .dashboard {
    flex: 1;
    padding: 0.1rem;
    width: 100%;
  }

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
    text-align: center;
  }

  .chart-container {
    height: 600px;
    width: 100%;
  }
</style>
