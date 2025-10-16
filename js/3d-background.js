// MOST EPIC 3D ANIMATED BACKGROUND WITH ALL THE EFFECTS!!!
// This is where AI dreams come to life! 🚀🤖✨

class EpicAI3DBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.particles = [];
        this.neuralNodes = [];
        this.dataStreams = [];
        this.holographicShapes = [];
        this.quantumParticles = [];
        
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.currentRotation = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.setupScene();
        this.createEpicGeometry();
        this.setupLighting();
        this.setupPostProcessing();
        this.addEventListeners();
        this.animate();
        
        console.log('🚀 EPIC 3D AI BACKGROUND INITIALIZED!');
        console.log('💫 Prepare for visual overload!');
    }
    
    setupScene() {
        // Create the scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000, 1, 1000);
        
        // Setup camera
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            2000
        );
        this.camera.position.set(0, 0, 50);
        
        // Setup renderer with ALL the quality settings
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        
        // Add to DOM
        const container = document.getElementById('threejs-background');
        container.appendChild(this.renderer.domElement);
        
        // Style the canvas
        this.renderer.domElement.style.position = 'fixed';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '-10';
        this.renderer.domElement.style.pointerEvents = 'none';
    }
    
    createEpicGeometry() {
        // Performance check - reduce geometry on low-end devices
        const isHighPerformance = navigator.hardwareConcurrency >= 4 && 
                                 !(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
        
        this.createFloatingAIBrain();
        this.createNeuralNetwork();
        
        if (isHighPerformance) {
            this.createDataParticles();
            this.createHolographicElements();
            this.createQuantumField();
            this.createEnergyStreams();
        } else {
            this.createOptimizedParticles();
        }
        
        this.createMatrixGrid();
        this.createFloatingCode();
    }
    
    createFloatingAIBrain() {
        // Create a complex AI brain structure
        const brainGroup = new THREE.Group();
        
        // Main brain geometry
        const brainGeometry = new THREE.IcosahedronGeometry(8, 2);
        const brainMaterial = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            wireframe: true,
            transparent: true,
            opacity: 0.6,
            emissive: 0x001122
        });
        
        const brain = new THREE.Mesh(brainGeometry, brainMaterial);
        brain.position.set(-30, 10, -20);
        brainGroup.add(brain);
        
        // Neural pathways
        for (let i = 0; i < 50; i++) {
            const pathGeometry = new THREE.SphereGeometry(0.2, 8, 8);
            const pathMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 1, 0.5),
                transparent: true,
                opacity: 0.8
            });
            
            const path = new THREE.Mesh(pathGeometry, pathMaterial);
            path.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            path.userData = { 
                originalPosition: path.position.clone(),
                speed: Math.random() * 0.02 + 0.01
            };
            
            brainGroup.add(path);
        }
        
        this.scene.add(brainGroup);
        this.brainGroup = brainGroup;
    }
    
    createNeuralNetwork() {
        const networkGroup = new THREE.Group();
        
        // Create network nodes
        for (let i = 0; i < 100; i++) {
            const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
            const nodeMaterial = new THREE.MeshBasicMaterial({
                color: 0xff6b9d,
                transparent: true,
                opacity: 0.8
            });
            
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            
            networkGroup.add(node);
            this.neuralNodes.push(node);
        }
        
        // Create connections between nodes
        for (let i = 0; i < this.neuralNodes.length; i++) {
            for (let j = i + 1; j < this.neuralNodes.length; j++) {
                if (Math.random() < 0.05) { // 5% chance of connection
                    const geometry = new THREE.BufferGeometry();
                    const positions = new Float32Array([
                        this.neuralNodes[i].position.x, this.neuralNodes[i].position.y, this.neuralNodes[i].position.z,
                        this.neuralNodes[j].position.x, this.neuralNodes[j].position.y, this.neuralNodes[j].position.z
                    ]);
                    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                    
                    const material = new THREE.LineBasicMaterial({
                        color: 0x00d4ff,
                        transparent: true,
                        opacity: 0.3
                    });
                    
                    const line = new THREE.Line(geometry, material);
                    networkGroup.add(line);
                }
            }
        }
        
        this.scene.add(networkGroup);
        this.networkGroup = networkGroup;
    }
    
    createOptimizedParticles() {
        const particleCount = 1000; // Reduced from 5000
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;
            
            colors[i3] = Math.random();
            colors[i3 + 1] = Math.random();
            colors[i3 + 2] = Math.random();
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createDataParticles() {
        const particleCount = 2500; // Reduced from 5000 for better performance
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        const colorPalette = [
            new THREE.Color(0x00d4ff),
            new THREE.Color(0xff6b9d),
            new THREE.Color(0xc77dff),
            new THREE.Color(0x00f5a0)
        ];
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Positions
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;
            
            // Colors
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Sizes
            sizes[i] = Math.random() * 3 + 1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    createHolographicElements() {
        // Floating holographic shapes
        const shapes = [
            new THREE.TetrahedronGeometry(3, 0),
            new THREE.OctahedronGeometry(3, 0),
            new THREE.DodecahedronGeometry(3, 0),
            new THREE.IcosahedronGeometry(3, 0)
        ];
        
        for (let i = 0; i < 20; i++) {
            const geometry = shapes[Math.floor(Math.random() * shapes.length)];
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
                wireframe: true,
                transparent: true,
                opacity: 0.4
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 150
            );
            
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                }
            };
            
            this.holographicShapes.push(mesh);
            this.scene.add(mesh);
        }
    }
    
    createQuantumField() {
        // Quantum particle field effect
        for (let i = 0; i < 200; i++) {
            const geometry = new THREE.RingGeometry(0.1, 0.5, 8);
            const material = new THREE.MeshBasicMaterial({
                color: 0xc77dff,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
            
            const ring = new THREE.Mesh(geometry, material);
            ring.position.set(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200
            );
            
            ring.userData = {
                originalScale: ring.scale.clone(),
                phase: Math.random() * Math.PI * 2
            };
            
            this.quantumParticles.push(ring);
            this.scene.add(ring);
        }
    }
    
    createMatrixGrid() {
        // Create digital matrix grid
        const gridSize = 50;
        const gridHelper = new THREE.GridHelper(gridSize, gridSize, 0x00d4ff, 0x00d4ff);
        gridHelper.position.y = -25;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.2;
        this.scene.add(gridHelper);
        
        // Vertical grid
        const gridHelper2 = new THREE.GridHelper(gridSize, gridSize, 0xff6b9d, 0xff6b9d);
        gridHelper2.rotation.z = Math.PI / 2;
        gridHelper2.position.x = -25;
        gridHelper2.material.transparent = true;
        gridHelper2.material.opacity = 0.1;
        this.scene.add(gridHelper2);
    }
    
    createEnergyStreams() {
        // Create flowing energy streams
        for (let i = 0; i < 10; i++) {
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-50, Math.random() * 20 - 10, Math.random() * 20 - 10),
                new THREE.Vector3(-20, Math.random() * 20 - 10, Math.random() * 20 - 10),
                new THREE.Vector3(0, Math.random() * 20 - 10, Math.random() * 20 - 10),
                new THREE.Vector3(20, Math.random() * 20 - 10, Math.random() * 20 - 10),
                new THREE.Vector3(50, Math.random() * 20 - 10, Math.random() * 20 - 10)
            ]);
            
            const geometry = new THREE.TubeGeometry(curve, 20, 0.1, 8, false);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00f5a0,
                transparent: true,
                opacity: 0.6
            });
            
            const stream = new THREE.Mesh(geometry, material);
            this.dataStreams.push(stream);
            this.scene.add(stream);
        }
    }
    
    createFloatingCode() {
        // Create floating code snippets
        const loader = new THREE.FontLoader();
        // Since we can't load external fonts in this setup, we'll create geometric text representations
        
        const codeElements = ['AI', 'ML', 'DL', 'CV', 'NLP', 'RL', 'GAN', 'CNN', 'RNN', 'GPU'];
        
        codeElements.forEach((text, index) => {
            const geometry = new THREE.BoxGeometry(2, 0.5, 0.1);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(index / codeElements.length, 1, 0.5),
                transparent: true,
                opacity: 0.7
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 50
            );
            
            mesh.userData = {
                floatSpeed: Math.random() * 0.01 + 0.005,
                originalY: mesh.position.y
            };
            
            this.scene.add(mesh);
        });
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Point lights for dramatic effect
        const colors = [0x00d4ff, 0xff6b9d, 0xc77dff, 0x00f5a0];
        
        colors.forEach((color, index) => {
            const pointLight = new THREE.PointLight(color, 2, 100);
            pointLight.position.set(
                Math.cos(index * Math.PI / 2) * 30,
                Math.sin(index * Math.PI / 2) * 30,
                10
            );
            this.scene.add(pointLight);
        });
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
    }
    
    setupPostProcessing() {
        // This would normally use EffectComposer, but for compatibility we'll skip it
        // The effects are already impressive without post-processing!
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('mousemove', (event) => this.onMouseMove(event));
        window.addEventListener('scroll', () => this.onScroll());
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        this.targetRotation.x = this.mouse.y * 0.1;
        this.targetRotation.y = this.mouse.x * 0.1;
    }
    
    onScroll() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        this.camera.position.z = 50 + scrollPercent * 30;
    }
    
    animate() {
        // Throttle animation to 30fps for better performance
        setTimeout(() => {
            requestAnimationFrame(() => this.animate());
        }, 1000 / 30);
        
        const time = Date.now() * 0.001;
        
        // Animate brain group
        if (this.brainGroup) {
            this.brainGroup.rotation.x += 0.005;
            this.brainGroup.rotation.y += 0.01;
        }
        
        // Animate neural network
        if (this.networkGroup) {
            this.networkGroup.rotation.y += 0.002;
            
            this.neuralNodes.forEach((node, index) => {
                node.position.y += Math.sin(time + index) * 0.01;
                node.material.opacity = 0.5 + Math.sin(time * 2 + index) * 0.3;
            });
        }
        
        // Animate particles
        if (this.particles) {
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
            
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + i) * 0.01;
                positions[i] += Math.cos(time + i * 0.1) * 0.005;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // Animate holographic shapes
        this.holographicShapes.forEach(shape => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            shape.material.opacity = 0.2 + Math.sin(time * 2) * 0.2;
        });
        
        // Animate quantum particles
        this.quantumParticles.forEach((particle, index) => {
            const scale = 1 + Math.sin(time * 3 + particle.userData.phase) * 0.5;
            particle.scale.setScalar(scale);
            particle.rotation.z += 0.02;
        });
        
        // Animate data streams
        this.dataStreams.forEach((stream, index) => {
            stream.material.opacity = 0.3 + Math.sin(time * 2 + index) * 0.3;
        });
        
        // Smooth camera movement
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
        
        this.scene.rotation.x = this.currentRotation.x;
        this.scene.rotation.y = this.currentRotation.y;
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Simplified 3D Background Loader
function load3DBackground() {
    // Check if Three.js is available
    if (typeof THREE !== 'undefined') {
        try {
            window.epic3DBackground = new EpicAI3DBackground();
            console.log('🚀 3D Background loaded successfully!');
        } catch (error) {
            console.warn('3D Background failed:', error);
            fallbackTo2D();
        }
    } else {
        console.warn('Three.js not available, using 2D fallback');
        fallbackTo2D();
    }
}

function fallbackTo2D() {
    // Enhanced 2D fallback
    const bg = document.getElementById('threejs-background');
    if (bg) {
        bg.innerHTML = `
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(ellipse at 30% 40%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
                           radial-gradient(ellipse at 80% 20%, rgba(255, 107, 157, 0.12) 0%, transparent 50%),
                           radial-gradient(ellipse at 40% 80%, rgba(199, 125, 255, 0.1) 0%, transparent 60%);
                animation: bg-pulse 4s ease-in-out infinite;
            "></div>
        `;
        
        // Add animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bg-pulse {
                0%, 100% { opacity: 0.8; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(load3DBackground, 500);
});

// Export for global access
window.EpicAI3DBackground = EpicAI3DBackground;