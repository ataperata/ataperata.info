/**
 * AtaBot Python Demo System
 * Simulates live Python code execution with beautiful visualizations
 */

class PythonDemoSystem {
    constructor() {
        this.currentDemo = 0;
        this.isExecuting = false;
        this.executionSpeed = 1;
        
        this.demos = [
            {
                id: 'data-viz',
                name: 'Data Visualization',
                icon: '📊',
                code: `# AI Capability Analysis
import matplotlib.pyplot as plt
import numpy as np

# Generate AI capability data
categories = ['NLP', 'Vision', 'Reasoning', 'Code Gen', 'Learning']
performance = [95, 88, 92, 97, 89]
colors = ['#00f0ff', '#ff0080', '#b624ff', '#39ff14', '#ff7700']

# Create stunning bar chart
fig, ax = plt.subplots(figsize=(12, 8))
bars = ax.bar(categories, performance, color=colors, alpha=0.8, 
              edgecolor='white', linewidth=2)

# Add glow effect and animations
for i, (bar, perf) in enumerate(zip(bars, performance)):
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height + 1,
            f'{perf}%', ha='center', va='bottom', 
            fontsize=14, fontweight='bold', color='white')
    
    # Add gradient effect
    bar.set_facecolor(colors[i])

ax.set_title('AtaBot AI Capabilities', fontsize=20, fontweight='bold', 
             color='white', pad=20)
ax.set_ylabel('Performance %', fontsize=14, color='white')
ax.set_ylim(0, 100)

# Style the plot
ax.set_facecolor('#0a0e27')
fig.patch.set_facecolor('#0a0e27')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color('white')
ax.spines['bottom'].set_color('white')
ax.tick_params(colors='white')

plt.tight_layout()
plt.show()

print("✨ Chart generated successfully!")
print(f"🎯 Top capability: {categories[performance.index(max(performance))]} at {max(performance)}%")
print(f"📊 Average performance: {np.mean(performance):.1f}%")`,
                output: this.generateDataVizOutput
            },
            {
                id: 'neural-net',
                name: 'Neural Network',
                icon: '🧠',
                code: `# Neural Network Prediction Demo
import tensorflow as tf
import numpy as np
from sklearn.preprocessing import MinMaxScaler

# Simulate loading a pre-trained model
print("🔄 Loading AtaBot neural network...")
print("📡 Initializing 47 billion parameters...")
print("🧠 Activating consciousness matrix... (just kidding!)")

# Create sample data for sentiment prediction
texts = [
    "AI is absolutely revolutionary!",
    "This technology is concerning.",
    "AtaBot is incredibly helpful!",
    "Machine learning is complex.",
    "The future looks bright!"
]

# Simulate neural network processing
print("\\n🤖 Processing text through neural layers:")
predictions = []

for i, text in enumerate(texts):
    print(f"  Layer {i+1}/5: Processing '{text[:30]}...'")
    
    # Simulate prediction confidence
    if "revolutionary" in text or "helpful" in text or "bright" in text:
        confidence = np.random.uniform(0.85, 0.95)
        sentiment = "POSITIVE"
    elif "concerning" in text:
        confidence = np.random.uniform(0.75, 0.85)
        sentiment = "NEGATIVE"
    else:
        confidence = np.random.uniform(0.60, 0.75)
        sentiment = "NEUTRAL"
    
    predictions.append((sentiment, confidence))
    print(f"    → {sentiment} ({confidence:.2%} confidence)")

print("\\n🎯 Neural Network Analysis Complete!")
print("━" * 50)
for i, (text, (sentiment, conf)) in enumerate(zip(texts, predictions)):
    emoji = "😊" if sentiment == "POSITIVE" else "😐" if sentiment == "NEUTRAL" else "😟"
    print(f"{emoji} Text {i+1}: {sentiment} ({conf:.1%})")

print(f"\\n📈 Model accuracy: 94.7%")
print(f"⚡ Processing speed: {len(texts)*1000:.0f} tokens/second")`,
                output: this.generateNeuralNetOutput
            },
            {
                id: 'image-processing',
                name: 'Image Processing',
                icon: '🖼️',
                code: `# AI Image Enhancement Pipeline
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
import cv2

# Load and analyze image
print("📸 Loading image for AI enhancement...")
image_path = "profile_picture.jpg"

# Simulate image processing steps
print("🔍 Analyzing image composition...")
print("  → Face detection: ✅ 1 face found")
print("  → Resolution: 1920x1080 pixels")
print("  → Color space: RGB")
print("  → Quality score: 87/100")

print("\\n🎨 Applying AI enhancements:")

# Step 1: Noise reduction
print("  1️⃣ AI Noise Reduction")
print("     • Gaussian blur: 0.5px radius")
print("     • Edge preservation: Active")
print("     • Noise level reduced: 73%")

# Step 2: Color enhancement
print("\\n  2️⃣ Color Enhancement")
print("     • Saturation boost: +15%")
print("     • Contrast optimization: +12%")
print("     • White balance: Auto-corrected")

# Step 3: Sharpening
print("\\n  3️⃣ AI Sharpening")
print("     • Unsharp mask: Applied")
print("     • Edge detection: Canny algorithm")
print("     • Detail enhancement: +25%")

# Step 4: Background processing
print("\\n  4️⃣ Background Enhancement")
print("     • Subject detection: 98.5% confidence")
print("     • Background blur: Gaussian 2px")
print("     • Focus enhancement: Portrait mode")

print("\\n✨ Enhancement Pipeline Complete!")
print("📊 Processing Results:")
print(f"  • Quality improvement: +23%")
print(f"  • Processing time: 0.34 seconds")
print(f"  • File size optimized: -15%")
print(f"  • Ready for web deployment! 🚀")

# Simulate saving enhanced image
print("\\n💾 Saving enhanced image...")
print("✅ Enhanced image saved successfully!")`,
                output: this.generateImageProcessingOutput
            },
            {
                id: 'sentiment-ai',
                name: 'Sentiment Analysis',
                icon: '💭',
                code: `# Advanced Sentiment Analysis Engine
from textblob import TextBlob
import numpy as np
from collections import Counter

# Sample social media posts about AI
posts = [
    "AtaBot just solved my coding problem in seconds! 🤖✨",
    "AI technology is advancing so rapidly, it's incredible!",
    "Worried about AI taking over jobs, but excited about possibilities",
    "This chatbot is literally the future of customer service",
    "Machine learning is complex but fascinating to learn",
    "AI assistants are becoming incredibly helpful tools",
    "The ethical implications of AI need serious consideration"
]

print("🧠 AtaBot Sentiment Analysis Engine v2.0")
print("═" * 50)
print(f"📝 Analyzing {len(posts)} social media posts...")

# Analyze sentiment for each post
results = []
total_polarity = 0
emoji_map = {
    'positive': ['😊', '🎉', '✨', '🚀', '💖'],
    'negative': ['😟', '😰', '👎', '💔', '😕'],
    'neutral': ['😐', '🤔', '📝', '⚖️', '🔍']
}

print("\\n🔍 Processing individual posts:")
for i, post in enumerate(posts):
    analysis = TextBlob(post)
    polarity = analysis.sentiment.polarity
    subjectivity = analysis.sentiment.subjectivity
    
    # Determine sentiment category
    if polarity > 0.1:
        category = 'positive'
    elif polarity < -0.1:
        category = 'negative'
    else:
        category = 'neutral'
    
    emoji = np.random.choice(emoji_map[category])
    confidence = (abs(polarity) + 0.5) * 100
    confidence = min(confidence, 95)
    
    results.append({
        'text': post[:50] + '...' if len(post) > 50 else post,
        'sentiment': category.upper(),
        'polarity': polarity,
        'confidence': confidence,
        'emoji': emoji
    })
    
    total_polarity += polarity
    
    print(f"  {emoji} Post {i+1}: {category.upper()} ")
    print(f"     Confidence: {confidence:.1f}%")
    print(f"     Text: '{post[:40]}...'")
    print()

# Generate summary statistics
positive_count = sum(1 for r in results if r['sentiment'] == 'POSITIVE')
negative_count = sum(1 for r in results if r['sentiment'] == 'NEGATIVE')
neutral_count = sum(1 for r in results if r['sentiment'] == 'NEUTRAL')

overall_sentiment = total_polarity / len(posts)

print("📊 ANALYSIS SUMMARY")
print("━" * 30)
print(f"📈 Positive posts: {positive_count} ({positive_count/len(posts)*100:.1f}%)")
print(f"📉 Negative posts: {negative_count} ({negative_count/len(posts)*100:.1f}%)")
print(f"⚖️  Neutral posts: {neutral_count} ({neutral_count/len(posts)*100:.1f}%)")
print(f"\\n🎯 Overall sentiment: {overall_sentiment:.3f}")

if overall_sentiment > 0.1:
    print("💖 Overall mood: POSITIVE - People love AI!")
elif overall_sentiment < -0.1:
    print("😰 Overall mood: NEGATIVE - Some concerns about AI")
else:
    print("🤔 Overall mood: NEUTRAL - Mixed feelings about AI")

print(f"\\n⚡ Analysis completed in 0.23 seconds!")`,
                output: this.generateSentimentOutput
            },
            {
                id: 'sort-visualizer',
                name: 'Sorting Algorithm',
                icon: '🔄',
                code: `# Interactive Bubble Sort Visualization
import time
import random

# Generate random dataset
data = [64, 34, 25, 12, 22, 11, 90, 45, 77, 30]
original_data = data.copy()

print("🔄 Bubble Sort Algorithm Visualization")
print("═" * 45)
print(f"📊 Initial array: {original_data}")
print(f"📏 Array length: {len(data)} elements")
print()

def visualize_array(arr, highlight_i=-1, highlight_j=-1, swapped=False):
    """Create a visual representation of the array"""
    vis = ""
    for i, val in enumerate(arr):
        if i == highlight_i or i == highlight_j:
            if swapped:
                vis += f"[{val:2d}]"  # Highlight swapped elements
            else:
                vis += f"({val:2d})"  # Highlight compared elements
        else:
            vis += f" {val:2d} "
    return vis

def bubble_sort_with_animation(arr):
    n = len(arr)
    comparisons = 0
    swaps = 0
    
    print("🚀 Starting bubble sort animation...")
    print()
    
    for i in range(n):
        print(f"🔄 Pass {i+1}/{n}:")
        swapped_in_pass = False
        
        for j in range(0, n - i - 1):
            comparisons += 1
            
            # Show comparison
            print(f"  🔍 Compare: {arr[j]} vs {arr[j+1]}")
            print(f"     {visualize_array(arr, j, j+1)}")
            
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swaps += 1
                swapped_in_pass = True
                
                print(f"  🔄 Swap needed! {arr[j+1]} > {arr[j]}")
                print(f"     {visualize_array(arr, j, j+1, swapped=True)}")
            else:
                print(f"  ✅ No swap needed")
            
            print(f"     Current: {arr}")
            print()
        
        if not swapped_in_pass:
            print("🎉 Array is sorted! Early termination.")
            break
        
        # Show progress
        sorted_portion = n - i - 1
        progress = ((n - sorted_portion) / n) * 100
        print(f"📊 Progress: {progress:.1f}% | Sorted elements: {n-sorted_portion}")
        print("─" * 40)
        print()
    
    return comparisons, swaps

# Execute sorting algorithm
start_time = time.time()
comparisons, swaps = bubble_sort_with_animation(data)
end_time = time.time()

print("🎯 SORTING COMPLETE!")
print("═" * 30)
print(f"📋 Original: {original_data}")
print(f"✨ Sorted:   {data}")
print()
print("📊 Algorithm Statistics:")
print(f"  🔍 Total comparisons: {comparisons}")
print(f"  🔄 Total swaps: {swaps}")
print(f"  ⏱️  Execution time: {(end_time - start_time)*1000:.2f}ms")
print(f"  📈 Time complexity: O(n²)")
print(f"  💾 Space complexity: O(1)")
print()
print("✅ Bubble sort visualization completed successfully!")`,
                output: this.generateSortingOutput
            },
            {
                id: 'data-stream',
                name: 'Real-time Data Stream',
                icon: '📡',
                code: `# Real-time AI Metrics Streaming Dashboard
import time
import random
import json
from datetime import datetime

print("📡 AtaBot Real-time Metrics Dashboard")
print("═" * 40)
print("🚀 Initializing data streams...")
print()

# Simulate multiple data sources
data_sources = {
    'neural_activity': 'Neural Network Activity',
    'response_time': 'Response Time (ms)',
    'accuracy_rate': 'Prediction Accuracy (%)',
    'active_users': 'Active Users',
    'cpu_usage': 'CPU Usage (%)',
    'memory_usage': 'Memory Usage (%)'
}

# Initialize baseline values
metrics = {
    'neural_activity': 45.7,
    'response_time': 187,
    'accuracy_rate': 94.2,
    'active_users': 2847,
    'cpu_usage': 23.4,
    'memory_usage': 67.8
}

print("📊 Live Streaming Data (10 updates):")
print("┌" + "─" * 70 + "┐")

for tick in range(1, 11):
    # Simulate real-time data fluctuations
    timestamp = datetime.now().strftime("%H:%M:%S.%f")[:-3]
    
    # Update metrics with realistic variations
    metrics['neural_activity'] += random.uniform(-2, 3)
    metrics['response_time'] += random.randint(-20, 15)
    metrics['accuracy_rate'] += random.uniform(-0.5, 0.3)
    metrics['active_users'] += random.randint(-50, 75)
    metrics['cpu_usage'] += random.uniform(-5, 4)
    metrics['memory_usage'] += random.uniform(-2, 3)
    
    # Keep values within realistic bounds
    metrics['neural_activity'] = max(0, min(100, metrics['neural_activity']))
    metrics['response_time'] = max(50, min(500, metrics['response_time']))
    metrics['accuracy_rate'] = max(85, min(99.5, metrics['accuracy_rate']))
    metrics['active_users'] = max(1000, min(5000, metrics['active_users']))
    metrics['cpu_usage'] = max(5, min(95, metrics['cpu_usage']))
    metrics['memory_usage'] = max(40, min(90, metrics['memory_usage']))
    
    print(f"│ 🕐 {timestamp} - Tick #{tick:2d}/10" + " " * 25 + "│")
    
    # Display each metric with status indicators
    for key, name in data_sources.items():
        value = metrics[key]
        
        # Determine status emoji based on metric type and value
        if key == 'accuracy_rate':
            emoji = "🟢" if value > 90 else "🟡" if value > 80 else "🔴"
        elif key == 'response_time':
            emoji = "🟢" if value < 200 else "🟡" if value < 350 else "🔴"
        elif key in ['cpu_usage', 'memory_usage']:
            emoji = "🟢" if value < 70 else "🟡" if value < 85 else "🔴"
        else:
            emoji = "🔵"
        
        # Format value based on type
        if key in ['neural_activity', 'accuracy_rate', 'cpu_usage', 'memory_usage']:
            formatted_value = f"{value:6.1f}%"
        elif key == 'response_time':
            formatted_value = f"{value:6.0f}ms"
        else:
            formatted_value = f"{value:6.0f}"
        
        print(f"│   {emoji} {name:<25}: {formatted_value:>8} │")
    
    print("├" + "─" * 70 + "┤")
    
    # Detect anomalies
    anomalies = []
    if metrics['response_time'] > 400:
        anomalies.append("⚠️ High response time detected")
    if metrics['accuracy_rate'] < 90:
        anomalies.append("⚠️ Accuracy below threshold")
    if metrics['cpu_usage'] > 90:
        anomalies.append("⚠️ CPU usage critical")
    
    if anomalies:
        for anomaly in anomalies:
            print(f"│ {anomaly:<68} │")
        print("├" + "─" * 70 + "┤")
    
    # Simulate network delay
    time.sleep(0.1)

print("└" + "─" * 70 + "┘")
print()
print("📈 STREAMING SUMMARY:")
print(f"  ⚡ Final Response Time: {metrics['response_time']:.0f}ms")
print(f"  🎯 Final Accuracy: {metrics['accuracy_rate']:.1f}%")
print(f"  👥 Active Users: {metrics['active_users']:.0f}")
print(f"  💻 System Load: {metrics['cpu_usage']:.1f}%")
print()
print("✅ Real-time streaming session completed!")
print("📊 All systems operating within normal parameters")`,
                output: this.generateDataStreamOutput
            },
            {
                id: 'ml-training',
                name: 'ML Model Training',
                icon: '🎯',
                code: `# Machine Learning Model Training Simulation
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import time

print("🎯 AtaBot ML Training Pipeline")
print("═" * 35)
print("🚀 Initializing training environment...")

# Simulate dataset preparation
print("\\n📊 Preparing training dataset:")
print("  📁 Loading data: ai_conversation_dataset.json")
print("  📏 Dataset size: 50,000 conversations")
print("  🏷️  Features: 127 (linguistic, semantic, contextual)")
print("  🎯 Classes: 5 (question, request, compliment, complaint, casual)")
print("  ✂️  Train/Test split: 80%/20%")

# Training configuration
epochs = 25
batch_size = 512
learning_rate = 0.001

print(f"\\n⚙️ Training Configuration:")
print(f"  🔄 Epochs: {epochs}")
print(f"  📦 Batch size: {batch_size}")
print(f"  📈 Learning rate: {learning_rate}")
print(f"  🧠 Model: Enhanced Random Forest + Neural Features")

print("\\n🎯 Starting training process...")
print("─" * 50)

# Simulate training epochs
start_time = time.time()
best_accuracy = 0

for epoch in range(1, epochs + 1):
    # Simulate loss and accuracy values
    base_loss = 2.5
    loss_reduction = epoch * 0.08
    noise = np.random.uniform(-0.1, 0.1)
    loss = max(0.1, base_loss - loss_reduction + noise)
    
    base_accuracy = 0.6
    accuracy_improvement = epoch * 0.015
    acc_noise = np.random.uniform(-0.02, 0.02)
    accuracy = min(0.98, base_accuracy + accuracy_improvement + acc_noise)
    
    # Simulate validation accuracy
    val_accuracy = accuracy - np.random.uniform(0.01, 0.05)
    
    # Track best accuracy
    if accuracy > best_accuracy:
        best_accuracy = accuracy
        save_indicator = "💾 [Saved Best Model]"
    else:
        save_indicator = ""
    
    # Calculate progress
    progress = (epoch / epochs) * 100
    progress_bar = "█" * int(progress // 4) + "░" * (25 - int(progress // 4))
    
    print(f"Epoch {epoch:2d}/{epochs} │{progress_bar}│ {progress:5.1f}%")
    print(f"  📉 Loss: {loss:.4f} | 📈 Acc: {accuracy:.3f} | 🔍 Val Acc: {val_accuracy:.3f} {save_indicator}")
    
    # Simulate learning rate decay
    if epoch % 8 == 0:
        learning_rate *= 0.8
        print(f"  📉 Learning rate decayed to: {learning_rate:.6f}")
    
    # Simulate early stopping check
    if epoch > 15 and accuracy > 0.95:
        patience_check = np.random.random()
        if patience_check > 0.7:
            print(f"  ⏹️  Early stopping triggered - No improvement for 3 epochs")
            break
    
    print()
    time.sleep(0.05)  # Simulate training time

training_time = time.time() - start_time

print("🎉 TRAINING COMPLETED!")
print("═" * 30)
print(f"⏱️  Total training time: {training_time:.1f} seconds")
print(f"📈 Best accuracy achieved: {best_accuracy:.3f}")
print(f"🎯 Final validation accuracy: {val_accuracy:.3f}")

# Simulate model evaluation
print("\\n🔍 Model Evaluation on Test Set:")
test_metrics = {
    'accuracy': 0.943,
    'precision': 0.941,
    'recall': 0.938,
    'f1_score': 0.939
}

for metric, value in test_metrics.items():
    emoji = "🎯" if metric == 'accuracy' else "⚖️" if metric == 'precision' else "🔍" if metric == 'recall' else "🏆"
    print(f"  {emoji} {metric.capitalize()}: {value:.3f}")

print("\\n📊 Confusion Matrix Preview:")
print("     Predicted →")
print("  A  │ 945   12    8    2    3  │")
print("  c  │   8  892   15    7    1  │")  
print("  t  │   5   18  876   11    2  │")
print("  u  │   3    9   14  891    8  │")
print("  a  │   2    1    4    6  903  │")
print("  l  ↓")

print("\\n💾 Model Deployment:")
print("  ✅ Model saved to: atabot_classifier_v2.pkl")
print("  🚀 Ready for production deployment!")
print(f"  📊 Model size: 47.2 MB")
print(f"  ⚡ Inference speed: ~0.003ms per prediction")
print("\\n🎉 ML training pipeline completed successfully!")`,
                output: this.generateMLTrainingOutput
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupDemoControls();
        this.setupDemoSelector();
        this.loadDemo(0);
    }
    
    setupDemoControls() {
        const playBtn = document.getElementById('play-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const restartBtn = document.getElementById('restart-btn');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => this.executeDemo());
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.pauseDemo());
        }
        
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartDemo());
        }
    }
    
    setupDemoSelector() {
        const demoButtons = document.querySelectorAll('.demo-btn');
        demoButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.loadDemo(index);
            });
        });
    }
    
    loadDemo(index) {
        if (index < 0 || index >= this.demos.length) return;
        
        this.currentDemo = index;
        const demo = this.demos[index];
        
        // Update active button
        document.querySelectorAll('.demo-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        
        // Update code content
        const codeElement = document.getElementById('demo-code');
        if (codeElement) {
            codeElement.textContent = demo.code;
            this.highlightCode(codeElement);
        }
        
        // Update line numbers
        this.updateLineNumbers();
        
        // Clear output
        this.clearOutput();
        
        // Update output status
        this.updateOutputStatus('Ready');
    }
    
    highlightCode(codeElement) {
        // Apply syntax highlighting using Prism.js
        if (window.Prism) {
            Prism.highlightElement(codeElement);
        }
    }
    
    updateLineNumbers() {
        const codeElement = document.getElementById('demo-code');
        const lineNumbersElement = document.getElementById('line-numbers');
        
        if (codeElement && lineNumbersElement) {
            const lines = codeElement.textContent.split('\\n');
            const numbers = lines.map((_, i) => i + 1).join('\\n');
            lineNumbersElement.textContent = numbers;
        }
    }
    
    async executeDemo() {
        if (this.isExecuting) return;
        
        this.isExecuting = true;
        const demo = this.demos[this.currentDemo];
        
        // Update status
        this.updateOutputStatus('Executing', 'executing');
        
        // Clear previous output
        this.clearOutput();
        
        // Show execution animation
        this.showExecutionAnimation();
        
        try {
            // Simulate code execution
            await demo.output.call(this);
            
            this.updateOutputStatus('Completed', 'completed');
        } catch (error) {
            console.error('Demo execution error:', error);
            this.showError('Execution failed. Please try again.');
            this.updateOutputStatus('Error', 'error');
        } finally {
            this.isExecuting = false;
        }
    }
    
    pauseDemo() {
        if (this.isExecuting) {
            this.isExecuting = false;
            this.updateOutputStatus('Paused', 'paused');
        }
    }
    
    restartDemo() {
        this.isExecuting = false;
        this.clearOutput();
        this.updateOutputStatus('Ready');
    }
    
    clearOutput() {
        const outputContent = document.getElementById('output-content');
        if (outputContent) {
            outputContent.innerHTML = `
                <div class="output-placeholder">
                    <div class="placeholder-icon">⚡</div>
                    <p>Click "Run Code" to see AtaBot in action!</p>
                </div>
            `;
        }
    }
    
    updateOutputStatus(status, className = '') {
        const statusElement = document.getElementById('output-status');
        if (statusElement) {
            statusElement.textContent = status;
            statusElement.className = `output-status ${className}`;
        }
    }
    
    showExecutionAnimation() {
        const outputContent = document.getElementById('output-content');
        if (outputContent) {
            outputContent.innerHTML = `
                <div class="execution-loading">
                    <div class="loading-spinner"></div>
                    <p>Executing Python code...</p>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                </div>
            `;
        }
    }
    
    showError(message) {
        const outputContent = document.getElementById('output-content');
        if (outputContent) {
            outputContent.innerHTML = `
                <div class="execution-error">
                    <div class="error-icon">❌</div>
                    <p>${message}</p>
                </div>
            `;
        }
    }
    
    async displayOutput(content, delay = 50) {
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return;
        
        outputContent.innerHTML = '<div class="terminal-output"></div>';
        const terminal = outputContent.querySelector('.terminal-output');
        
        const lines = content.split('\\n');
        
        for (const line of lines) {
            if (!this.isExecuting) break;
            
            const lineElement = document.createElement('div');
            lineElement.className = 'terminal-line';
            lineElement.textContent = line;
            terminal.appendChild(lineElement);
            
            // Scroll to bottom
            outputContent.scrollTop = outputContent.scrollHeight;
            
            await this.sleep(delay);
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms / this.executionSpeed));
    }
    
    // Demo output generators
    async generateDataVizOutput() {
        await this.displayOutput(`Executing: AI Capability Analysis
>>> import matplotlib.pyplot as plt
>>> import numpy as np

Generating AI capability data...
Categories: ['NLP', 'Vision', 'Reasoning', 'Code Gen', 'Learning']
Performance: [95, 88, 92, 97, 89]

Creating stunning bar chart...
✨ Chart generated successfully!
🎯 Top capability: Code Gen at 97%
📊 Average performance: 92.2%

[Chart Display]
╔══════════════════════════════════╗
║     AtaBot AI Capabilities      ║
╠══════════════════════════════════╣
║ NLP      ████████████████ 95%   ║
║ Vision   ███████████████  88%   ║  
║ Reasoning ████████████████ 92%  ║
║ Code Gen ████████████████▌ 97%  ║
║ Learning ███████████████  89%   ║
╚══════════════════════════════════╝

Performance Analysis Complete! 🚀`);
    }
    
    async generateNeuralNetOutput() {
        await this.displayOutput(`🔄 Loading AtaBot neural network...
📡 Initializing 47 billion parameters...
🧠 Activating consciousness matrix... (just kidding!)

🤖 Processing text through neural layers:
  Layer 1/5: Processing 'AI is absolutely revolutionary!...'
    → POSITIVE (89% confidence)
  Layer 2/5: Processing 'This technology is concerning...'
    → NEGATIVE (78% confidence)
  Layer 3/5: Processing 'AtaBot is incredibly helpful!...'
    → POSITIVE (92% confidence)
  Layer 4/5: Processing 'Machine learning is complex...'
    → NEUTRAL (67% confidence)
  Layer 5/5: Processing 'The future looks bright!...'
    → POSITIVE (87% confidence)

🎯 Neural Network Analysis Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
😊 Text 1: POSITIVE (89.0%)
😟 Text 2: NEGATIVE (78.0%)
😊 Text 3: POSITIVE (92.0%)
😐 Text 4: NEUTRAL (67.0%)
😊 Text 5: POSITIVE (87.0%)

📈 Model accuracy: 94.7%
⚡ Processing speed: 5000 tokens/second`);
    }
    
    async generateImageProcessingOutput() {
        await this.displayOutput(`📸 Loading image for AI enhancement...

🔍 Analyzing image composition...
  → Face detection: ✅ 1 face found
  → Resolution: 1920x1080 pixels
  → Color space: RGB
  → Quality score: 87/100

🎨 Applying AI enhancements:
  1️⃣ AI Noise Reduction
     • Gaussian blur: 0.5px radius
     • Edge preservation: Active
     • Noise level reduced: 73%

  2️⃣ Color Enhancement
     • Saturation boost: +15%
     • Contrast optimization: +12%
     • White balance: Auto-corrected

  3️⃣ AI Sharpening
     • Unsharp mask: Applied
     • Edge detection: Canny algorithm
     • Detail enhancement: +25%

  4️⃣ Background Enhancement
     • Subject detection: 98.5% confidence
     • Background blur: Gaussian 2px
     • Focus enhancement: Portrait mode

✨ Enhancement Pipeline Complete!
📊 Processing Results:
  • Quality improvement: +23%
  • Processing time: 0.34 seconds
  • File size optimized: -15%
  • Ready for web deployment! 🚀

💾 Saving enhanced image...
✅ Enhanced image saved successfully!`);
    }
    
    async generateSentimentOutput() {
        await this.displayOutput(`🧠 AtaBot Sentiment Analysis Engine v2.0
═══════════════════════════════════════════════
📝 Analyzing 7 social media posts...

🔍 Processing individual posts:
  😊 Post 1: POSITIVE 
     Confidence: 89.4%
     Text: 'AtaBot just solved my coding problem i...'

  ✨ Post 2: POSITIVE 
     Confidence: 91.2%
     Text: 'AI technology is advancing so rapidly...'

  🤔 Post 3: NEUTRAL 
     Confidence: 72.6%
     Text: 'Worried about AI taking over jobs, bu...'

  🚀 Post 4: POSITIVE 
     Confidence: 87.8%
     Text: 'This chatbot is literally the future...'

  📝 Post 5: NEUTRAL 
     Confidence: 68.4%
     Text: 'Machine learning is complex but fasci...'

  💖 Post 6: POSITIVE 
     Confidence: 85.9%
     Text: 'AI assistants are becoming incredibly...'

  ⚖️ Post 7: NEUTRAL 
     Confidence: 74.3%
     Text: 'The ethical implications of AI need s...'

📊 ANALYSIS SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 Positive posts: 4 (57.1%)
📉 Negative posts: 0 (0.0%)
⚖️  Neutral posts: 3 (42.9%)

🎯 Overall sentiment: 0.387

💖 Overall mood: POSITIVE - People love AI!

⚡ Analysis completed in 0.23 seconds!`);
    }
    
    async generateSortingOutput() {
        await this.displayOutput(`🔄 Bubble Sort Algorithm Visualization
═══════════════════════════════════════════════
📊 Initial array: [64, 34, 25, 12, 22, 11, 90, 45, 77, 30]
📏 Array length: 10 elements

🚀 Starting bubble sort animation...

🔄 Pass 1/10:
  🔍 Compare: 64 vs 34
     64 (34) 25  12  22  11  90  45  77  30
  🔄 Swap needed! 34 > 64
     [34][64] 25  12  22  11  90  45  77  30
     Current: [34, 64, 25, 12, 22, 11, 90, 45, 77, 30]

  🔍 Compare: 64 vs 25
     34 (64)(25) 12  22  11  90  45  77  30
  🔄 Swap needed! 25 > 64
     34 [25][64] 12  22  11  90  45  77  30

[... continuing sort process ...]

📊 Progress: 90.0% | Sorted elements: 9
────────────────────────────────────

🎯 SORTING COMPLETE!
═══════════════════════════════════
📋 Original: [64, 34, 25, 12, 22, 11, 90, 45, 77, 30]
✨ Sorted:   [11, 12, 22, 25, 30, 34, 45, 64, 77, 90]

📊 Algorithm Statistics:
  🔍 Total comparisons: 45
  🔄 Total swaps: 27
  ⏱️  Execution time: 12.34ms
  📈 Time complexity: O(n²)
  💾 Space complexity: O(1)

✅ Bubble sort visualization completed successfully!`);
    }
    
    async generateDataStreamOutput() {
        await this.displayOutput(`📡 AtaBot Real-time Metrics Dashboard
════════════════════════════════════════
🚀 Initializing data streams...

📊 Live Streaming Data (10 updates):
┌──────────────────────────────────────────────────────────────────────┐
│ 🕐 14:32:15.247 - Tick # 1/10                         │
│   🔵 Neural Network Activity        :   47.2%         │
│   🟢 Response Time (ms)            :    167ms         │
│   🟢 Prediction Accuracy (%)       :   94.5%         │
│   🔵 Active Users                  :   2872           │
│   🟢 CPU Usage (%)                 :   25.1%         │
│   🟡 Memory Usage (%)              :   69.3%         │
├──────────────────────────────────────────────────────────────────────┤
│ 🕐 14:32:15.347 - Tick # 2/10                         │
│   🔵 Neural Network Activity        :   49.8%         │
│   🟢 Response Time (ms)            :    152ms         │
│   🟢 Prediction Accuracy (%)       :   94.8%         │
│   🔵 Active Users                  :   2901           │
│   🟢 CPU Usage (%)                 :   28.7%         │
│   🟡 Memory Usage (%)              :   71.2%         │
├──────────────────────────────────────────────────────────────────────┤

[... continuing stream ...]

📈 STREAMING SUMMARY:
  ⚡ Final Response Time: 143ms
  🎯 Final Accuracy: 95.2%
  👥 Active Users: 3047
  💻 System Load: 31.4%

✅ Real-time streaming session completed!
📊 All systems operating within normal parameters`);
    }
    
    async generateMLTrainingOutput() {
        await this.displayOutput(`🎯 AtaBot ML Training Pipeline
═══════════════════════════════════
🚀 Initializing training environment...

📊 Preparing training dataset:
  📁 Loading data: ai_conversation_dataset.json
  📏 Dataset size: 50,000 conversations
  🏷️  Features: 127 (linguistic, semantic, contextual)
  🎯 Classes: 5 (question, request, compliment, complaint, casual)
  ✂️  Train/Test split: 80%/20%

⚙️ Training Configuration:
  🔄 Epochs: 25
  📦 Batch size: 512
  📈 Learning rate: 0.001
  🧠 Model: Enhanced Random Forest + Neural Features

🎯 Starting training process...
──────────────────────────────────────────────────
Epoch  1/25 │█░░░░░░░░░░░░░░░░░░░░░░░░░│   4.0%
  📉 Loss: 2.4201 | 📈 Acc: 0.615 | 🔍 Val Acc: 0.598

Epoch  5/25 │█████░░░░░░░░░░░░░░░░░░░░░│  20.0%
  📉 Loss: 1.8744 | 📈 Acc: 0.689 | 🔍 Val Acc: 0.671 💾 [Saved Best Model]

Epoch 10/25 │██████████░░░░░░░░░░░░░░░░│  40.0%
  📉 Loss: 1.2156 | 📈 Acc: 0.798 | 🔍 Val Acc: 0.784 💾 [Saved Best Model]

Epoch 18/25 │██████████████████░░░░░░░░│  72.0%
  📉 Loss: 0.4321 | 📈 Acc: 0.943 | 🔍 Val Acc: 0.931 💾 [Saved Best Model]

🎉 TRAINING COMPLETED!
══════════════════════════════════
⏱️  Total training time: 2.3 seconds
📈 Best accuracy achieved: 0.951
🎯 Final validation accuracy: 0.943

🔍 Model Evaluation on Test Set:
  🎯 Accuracy: 0.943
  ⚖️ Precision: 0.941
  🔍 Recall: 0.938
  🏆 F1_score: 0.939

💾 Model Deployment:
  ✅ Model saved to: atabot_classifier_v2.pkl
  🚀 Ready for production deployment!
  📊 Model size: 47.2 MB
  ⚡ Inference speed: ~0.003ms per prediction

🎉 ML training pipeline completed successfully!`);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.pythonDemoSystem = new PythonDemoSystem();
});

// Add CSS for execution effects
const demoStyles = document.createElement('style');
demoStyles.textContent = `
    .execution-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 20px;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 240, 255, 0.3);
        border-top: 4px solid var(--neon-cyan);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    .loading-bar {
        width: 200px;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
    }
    
    .loading-progress {
        height: 100%;
        background: var(--gradient-primary);
        border-radius: 3px;
        animation: loadingProgress 3s ease infinite;
    }
    
    @keyframes loadingProgress {
        0% { width: 0%; }
        50% { width: 70%; }
        100% { width: 100%; }
    }
    
    .terminal-output {
        font-family: var(--font-mono);
        font-size: 13px;
        line-height: 1.4;
        color: var(--neon-lime);
    }
    
    .terminal-line {
        margin-bottom: 2px;
        opacity: 0;
        animation: fadeInLine 0.3s ease forwards;
    }
    
    @keyframes fadeInLine {
        to {
            opacity: 1;
        }
    }
    
    .execution-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 15px;
        color: var(--neon-red);
    }
    
    .error-icon {
        font-size: 48px;
    }
    
    .output-status.executing {
        background: rgba(0, 240, 255, 0.2);
        color: var(--neon-cyan);
        border-color: var(--neon-cyan);
    }
    
    .output-status.completed {
        background: rgba(57, 255, 20, 0.2);
        color: var(--neon-lime);
        border-color: var(--neon-lime);
    }
    
    .output-status.error {
        background: rgba(255, 0, 60, 0.2);
        color: var(--neon-red);
        border-color: var(--neon-red);
    }
    
    .output-status.paused {
        background: rgba(255, 119, 0, 0.2);
        color: var(--neon-orange);
        border-color: var(--neon-orange);
    }
`;
document.head.appendChild(demoStyles);