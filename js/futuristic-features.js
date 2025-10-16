// CRAZY FUTURISTIC FEATURES FOR ATA AI WEBSITE 🚀🌟
// Holographic displays, AI voice simulation, quantum effects, and MORE!

// Global variables for futuristic features
let isVoiceActive = false;
let hologramActive = false;
let quantumFieldActive = false;

// Initialize futuristic features when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 Initializing futuristic AI features...');
    
    // Add futuristic controls to the page
    addFuturisticControls();
    
    // Initialize quantum field effects
    initializeQuantumField();
    
    // Start ambient AI sounds
    setTimeout(() => {
        initializeAmbientSounds();
    }, 2000);
    
    // Add holographic text effects
    initializeHolographicText();
    
    // Initialize AI voice simulation
    initializeVoiceSimulation();
    
    console.log('✅ Futuristic features activated!');
});

// Add futuristic control panel
function addFuturisticControls() {
    const controlPanel = document.createElement('div');
    controlPanel.className = 'futuristic-controls';
    controlPanel.innerHTML = `
        <div class="control-panel">
            <div class="panel-header">
                <i class="fas fa-magic"></i>
                <span>AI FEATURES</span>
            </div>
            <div class="control-buttons">
                <button class="futuristic-btn" onclick="toggleHolographicMode()" id="hologram-btn">
                    <i class="fas fa-eye"></i>
                    <span>Hologram Mode</span>
                </button>
                <button class="futuristic-btn" onclick="toggleQuantumField()" id="quantum-btn">
                    <i class="fas fa-atom"></i>
                    <span>Quantum Field</span>
                </button>
                <button class="futuristic-btn" onclick="toggleVoiceMode()" id="voice-btn">
                    <i class="fas fa-volume-up"></i>
                    <span>AI Voice</span>
                </button>
                <button class="futuristic-btn" onclick="activateMatrixMode()">
                    <i class="fas fa-code"></i>
                    <span>Matrix Mode</span>
                </button>
                <button class="futuristic-btn" onclick="launchAIVisualization()">
                    <i class="fas fa-brain"></i>
                    <span>Neural Viz</span>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(controlPanel);
}

// HOLOGRAPHIC DISPLAY MODE - INSANE!
function toggleHolographicMode() {
    hologramActive = !hologramActive;
    const btn = document.getElementById('hologram-btn');
    
    if (hologramActive) {
        console.log('🌈 Activating holographic mode...');
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-eye"></i><span>Disable Hologram</span>';
        
        // Add holographic effects to all text elements
        document.querySelectorAll('h1, h2, h3, p, span').forEach(element => {
            element.classList.add('holographic-text');
        });
        
        // Add holographic overlay to entire page
        const hologramOverlay = document.createElement('div');
        hologramOverlay.className = 'hologram-overlay-full';
        hologramOverlay.id = 'hologram-overlay';
        document.body.appendChild(hologramOverlay);
        
        // Add holographic particles
        createHolographicParticles();
        
    } else {
        console.log('🌈 Deactivating holographic mode...');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-eye"></i><span>Hologram Mode</span>';
        
        // Remove holographic effects
        document.querySelectorAll('.holographic-text').forEach(element => {
            element.classList.remove('holographic-text');
        });
        
        // Remove overlay
        const overlay = document.getElementById('hologram-overlay');
        if (overlay) overlay.remove();
        
        // Remove particles
        document.querySelectorAll('.holographic-particle').forEach(particle => {
            particle.remove();
        });
    }
}

function createHolographicParticles() {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'holographic-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(particle);
    }
}

// QUANTUM FIELD EFFECTS - MIND-BLOWING!
function initializeQuantumField() {
    // Create quantum field canvas
    const quantumCanvas = document.createElement('canvas');
    quantumCanvas.id = 'quantum-field';
    quantumCanvas.style.position = 'fixed';
    quantumCanvas.style.top = '0';
    quantumCanvas.style.left = '0';
    quantumCanvas.style.width = '100%';
    quantumCanvas.style.height = '100%';
    quantumCanvas.style.zIndex = '-12';
    quantumCanvas.style.pointerEvents = 'none';
    quantumCanvas.style.opacity = '0';
    quantumCanvas.width = window.innerWidth;
    quantumCanvas.height = window.innerHeight;
    document.body.appendChild(quantumCanvas);
    
    const ctx = quantumCanvas.getContext('2d');
    let quantumParticles = [];
    
    // Create quantum particles
    for (let i = 0; i < 50; i++) {
        quantumParticles.push({
            x: Math.random() * quantumCanvas.width,
            y: Math.random() * quantumCanvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            life: Math.random() * 100
        });
    }
    
    function animateQuantumField() {
        if (!quantumFieldActive) return;
        
        ctx.clearRect(0, 0, quantumCanvas.width, quantumCanvas.height);
        
        quantumParticles.forEach(particle => {
            // Update particle position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life += 1;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = quantumCanvas.width;
            if (particle.x > quantumCanvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = quantumCanvas.height;
            if (particle.y > quantumCanvas.height) particle.y = 0;
            
            // Quantum entanglement effects
            quantumParticles.forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100 && distance > 0) {
                    // Draw quantum connection
                    ctx.strokeStyle = `rgba(${Math.sin(particle.life * 0.1) * 128 + 128}, ${Math.cos(other.life * 0.1) * 128 + 128}, 255, 0.3)`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });
            
            // Draw particle
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = Math.sin(particle.life * 0.05) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animateQuantumField);
    }
    
    window.startQuantumField = () => {
        quantumFieldActive = true;
        quantumCanvas.style.opacity = '1';
        animateQuantumField();
    };
    
    window.stopQuantumField = () => {
        quantumFieldActive = false;
        quantumCanvas.style.opacity = '0';
    };
}

function toggleQuantumField() {
    quantumFieldActive = !quantumFieldActive;
    const btn = document.getElementById('quantum-btn');
    
    if (quantumFieldActive) {
        console.log('⚛️ Quantum field activated!');
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-atom"></i><span>Disable Quantum</span>';
        startQuantumField();
    } else {
        console.log('⚛️ Quantum field deactivated!');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-atom"></i><span>Quantum Field</span>';
        stopQuantumField();
    }
}

// AI VOICE SIMULATION - INCREDIBLE!
function initializeVoiceSimulation() {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
        console.log('🎤 AI Voice system ready!');
        
        // Create AI voice profile
        window.aiVoice = {
            voice: null,
            enabled: false,
            
            speak: function(text) {
                if (!this.enabled || !text) return;
                
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.9;
                utterance.pitch = 1.1;
                utterance.volume = 0.7;
                
                // Try to use a futuristic-sounding voice
                const voices = speechSynthesis.getVoices();
                const preferredVoices = voices.filter(v => 
                    v.name.includes('Google') || 
                    v.name.includes('Microsoft') || 
                    v.lang.includes('en')
                );
                
                if (preferredVoices.length > 0) {
                    utterance.voice = preferredVoices[0];
                }
                
                // Add AI sound effects before speaking
                this.playAISoundEffect();
                
                setTimeout(() => {
                    speechSynthesis.speak(utterance);
                }, 300);
            },
            
            playAISoundEffect: function() {
                // Create AI beep sound effect
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.02);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            }
        };
    } else {
        console.log('🎤 Voice synthesis not supported in this browser');
    }
}

function toggleVoiceMode() {
    if (!window.aiVoice) {
        alert('AI Voice not supported in this browser. Try Chrome or Edge!');
        return;
    }
    
    isVoiceActive = !isVoiceActive;
    window.aiVoice.enabled = isVoiceActive;
    const btn = document.getElementById('voice-btn');
    
    if (isVoiceActive) {
        console.log('🎤 AI Voice activated!');
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-volume-up"></i><span>Disable Voice</span>';
        
        // Welcome message
        window.aiVoice.speak('AI Voice system activated. Welcome to the future, Ata!');
        
        // Hook into chat system to speak responses
        hookVoiceToChat();
        
    } else {
        console.log('🎤 AI Voice deactivated!');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-volume-up"></i><span>AI Voice</span>';
        
        window.aiVoice.speak('AI Voice system deactivated.');
    }
}

function hookVoiceToChat() {
    // Override the addMessage function to speak bot messages
    const originalAddMessage = window.addMessage;
    if (originalAddMessage) {
        window.addMessage = function(content, isUser = false) {
            originalAddMessage(content, isUser);
            
            // Speak bot messages if voice is enabled
            if (!isUser && window.aiVoice && window.aiVoice.enabled) {
                // Clean the message for speech (remove markdown, etc.)
                const cleanContent = content.replace(/[*_`#]/g, '').replace(/\n/g, ' ');
                window.aiVoice.speak(cleanContent);
            }
        };
    }
}

// MATRIX MODE - LEGENDARY!
function activateMatrixMode() {
    console.log('🔴 Activating Matrix Mode...');
    
    // Create matrix overlay
    const matrixOverlay = document.createElement('div');
    matrixOverlay.className = 'matrix-mode-overlay';
    matrixOverlay.innerHTML = `
        <div class="matrix-terminal">
            <div class="terminal-header">
                <span class="terminal-title">MATRIX_AI_SYSTEM.EXE</span>
                <button onclick="deactivateMatrixMode()" class="terminal-close">×</button>
            </div>
            <div class="terminal-content" id="matrix-terminal">
                <div class="terminal-line"><span class="prompt">root@ata-ai:~$</span> <span class="typing-cursor">|</span></div>
            </div>
        </div>
    `;
    document.body.appendChild(matrixOverlay);
    
    // Start matrix typing animation
    setTimeout(() => startMatrixTyping(), 1000);
}

function startMatrixTyping() {
    const terminal = document.getElementById('matrix-terminal');
    const matrixCommands = [
        'Initializing neural network...',
        'Loading AI consciousness matrix...',
        'Connecting to quantum processors...',
        'AI_STATUS: FULLY_OPERATIONAL',
        'WELCOME TO THE MATRIX, ATA',
        'Reality.exe has stopped working...',
        'Loading alternative reality...',
        'Matrix loaded successfully.',
        'Type "exit" to return to normal reality.'
    ];
    
    let commandIndex = 0;
    
    function typeCommand() {
        if (commandIndex >= matrixCommands.length) return;
        
        const command = matrixCommands[commandIndex];
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        let i = 0;
        function typeChar() {
            if (i < command.length) {
                line.textContent += command.charAt(i);
                i++;
                setTimeout(typeChar, Math.random() * 50 + 30);
            } else {
                commandIndex++;
                setTimeout(typeCommand, 500);
            }
        }
        
        terminal.appendChild(line);
        typeChar();
    }
    
    typeCommand();
}

function deactivateMatrixMode() {
    console.log('🔴 Deactivating Matrix Mode...');
    const overlay = document.querySelector('.matrix-mode-overlay');
    if (overlay) overlay.remove();
}

// NEURAL VISUALIZATION - SPECTACULAR!
function launchAIVisualization() {
    console.log('🧠 Launching neural visualization...');
    
    const vizOverlay = document.createElement('div');
    vizOverlay.className = 'neural-viz-overlay';
    vizOverlay.innerHTML = `
        <div class="neural-visualization">
            <div class="viz-header">
                <h3>🧠 AI Neural Network Visualization</h3>
                <button onclick="closeNeuralViz()" class="close-btn">×</button>
            </div>
            <canvas id="neural-viz-canvas" width="800" height="600"></canvas>
            <div class="viz-controls">
                <button onclick="addNeuralConnection()">Add Connection</button>
                <button onclick="pulseNetwork()">Pulse Network</button>
                <button onclick="randomizeNetwork()">Randomize</button>
            </div>
        </div>
    `;
    document.body.appendChild(vizOverlay);
    
    // Initialize neural network visualization
    initializeNeuralViz();
}

function initializeNeuralViz() {
    const canvas = document.getElementById('neural-viz-canvas');
    const ctx = canvas.getContext('2d');
    
    let neurons = [];
    let connections = [];
    
    // Create neurons
    for (let layer = 0; layer < 4; layer++) {
        const neuronsInLayer = layer === 0 || layer === 3 ? 5 : 8;
        for (let i = 0; i < neuronsInLayer; i++) {
            neurons.push({
                x: 100 + layer * 200,
                y: 100 + (i * (400 / neuronsInLayer)),
                layer: layer,
                activation: Math.random(),
                pulseTime: 0
            });
        }
    }
    
    // Create connections
    neurons.forEach((neuron, index) => {
        neurons.forEach((other, otherIndex) => {
            if (other.layer === neuron.layer + 1) {
                connections.push({
                    from: index,
                    to: otherIndex,
                    weight: (Math.random() - 0.5) * 2,
                    activity: 0
                });
            }
        });
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        connections.forEach(conn => {
            const from = neurons[conn.from];
            const to = neurons[conn.to];
            
            ctx.strokeStyle = `rgba(0, 212, 255, ${Math.abs(conn.weight) * 0.5 + conn.activity})`;
            ctx.lineWidth = Math.abs(conn.weight) * 3 + 1;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
            
            conn.activity *= 0.95; // Fade activity
        });
        
        // Draw neurons
        neurons.forEach((neuron, index) => {
            const size = 15 + neuron.activation * 10;
            const brightness = neuron.activation;
            
            ctx.fillStyle = `rgba(255, 107, 157, ${brightness})`;
            ctx.strokeStyle = `rgba(0, 212, 255, 1)`;
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Pulse effect
            if (neuron.pulseTime > 0) {
                ctx.strokeStyle = `rgba(0, 245, 160, ${neuron.pulseTime})`;
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, size + 10, 0, Math.PI * 2);
                ctx.stroke();
                neuron.pulseTime -= 0.05;
            }
            
            // Update activation
            neuron.activation = Math.max(0, neuron.activation - 0.01);
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Store functions globally for controls
    window.addNeuralConnection = () => {
        const randomConn = connections[Math.floor(Math.random() * connections.length)];
        randomConn.activity = 1;
        neurons[randomConn.from].activation = 1;
        neurons[randomConn.to].activation = 0.8;
    };
    
    window.pulseNetwork = () => {
        neurons.forEach(neuron => {
            neuron.pulseTime = 1;
            neuron.activation = 1;
        });
    };
    
    window.randomizeNetwork = () => {
        neurons.forEach(neuron => {
            neuron.activation = Math.random();
        });
        connections.forEach(conn => {
            conn.weight = (Math.random() - 0.5) * 2;
        });
    };
}

function closeNeuralViz() {
    const overlay = document.querySelector('.neural-viz-overlay');
    if (overlay) overlay.remove();
}

// AMBIENT AI SOUNDS
function initializeAmbientSounds() {
    console.log('🎵 Initializing ambient AI sounds...');
    
    // Create subtle ambient AI sounds using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function createAmbientTone(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Play random ambient tones
    function playAmbientSound() {
        if (Math.random() < 0.3) { // 30% chance every interval
            const frequency = Math.random() * 400 + 200;
            const duration = Math.random() * 2 + 1;
            createAmbientTone(frequency, duration);
        }
        
        setTimeout(playAmbientSound, Math.random() * 10000 + 5000); // 5-15 seconds
    }
    
    // Start ambient sounds after user interaction (required by browsers)
    document.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
            setTimeout(playAmbientSound, 2000);
        }
    }, { once: true });
}

// HOLOGRAPHIC TEXT EFFECTS
function initializeHolographicText() {
    // Add holographic effects to specific elements
    const specialElements = document.querySelectorAll('h1, .gradient-text, .section-title');
    specialElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('holographic-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('holographic-hover');
        });
    });
}

// Export functions for global access
window.toggleHolographicMode = toggleHolographicMode;
window.toggleQuantumField = toggleQuantumField;
window.toggleVoiceMode = toggleVoiceMode;
window.activateMatrixMode = activateMatrixMode;
window.deactivateMatrixMode = deactivateMatrixMode;
window.launchAIVisualization = launchAIVisualization;
window.closeNeuralViz = closeNeuralViz;