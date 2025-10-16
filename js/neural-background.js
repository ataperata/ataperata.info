/**
 * AtaBot Neural Network Background
 * 3D Animated Particle System with Three.js
 * Creates a dynamic neural network visualization
 */

class NeuralNetworkBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.mouseTarget = { x: 0, y: 0 };
        this.isInitialized = false;
        
        // Configuration
        this.config = {
            particleCount: this.getParticleCount(),
            maxConnections: 5,
            connectionDistance: 150,
            particleSpeed: 0.0005,
            mouseInfluence: 100,
            colors: {
                particles: [0x1d4ed8, 0xdc2626, 0xfbbf24, 0x1e40af], // Blue, Red, Gold, Navy
                connections: [0x1d4ed8, 0xdc2626, 0xfbbf24] // Blue, Red, Gold
            }
        };
        
        this.init();
    }
    
    getParticleCount() {
        // Adjust particle count based on device performance
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = navigator.hardwareConcurrency < 4;
        
        if (isMobile || isLowEnd) {
            return 100; // Reduced for mobile/low-end devices
        } else if (navigator.hardwareConcurrency >= 8) {
            return 300; // High-end devices
        }
        return 200; // Default
    }
    
    init() {
        this.setupScene();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
        this.isInitialized = true;
    }
    
    setupScene() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a0e27, 1, 1000);
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.z = 500;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('neural-background'),
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        
        // Enable blending for glow effects
        this.renderer.shadowMap.enabled = false; // Disable shadows for performance
    }
    
    createParticles() {
        const geometry = new THREE.SphereGeometry(1, 8, 6);
        
        for (let i = 0; i < this.config.particleCount; i++) {
            // Random particle color
            const colorIndex = Math.floor(Math.random() * this.config.colors.particles.length);
            const color = this.config.colors.particles[colorIndex];
            
            // Create material with glow effect
            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.8
            });
            
            // Create particle mesh
            const particle = new THREE.Mesh(geometry, material);
            
            // Random position
            particle.position.x = (Math.random() - 0.5) * 1000;
            particle.position.y = (Math.random() - 0.5) * 1000;
            particle.position.z = (Math.random() - 0.5) * 1000;
            
            // Random velocity
            particle.velocity = {
                x: (Math.random() - 0.5) * this.config.particleSpeed,
                y: (Math.random() - 0.5) * this.config.particleSpeed,
                z: (Math.random() - 0.5) * this.config.particleSpeed
            };
            
            // Pulse animation properties
            particle.pulse = {
                phase: Math.random() * Math.PI * 2,
                frequency: 0.01 + Math.random() * 0.02,
                amplitude: 0.3 + Math.random() * 0.4
            };
            
            // Store original color for effects
            particle.originalColor = color;
            particle.targetColor = color;
            
            this.scene.add(particle);
            this.particles.push(particle);
        }
        
        // Create connection lines geometry
        this.createConnectionLines();
    }
    
    createConnectionLines() {
        const material = new THREE.LineBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.config.particleCount * this.config.maxConnections * 6);
        const colors = new Float32Array(this.config.particleCount * this.config.maxConnections * 6);
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        this.connectionLines = new THREE.LineSegments(geometry, material);
        this.scene.add(this.connectionLines);
    }
    
    updateConnections() {
        const positions = this.connectionLines.geometry.attributes.position.array;
        const colors = this.connectionLines.geometry.attributes.color.array;
        let connectionIndex = 0;
        
        // Clear arrays
        positions.fill(0);
        colors.fill(0);
        
        for (let i = 0; i < this.particles.length; i++) {
            const particleA = this.particles[i];
            let connections = 0;
            
            for (let j = i + 1; j < this.particles.length && connections < this.config.maxConnections; j++) {
                const particleB = this.particles[j];
                const distance = particleA.position.distanceTo(particleB.position);
                
                if (distance < this.config.connectionDistance) {
                    // Calculate opacity based on distance
                    const opacity = 1 - (distance / this.config.connectionDistance);
                    
                    // Set line positions
                    const baseIndex = connectionIndex * 6;
                    
                    positions[baseIndex] = particleA.position.x;
                    positions[baseIndex + 1] = particleA.position.y;
                    positions[baseIndex + 2] = particleA.position.z;
                    
                    positions[baseIndex + 3] = particleB.position.x;
                    positions[baseIndex + 4] = particleB.position.y;
                    positions[baseIndex + 5] = particleB.position.z;
                    
                    // Set line colors with pulsing effect
                    const time = Date.now() * 0.001;
                    const pulse = (Math.sin(time * 2 + distance * 0.01) + 1) * 0.5;
                    const finalOpacity = opacity * (0.3 + pulse * 0.4);
                    
                    // Cyan to magenta gradient based on distance
                    const colorLerp = distance / this.config.connectionDistance;
                    const r = colorLerp * 1.0; // More red for distant connections
                    const g = 0.94 * (1 - colorLerp * 0.5); // Cyan component
                    const b = 1.0 * (1 - colorLerp * 0.3); // Blue component
                    
                    colors[baseIndex] = r * finalOpacity;
                    colors[baseIndex + 1] = g * finalOpacity;
                    colors[baseIndex + 2] = b * finalOpacity;
                    
                    colors[baseIndex + 3] = r * finalOpacity;
                    colors[baseIndex + 4] = g * finalOpacity;
                    colors[baseIndex + 5] = b * finalOpacity;
                    
                    connectionIndex++;
                    connections++;
                }
            }
        }
        
        // Update geometry
        this.connectionLines.geometry.attributes.position.needsUpdate = true;
        this.connectionLines.geometry.attributes.color.needsUpdate = true;
        this.connectionLines.geometry.setDrawRange(0, connectionIndex * 2);
    }
    
    updateParticles() {
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            
            // Update position based on velocity
            particle.position.x += particle.velocity.x * 100;
            particle.position.y += particle.velocity.y * 100;
            particle.position.z += particle.velocity.z * 100;
            
            // Boundary checks - wrap around
            if (particle.position.x > 500) particle.position.x = -500;
            if (particle.position.x < -500) particle.position.x = 500;
            if (particle.position.y > 500) particle.position.y = -500;
            if (particle.position.y < -500) particle.position.y = 500;
            if (particle.position.z > 500) particle.position.z = -500;
            if (particle.position.z < -500) particle.position.z = 500;
            
            // Mouse interaction
            const mouseDistance = Math.sqrt(
                Math.pow(particle.position.x - this.mouse.x, 2) +
                Math.pow(particle.position.y - this.mouse.y, 2)
            );
            
            if (mouseDistance < this.config.mouseInfluence) {
                const force = (this.config.mouseInfluence - mouseDistance) / this.config.mouseInfluence;
                const angle = Math.atan2(
                    particle.position.y - this.mouse.y,
                    particle.position.x - this.mouse.x
                );
                
                particle.position.x += Math.cos(angle) * force * 2;
                particle.position.y += Math.sin(angle) * force * 2;
                
                // Change color when near mouse
                particle.targetColor = 0xdc2626; // Patriot Red
            } else {
                particle.targetColor = particle.originalColor;
            }
            
            // Pulsing animation
            const pulseScale = 1 + Math.sin(time * particle.pulse.frequency + particle.pulse.phase) * particle.pulse.amplitude;
            particle.scale.setScalar(pulseScale);
            
            // Neural firing effect
            if (Math.random() < 0.001) { // 0.1% chance per frame
                this.createNeuralFlash(particle);
            }
            
            // Color transition
            const currentColor = new THREE.Color(particle.material.color.getHex());
            const targetColor = new THREE.Color(particle.targetColor);
            currentColor.lerp(targetColor, 0.05);
            particle.material.color.setHex(currentColor.getHex());
        }
    }
    
    createNeuralFlash(particle) {
        // Create temporary flash effect
        const flashGeometry = new THREE.SphereGeometry(5, 8, 6);
        const flashMaterial = new THREE.MeshBasicMaterial({
            color: 0xfbbf24, // Patriot Gold
            transparent: true,
            opacity: 1.0
        });
        
        const flash = new THREE.Mesh(flashGeometry, flashMaterial);
        flash.position.copy(particle.position);
        this.scene.add(flash);
        
        // Animate flash
        const startTime = Date.now();
        const animateFlash = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / 500; // 500ms duration
            
            if (progress < 1) {
                flash.scale.setScalar(1 + progress * 3);
                flash.material.opacity = 1 - progress;
                requestAnimationFrame(animateFlash);
            } else {
                this.scene.remove(flash);
                flashGeometry.dispose();
                flashMaterial.dispose();
            }
        };
        
        animateFlash();
    }
    
    handleMouseMove(event) {
        // Convert mouse position to 3D space
        this.mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Convert to world coordinates
        this.mouseTarget.x *= 500;
        this.mouseTarget.y *= 500;
    }
    
    handleScroll() {
        // Parallax effect based on scroll
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(scrollY / maxScroll, 1);
        
        // Move camera slightly based on scroll
        this.camera.position.y = scrollProgress * 100;
        this.camera.position.z = 500 + scrollProgress * 100;
        this.camera.lookAt(0, 0, 0);
    }
    
    handleResize() {
        if (!this.isInitialized) return;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (event) => {
            this.handleMouseMove(event);
        });
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Touch events for mobile
        document.addEventListener('touchmove', (event) => {
            if (event.touches.length > 0) {
                this.handleMouseMove(event.touches[0]);
            }
        });
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
    }
    
    setupPerformanceMonitoring() {
        let frameCount = 0;
        let lastTime = Date.now();
        
        const monitorPerformance = () => {
            frameCount++;
            const currentTime = Date.now();
            
            // Check FPS every second
            if (currentTime - lastTime > 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // Adjust quality based on performance
                if (fps < 30 && this.config.particleCount > 50) {
                    this.reduceQuality();
                }
            }
        };
        
        setInterval(monitorPerformance, 100);
    }
    
    reduceQuality() {
        // Reduce particle count for better performance
        const particlesToRemove = Math.min(50, this.particles.length - 50);
        
        for (let i = 0; i < particlesToRemove; i++) {
            const particle = this.particles.pop();
            this.scene.remove(particle);
            particle.geometry.dispose();
            particle.material.dispose();
        }
        
        this.config.particleCount = this.particles.length;
        console.log(`Reduced particles to ${this.config.particleCount} for performance`);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (!this.isInitialized) return;
        
        // Smooth mouse interpolation
        this.mouse.x += (this.mouseTarget.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouseTarget.y - this.mouse.y) * 0.05;
        
        // Update particles and connections
        this.updateParticles();
        this.updateConnections();
        
        // Camera subtle movement
        const time = Date.now() * 0.0005;
        this.camera.position.x += Math.sin(time * 0.5) * 0.1;
        this.camera.position.y += Math.cos(time * 0.3) * 0.1;
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
    
    // Public methods for external control
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
    }
    
    destroy() {
        // Cleanup resources
        this.particles.forEach(particle => {
            this.scene.remove(particle);
            particle.geometry.dispose();
            particle.material.dispose();
        });
        
        this.scene.remove(this.connectionLines);
        this.connectionLines.geometry.dispose();
        this.connectionLines.material.dispose();
        
        this.renderer.dispose();
    }
    
    // Interactive methods
    addRippleEffect(x, y) {
        // Create ripple effect at specific coordinates
        const rippleParticles = [];
        const rippleCount = 20;
        
        for (let i = 0; i < rippleCount; i++) {
            const angle = (i / rippleCount) * Math.PI * 2;
            const geometry = new THREE.SphereGeometry(0.5, 6, 4);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00f0ff,
                transparent: true,
                opacity: 0.8
            });
            
            const rippleParticle = new THREE.Mesh(geometry, material);
            rippleParticle.position.set(x, y, 0);
            
            const velocity = {
                x: Math.cos(angle) * 5,
                y: Math.sin(angle) * 5,
                z: (Math.random() - 0.5) * 2
            };
            
            this.scene.add(rippleParticle);
            
            // Animate ripple
            const startTime = Date.now();
            const animateRipple = () => {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / 1000; // 1 second duration
                
                if (progress < 1) {
                    rippleParticle.position.x += velocity.x;
                    rippleParticle.position.y += velocity.y;
                    rippleParticle.position.z += velocity.z;
                    
                    rippleParticle.material.opacity = 0.8 * (1 - progress);
                    rippleParticle.scale.setScalar(1 + progress * 2);
                    
                    requestAnimationFrame(animateRipple);
                } else {
                    this.scene.remove(rippleParticle);
                    geometry.dispose();
                    material.dispose();
                }
            };
            
            animateRipple();
        }
    }
    
    // Trigger special effects
    neuralStorm() {
        // Create a burst of neural activity
        this.particles.forEach((particle, index) => {
            setTimeout(() => {
                this.createNeuralFlash(particle);
            }, index * 50);
        });
    }
}

// Initialize the neural network background when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is available
    if (typeof THREE !== 'undefined') {
        window.neuralBackground = new NeuralNetworkBackground();
        
        // Add click effect
        document.addEventListener('click', (event) => {
            if (window.neuralBackground) {
                const x = (event.clientX / window.innerWidth) * 2 - 1;
                const y = -(event.clientY / window.innerHeight) * 2 + 1;
                window.neuralBackground.addRippleEffect(x * 500, y * 500);
            }
        });
        
    } else {
        console.warn('Three.js not loaded. Neural background disabled.');
    }
});

// Export for use in other modules
window.NeuralNetworkBackground = NeuralNetworkBackground;