// EPIC AI DATA VISUALIZATION SYSTEM
// Spectacular animated charts with out-of-this-world effects! 🚀📊

// Global chart instances
let neuralChart, radarChart, cpuChart, gpuChart, speedChart, networkChart, quantumChart, learningChart;
let realTimeInterval;
let isRealTimeActive = false;

// Epic color schemes
const chartColors = {
    primary: '#00D4FF',
    secondary: '#FF6B9D', 
    accent: '#C77DFF',
    success: '#00F5A0',
    warning: '#FFBD39',
    quantum: '#8000FF',
    neural: '#FF0080',
    matrix: '#00FF41'
};

// Gradient generators for epic visual effects
function createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

function createRadialGradient(ctx, color1, color2) {
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// Neural Network Performance Chart - SPECTACULAR!
function animateNeuralChart() {
    const ctx = document.getElementById('neuralChart').getContext('2d');
    
    if (neuralChart) {
        neuralChart.destroy();
    }
    
    console.log('🧠 Initializing neural network performance visualization...');
    
    const epochs = Array.from({length: 150}, (_, i) => i + 1);
    const trainingAcc = epochs.map(e => Math.min(0.95, 0.3 + (0.65 * e / 150) + Math.random() * 0.1));
    const validationAcc = epochs.map(e => Math.min(0.93, 0.25 + (0.68 * e / 150) + Math.random() * 0.08));
    const trainingLoss = epochs.map(e => Math.max(0.02, 2.5 * Math.exp(-e/30) + Math.random() * 0.1));
    const validationLoss = epochs.map(e => Math.max(0.025, 2.8 * Math.exp(-e/28) + Math.random() * 0.12));
    
    neuralChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: epochs,
            datasets: [{
                label: 'Training Accuracy',
                data: trainingAcc,
                borderColor: chartColors.primary,
                backgroundColor: createGradient(ctx, chartColors.primary + '40', chartColors.primary + '00'),
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: chartColors.primary,
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 8
            }, {
                label: 'Validation Accuracy',  
                data: validationAcc,
                borderColor: chartColors.secondary,
                backgroundColor: createGradient(ctx, chartColors.secondary + '40', chartColors.secondary + '00'),
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: chartColors.secondary,
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 8
            }, {
                label: 'Training Loss',
                data: trainingLoss,
                borderColor: chartColors.accent,
                backgroundColor: createGradient(ctx, chartColors.accent + '30', chartColors.accent + '00'),
                borderWidth: 2,
                fill: false,
                tension: 0.3,
                yAxisID: 'y1',
                borderDash: [5, 5]
            }, {
                label: 'Validation Loss',
                data: validationLoss,
                borderColor: chartColors.warning,
                backgroundColor: createGradient(ctx, chartColors.warning + '30', chartColors.warning + '00'),
                borderWidth: 2,
                fill: false,
                tension: 0.3,
                yAxisID: 'y1',
                borderDash: [3, 7]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            size: 12,
                            family: 'Inter'
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    borderColor: chartColors.primary,
                    borderWidth: 1,
                    cornerRadius: 10,
                    displayColors: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Epochs',
                        color: '#FFFFFF',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#B3B3B3'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Accuracy',
                        color: '#FFFFFF',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 1,
                    ticks: {
                        color: '#B3B3B3',
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Loss',
                        color: '#FFFFFF',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 3,
                    ticks: {
                        color: '#B3B3B3'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            animation: {
                duration: 3000,
                easing: 'easeInOutCubic'
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
    
    // Update stats with animation
    animateCountUp('trainAccuracy', 97.3, '%');
    animateCountUp('valLoss', 0.023, '', 3);
    animateCountUp('epochs', 150);
    
    console.log('✅ Neural network chart animated successfully!');
}

// AI Model Comparison Radar Chart - MIND-BLOWING!
function animateRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    if (radarChart) {
        radarChart.destroy();
    }
    
    console.log('📡 Creating AI model comparison radar...');
    
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Performance', 
                'Creativity', 
                'Logic', 
                'Speed', 
                'Accuracy', 
                'Innovation',
                'Efficiency',
                'Scalability'
            ],
            datasets: [{
                label: 'GPT-4',
                data: [95, 92, 88, 85, 93, 90, 87, 89],
                fill: true,
                backgroundColor: chartColors.primary + '20',
                borderColor: chartColors.primary,
                pointBackgroundColor: chartColors.primary,
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 6,
                borderWidth: 3
            }, {
                label: 'Claude',
                data: [90, 88, 95, 82, 91, 85, 92, 86],
                fill: true,
                backgroundColor: chartColors.secondary + '20',
                borderColor: chartColors.secondary,
                pointBackgroundColor: chartColors.secondary,
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 6,
                borderWidth: 3
            }, {
                label: 'Ata AI',
                data: [98, 96, 94, 97, 95, 99, 95, 93],
                fill: true,
                backgroundColor: chartColors.accent + '30',
                borderColor: chartColors.accent,
                pointBackgroundColor: chartColors.accent,
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 3,
                pointRadius: 8,
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            size: 12,
                            family: 'Inter'
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        display: false
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    pointLabels: {
                        color: '#FFFFFF',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                }
            },
            animation: {
                duration: 2500,
                easing: 'easeOutBounce'
            }
        }
    });
    
    console.log('✅ Radar chart comparison complete!');
}

// Real-time Metrics Dashboard - ABSOLUTELY INSANE!
function startRealTimeMetrics() {
    if (isRealTimeActive) return;
    
    isRealTimeActive = true;
    console.log('🔴 Starting real-time AI metrics feed...');
    
    // Initialize all mini charts
    initializeCpuChart();
    initializeGpuChart();
    initializeSpeedChart();
    initializeNetworkChart();
    
    // Start real-time updates
    realTimeInterval = setInterval(() => {
        updateRealTimeCharts();
    }, 1000);
    
    console.log('✅ Real-time metrics dashboard activated!');
}

function stopRealTimeMetrics() {
    if (!isRealTimeActive) return;
    
    isRealTimeActive = false;
    clearInterval(realTimeInterval);
    console.log('⏹️ Real-time metrics stopped.');
}

function initializeCpuChart() {
    const ctx = document.getElementById('cpuChart').getContext('2d');
    const data = Array.from({length: 20}, () => Math.random() * 40 + 50);
    
    cpuChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => i),
            datasets: [{
                data: data,
                borderColor: chartColors.primary,
                backgroundColor: createGradient(ctx, chartColors.primary + '40', chartColors.primary + '00'),
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { display: false },
                y: { 
                    display: false,
                    min: 0,
                    max: 100
                }
            },
            animation: false
        }
    });
}

function initializeGpuChart() {
    const ctx = document.getElementById('gpuChart').getContext('2d');
    const data = Array.from({length: 20}, () => Math.random() * 20 + 70);
    
    gpuChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 20}, (_, i) => i),
            datasets: [{
                data: data,
                backgroundColor: chartColors.secondary + '80',
                borderColor: chartColors.secondary,
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
                x: { display: false },
                y: { 
                    display: false,
                    min: 0,
                    max: 100
                }
            },
            animation: false
        }
    });
}

function initializeSpeedChart() {
    const ctx = document.getElementById('speedChart').getContext('2d');
    const data = Array.from({length: 20}, () => Math.random() * 50 + 100);
    
    speedChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => i),
            datasets: [{
                data: data,
                borderColor: chartColors.success,
                backgroundColor: createGradient(ctx, chartColors.success + '40', chartColors.success + '00'),
                borderWidth: 3,
                fill: true,
                tension: 0.3,
                pointRadius: 2,
                pointBackgroundColor: chartColors.success
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { display: false },
                y: { 
                    display: false,
                    min: 50,
                    max: 200
                }
            },
            animation: false
        }
    });
}

function initializeNetworkChart() {
    const ctx = document.getElementById('networkChart').getContext('2d');
    const data = Array.from({length: 20}, () => Math.random() * 30 + 10);
    
    networkChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Upload', 'Download', 'Available'],
            datasets: [{
                data: [30, 45, 25],
                backgroundColor: [
                    chartColors.warning + '80',
                    chartColors.accent + '80',
                    chartColors.primary + '30'
                ],
                borderColor: [
                    chartColors.warning,
                    chartColors.accent,
                    chartColors.primary
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            cutout: '70%',
            animation: false
        }
    });
}

function updateRealTimeCharts() {
    if (!isRealTimeActive) return;
    
    // Update CPU chart
    if (cpuChart) {
        cpuChart.data.datasets[0].data.shift();
        cpuChart.data.datasets[0].data.push(Math.random() * 40 + 50);
        cpuChart.update('none');
        
        const cpuValue = cpuChart.data.datasets[0].data[19];
        document.getElementById('cpuValue').textContent = Math.round(cpuValue) + '%';
    }
    
    // Update GPU chart
    if (gpuChart) {
        gpuChart.data.datasets[0].data.shift();
        gpuChart.data.datasets[0].data.push(Math.random() * 20 + 70);
        gpuChart.update('none');
        
        const gpuValue = (Math.random() * 3 + 6).toFixed(1);
        document.getElementById('gpuValue').textContent = gpuValue + 'GB';
    }
    
    // Update Speed chart
    if (speedChart) {
        speedChart.data.datasets[0].data.shift();
        speedChart.data.datasets[0].data.push(Math.random() * 50 + 100);
        speedChart.update('none');
        
        const speedValue = Math.round(Math.random() * 50 + 100);
        document.getElementById('speedValue').textContent = speedValue + 'ms';
    }
    
    // Update Network chart
    if (networkChart) {
        const upload = Math.random() * 40 + 10;
        const download = Math.random() * 50 + 20;
        const available = 100 - upload - download;
        
        networkChart.data.datasets[0].data = [upload, download, available];
        networkChart.update('none');
        
        const networkValue = (Math.random() * 5 + 1).toFixed(1);
        document.getElementById('networkValue').textContent = networkValue + 'MB/s';
    }
}

// Quantum Computing Visualization - PURE MAGIC!
function animateQuantumChart() {
    const ctx = document.getElementById('quantumChart').getContext('2d');
    
    if (quantumChart) {
        quantumChart.destroy();
    }
    
    console.log('⚛️ Initializing quantum state visualization...');
    
    // Generate quantum probability data
    const qubits = Array.from({length: 8}, (_, i) => `|${i.toString(2).padStart(3, '0')}⟩`);
    const probabilities = Array.from({length: 8}, () => Math.random());
    const normalizedProbs = probabilities.map(p => p / probabilities.reduce((a, b) => a + b, 0));
    
    quantumChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: qubits,
            datasets: [{
                data: normalizedProbs,
                backgroundColor: [
                    chartColors.primary + '60',
                    chartColors.secondary + '60',
                    chartColors.accent + '60',
                    chartColors.quantum + '60',
                    chartColors.neural + '60',
                    chartColors.matrix + '60',
                    chartColors.success + '60',
                    chartColors.warning + '60'
                ],
                borderColor: [
                    chartColors.primary,
                    chartColors.secondary,
                    chartColors.accent,
                    chartColors.quantum,
                    chartColors.neural,
                    chartColors.matrix,
                    chartColors.success,
                    chartColors.warning
                ],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            size: 10,
                            family: 'JetBrains Mono'
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: {
                        display: false
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            animation: {
                duration: 4000,
                easing: 'easeInOutElastic'
            }
        }
    });
    
    // Update quantum info
    const entanglementValue = (Math.random() * 0.5 + 0.5).toFixed(3);
    document.getElementById('qubitStates').textContent = '|0⟩ + |1⟩ + |+⟩ + |-⟩';
    document.getElementById('entanglement').textContent = entanglementValue;
    
    console.log('✅ Quantum visualization complete!');
}

// AI Learning Progress Chart - INSPIRING!
function animateLearningChart() {
    const ctx = document.getElementById('learningChart').getContext('2d');
    
    if (learningChart) {
        learningChart.destroy();
    }
    
    console.log('🎓 Visualizing AI learning progress...');
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const knowledgeData = [100, 250, 450, 720, 1100, 1550, 2080, 2700, 3420, 4250, 5200, 6300];
    const insightsData = [50, 180, 420, 780, 1260, 1880, 2640, 3560, 4640, 5900, 7340, 9000];
    
    learningChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Knowledge Gained (TB)',
                data: knowledgeData,
                borderColor: chartColors.primary,
                backgroundColor: createGradient(ctx, chartColors.primary + '30', chartColors.primary + '00'),
                borderWidth: 4,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: chartColors.primary,
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 10
            }, {
                label: 'Insights Generated (K)',
                data: insightsData,
                borderColor: chartColors.success,
                backgroundColor: createGradient(ctx, chartColors.success + '30', chartColors.success + '00'),
                borderWidth: 4,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: chartColors.success,
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            size: 12,
                            family: 'Inter'
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '2024 Learning Timeline',
                        color: '#FFFFFF',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#B3B3B3'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Progress Units',
                        color: '#FFFFFF',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#B3B3B3'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            animation: {
                duration: 3500,
                easing: 'easeInOutBack'
            }
        }
    });
    
    // Animate learning stats
    animateCountUp('knowledgeGained', 847, ' TB');
    animateCountUp('insightsGenerated', 12847, '', 0, true);
    
    console.log('✅ Learning progress visualization complete!');
}

// Utility function for number animations
function animateCountUp(elementId, target, suffix = '', decimals = 0, useCommas = false) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = current.toFixed(decimals);
        if (useCommas) {
            displayValue = parseInt(displayValue).toLocaleString();
        }
        
        element.textContent = displayValue + suffix;
    }, 16);
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Epic AI visualization system loaded!');
    
    // Auto-start some charts for immediate wow factor
    setTimeout(() => {
        if (document.getElementById('neuralChart')) {
            animateNeuralChart();
        }
    }, 500);
    
    setTimeout(() => {
        if (document.getElementById('radarChart')) {
            animateRadarChart();
        }
    }, 1000);
    
    setTimeout(() => {
        if (document.getElementById('learningChart')) {
            animateLearningChart();
        }
    }, 1500);
});

// Export functions for global access
window.animateNeuralChart = animateNeuralChart;
window.animateRadarChart = animateRadarChart;
window.startRealTimeMetrics = startRealTimeMetrics;
window.stopRealTimeMetrics = stopRealTimeMetrics;
window.animateQuantumChart = animateQuantumChart;
window.animateLearningChart = animateLearningChart;