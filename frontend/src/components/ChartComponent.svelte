<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';
  import annotationPlugin from 'chartjs-plugin-annotation';

  Chart.register(annotationPlugin);

  export let hourlyData: any[];
  export let cumulativeHourlyCost: number[];

  let chartCanvas: HTMLCanvasElement;
  let chartCanvas1: HTMLCanvasElement;
  let chartInstance;
  let chartInstance1;

  export let data = {
        labels: ["Coal", "Natural Gas", "Nuclear", "Hydro", "Renewables"],
        datasets: [
            {
                data: [30, 35, 20, 10, 5], // Example percentages
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)", // Coal - red
                    "rgba(54, 162, 235, 0.5)", // Natural Gas - blue
                    "rgba(255, 206, 86, 0.5)", // Nuclear - yellow
                    "rgba(75, 192, 192, 0.5)", // Hydro - green
                    "rgba(153, 102, 255, 0.5)", // Renewables - purple
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)", // Coal - red
                    "rgba(54, 162, 235, 1)", // Natural Gas - blue
                    "rgba(255, 206, 86, 1)", // Nuclear - yellow
                    "rgba(75, 192, 192, 1)", // Hydro - green
                    "rgba(153, 102, 255, 1)", // Renewables - purple
                ],
                borderWidth: 1,
            },
        ],
    };

    export let options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "white", // White text for legend
                },
            },
            title: {
                display: true,
                text: "Fuel Mix Composition",
                color: "white", // White text for title
            },
        },
    };

    let canvas;
    let chart2;

  const chartData = {
    labels: hourlyData.map((d) => d.hour),
    datasets: [
      {
        label: "Combined Score",
        data: hourlyData.map((d) => d.combinedScore),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartData1 = {
    labels: hourlyData.map((d) => d.hour),
    datasets: [
      {
        label: "Cumulative Total Cost Savings ($)",
        data: cumulativeHourlyCost,
        borderColor: "rgb(255, 99, 132)", // change line color
        backgroundColor: "rgba(255, 99, 132, 0.2)", // fill color under the line
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white", // white text for legend
        },
      },
      title: {
        display: true,
        text: "Hourly Total Cost Savings",
        color: "white", // white text for title
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex;
            return `Cumulative Total Cost Savings: $${cumulativeHourlyCost[dataIndex].toFixed(2)}`;
          },
        },
        titleColor: "white", // white text for tooltip title
        bodyColor: "white",  // white text for tooltip body
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of Day",
          color: "white", // white text for x-axis title
        },
        ticks: {
          color: "white", // white text for x-axis labels
          callback: (value) => `${value}:00`,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // color for x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Cumulative Total Savings ($)",
          color: "white", // white text for y-axis title
        },
        ticks: {
          color: "white", // white text for y-axis labels
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // color for y-axis grid lines
        },
      },
    },
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      annotation: {
        annotations: {
          line80: {
            type: "line" as const,
            yMin: 80,
            yMax: 80,
            borderColor: "rgba(255, 0, 0, 0.5)",
            borderWidth: 2,
            label: {
              content: "Increase compute significantly",
              enabled: true,
              position: "start" as const,
              color: "white" // white text for annotation label
            },
          },
          line60: {
            type: "line" as const,
            yMin: 60,
            yMax: 60,
            borderColor: "rgba(255, 165, 0, 0.5)",
            borderWidth: 2,
            label: {
              content: "Slightly increase compute",
              enabled: true,
              position: "start" as const,
              color: "white" // white text for annotation label
            },
          },
          line40: {
            type: "line" as const,
            yMin: 40,
            yMax: 40,
            borderColor: "rgba(0, 255, 0, 0.5)",
            borderWidth: 2,
            label: {
              content: "Maintain normal operations",
              enabled: true,
              position: "start" as const,
              color: "white" // white text for annotation label
            },
          },
          line20: {
            type: "line" as const,
            yMin: 20,
            yMax: 20,
            borderColor: "rgba(0, 0, 255, 0.5)",
            borderWidth: 2,
            label: {
              content: "Slightly decrease compute",
              enabled: true,
              position: "start" as const,
              color: "white" // white text for annotation label
            },
          },
        },
      },
      legend: {
        position: "top" as const,
        labels: {
          color: "white", // white text for legend
        },
      },
      title: {
        display: true,
        text: "Hourly Combined Score and Compute Recommendations",
        color: "white", // white text for title
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex;
            const hourData = hourlyData[dataIndex];
            return [
              `Combined Score: ${hourData.combinedScore.toFixed(2)}`,
              `Recommendation: ${hourData.recommendation}`,
              `Hourly Cost: $${hourData.hourlyCost.toFixed(2)}`,
              `Renewable Score: ${hourData.renewableScore.toFixed(2)}`,
              `Total Credit: $${hourData.totalCredit.toFixed(2)}`,
            ];
          },
        },
        titleColor: "white", // white text for tooltip title
        bodyColor: "white",  // white text for tooltip body
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of Day",
          color: "white", // white text for x-axis title
        },
        ticks: {
          color: "white", // white text for x-axis labels
          callback: (value) => `${value}:00`,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // color for x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Combined Score",
          color: "white", // white text for y-axis title
        },
        ticks: {
          color: "white", // white text for y-axis labels
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // color for y-axis grid lines
        },
      },
    },
  };

  function createCharts() {
    if (chartInstance) chartInstance.destroy();
    if (chartInstance1) chartInstance1.destroy();

    if (chartCanvas && chartCanvas1) {
      chartInstance = new Chart(chartCanvas, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });

      chartInstance1 = new Chart(chartCanvas1, {
        type: "line",
        data: chartData1,
        options: chartOptions1,
      });

      chart2 = new Chart(canvas, {
            type: "pie",
            data,
            options,
        });

        return () => {
            chart2.destroy();
        };
    }
  }

  // Ensure charts are created after canvas elements are available
  onMount(() => {
    createCharts();
  });

  $: if (chart2) {
        chart2.data = data;
        chart2.options = options;
        chart2.update();
    }

  // Destroy charts when component is destroyed
  onDestroy(() => {
    if (chartInstance) chartInstance.destroy();
    if (chartInstance1) chartInstance1.destroy();
    if (chart2) chart2.destroy();
  });
</script>

<div>
  <div class="parent-container">
    <h2 >Hourly Compute Resource Management</h2>
    <div class="chart-container">
      <canvas bind:this={chartCanvas}></canvas>
    </div>
  </div>
  <div class="chart-container">
    <canvas bind:this={chartCanvas1}></canvas>
  </div>
  <div class="mx-3 px-3 my-6 py-6 chart-container-1">
    <canvas bind:this={canvas}></canvas>

  </div>
</div>

<style>
  .chart-container {
    height: 600px;
    width: 90%;
  }

  .chart-container-1 {
    height: 600px;
    width: 90%;
    margin-left: 3rem;
    margin-top: 2rem;
  }

  .parent-container {
    width: 50.9rem;
  }
</style>
