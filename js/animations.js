// Advanced Visual Effects and Animations for Ata AI

// Matrix Rain Effect
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.drops = [];
        
        this.resize();
        this.initDrops();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
    }
    
    initDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = {
                y: Math.random() * -100,
                speed: Math.random() * 3 + 1,
                char: this.getRandomChar()
            };
        }
    }
    
    getRandomChar() {
        return this.characters[Math.floor(Math.random() * this.characters.length)];
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00d4ff';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            
            // Draw character
            this.ctx.fillText(drop.char, i * this.fontSize, drop.y * this.fontSize);
            
            // Move drop down
            drop.y += drop.speed;
            
            // Reset drop when it goes off screen
            if (drop.y * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                drop.y = 0;
                drop.char = this.getRandomChar();
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Particle System
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 50;
        
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            setTimeout(() => {
                this.addParticle();
            }, i * 100);
        }
    }
    
    addParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            left: ${startX}px;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        this.container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                this.addParticle(); // Add new particle
            }
        }, (duration + delay) * 1000);
    }
    
    animate() {
        // Add occasional burst of particles
        if (Math.random() < 0.1) {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => this.addParticle(), i * 50);
            }
        }
        
        setTimeout(() => this.animate(), 2000);
    }
}

// Neural Network Visualization
class NeuralNetworkViz {
    constructor(container) {
        this.container = container;
        this.nodes = [];
        this.connections = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        // Create nodes
        const nodePositions = [
            { x: 20, y: 20 }, { x: 80, y: 20 },
            { x: 10, y: 50 }, { x: 50, y: 50 }, { x: 90, y: 50 },
            { x: 35, y: 80 }, { x: 65, y: 80 }
        ];
        
        nodePositions.forEach((pos, index) => {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.cssText = `
                position: absolute;
                top: ${pos.y}%;
                left: ${pos.x}%;
                width: 12px;
                height: 12px;
                background: linear-gradient(45deg, #00d4ff, #ff6b9d);
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
                animation: neural-pulse 2s infinite ease-in-out;
                animation-delay: ${index * 0.3}s;
            `;
            
            this.container.appendChild(node);
            this.nodes.push(node);
        });
        
        // Create connections (SVG lines)
        this.createConnections();
    }
    
    createConnections() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        `;
        
        // Define connection patterns
        const connections = [
            [0, 2], [0, 3], [1, 3], [1, 4],
            [2, 5], [3, 5], [3, 6], [4, 6]
        ];
        
        connections.forEach(([from, to], index) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', '20%');
            line.setAttribute('y1', '20%');
            line.setAttribute('x2', '80%');
            line.setAttribute('y2', '80%');
            line.setAttribute('stroke', '#00d4ff');
            line.setAttribute('stroke-width', '1');
            line.setAttribute('opacity', '0.3');
            line.style.animation = `neural-connection 3s infinite ease-in-out ${index * 0.5}s`;
            
            svg.appendChild(line);
        });
        
        this.container.appendChild(svg);
    }
}

// Code Typing Effect
class CodeTyper {
    constructor(element, code, options = {}) {
        this.element = element;
        this.code = code;
        this.speed = options.speed || 50;
        this.cursor = options.cursor !== false;
        this.currentIndex = 0;
        this.isTyping = false;
    }
    
    async type() {
        if (this.isTyping) return;
        this.isTyping = true;
        
        this.element.innerHTML = '';
        
        for (let i = 0; i < this.code.length; i++) {
            await this.typeChar(this.code[i]);
            this.currentIndex = i;
        }
        
        if (this.cursor) {
            this.element.innerHTML += '<span class="typing-cursor">|</span>';
        }
        
        this.isTyping = false;
    }
    
    typeChar(char) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.element.innerHTML += char === '\n' ? '<br>' : char;
                resolve();
            }, this.speed + Math.random() * 30);
        });
    }
}

// Glitch Effect
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    }
    
    glitch(duration = 1000) {
        const glitchInterval = setInterval(() => {
            this.element.textContent = this.generateGlitchText();
        }, 50);
        
        setTimeout(() => {
            clearInterval(glitchInterval);
            this.element.textContent = this.originalText;
        }, duration);
    }
    
    generateGlitchText() {
        return this.originalText
            .split('')
            .map(char => 
                Math.random() < 0.1 
                    ? this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)]
                    : char
            )
            .join('');
    }
}

// Holographic Effect
class HologramEffect {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        this.element.style.position = 'relative';
        this.element.style.overflow = 'hidden';
        
        // Create hologram layers
        for (let i = 0; i < 3; i++) {
            const layer = this.element.cloneNode(true);
            layer.style.position = 'absolute';
            layer.style.top = '0';
            layer.style.left = '0';
            layer.style.width = '100%';
            layer.style.height = '100%';
            layer.style.opacity = '0.3';
            layer.style.filter = `hue-rotate(${i * 120}deg)`;
            layer.style.animation = `hologram-layer ${2 + i}s infinite ease-in-out`;
            layer.style.animationDelay = `${i * 0.5}s`;
            
            this.element.appendChild(layer);
        }
    }
}

// Counter Animation
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseFloat(target);
        this.duration = duration;
        this.current = 0;
    }
    
    start() {
        const startTime = performance.now();
        const isDecimal = this.target % 1 !== 0;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            
            this.current = this.target * easeOutCubic;
            
            if (isDecimal) {
                this.element.textContent = this.current.toFixed(1);
            } else {
                this.element.textContent = Math.floor(this.current).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
    }
    
    observe(elements) {
        elements.forEach(el => this.observer.observe(el));
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation class
                element.classList.add('animate');
                
                // Trigger specific animations
                if (element.hasAttribute('data-counter')) {
                    const counter = new CounterAnimation(
                        element, 
                        element.getAttribute('data-target'),
                        2000
                    );
                    counter.start();
                }
                
                if (element.hasAttribute('data-glitch')) {
                    const glitch = new GlitchEffect(element);
                    setTimeout(() => glitch.glitch(500), 500);
                }
                
                // Unobserve after animation
                this.observer.unobserve(element);
            }
        });
    }
}

// Audio Visualizer (for futuristic effects)
class AudioVisualizer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.isPlaying = false;
    }
    
    init() {
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const AudioContextClass = AudioContext || webkitAudioContext;
            this.audioContext = new AudioContextClass();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        }
    }
    
    visualize() {
        if (!this.analyser) return;
        
        this.analyser.getByteFrequencyData(this.dataArray);
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const barWidth = this.canvas.width / this.dataArray.length;
        
        for (let i = 0; i < this.dataArray.length; i++) {
            const barHeight = (this.dataArray[i] / 255) * this.canvas.height;
            
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, '#00d4ff');
            gradient.addColorStop(1, '#ff6b9d');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(i * barWidth, this.canvas.height - barHeight, barWidth, barHeight);
        }
        
        if (this.isPlaying) {
            requestAnimationFrame(() => this.visualize());
        }
    }
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Matrix rain effect
    const matrixCanvas = document.getElementById('matrix-rain');
    if (matrixCanvas) {
        new MatrixRain(matrixCanvas);
    }
    
    // Particle system
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        new ParticleSystem(particleContainer);
    }
    
    // Neural network visualization
    const neuralContainer = document.querySelector('.neural-network');
    if (neuralContainer) {
        new NeuralNetworkViz(neuralContainer);
    }
    
    // Counter animations
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach(counter => {
        counter.setAttribute('data-counter', 'true');
    });
    
    // Animation observer
    const observer = new AnimationObserver();
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, [data-counter]');
    observer.observe(animatedElements);
    
    // Add CSS for neural network animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes neural-connection {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.8; }
        }
        
        .typing-cursor {
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        @keyframes hologram-layer {
            0% { transform: translateX(0px) skewX(0deg); }
            25% { transform: translateX(2px) skewX(1deg); }
            50% { transform: translateX(-1px) skewX(-0.5deg); }
            75% { transform: translateX(1px) skewX(0.5deg); }
            100% { transform: translateX(0px) skewX(0deg); }
        }
        
        .glitch-effect {
            position: relative;
            color: #00d4ff;
        }
        
        .glitch-effect::before,
        .glitch-effect::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .glitch-effect::before {
            animation: glitch-1 0.5s infinite;
            color: #ff6b9d;
            z-index: -1;
        }
        
        .glitch-effect::after {
            animation: glitch-2 0.5s infinite;
            color: #c77dff;
            z-index: -2;
        }
        
        @keyframes glitch-1 {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(2px, 0px); }
            40% { transform: translate(-2px, 0px); }
            60% { transform: translate(0px, 2px); }
            80% { transform: translate(0px, -2px); }
        }
    `;
    document.head.appendChild(style);
    
    // Professional Portrait Interactive Effects
    const portraitContainer = document.querySelector('.portrait-container');
    if (portraitContainer) {
        setupPortraitEffects(portraitContainer);
    }
    
    // Add some interactive effects
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.custom-cursor') || createCustomCursor();
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Portrait parallax effect
        if (portraitContainer) {
            const rect = portraitContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
                const rotateX = (y - 0.5) * 10;
                const rotateY = (x - 0.5) * 10;
                portraitContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        }
    });
    
    function createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0,212,255,0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        return cursor;
    }
});

// Professional Portrait Effects
function setupPortraitEffects(container) {
    // Add floating particles around the portrait
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'portrait-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${i % 2 === 0 ? '#00d4ff' : '#ff6b9d'};
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.7;
            animation: portrait-particle-float ${3 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        container.appendChild(particle);
    }
    
    // Add CSS for portrait particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes portrait-particle-float {
            0%, 100% {
                transform: translateY(0px) translateX(0px) scale(1);
                opacity: 0.7;
            }
            33% {
                transform: translateY(-20px) translateX(10px) scale(1.2);
                opacity: 1;
            }
            66% {
                transform: translateY(10px) translateX(-15px) scale(0.8);
                opacity: 0.5;
            }
        }
        
        .portrait-particle {
            z-index: 1;
        }
        
        /* AI Interface Typing Effect */
        .data-stream {
            overflow: hidden;
            white-space: nowrap;
            border-right: 1px solid var(--primary-color);
            animation: data-typing 2s steps(30) 1s forwards, cursor-blink 1s infinite 3s;
        }
        
        @keyframes data-typing {
            from { width: 0; }
            to { width: 100%; }
        }
        
        @keyframes cursor-blink {
            0%, 50% { border-right-color: var(--primary-color); }
            51%, 100% { border-right-color: transparent; }
        }
    `;
    document.head.appendChild(style);
}

// Create custom cursor for enhanced interactivity
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0,212,255,0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    return cursor;
}

// Export classes for external use
window.MatrixRain = MatrixRain;
window.ParticleSystem = ParticleSystem;
window.CodeTyper = CodeTyper;
window.GlitchEffect = GlitchEffect;
window.HologramEffect = HologramEffect;
window.CounterAnimation = CounterAnimation;
window.setupPortraitEffects = setupPortraitEffects;