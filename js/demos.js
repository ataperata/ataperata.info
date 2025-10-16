// Dynamic Python Code Execution Demos for Ata AI

// AI-powered responses for different demo types
const demoResponses = {
    ml: [
        "🤖 Neural network created successfully!\n📊 Model architecture: 128 → 10 neurons\n⚡ Optimizer: Adam\n🎯 Ready for training...\n\n🔥 Training initiated...\nEpoch 1/10 - Loss: 2.3456 - Accuracy: 0.1234\nEpoch 2/10 - Loss: 1.8923 - Accuracy: 0.3456\nEpoch 3/10 - Loss: 1.4567 - Accuracy: 0.5678\nEpoch 4/10 - Loss: 1.1234 - Accuracy: 0.7123\nEpoch 5/10 - Loss: 0.8901 - Accuracy: 0.8345\nEpoch 6/10 - Loss: 0.6789 - Accuracy: 0.8967\nEpoch 7/10 - Loss: 0.5234 - Accuracy: 0.9234\nEpoch 8/10 - Loss: 0.4123 - Accuracy: 0.9456\nEpoch 9/10 - Loss: 0.3456 - Accuracy: 0.9678\nEpoch 10/10 - Loss: 0.2987 - Accuracy: 0.9789\n\n✅ Training completed!\n🎉 Final accuracy: 97.89%\n📈 Model saved to: ata_neural_network.h5",
        
        "🧠 Advanced Deep Learning Model Training\n================================\n\n🔄 Initializing TensorFlow environment...\n✅ GPU detected: NVIDIA Tesla V100\n🚀 CUDA acceleration enabled\n\n📊 Dataset loaded: 60,000 training samples\n🎯 Target classes: 10 categories\n\n🏗️ Building neural architecture:\n   Layer 1: Dense(128) + ReLU + Dropout(0.2)\n   Layer 2: Dense(64) + ReLU + Dropout(0.3)\n   Layer 3: Dense(32) + ReLU\n   Output: Dense(10) + Softmax\n\n⚡ Compiling with Adam optimizer...\n📈 Learning rate: 0.001\n🎯 Loss function: Categorical Crossentropy\n\n🔥 Training in progress...\n[████████████████████] 100% - ETA: 0s\n\n🎊 Training Results:\n   • Final Loss: 0.0234\n   • Validation Accuracy: 98.76%\n   • Training Time: 2m 34s\n   • Parameters: 125,482\n\n🏆 Model performance exceeds expectations!"
    ],
    
    nlp: [
        "🔤 NLP Sentiment Analysis Results\n" +
        "=".repeat(40) + "\n\n" +
        "Text: I absolutely love this AI technology!\n" +
        "Sentiment: 😊 Positive (Score: 0.89)\n" +
        "Confidence: 94.2%\n" +
        "Key emotions: joy, excitement, admiration\n" +
        "-".repeat(50) + "\n\n" +
        "Text: This is terrible and disappointing.\n" +
        "Sentiment: 😢 Negative (Score: -0.76)\n" +
        "Confidence: 91.8%\n" +
        "Key emotions: disappointment, frustration\n" +
        "-".repeat(50) + "\n\n" +
        "Text: The weather is okay today.\n" +
        "Sentiment: 😐 Neutral (Score: 0.02)\n" +
        "Confidence: 87.3%\n" +
        "Key emotions: neutrality, mild positivity\n\n" +
        "📊 Analysis Summary:\n" +
        "   • Processed: 3 texts\n" +
        "   • Average confidence: 91.1%\n" +
        "   • Processing time: 0.12s\n" +
        "   • Language detected: English\n\n" +
        "🎯 Advanced NLP features activated:\n" +
        "   ✅ Emotion recognition\n" +
        "   ✅ Context analysis\n" +
        "   ✅ Sarcasm detection\n" +
        "   ✅ Multi-language support",
        
        "🤖 Advanced Text Processing Pipeline\n" +
        "=" .repeat(45) + "\n\n" +
        "🔍 Analyzing text corpus...\n" +
        "📚 Documents processed: 1,247\n" +
        "🔤 Total tokens: 284,593\n" +
        "🏷️ Named entities: 3,842\n\n" +
        "🧠 NLP Tasks Completed:\n" +
        "   ✅ Tokenization & Lemmatization\n" +
        "   ✅ POS Tagging (98.7% accuracy)\n" +
        "   ✅ Named Entity Recognition\n" +
        "   ✅ Sentiment Classification\n" +
        "   ✅ Topic Modeling (LDA)\n" +
        "   ✅ Text Summarization\n\n" +
        "📊 Key Insights:\n" +
        "   • Most common sentiment: Positive (67%)\n" +
        "   • Top topics: Technology, Innovation, AI\n" +
        "   • Reading level: College (Grade 14)\n" +
        "   • Keyword density: Optimal\n\n" +
        "🌟 Text Quality Score: 94/100\n" +
        "⚡ Processing speed: 1,247 docs/sec"
    ],
    
    vision: [
        "🔍 Computer Vision Object Detection\n" +
        "=" .repeat(40) + "\n\n" +
        "📸 Processing image: sample_image.jpg\n" +
        "🖼️ Resolution: 1920x1080 pixels\n" +
        "🎯 Detection algorithm: YOLO v8\n\n" +
        "🤖 Objects Detected:\n" +
        "-".repeat(30) + "\n\n" +
        "✅ PERSON\n" +
        "   Confidence: 96.3%\n" +
        "   Bounding Box: [100, 50, 200, 300]\n" +
        "   Attributes: adult, standing, frontal_view\n" +
        "   Pose: confident, arms_crossed\n\n" +
        "✅ CAR\n" +
        "   Confidence: 89.7%\n" +
        "   Bounding Box: [300, 150, 500, 250]\n" +
        "   Type: sedan, blue, modern\n" +
        "   License plate: partially_visible\n\n" +
        "✅ DOG\n" +
        "   Confidence: 92.1%\n" +
        "   Bounding Box: [150, 200, 250, 350]\n" +
        "   Breed: Golden Retriever (87% confidence)\n" +
        "   Activity: sitting, alert\n\n" +
        "📊 Detection Summary:\n" +
        "   • Total objects: 3\n" +
        "   • Processing time: 0.045s\n" +
        "   • Average confidence: 92.7%\n" +
        "   • GPU acceleration: ON\n\n" +
        "🎯 Advanced features activated:\n" +
        "   ✅ Facial recognition\n" +
        "   ✅ Emotion detection\n" +
        "   ✅ Age estimation\n" +
        "   ✅ Real-time tracking",
        
        "🎥 Real-time Video Analysis Pipeline\n" +
        "=" .repeat(42) + "\n\n" +
        "📹 Input: HD video stream (30 FPS)\n" +
        "🖥️ Processing: Edge AI accelerator\n" +
        "⚡ Latency: 16ms per frame\n\n" +
        "🔍 Multi-object Tracking Results:\n" +
        "-".repeat(35) + "\n\n" +
        "👥 People detected: 5\n" +
        "   • ID_001: Walking (confidence: 94%)\n" +
        "   • ID_002: Running (confidence: 91%)\n" +
        "   • ID_003: Standing (confidence: 97%)\n" +
        "   • ID_004: Sitting (confidence: 89%)\n" +
        "   • ID_005: Cycling (confidence: 93%)\n\n" +
        "🚗 Vehicles tracked: 3\n" +
        "   • Car_A: Moving left (68 km/h)\n" +
        "   • Truck_B: Stationary\n" +
        "   • Bike_C: Moving right (25 km/h)\n\n" +
        "🏷️ Scene Understanding:\n" +
        "   • Location: Urban street\n" +
        "   • Weather: Sunny, clear\n" +
        "   • Time of day: Afternoon\n" +
        "   • Traffic density: Moderate\n\n" +
        "🎯 AI Insights:\n" +
        "   • Anomaly detection: None\n" +
        "   • Safety score: 8.7/10\n" +
        "   • Crowd density: Low"
    ],
    
    data: [
        "🤖 AI Model Performance Analysis\n" +
        "=" .repeat(40) + "\n\n" +
        "📊 Dataset Shape: (30, 4)\n" +
        "📈 Average Accuracy: 0.946\n" +
        "⚡ Avg Inference Time: 51.2ms\n" +
        "📉 Final Training Loss: 0.0847\n\n" +
        "🔝 Top 5 Performance Days:\n" +
        "-".repeat(35) + "\n" +
        "2024-01-15    0.979\n" +
        "2024-01-08    0.971\n" +
        "2024-01-22    0.968\n" +
        "2024-01-29    0.965\n" +
        "2024-01-01    0.962\n\n" +
        "📊 Accuracy Statistics:\n" +
        "   Min: 0.891\n" +
        "   Max: 0.979\n" +
        "   Std: 0.023\n" +
        "   Median: 0.948\n" +
        "   Q1: 0.932\n" +
        "   Q3: 0.961\n\n" +
        "🎯 Performance Insights:\n" +
        "   • Model stability: Excellent\n" +
        "   • Overfitting risk: Low\n" +
        "   • Generalization: Strong\n" +
        "   • Recommended action: Deploy to production\n\n" +
        "📈 Trend Analysis:\n" +
        "   • 30-day improvement: +5.7%\n" +
        "   • Best performing time: Afternoon\n" +
        "   • Consistency score: 94/100",
        
        "📊 Advanced Data Science Pipeline\n" +
        "=" .repeat(42) + "\n\n" +
        "🔄 Data Processing Stages:\n" +
        "   ✅ Data ingestion (1.2M records)\n" +
        "   ✅ Quality assessment (99.7% valid)\n" +
        "   ✅ Feature engineering (847 features)\n" +
        "   ✅ Dimensionality reduction (PCA)\n" +
        "   ✅ Train/test split (80/20)\n\n" +
        "🤖 ML Model Comparison:\n" +
        "-".repeat(30) + "\n" +
        "Random Forest:     94.2% ± 0.8%\n" +
        "XGBoost:          96.7% ± 0.5%\n" +
        "Neural Network:   97.8% ± 0.3%\n" +
        "Ensemble Model:   98.4% ± 0.2%\n\n" +
        "🏆 Best Model: Ensemble\n" +
        "   • Cross-validation: 98.4%\n" +
        "   • Test accuracy: 98.1%\n" +
        "   • F1-score: 0.981\n" +
        "   • AUC-ROC: 0.994\n\n" +
        "📈 Feature Importance:\n" +
        "   1. neural_activation (0.234)\n" +
        "   2. learning_rate (0.189)\n" +
        "   3. batch_size (0.156)\n" +
        "   4. dropout_ratio (0.134)\n" +
        "   5. optimizer_type (0.112)\n\n" +
        "🎯 Business Impact:\n" +
        "   • Revenue increase: +23%\n" +
        "   • Cost reduction: -18%\n" +
        "   • Customer satisfaction: +31%"
    ]
};

// Typing animation function
function typeText(element, text, speed = 30) {
    element.textContent = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Add syntax highlighting to code blocks
function highlightCode() {
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// Simulate realistic delays and processing
function simulateProcessing(outputElement, finalText, processingSteps) {
    const steps = [
        "🔄 Initializing AI engine...",
        "📊 Loading datasets...",
        "🧠 Activating neural networks...",
        "⚡ GPU acceleration enabled...",
        "🎯 Processing algorithms...",
        "✨ Generating results..."
    ];
    
    let stepIndex = 0;
    outputElement.textContent = steps[0];
    
    const processInterval = setInterval(() => {
        stepIndex++;
        if (stepIndex < steps.length) {
            outputElement.textContent = steps[stepIndex];
        } else {
            clearInterval(processInterval);
            setTimeout(() => {
                typeText(outputElement, finalText, 15);
            }, 500);
        }
    }, 800);
}

// ML Demo Function
function runMLDemo() {
    const outputElement = document.getElementById('ml-output').querySelector('.output-content');
    const runBtn = document.querySelector('.demo-card .run-btn');
    
    // Disable button and show loading
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';
    runBtn.disabled = true;
    
    // Add some visual effects
    const demoCard = runBtn.closest('.demo-card');
    demoCard.classList.add('animate-cyber-glow');
    
    // Get random response
    const responses = demoResponses.ml;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Simulate processing
    simulateProcessing(outputElement, randomResponse);
    
    // Reset button after completion
    setTimeout(() => {
        runBtn.innerHTML = '<i class="fas fa-play"></i> Run';
        runBtn.disabled = false;
        demoCard.classList.remove('animate-cyber-glow');
    }, 8000);
}

// NLP Demo Function
function runNLPDemo() {
    const outputElement = document.getElementById('nlp-output').querySelector('.output-content');
    const runBtn = document.querySelectorAll('.run-btn')[1];
    
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    runBtn.disabled = true;
    
    const demoCard = runBtn.closest('.demo-card');
    demoCard.classList.add('animate-hologram');
    
    const responses = demoResponses.nlp;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    simulateProcessing(outputElement, randomResponse);
    
    setTimeout(() => {
        runBtn.innerHTML = '<i class="fas fa-play"></i> Run';
        runBtn.disabled = false;
        demoCard.classList.remove('animate-hologram');
    }, 7500);
}

// Computer Vision Demo Function
function runVisionDemo() {
    const outputElement = document.getElementById('vision-output').querySelector('.output-content');
    const runBtn = document.querySelectorAll('.run-btn')[2];
    
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting...';
    runBtn.disabled = true;
    
    const demoCard = runBtn.closest('.demo-card');
    demoCard.classList.add('animate-neural-pulse');
    
    const responses = demoResponses.vision;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    simulateProcessing(outputElement, randomResponse);
    
    setTimeout(() => {
        runBtn.innerHTML = '<i class="fas fa-play"></i> Run';
        runBtn.disabled = false;
        demoCard.classList.remove('animate-neural-pulse');
    }, 9000);
}

// Data Analysis Demo Function
function runDataDemo() {
    const outputElement = document.getElementById('data-output').querySelector('.output-content');
    const runBtn = document.querySelectorAll('.run-btn')[3];
    
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Computing...';
    runBtn.disabled = true;
    
    const demoCard = runBtn.closest('.demo-card');
    demoCard.classList.add('animate-code-scan');
    
    const responses = demoResponses.data;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    simulateProcessing(outputElement, randomResponse);
    
    setTimeout(() => {
        runBtn.innerHTML = '<i class="fas fa-play"></i> Run';
        runBtn.disabled = false;
        demoCard.classList.remove('animate-code-scan');
    }, 8500);
}

// Auto-run demos periodically for demo effect
function startAutoDemo() {
    const demos = [runMLDemo, runNLPDemo, runVisionDemo, runDataDemo];
    let currentDemo = 0;
    
    setInterval(() => {
        // Only auto-run if not currently running
        const runBtns = document.querySelectorAll('.run-btn');
        const anyRunning = Array.from(runBtns).some(btn => btn.disabled);
        
        if (!anyRunning && Math.random() > 0.7) { // 30% chance every interval
            demos[currentDemo]();
            currentDemo = (currentDemo + 1) % demos.length;
        }
    }, 15000); // Every 15 seconds
}

// Progress bar animation for code execution
function showProgress(element, duration = 3000) {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    
    const progressFill = progressBar.querySelector('.progress-fill');
    element.appendChild(progressBar);
    
    // Animate progress
    progressFill.style.width = '0%';
    progressFill.style.transition = `width ${duration}ms ease-out`;
    
    setTimeout(() => {
        progressFill.style.width = '100%';
    }, 100);
    
    // Remove progress bar after completion
    setTimeout(() => {
        progressBar.remove();
    }, duration + 500);
}

// Add code execution sound effects (optional)
function playExecutionSound() {
    // Create audio context for futuristic beeps
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const AudioContextClass = AudioContext || webkitAudioContext;
        const audioContext = new AudioContextClass();
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Initialize demos when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Highlight existing code
    highlightCode();
    
    // Start auto demo after page load
    setTimeout(startAutoDemo, 5000);
    
    // Add CSS for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(0, 212, 255, 0.2);
            border-radius: 2px;
            margin: 10px 0;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00d4ff, #ff6b9d);
            border-radius: 2px;
            transition: width 3s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Add hover effects to demo cards
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Neural Network Visualization Demo
function runNeuralVizDemo() {
    const outputElement = document.getElementById('neural-viz-output').querySelector('.output-content');
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const runBtn = document.querySelectorAll('.run-btn')[4];
    
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Visualizing...';
    runBtn.disabled = true;
    
    const demoCard = runBtn.closest('.demo-card');
    demoCard.classList.add('animate-neural-pulse');
    
    // Simulate neural network visualization
    const response = `🧠 Neural Network Live Inference
${'='.repeat(50)}

⚡ Frame 1/10:
   Input shape: (1, 256)
   Layer 1 activation: 0.3247
   Layer 2 activation: 0.5891
   Layer 3 activation: 0.4123
   Prediction confidence: 0.8934
${'─'.repeat(40)}

⚡ Frame 2/10:
   Input shape: (1, 256)
   Layer 1 activation: 0.4562
   Layer 2 activation: 0.3789
   Layer 3 activation: 0.6234
   Prediction confidence: 0.9187
${'─'.repeat(40)}

⚡ Frame 3/10:
   Input shape: (1, 256)
   Layer 1 activation: 0.2987
   Layer 2 activation: 0.7123
   Layer 3 activation: 0.5456
   Prediction confidence: 0.8756

🚀 Neural network inference completed!
📊 Average activation: 0.4892
🎯 Processing speed: 1,247 fps
⚡ Memory usage: 2.3 GB`;
    
    simulateProcessing(outputElement, response);
    
    // Animate neural network visualization
    if (ctx) {
        animateNeuralNetwork(ctx);
    }
    
    setTimeout(() => {
        runBtn.innerHTML = '<i class="fas fa-play"></i> Visualize';
        runBtn.disabled = false;
        demoCard.classList.remove('animate-neural-pulse');
    }, 9500);
}

// Quantum Computing Demo
function runQuantumDemo() {
    const outputElement = document.getElementById('quantum-output').querySelector('.output-content');
    const runBtn = document.querySelectorAll('.run-btn')[5];
    
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Computing...';
    runBtn.disabled = true;
    
    const demoCard = runBtn.closest('.demo-card');
    demoCard.classList.add('animate-quantum');
    
    const response = `🌌 Quantum AI Processing Initiated
${'='.repeat(45)}

⚛️  Quantum Circuit Created:
   Qubits: 8
   Gates: Hadamard, CNOT, RY, RZ
   Depth: 12

🔬 Quantum State Evolution:
   Step 1: |ψ⟩ = α|0⟩ + β|1⟩, P = 0.3456
   Step 2: |ψ⟩ = α|0⟩ + β|1⟩, P = 0.7891
   Step 3: |ψ⟩ = α|0⟩ + β|1⟩, P = 0.5234
   Step 4: |ψ⟩ = α|0⟩ + β|1⟩, P = 0.9123
   Step 5: |ψ⟩ = α|0⟩ + β|1⟩, P = 0.6789

📊 Measurement Results: [1 0 1 1 0 1 0 1]
🎯 Quantum Advantage: 0.625
⚡ Quantum Supremacy: Achieved
🌟 Entanglement Fidelity: 98.7%

✨ Quantum computation completed with 8 qubits!`;
    
    simulateProcessing(outputElement, response);
    
    setTimeout(() => {
        runBtn.innerHTML = '<i class="fas fa-play"></i> Execute';
        runBtn.disabled = false;
        demoCard.classList.remove('animate-quantum');
    }, 10000);
}

// Robotics Control Demo
function runRoboticsDemo() {
    const outputElement = document.getElementById('robotics-output').querySelector('.output-content');
    const runBtn = document.querySelectorAll('.run-btn')[6];
    
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying...';
    runBtn.disabled = true;
    
    const demoCard = runBtn.closest('.demo-card');
    demoCard.classList.add('animate-ai-thinking');
    
    const response = `🤖 Autonomous Robot Control System Online
${'='.repeat(50)}

🎯 Mission: Navigate to multiple waypoints
   Target waypoints: 4
   AI Systems: ['navigation_nn', 'object_detection', 'path_planning', 'decision_making']

🚀 Navigating to waypoint 1: (10, 5)
   📡 LIDAR: Nearest obstacle at 3.45m
   📷 Camera: 2 objects detected
   🧠 AI Decision: Path clear, proceeding
   ➡️  Moving towards target...
   📍 Distance to target: 11.2m

🚀 Navigating to waypoint 2: (15, 10)
   📡 LIDAR: Nearest obstacle at 1.23m
   📷 Camera: 4 objects detected
   🧠 AI Decision: Obstacle avoidance activated
   ⚡ Executing evasive maneuver...
   📍 Distance to target: 7.8m

🚀 Navigating to waypoint 3: (20, 8)
   📡 LIDAR: Nearest obstacle at 5.67m
   📷 Camera: 1 objects detected
   🧠 AI Decision: Path clear, proceeding
   ➡️  Moving towards target...
   📍 Distance to target: 9.1m

🚀 Navigating to waypoint 4: (25, 15)
   📡 LIDAR: Nearest obstacle at 2.89m
   📷 Camera: 3 objects detected
   🧠 AI Decision: Path clear, proceeding
   ➡️  Moving towards target...
   📍 Distance to target: 12.3m

✅ Mission completed!
   Obstacles navigated: 1
   Final position: (25, 15)
   🏆 Success rate: 100%
   🎯 Navigation accuracy: 99.7%
   ⚡ Mission time: 4m 23s`;
    
    simulateProcessing(outputElement, response);
    
    setTimeout(() => {
        runBtn.innerHTML = '<i class="fas fa-play"></i> Deploy';
        runBtn.disabled = false;
        demoCard.classList.remove('animate-ai-thinking');
    }, 11000);
}

// Neural network visualization animation
function animateNeuralNetwork(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    let frame = 0;
    
    function draw() {
        // Clear canvas
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        // Draw neural network nodes
        const layers = [4, 6, 4, 2];
        const layerSpacing = width / (layers.length + 1);
        
        layers.forEach((nodeCount, layerIndex) => {
            const x = layerSpacing * (layerIndex + 1);
            const nodeSpacing = height / (nodeCount + 1);
            
            for (let i = 0; i < nodeCount; i++) {
                const y = nodeSpacing * (i + 1);
                
                // Animate node activity
                const activity = Math.sin(frame * 0.1 + layerIndex + i) * 0.5 + 0.5;
                const radius = 8 + activity * 4;
                
                // Draw node
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(0, 212, 255, ${0.7 + activity * 0.3})`;
                ctx.fill();
                
                // Draw connections to next layer
                if (layerIndex < layers.length - 1) {
                    const nextLayerX = layerSpacing * (layerIndex + 2);
                    const nextNodeCount = layers[layerIndex + 1];
                    const nextNodeSpacing = height / (nextNodeCount + 1);
                    
                    for (let j = 0; j < nextNodeCount; j++) {
                        const nextY = nextNodeSpacing * (j + 1);
                        
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(nextLayerX, nextY);
                        ctx.strokeStyle = `rgba(255, 107, 157, ${activity * 0.3})`;
                        ctx.lineWidth = 1 + activity * 2;
                        ctx.stroke();
                    }
                }
            }
        });
        
        frame++;
        if (frame < 200) {
            requestAnimationFrame(draw);
        }
    }
    
    draw();
}

// Export functions for global access
window.runMLDemo = runMLDemo;
window.runNLPDemo = runNLPDemo;
window.runVisionDemo = runVisionDemo;
window.runDataDemo = runDataDemo;
window.runNeuralVizDemo = runNeuralVizDemo;
window.runQuantumDemo = runQuantumDemo;
window.runRoboticsDemo = runRoboticsDemo;