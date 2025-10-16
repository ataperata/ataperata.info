// ============================================
// GLOBAL VARIABLES & INITIALIZATION
// ============================================

let pyodide = null;
let voiceEnabled = false;
const synth = window.speechSynthesis;

// ============================================
// LOADING SCREEN
// ============================================

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('ai-loader').style.display = 'none';
    }, 1500);
    
    // Initialize all features
    initWebGLBackground();
    initPyodide();
    initCharts();
    loadNewsFeeds();
    initChatbot();
    initCounters();
    updateLineNumbers();
});

// ============================================
// WEBGL 3D BACKGROUND
// ============================================

function initWebGLBackground() {
    const container = document.getElementById('webgl-background');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.08,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add glowing spheres
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.6
    });
    
    for(let i = 0; i < 20; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        scene.add(sphere);
    }
    
    camera.position.z = 30;
    
    // Animation
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;
        
        camera.position.x = mouseX * 5;
        camera.position.y = mouseY * 5;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// PYTHON CODE EDITOR (PYODIDE)
// ============================================

async function initPyodide() {
    const statusElement = document.getElementById('pyodideStatus');
    try {
        statusElement.textContent = 'Loading Python environment...';
        pyodide = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });
        statusElement.textContent = 'Python Ready! 🐍';
        statusElement.style.color = '#10b981';
    } catch (error) {
        statusElement.textContent = 'Python unavailable (offline mode)';
        statusElement.style.color = '#ef4444';
        console.error('Pyodide load error:', error);
    }
}

function updateLineNumbers() {
    const editor = document.getElementById('codeEditor');
    const lineNumbers = document.getElementById('lineNumbers');
    const lines = editor.value.split('\n').length;
    lineNumbers.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('\n');
}

document.getElementById('codeEditor').addEventListener('input', updateLineNumbers);
document.getElementById('codeEditor').addEventListener('scroll', function() {
    document.getElementById('lineNumbers').scrollTop = this.scrollTop;
});

// Keyboard shortcuts
document.getElementById('codeEditor').addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        runPythonCode();
    }
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        e.target.value = e.target.value.substring(0, start) + '    ' + e.target.value.substring(end);
        e.target.selectionStart = e.target.selectionEnd = start + 4;
        updateLineNumbers();
    }
});

async function runPythonCode() {
    const code = document.getElementById('codeEditor').value;
    const output = document.getElementById('codeOutput');
    const runBtn = document.getElementById('runCode');
    
    runBtn.disabled = true;
    runBtn.innerHTML = '<span>Running...</span>';
    
    output.innerHTML = '<div class="output-line">Executing code...</div>';
    
    if (!pyodide) {
        output.innerHTML = '<div class="output-line output-error">❌ Python environment not loaded. Please refresh the page.</div>';
        runBtn.disabled = false;
        runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>Run Code</span>';
        return;
    }
    
    try {
        // Redirect stdout
        await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);
        
        // Run user code
        await pyodide.runPythonAsync(code);
        
        // Get output
        const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
        
        if (stdout) {
            const lines = stdout.trim().split('\n');
            output.innerHTML = lines.map(line => 
                `<div class="output-line output-success">▶ ${escapeHtml(line)}</div>`
            ).join('');
        } else {
            output.innerHTML = '<div class="output-line">✅ Code executed successfully (no output)</div>';
        }
        
        // Add animation
        document.querySelectorAll('.output-line').forEach((line, index) => {
            line.style.animationDelay = `${index * 0.05}s`;
        });
        
    } catch (error) {
        output.innerHTML = `<div class="output-line output-error">❌ Error:\n${escapeHtml(error.message)}</div>`;
    }
    
    runBtn.disabled = false;
    runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>Run Code</span><span class="btn-shortcut">Ctrl+Enter</span>';
}

function clearOutput() {
    document.getElementById('codeOutput').innerHTML = `
        <div class="output-welcome">
            <div class="welcome-icon">🎯</div>
            <p>Output cleared! Ready for next run.</p>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Code Examples
const codeExamples = [
    `# Hello World Example 🌍
print("Hello AI World! 🤖")
print("Welcome to Ata's Python Lab!")
print("=" * 30)
for i in range(3):
    print(f"Iteration {i + 1}")`,
    
    `# Random Choice Example 🎲
import random

options = ["creativity", "innovation", "inspiration", "brilliance"]
wisdom = [
    "AI is just fancy math with attitude",
    "Coffee is the real artificial intelligence",
    "Debugging is 90% of coding, coffee is the other 90%",
    "There are only 10 types of people: those who understand binary and those who don't"
]

print(f"Today's vibe: {random.choice(options)}")
print(f"AI Wisdom: {random.choice(wisdom)}")`,
    
    `# Math Magic Example 🔢
import math

print("🎯 Mathematical Magic Show!")
print("=" * 40)

numbers = [1, 2, 3, 4, 5]
print(f"Numbers: {numbers}")
print(f"Sum: {sum(numbers)}")
print(f"Average: {sum(numbers) / len(numbers)}")
print(f"Square roots: {[round(math.sqrt(n), 2) for n in numbers]}")

# Fibonacci sequence
fib = [0, 1]
for i in range(8):
    fib.append(fib[-1] + fib[-2])
print(f"Fibonacci: {fib}")`,
    
    `# ASCII Art Example 🎨
print("🎨 ASCII Art Gallery")
print("=" * 40)

# Robot
print("""
    [O_O]
     |=|
    /| |\\
     | |
    /   \\
""")

# Heart
print("  ♥♥   ♥♥")
print(" ♥  ♥ ♥  ♥")
print("♥    ♥    ♥")
print(" ♥       ♥")
print("  ♥     ♥")
print("   ♥   ♥")
print("    ♥ ♥")
print("     ♥")

print("Made with 99.9% AI and 0.1% coffee! ☕")`
];

function loadExample(index) {
    document.getElementById('codeEditor').value = codeExamples[index];
    updateLineNumbers();
}

// ============================================
// DATA VISUALIZATIONS (CHARTS)
// ============================================

function initCharts() {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    color: '#f1f5f9',
                    font: {
                        size: 12,
                        family: 'Inter'
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    };
    
    // AI Adoption Trends (Line Chart)
    const adoptionCtx = document.getElementById('adoptionChart').getContext('2d');
    new Chart(adoptionCtx, {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'AI Adoption Rate (%)',
                data: [15, 23, 35, 48, 62, 78, 89],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 8
            }]
        },
        options: chartOptions
    });
    
    // Popular ML Frameworks (Bar Chart)
    const frameworkCtx = document.getElementById('frameworkChart').getContext('2d');
    new Chart(frameworkCtx, {
        type: 'bar',
        data: {
            labels: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Hugging Face'],
            datasets: [{
                label: 'Popularity Score',
                data: [92, 95, 78, 72, 88],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
                ],
                borderColor: [
                    '#6366f1',
                    '#8b5cf6',
                    '#ec4899',
                    '#f59e0b',
                    '#10b981'
                ],
                borderWidth: 2
            }]
        },
        options: {
            ...chartOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#94a3b8' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    ticks: { color: '#94a3b8' },
                    grid: { display: false }
                }
            }
        }
    });
    
    // ML Application Areas (Pie Chart)
    const applicationCtx = document.getElementById('applicationChart').getContext('2d');
    new Chart(applicationCtx, {
        type: 'doughnut',
        data: {
            labels: ['NLP', 'Computer Vision', 'Recommender Systems', 'Predictive Analytics', 'Others'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
                ],
                borderColor: '#0f172a',
                borderWidth: 3
            }]
        },
        options: {
            ...chartOptions,
            scales: {}
        }
    });
    
    // Programming Language Popularity (Radar Chart)
    const languageCtx = document.getElementById('languageChart').getContext('2d');
    new Chart(languageCtx, {
        type: 'radar',
        data: {
            labels: ['Python', 'JavaScript', 'R', 'Julia', 'Java', 'C++'],
            datasets: [{
                label: 'AI/ML Usage',
                data: [98, 75, 68, 45, 62, 58],
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: '#6366f1',
                borderWidth: 3,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#6366f1'
            }]
        },
        options: {
            ...chartOptions,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { color: '#94a3b8' },
                    ticks: { color: '#94a3b8', backdropColor: 'transparent' }
                }
            }
        }
    });
}

// ============================================
// NEWS FEED
// ============================================

async function loadNewsFeeds() {
    const newsGrid = document.getElementById('newsGrid');
    
    // Simulated news data (in production, this would fetch from RSS/API)
    const newsItems = [
        {
            badge: 'hot',
            title: 'GPT-5 Rumored to Launch with Revolutionary Multimodal Capabilities',
            description: 'Industry insiders suggest the next generation of language models will blur the lines between text, image, and audio processing...',
            source: 'AI News',
            time: '2 hours ago',
            category: 'llm',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'
        },
        {
            badge: 'trending',
            title: 'Python 3.13 Beta Released with Major Performance Improvements',
            description: 'The latest Python beta shows up to 40% speed improvements in certain workloads, making it even better for AI development...',
            source: 'Python Weekly',
            time: '5 hours ago',
            category: 'python',
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400'
        },
        {
            badge: 'interesting',
            title: 'New Prompt Engineering Techniques Boost AI Accuracy by 30%',
            description: 'Researchers discover that structured prompting with chain-of-thought reasoning dramatically improves LLM performance...',
            source: 'AI Research',
            time: '1 day ago',
            category: 'prompts',
            image: 'https://images.unsplash.com/photo-1655635949384-f737c5133dfe?w=400'
        },
        {
            badge: 'hot',
            title: 'Meta Releases Open Source LLaMA 3 with 500B Parameters',
            description: 'The new open-source model rivals GPT-4 in benchmarks while being freely available for research and commercial use...',
            source: 'Tech News',
            time: '3 hours ago',
            category: 'ai',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400'
        },
        {
            badge: 'trending',
            title: 'PyTorch 2.5 Introduces Native Support for Apple Silicon',
            description: 'Deep learning on Mac just got faster with optimized Metal Performance Shaders integration...',
            source: 'ML Weekly',
            time: '8 hours ago',
            category: 'python',
            image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400'
        },
        {
            badge: 'interesting',
            title: 'Study: AI Chatbots Show Improved Reasoning with Humor',
            description: 'Research indicates that AI models trained with humor and self-awareness produce more nuanced, human-like responses...',
            source: 'AI Psychology',
            time: '12 hours ago',
            category: 'ai',
            image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400'
        }
    ];
    
    // Render news items
    newsGrid.innerHTML = newsItems.map((item, index) => `
        <div class="news-card" data-category="${item.category}" style="animation-delay: ${index * 0.1}s">
            <img src="${item.image}" alt="${item.title}" class="news-image" onerror="this.src='https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'">
            <div class="news-content">
                <span class="news-badge ${item.badge}">${item.badge.toUpperCase()}</span>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-description">${item.description}</p>
                <div class="news-meta">
                    <span>${item.source}</span>
                    <span>${item.time}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // News filtering
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            document.querySelectorAll('.news-card').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// AI CHATBOT
// ============================================

function initChatbot() {
    const toggle = document.getElementById('chatbotToggle');
    const panel = document.getElementById('chatbotPanel');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessage');
    const voiceToggle = document.getElementById('voiceToggle');
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) {
            document.querySelector('.chatbot-badge').style.display = 'none';
        }
    });
    
    voiceToggle.addEventListener('click', () => {
        voiceEnabled = !voiceEnabled;
        voiceToggle.classList.toggle('active');
        if (voiceEnabled) {
            speakText("Voice enabled! I can now talk to you.");
        }
    });
    
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage(response, 'bot');
        
        if (voiceEnabled) {
            speakText(response);
        }
    }, 1000);
}

function addChatMessage(text, type) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const avatar = type === 'bot' ? '🤖' : '👤';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Personality-rich responses
    const responses = {
        greetings: [
            "Hey there! I'm Ata's AI assistant, powered by vibes and caffeine! ☕ How can I help?",
            "Hello! I'm here to assist, though I can't promise I'm smarter than a rubber duck. 🦆 What do you need?",
            "Hi! Ready to chat about code, AI, or the existential crisis of debugging. What's up?"
        ],
        python: [
            "Ah, Python! The language that makes me feel like I can code, until I forget a semicolon... wait, Python doesn't use those! 🐍 What about Python interests you?",
            "Python is amazing! It's like English, but computers actually understand it. Want to try the Code Lab above?",
            "Python tips: 1) Use meaningful variable names, 2) Comment your code, 3) Coffee is essential. Need specific help?"
        ],
        ai: [
            "AI is basically teaching computers to make the same mistakes humans do, but faster! 🤖 What AI topic interests you?",
            "I'm an AI assistant talking about AI. It's very meta. What would you like to know about artificial intelligence?",
            "AI fun fact: Most AI is just really good at finding patterns. Like how I can tell you probably need coffee right now. ☕"
        ],
        coffee: [
            "Coffee: the real artificial intelligence behind all coding! ☕ I'm 99.9% certain Ata is fueled by it.",
            "Studies show that code quality increases by 47.3% after coffee consumption. I may have made up that statistic. 📊☕",
            "Coffee is basically a legal performance-enhancing drug for developers. Embrace it!"
        ],
        help: [
            "I can help you navigate the site! Try the Code Lab to run Python, check out AI News for the latest updates, or explore the Analytics section for cool data viz! 📊",
            "Need guidance? Click around! The Code Lab lets you run Python in your browser, the News section has AI updates, and there's learning resources below. Or just chat with me!",
            "I'm here to help! Ask me about Python, AI, the site features, or even for coffee recommendations. What interests you?"
        ],
        default: [
            "That's an interesting question! Though I'm just a humble chatbot who occasionally pretends to be sentient. 🤖 Could you be more specific?",
            "Hmm, I'm not sure I fully understand, but I'm great at nodding along! Want to ask about Python, AI, or site navigation?",
            "Good question! I'm still learning (literally, that's how AI works), but I can help with Python, AI topics, or site navigation. What interests you?"
        ]
    };
    
    // Match patterns
    if (/(hi|hello|hey|greetings)/i.test(lowerMessage)) {
        return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    } else if (/python/i.test(lowerMessage)) {
        return responses.python[Math.floor(Math.random() * responses.python.length)];
    } else if (/(ai|artificial intelligence|machine learning|ml)/i.test(lowerMessage)) {
        return responses.ai[Math.floor(Math.random() * responses.ai.length)];
    } else if (/coffee/i.test(lowerMessage)) {
        return responses.coffee[Math.floor(Math.random() * responses.coffee.length)];
    } else if (/(help|guide|navigate|where)/i.test(lowerMessage)) {
        return responses.help[Math.floor(Math.random() * responses.help.length)];
    } else if (/(thanks|thank you)/i.test(lowerMessage)) {
        return "You're welcome! Happy to help. Now go code something awesome! 🚀";
    } else if (/(joke|funny|humor)/i.test(lowerMessage)) {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a lightbulb? None, that's a hardware problem!",
            "I told my AI to learn humor. It learned dad jokes. I'm equally proud and disappointed. 😅"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
}

function speakText(text) {
    if (!synth) return;
    
    // Cancel any ongoing speech
    synth.cancel();
    
    // Clean text for speech
    const cleanText = text.replace(/[🤖☕🐍📊🚀✨🎯💡🔥]/g, '').trim();
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    // Try to use a female voice
    const voices = synth.getVoices();
    const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen')
    );
    
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }
    
    synth.speak(utterance);
}

// ============================================
// ANIMATED COUNTERS
// ============================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target % 1 === 0 ? target : target.toFixed(1);
            clearInterval(timer);
        } else {
            element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
        }
    }, stepTime);
}

// ============================================
// LEARNING SECTION
// ============================================

function tryLesson(lessonId) {
    const lessonExamples = {
        'python-basics': `# Python Basics Lesson
# Variables and Data Types

name = "Future AI Developer"
age = 25
height = 5.9
is_learning = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} feet")
print(f"Currently learning: {is_learning}")

# Lists
hobbies = ["coding", "AI", "coffee"]
print(f"Hobbies: {', '.join(hobbies)}")`,
        
        'prompting': `# AI Prompting Example
# Note: This is a demonstration

prompt = """
You are a helpful AI assistant. 
User: Explain quantum computing in simple terms
Assistant: """

print("Effective AI Prompting Tips:")
print("1. Be specific and clear")
print("2. Provide context")
print("3. Use examples")
print("4. Iterate and refine")
print("5. Set the tone and style")`,
        
        'ml-concepts': `# Machine Learning Concepts

print("🎯 Supervised Learning")
print("Training with labeled data")
print("Example: Email spam detection\\n")

print("🔍 Unsupervised Learning")
print("Finding patterns in unlabeled data")
print("Example: Customer segmentation\\n")

print("🎮 Reinforcement Learning")
print("Learning through trial and error")
print("Example: Game AI, robotics")`
    };
    
    if (lessonExamples[lessonId]) {
        document.getElementById('codeEditor').value = lessonExamples[lessonId];
        updateLineNumbers();
        scrollToSection('code-lab');
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 800;
    }
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.news-card, .lesson-card, .chart-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Initialize voices for speech synthesis
if (synth) {
    // Load voices
    synth.addEventListener('voiceschanged', () => {
        synth.getVoices();
    });
}

console.log(`
╔═══════════════════════════════════════╗
║   🤖 Ata's AI Landing Page Loaded!   ║
║   Powered by 99.9% AI & 0.1% Coffee  ║
║   Made with ❤️ and lots of debugging ║
╚═══════════════════════════════════════╝
`);

// GPT Integration Placeholder
/* 
 * TO ENABLE GPT CHATBOT:
 * 1. Get your OpenAI API key from https://platform.openai.com/
 * 2. Uncomment the code below and add your API key
 * 3. Replace generateAIResponse() with actual GPT API calls
 * 
 * Example implementation:

async function generateAIResponseGPT(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY_HERE'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: message}],
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

*/