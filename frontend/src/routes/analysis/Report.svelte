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
    padding: 2rem;
    background-color: #f0f4f8;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 900px;
    margin: 2rem auto;
    font-family: Arial, sans-serif;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }

  h2 {
    text-align: left;
    color: #555;
    margin-bottom: 1rem;
    border-bottom: 2px solid #ddd;
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  .summary, .recommendations, .details {
    margin-bottom: 2rem;
    color: gray;
  }

  .summary p, .recommendations p {
    color: #666;
    margin: 0.5rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    background-color: #fff;
  }

  table, th, td {
    border: 1px solid #ddd;
  }

  th, td {
    padding: 12px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
    color: #333;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  strong {
    color: #333;
  }
</style>
