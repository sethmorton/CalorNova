<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';
  import annotationPlugin from 'chartjs-plugin-annotation';

  Chart.register(annotationPlugin);

  export let hourlyData: any[];
  export let cumulativeHourlyCost: number[];

  let totalCumulativeCost = cumulativeHourlyCost.reduce((acc, cost) => acc + cost, 0).toFixed(2);


  let chartCanvas: HTMLCanvasElement;
  // let chartCanvas1: HTMLCanvasElement;
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
        layout: {
            // padding: {
            //     left: 150
            // }
        },
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "white", // White text for legend
                },
            },
            title: {
                display: true,
                text: "Current Fuel Mix Composition",
                color: "white", // White text for title
                font: {
                        size: 18,
                    }
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
        tension: 0.15,
        pointRadius: 1,
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
            borderWidth: 4,
            label: {
              content: "Increase compute significantly",
              enabled: true,
              position: "start" as const,
              color: "white", // white text for annotation label
              font: {
                        size: 50,
                    }

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
        font: {
                        size: 20,
                    }
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
    // if (chartInstance1) chartInstance1.destroy();

    // if (chartCanvas && chartCanvas1) {
    if (chartCanvas) {
      chartInstance = new Chart(chartCanvas, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });

      // chartInstance1 = new Chart(chartCanvas1, {
      //   type: "line",
      //   data: chartData1,
      //   options: chartOptions1,
      // });

      chart2 = new Chart(canvas, {
            type: "doughnut",
            data,
            options: {
        layout: {
            // padding: {
            //     right: 10
            // }
        }
    },
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

<div class="dashboard-container">
  <div class="dashboard">
    <div class="grid-container">
      <div class="chart-panel large-panel">
        <div class="chart-container">
          <canvas bind:this={chartCanvas}></canvas>
        </div>
      </div>
      <div class="right-panel">
        <div class="chart-panel info-panel">
          <h3>Total Daily Cost Savings ($)</h3>
          <p class="total-cost">${totalCumulativeCost}</p>
        </div>
        <div class="chart-panel">
          <div class="chart-container">
            <canvas bind:this={canvas}></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .dashboard-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 2rem;
    padding-top: 2rem;
    box-sizing: border-box;
  }

  .dashboard {
    width: 100%;
    /* max-width: 1400px; */
    margin-top: -10rem;
  }

  .grid-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .chart-panel {
    flex: 1 1 300px;
    border: 2px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: black;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .large-panel {
    flex: 2 1 600px;
    height: 50rem;
  }

  .right-panel {
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .chart-container {
    width: 100%;
    height: 100%;
  }

  .info-panel {
    height: 24rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .info-panel h3 {
    color: white;
    text-align: center;
    margin-bottom: 1rem;
  }

  .total-cost {
    font-size: 3.5rem;
    font-weight: bold;
    color: tusk;
    text-align: center;
  }
</style>
