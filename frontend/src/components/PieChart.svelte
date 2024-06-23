<script>
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    export let data = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ],
    };

    export let options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Pie Chart",
            },
        },
    };

    let canvas;
    let chart;

    onMount(() => {
        chart = new Chart(canvas, {
            type: "pie",
            data,
            options,
        });

        return () => {
            chart.destroy();
        };
    });

    $: if (chart) {
        chart.data = data;
        chart.options = options;
        chart.update();
    }
</script>

<div class="chart-container">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    .chart-container {
        position: relative;
        margin: auto;
        height: 80vh;
        width: 80vw;
    }
</style>
