// Main JavaScript for Ata AI Landing Page

// Global variables
let isInitialized = false;
let currentSection = 'home';

// Enhanced Image error handler for circular portrait
window.handleImageError = function(img) {
    console.log('🖼️ Image failed to load, creating epic circular AI avatar fallback...');
    
    // Create canvas for circular AI avatar
    const canvas = document.getElementById('portraitCanvas') || document.createElement('canvas');
    canvas.id = 'portraitCanvas';
    canvas.width = 350;
    canvas.height = 350;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.className = 'circular-crop';
    
    const ctx = canvas.getContext('2d');
    
    // Create circular clipping path
    ctx.save();
    ctx.beginPath();
    ctx.arc(175, 175, 175, 0, Math.PI * 2);
    ctx.clip();
    
    // Epic radial gradient background
    const gradient = ctx.createRadialGradient(175, 175, 0, 175, 175, 175);
    gradient.addColorStop(0, '#00D4FF');
    gradient.addColorStop(0.3, '#FF6B9D');
    gradient.addColorStop(0.6, '#C77DFF');
    gradient.addColorStop(0.8, '#7209B7');
    gradient.addColorStop(1, '#0A0A0A');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 350, 350);
    
    // Add animated neural network pattern
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const x1 = 175 + Math.cos(angle) * 60;
        const y1 = 175 + Math.sin(angle) * 60;
        const x2 = 175 + Math.cos(angle) * 120;
        const y2 = 175 + Math.sin(angle) * 120;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Add nodes
        ctx.beginPath();
        ctx.arc(x2, y2, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00F5A0';
        ctx.fill();
    }
    
    // Add central AI brain
    ctx.beginPath();
    ctx.arc(175, 175, 40, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
    
    // Add "ATA" text
    ctx.fillStyle = '#0A0A0A';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ATA', 175, 180);
    
    // Add AI subtitle
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('AI SYSTEMS', 175, 260);
    ctx.fillText('ONLINE', 175, 280);
    
    // Add pulsing effect border
    ctx.strokeStyle = '#00F5A0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(175, 175, 170, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
    
    // Replace the broken image with our epic canvas
    if (img.parentNode) {
        img.style.display = 'none';
        if (!img.parentNode.querySelector('canvas')) {
            img.parentNode.appendChild(canvas);
        }
    }
    
    // Add pulsing animation to canvas
    let pulseDirection = 1;
    let pulseOpacity = 1;
    
    const animatePulse = () => {
        pulseOpacity += pulseDirection * 0.02;
        if (pulseOpacity >= 1) pulseDirection = -1;
        if (pulseOpacity <= 0.7) pulseDirection = 1;
        
        canvas.style.filter = `brightness(${pulseOpacity})`;
        requestAnimationFrame(animatePulse);
    };
    
    animatePulse();
    
    console.log('✅ Epic circular AI avatar created successfully!');
    img.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        img.style.opacity = '1';
    }, 100);
    
    console.log('✨ AI avatar generated successfully! Much cooler than a boring broken image link 😎');
};

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active nav link
        updateActiveNavLink(sectionId);
    }
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    currentSection = sectionId;
}

// Navigation scroll handler
function handleNavScroll() {
    const sections = ['home', 'capabilities', 'demo', 'chat'];
    const scrollPosition = window.scrollY + 100;
    
    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop;
            const height = section.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                if (currentSection !== sectionId) {
                    updateActiveNavLink(sectionId);
                }
                break;
            }
        }
    }
}

// Mobile navigation toggle
function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Hero stats counter animation
function animateHeroStats() {
    const stats = [
        { element: document.querySelector('[data-target="1000"]'), target: 1000 },
        { element: document.querySelector('[data-target="50000"]'), target: 50000 },
        { element: document.querySelector('[data-target="99.9"]'), target: 99.9 }
    ];
    
    stats.forEach(stat => {
        if (stat.element && !stat.element.hasAttribute('data-animated')) {
            stat.element.setAttribute('data-animated', 'true');
            const counter = new CounterAnimation(stat.element, stat.target, 2500);
            counter.start();
        }
    });
}

// Typing animation for hero title
function animateHeroTitle() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement && !typingElement.hasAttribute('data-typed')) {
        typingElement.setAttribute('data-typed', 'true');
        
        const texts = [
            'Advanced AI Assistant',
            'Machine Learning Expert',
            'Neural Network Architect',
            'Data Science Wizard',
            'Computer Vision Pioneer'
        ];
        
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            const currentText = texts[currentTextIndex];
            
            if (!isDeleting) {
                typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                if (currentCharIndex === currentText.length) {
                    setTimeout(() => { isDeleting = true; }, 2000);
                }
            } else {
                typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                }
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeText, speed);
        }
        
        typeText();
    }
}

// Add floating code animation
function animateFloatingCode() {
    const floatingCode = document.querySelector('.floating-code');
    if (floatingCode) {
        floatingCode.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.05) rotateX(5deg)';
        });
        
        floatingCode.addEventListener('mouseleave', function() {
            this.style.animation = 'float-code 6s ease-in-out infinite';
            this.style.transform = '';
        });
    }
}

// Add capability card interactions
function setupCapabilityCards() {
    const cards = document.querySelectorAll('.capability-card');
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add stagger animation on load
        setTimeout(() => {
            card.classList.add('fade-in-up', 'animate');
        }, index * 200);
    });
}

// Add parallax effects
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Add scroll reveal animations
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// Add loading screen
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <i class="fas fa-robot"></i>
                <span>Ata</span>
            </div>
            <div class="loading-text">Initializing AI Systems...</div>
            <div class="loading-progress">
                <div class="loading-bar"></div>
            </div>
            <div class="loading-stats">
                <div class="loading-stat">Neural Networks: <span id="nn-progress">0%</span></div>
                <div class="loading-stat">Machine Learning: <span id="ml-progress">0%</span></div>
                <div class="loading-stat">Computer Vision: <span id="cv-progress">0%</span></div>
            </div>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: var(--font-primary);
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Animate loading progress
    const progressBar = loadingScreen.querySelector('.loading-bar');
    const loadingText = loadingScreen.querySelector('.loading-text');
    const nnProgress = loadingScreen.querySelector('#nn-progress');
    const mlProgress = loadingScreen.querySelector('#ml-progress');
    const cvProgress = loadingScreen.querySelector('#cv-progress');
    
    const loadingSteps = [
        { text: 'Loading neural networks...', progress: 25 },
        { text: 'Initializing machine learning models...', progress: 50 },
        { text: 'Calibrating computer vision systems...', progress: 75 },
        { text: 'AI systems ready!', progress: 100 }
    ];
    
    let currentStep = 0;
    
    function updateLoading() {
        const step = loadingSteps[currentStep];
        loadingText.textContent = step.text;
        progressBar.style.width = step.progress + '%';
        
        // Update individual stats
        if (currentStep >= 0) nnProgress.textContent = Math.min(step.progress * 1.2, 100) + '%';
        if (currentStep >= 1) mlProgress.textContent = Math.min(step.progress * 0.8, 100) + '%';
        if (currentStep >= 2) cvProgress.textContent = Math.min(step.progress * 1.1, 100) + '%';
        
        currentStep++;
        
        if (currentStep < loadingSteps.length) {
            setTimeout(updateLoading, 800);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1000);
        }
    }
    
    // Add loading screen styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-content {
            text-align: center;
            max-width: 400px;
        }
        
        .loading-logo {
            font-size: 3rem;
            margin-bottom: 30px;
            color: #00d4ff;
        }
        
        .loading-logo i {
            margin-right: 15px;
        }
        
        .loading-text {
            font-size: 1.2rem;
            margin-bottom: 30px;
            color: #b3b3b3;
        }
        
        .loading-progress {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 30px;
        }
        
        .loading-bar {
            height: 100%;
            background: linear-gradient(90deg, #00d4ff, #ff6b9d);
            width: 0%;
            transition: width 0.5s ease-out;
        }
        
        .loading-stats {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .loading-stat {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: #666666;
        }
        
        .loading-stat span {
            color: #00d4ff;
        }
    `;
    document.head.appendChild(loadingStyles);
    
    updateLoading();
}

// Add performance monitoring
function monitorPerformance() {
    // Monitor FPS
    let fps = 0;
    let lastTime = performance.now();
    
    function calculateFPS() {
        const currentTime = performance.now();
        fps = Math.round(1000 / (currentTime - lastTime));
        lastTime = currentTime;
        
        // Log serious performance issues only
        if (fps < 10) {
            console.warn('Serious performance issue detected: FPS =', fps);
        }
        
        requestAnimationFrame(calculateFPS);
    }
    
    calculateFPS();
    
    // Monitor memory usage (if available)
    if (performance.memory) {
        setInterval(() => {
            const memory = performance.memory;
            const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
            const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
            
            if (usedMB > 100) {
                console.warn('High memory usage:', usedMB, 'MB of', totalMB, 'MB');
            }
        }, 30000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (isInitialized) return;
    isInitialized = true;
    
    // Optimize performance first
    optimizePerformance();
    
    // Show loading screen
    showLoadingScreen();
    
    // Setup navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                scrollToSection(sectionId);
            });
        }
    });
    
    // Setup mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Setup scroll handlers
    window.addEventListener('scroll', () => {
        handleNavScroll();
        handleParallax();
    });
    
    // Setup hero animations
    setTimeout(() => {
        animateHeroTitle();
        animateHeroStats();
        animateFloatingCode();
    }, 2000);
    
    // Setup capability cards
    setupCapabilityCards();
    
    // Setup scroll reveal
    setupScrollReveal();
    
    // Start performance monitoring
    monitorPerformance();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + number keys for quick navigation
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    scrollToSection('home');
                    break;
                case '2':
                    scrollToSection('capabilities');
                    break;
                case '3':
                    scrollToSection('demo');
                    break;
                case '4':
                    scrollToSection('chat');
                    break;
            }
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Add ripple effect styles
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        @keyframes ripple {
            from {
                width: 0;
                height: 0;
                opacity: 1;
            }
            to {
                width: 400px;
                height: 400px;
                opacity: 0;
            }
        }
        
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: all 0.6s ease-out;
        }
        
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(50px);
        }
    `;
    document.head.appendChild(rippleStyles);
    
    // Add Easter eggs
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            // Activate secret mode
            document.body.classList.add('konami-mode');
            alert('🎉 Konami Code activated! Secret AI mode enabled!');
            konamiCode = [];
        }
    });
    
    console.log('🤖 Ata AI Landing Page initialized successfully!');
    console.log('💡 Pro tip: Try Alt+1,2,3,4 for quick navigation');
    console.log('🎮 Easter egg: Try the Konami Code!');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Image error handler already defined at the top of the file

// Optimize Performance - Reduce animations on low-end devices
function optimizePerformance() {
    const isLowEnd = navigator.hardwareConcurrency < 4 || 
                     /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isLowEnd) {
        console.log('📱 Low-end device detected, optimizing performance...');
        
        // Reduce particle count
        const particles = document.querySelector('#particles');
        if (particles) particles.style.display = 'none';
        
        // Simplify matrix rain
        const matrix = document.querySelector('#matrix-rain');
        if (matrix) matrix.style.opacity = '0.05';
        
        // Disable 3D background on very low-end devices
        if (navigator.hardwareConcurrency < 2) {
            const threejsBg = document.querySelector('#threejs-background');
            if (threejsBg) threejsBg.style.display = 'none';
        }
        
        document.body.classList.add('performance-mode');
    }
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.updateActiveNavLink = updateActiveNavLink;
window.toggleMobileNav = toggleMobileNav;
// handleImageError already available globally
window.optimizePerformance = optimizePerformance;