<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { ChartConfiguration, ChartData, ChartOptions } from "chart.js";
    import { Chart } from "chart.js/auto";

    let chartElement: HTMLCanvasElement;
    let chart: Chart;

    // Example: you might want to pass these as props
    export let chartType: ChartConfiguration["type"] = "bar";
    export let chartData: ChartData;
    export let chartOptions: ChartOptions = {};

    onMount(() => {
        chart = new Chart(chartElement, {
            type: chartType,
            data: chartData,
            options: chartOptions,
        });
    });

    onDestroy(() => {
        if (chart) chart.destroy();
    });

    // Update chart when data changes
    $: if (chart && chartData) {
        chart.data = chartData;
        chart.update();
    }
</script>

<canvas bind:this={chartElement}></canvas>
