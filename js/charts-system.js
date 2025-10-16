/**
 * AtaBot Advanced Charts System
 * Creates interactive charts and visualizations for analytics dashboard
 */

class ChartsSystem {
    constructor() {
        this.charts = {};
        this.isInitialized = false;
        this.patriotColors = {
            red: '#dc2626',
            blue: '#1d4ed8',
            gold: '#fbbf24',
            white: '#ffffff',
            navy: '#1e40af'
        };
        
        this.init();
    }
    
    async init() {
        // Wait for Chart.js to load
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded, charts will be unavailable');
            return;
        }
        
        // Configure Chart.js defaults
        this.configureChartDefaults();
        
        // Initialize all charts
        await this.initializeAllCharts();
        
        // Setup real-time updates
        this.startRealTimeUpdates();
        
        this.isInitialized = true;
        console.log('✅ Charts system initialized');
    }
    
    configureChartDefaults() {
        Chart.defaults.font.family = 'Inter, sans-serif';
        Chart.defaults.color = '#cbd5e0';
        Chart.defaults.backgroundColor = 'rgba(251, 191, 36, 0.1)';
        Chart.defaults.borderColor = 'rgba(251, 191, 36, 0.3)';
        
        // Register custom gradients
        Chart.register({
            id: 'patriotGradients',
            beforeInit: (chart) => {
                const ctx = chart.ctx;
                chart.patriotGradients = {
                    primary: this.createGradient(ctx, 0, 0, 0, 400, [
                        { stop: 0, color: this.patriotColors.blue },
                        { stop: 0.5, color: this.patriotColors.red },
                        { stop: 1, color: this.patriotColors.gold }
                    ]),
                    gold: this.createGradient(ctx, 0, 0, 0, 400, [
                        { stop: 0, color: this.patriotColors.gold },
                        { stop: 1, color: '#f59e0b' }
                    ]),
                    blue: this.createGradient(ctx, 0, 0, 0, 400, [
                        { stop: 0, color: this.patriotColors.blue },
                        { stop: 1, color: this.patriotColors.navy }
                    ]),
                    red: this.createGradient(ctx, 0, 0, 0, 400, [
                        { stop: 0, color: this.patriotColors.red },
                        { stop: 1, color: '#b91c1c' }
                    ])
                };
            }
        });
    }
    
    createGradient(ctx, x1, y1, x2, y2, colorStops) {
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        colorStops.forEach(stop => {
            gradient.addColorStop(stop.stop, stop.color);
        });
        return gradient;
    }
    
    async initializeAllCharts() {
        // Small stat charts
        this.initResponseTimeChart();
        this.initAccuracyDonut();
        this.initTasksTrend();
        this.initUserActivityHeatmap();
        this.initUptimeGauge();
        this.initCodeLanguages();
        
        // Dashboard charts
        this.initPerformanceTimeline();
        this.initAccuracyDistribution();
        this.initInteractionHeatmap();
    }
    
    initResponseTimeChart() {
        const canvas = document.getElementById('response-time-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        this.charts.responseTime = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['5m', '4m', '3m', '2m', '1m', 'now'],
                datasets: [{
                    data: [165, 147, 152, 143, 147, 138],
                    borderColor: this.patriotColors.gold,
                    backgroundColor: `${this.patriotColors.gold}20`,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { 
                        display: false,
                        grid: { display: false }
                    },
                    y: { 
                        display: false,
                        grid: { display: false },
                        min: 100,
                        max: 200
                    }
                },
                elements: {
                    point: { radius: 0 }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    initAccuracyDonut() {
        const canvas = document.getElementById('accuracy-donut');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const accuracy = 97.3;
        
        this.charts.accuracy = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [accuracy, 100 - accuracy],
                    backgroundColor: [
                        this.patriotColors.gold,
                        'rgba(255, 255, 255, 0.1)'
                    ],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                }
            },
            plugins: [{
                beforeDraw: (chart) => {
                    const { width, height, ctx } = chart;
                    ctx.restore();
                    
                    const fontSize = (height / 100).toFixed(2);
                    ctx.font = `bold ${fontSize}em Inter`;
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = this.patriotColors.gold;
                    
                    const text = `${accuracy}%`;
                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 2;
                    
                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            }]
        });
    }
    
    initTasksTrend() {
        const canvas = document.getElementById('tasks-trend');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        this.charts.tasksTrend = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    data: [420, 387, 456, 502, 398, 267, 398],
                    backgroundColor: this.patriotColors.blue,
                    borderRadius: 2,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { 
                        display: false,
                        grid: { display: false }
                    },
                    y: { 
                        display: false,
                        grid: { display: false }
                    }
                }
            }
        });
    }
    
    initUserActivityHeatmap() {
        const canvas = document.getElementById('user-activity-heatmap');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Create heatmap data
        const heatmapData = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let day = 0; day < 7; day++) {
                const intensity = Math.random() * 0.8 + 0.2;
                heatmapData.push({
                    x: hour,
                    y: day,
                    v: intensity
                });
            }
        }
        
        this.charts.userActivity = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    data: heatmapData,
                    backgroundColor: (ctx) => {
                        const value = ctx.parsed.v;
                        const alpha = Math.min(value * 1.2, 1);
                        return `rgba(251, 191, 36, ${alpha})`;
                    },
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { 
                        display: false,
                        min: 0,
                        max: 23
                    },
                    y: { 
                        display: false,
                        min: 0,
                        max: 6
                    }
                }
            }
        });
    }
    
    initUptimeGauge() {
        const canvas = document.getElementById('uptime-gauge');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const uptime = 99.7;
        
        this.charts.uptime = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [uptime, 100 - uptime],
                    backgroundColor: [
                        this.patriotColors.blue,
                        'rgba(255, 255, 255, 0.1)'
                    ],
                    borderWidth: 0,
                    cutout: '60%',
                    circumference: 180,
                    rotation: 270
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
    
    initCodeLanguages() {
        const canvas = document.getElementById('code-languages');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        this.charts.codeLanguages = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js'],
                datasets: [{
                    data: [35, 28, 18, 12, 7],
                    backgroundColor: [
                        `${this.patriotColors.gold}80`,
                        `${this.patriotColors.blue}80`,
                        `${this.patriotColors.red}80`,
                        `${this.patriotColors.gold}60`,
                        `${this.patriotColors.blue}60`
                    ],
                    borderColor: [
                        this.patriotColors.gold,
                        this.patriotColors.blue,
                        this.patriotColors.red,
                        this.patriotColors.gold,
                        this.patriotColors.blue
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    r: {
                        display: false
                    }
                }
            }
        });
    }
    
    initPerformanceTimeline() {
        const canvas = document.getElementById('performance-timeline');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Generate time series data
        const timeLabels = [];
        const responseData = [];
        const accuracyData = [];
        const throughputData = [];
        
        const now = new Date();
        for (let i = 23; i >= 0; i--) {
            const time = new Date(now - i * 60 * 60 * 1000);
            timeLabels.push(time.getHours() + ':00');
            
            responseData.push(140 + Math.random() * 40);
            accuracyData.push(95 + Math.random() * 4);
            throughputData.push(800 + Math.random() * 400);
        }
        
        this.charts.performanceTimeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [
                    {
                        label: 'Response Time (ms)',
                        data: responseData,
                        borderColor: this.patriotColors.red,
                        backgroundColor: `${this.patriotColors.red}20`,
                        yAxisID: 'y',
                        tension: 0.3
                    },
                    {
                        label: 'Accuracy (%)',
                        data: accuracyData,
                        borderColor: this.patriotColors.blue,
                        backgroundColor: `${this.patriotColors.blue}20`,
                        yAxisID: 'y1',
                        tension: 0.3
                    },
                    {
                        label: 'Throughput (req/min)',
                        data: throughputData,
                        borderColor: this.patriotColors.gold,
                        backgroundColor: `${this.patriotColors.gold}20`,
                        yAxisID: 'y2',
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#cbd5e0',
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#cbd5e0' }
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: this.patriotColors.red }
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        ticks: { color: this.patriotColors.blue }
                    },
                    y2: {
                        display: false
                    }
                }
            }
        });
    }
    
    initAccuracyDistribution() {
        const canvas = document.getElementById('accuracy-distribution');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        this.charts.accuracyDistribution = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['NLP Tasks', 'Code Gen', 'Data Analysis', 'Problem Solving', 'Creative Tasks', 'Reasoning'],
                datasets: [{
                    label: 'Current Performance',
                    data: [97, 94, 96, 92, 89, 95],
                    borderColor: this.patriotColors.gold,
                    backgroundColor: `${this.patriotColors.gold}30`,
                    borderWidth: 2,
                    pointBackgroundColor: this.patriotColors.gold,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }, {
                    label: 'Target Performance',
                    data: [98, 96, 98, 95, 92, 97],
                    borderColor: this.patriotColors.blue,
                    backgroundColor: `${this.patriotColors.blue}20`,
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointBackgroundColor: this.patriotColors.blue,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#cbd5e0',
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    r: {
                        min: 80,
                        max: 100,
                        ticks: {
                            color: '#9ca3af',
                            stepSize: 5
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#cbd5e0',
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    initInteractionHeatmap() {
        const canvas = document.getElementById('interaction-heatmap');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Generate interaction data
        const interactions = [
            { feature: 'Chat', usage: 45 },
            { feature: 'Code Gen', usage: 32 },
            { feature: 'Data Analysis', usage: 28 },
            { feature: 'Python Demos', usage: 25 },
            { feature: 'News Feed', usage: 18 },
            { feature: 'Statistics', usage: 15 }
        ];
        
        this.charts.interactionHeatmap = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: interactions.map(i => i.feature),
                datasets: [{
                    data: interactions.map(i => i.usage),
                    backgroundColor: (ctx) => {
                        const colors = [
                            this.patriotColors.gold,
                            this.patriotColors.blue,
                            this.patriotColors.red,
                            this.patriotColors.gold,
                            this.patriotColors.blue,
                            this.patriotColors.red
                        ];
                        return colors[ctx.dataIndex % colors.length];
                    },
                    borderRadius: 4,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#cbd5e0' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#cbd5e0' }
                    }
                }
            }
        });
    }
    
    startRealTimeUpdates() {
        // Update charts with new data every 5 seconds
        setInterval(() => {
            this.updateRealTimeData();
        }, 5000);
        
        // Update live metrics every second
        setInterval(() => {
            this.updateLiveMetrics();
        }, 1000);
    }
    
    updateRealTimeData() {
        if (!this.isInitialized) return;
        
        // Update response time chart
        if (this.charts.responseTime) {
            const chart = this.charts.responseTime;
            const newValue = 120 + Math.random() * 60;
            
            chart.data.datasets[0].data.shift();
            chart.data.datasets[0].data.push(newValue);
            chart.update('none');
        }
        
        // Update user activity heatmap
        if (this.charts.userActivity) {
            const chart = this.charts.userActivity;
            chart.data.datasets[0].data.forEach(point => {
                point.v = Math.max(0.1, point.v + (Math.random() - 0.5) * 0.2);
            });
            chart.update('none');
        }
    }
    
    updateLiveMetrics() {
        const metrics = [
            { selector: '[data-value="34"]', range: [25, 45] },
            { selector: '[data-value="67"]', range: [55, 75] },
            { selector: '[data-value="23"]', range: [15, 35] },
            { selector: '[data-value="89"]', range: [80, 95] }
        ];
        
        metrics.forEach(metric => {
            const element = document.querySelector(`.metric-fill${metric.selector}`);
            if (element) {
                const [min, max] = metric.range;
                const newValue = Math.floor(Math.random() * (max - min) + min);
                element.style.width = `${newValue}%`;
                element.setAttribute('data-value', newValue);
                
                // Update the text value
                const valueElement = element.closest('.live-metric').querySelector('.metric-value');
                if (valueElement) {
                    const unit = valueElement.textContent.replace(/[0-9,]/g, '').trim();
                    valueElement.textContent = `${newValue.toLocaleString()}${unit ? ' ' + unit : ''}`;
                }
            }
        });
    }
    
    // Public methods
    getChart(chartId) {
        return this.charts[chartId];
    }
    
    updateChart(chartId, newData) {
        const chart = this.charts[chartId];
        if (chart) {
            chart.data = newData;
            chart.update();
        }
    }
    
    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }
    
    destroy() {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.destroy) {
                chart.destroy();
            }
        });
        this.charts = {};
        this.isInitialized = false;
    }
}

// Initialize charts system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for Chart.js to be available
    setTimeout(() => {
        window.chartsSystem = new ChartsSystem();
    }, 100);
});

// Export for use in other modules
window.ChartsSystem = ChartsSystem;