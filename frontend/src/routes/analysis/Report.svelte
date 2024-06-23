<script lang="ts">
  export let data;

  // Calculate some useful statistics
  let totalCombinedScore = 0;
  let totalRecommendations = {
    maintain: 0,
    slightlyDecrease: 0,
    significantlyDecrease: 0,
    slightlyIncrease: 0,
    significantlyIncrease: 0,
  };

  data.hourlyResults.forEach(result => {
    totalCombinedScore += result.combinedScore;
    if (result.recommendation.includes("Slightly decrease")) {
      totalRecommendations.slightlyDecrease += 1;
    } else if (result.recommendation.includes("Significantly decrease")) {
      totalRecommendations.significantlyDecrease += 1;
    } else if (result.recommendation.includes("Maintain")) {
      totalRecommendations.maintain += 1;
    } else if (result.recommendation.includes("Slightly increase")) {
      totalRecommendations.slightlyIncrease += 1;
    } else if (result.recommendation.includes("Significantly increase")) {
      totalRecommendations.significantlyIncrease += 1;
    }
  });

  let averageCombinedScore = totalCombinedScore / data.hourlyResults.length;
</script>

<section>
  <h1>Daily Energy Report</h1>

  <div class="summary">
    <h2>Summary</h2>
    <p><strong>Average Renewable Share:</strong> {data.averageRenewableShare}%</p>
    <p><strong>Average Combined Score:</strong> {averageCombinedScore}</p>
  </div>

  <div class="recommendations">
    <h2>Recommendations Summary</h2>
    <p><strong>Slightly Decrease Compute:</strong> {totalRecommendations.slightlyDecrease}</p>
    <p><strong>Significantly Decrease Compute:</strong> {totalRecommendations.significantlyDecrease}</p>
    <p><strong>Maintain Normal Operations:</strong> {totalRecommendations.maintain}</p>
    <p><strong>Slightly Increase Compute:</strong> {totalRecommendations.slightlyIncrease}</p>
    <p><strong>Significantly Increase Compute:</strong> {totalRecommendations.significantlyIncrease}</p>
  </div>

  <div class="details">
    <h2>Hourly Details</h2>
    <table>
      <thead>
        <tr>
          <th>Hour</th>
          <th>Renewable Share</th>
          <th>LMP</th>
          <th>Combined Score</th>
          <th>Recommendation</th>
        </tr>
      </thead>
      <tbody>
        {#each data.hourlyResults as result}
          <tr>
            <td>{result.hour}</td>
            <td>{result.renewableScore}%</td>
            <td>${result.normalizedCost}</td>
            <td>{result.combinedScore}</td>
            <td>{result.recommendation}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  section {
    padding: 0.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    /* max-width: 100%; */
    width: 100%;
    /* margin: 0 auto; */
  }

  h1, h2 {
    text-align: center;
    color: black;
  }

  .summary, .recommendations, .details {
    margin: 1rem 0;
    color: gray;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
  }

  table, th, td {
    border: 1px solid #ddd;
  }

  th, td {
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }
</style>
