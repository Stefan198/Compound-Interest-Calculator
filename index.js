
const form = document.querySelector("form");
const principalInput = document.getElementById("principal");
const rateInput = document.getElementById("rate");
const yearsInput = document.getElementById("years");
const ctx = document.getElementById("interestChart").getContext("2d");
let chart; // we'll store the chart instance here

function renderChart() {
    const principal = parseFloat(principalInput.value.replace(/,/g, ""));
    const rate = parseFloat(rateInput.value);
    const years = parseInt(yearsInput.value);

    if (isNaN(principal) || isNaN(rate) || isNaN(years)) return;

    const data = [];
    const labels = [];

    for (let year = 1; year <= years; year++) {
        const amount = principal * Math.pow(1 + rate / 100, year);
        data.push(amount.toFixed(2));
        labels.push(`Year ${year}`);
    }

    if (chart) chart.destroy();

    // 🔍 Fix canvas resolution
    const canvas = document.getElementById("interestChart");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any scale
    ctx.scale(dpr, dpr); // Scale for high-res

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Compound Interest",
                    data: data,
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    fill: true,
                    tension: 0.3,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                },
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function (value) {
                            return "$" + Number(value).toLocaleString();
                        },
                    },
                },
            },
        },
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    renderChart();
});

// Run once when the page loads:
window.addEventListener("DOMContentLoaded", renderChart);
