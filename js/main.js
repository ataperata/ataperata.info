/**
 * AtaBot Main Application Controller
 * Coordinates all systems and handles global functionality
 */

class AtaBotApp {
    constructor() {
        this.systems = {};
        this.isInitialized = false;
        this.performanceMetrics = {
            loadTime: 0,
            animationFrameRate: 60,
            lastFrameTime: performance.now()
        };
        
        this.init();
    }
    
    async init() {
        console.log('🚀 Initializing AtaBot Application...');
        
        const startTime = performance.now();
        
        try {
            // Wait for DOM to be fully ready
            await this.waitForDOM();
            
            // Initialize all systems
            await this.initializeSystems();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            // Performance monitoring
            this.startPerformanceMonitoring();
            
            // Mark as initialized
            this.isInitialized = true;
            this.performanceMetrics.loadTime = performance.now() - startTime;
            
            console.log(`✅ AtaBot initialized successfully in ${this.performanceMetrics.loadTime.toFixed(2)}ms`);
            
            // Show initialization complete effect
            this.showInitializationComplete();
            
        } catch (error) {
            console.error('❌ AtaBot initialization failed:', error);
            this.showInitializationError(error);
        }
    }
    
    waitForDOM() {
        return new Promise(resolve => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }
    
    async initializeSystems() {
        console.log('🔧 Initializing subsystems...');
        
        // Initialize systems with error handling
        const systemInits = [
            this.initializeAnimations(),
            this.initializeNeuralBackground(),
            this.initializePythonDemos(),
            this.initializeNewsFeed(),
            this.initializeChatSystem(),
            this.initializeStatistics()
        ];
        
        // Initialize systems in parallel but handle failures gracefully
        const results = await Promise.allSettled(systemInits);
        
        results.forEach((result, index) => {
            const systemNames = ['Animations', 'Neural Background', 'Python Demos', 'News Feed', 'Chat System', 'Statistics'];
            if (result.status === 'fulfilled') {
                console.log(`✅ ${systemNames[index]} initialized`);
            } else {
                console.warn(`⚠️ ${systemNames[index]} failed to initialize:`, result.reason);
            }
        });
    }
    
    async initializeAnimations() {
        // AtaBot animations are initialized in their own module
        if (window.ataBotAnimations && window.ataBotAnimations.isInitialized) {
            this.systems.animations = window.ataBotAnimations;
        } else {
            throw new Error('AtaBot animations not available');
        }
    }
    
    async initializeNeuralBackground() {
        if (window.neuralBackground && window.neuralBackground.isInitialized) {
            this.systems.neuralBackground = window.neuralBackground;
        } else {
            console.warn('Neural background not available - continuing without 3D effects');
        }
    }
    
    async initializePythonDemos() {
        if (window.pythonDemoSystem) {
            this.systems.pythonDemos = window.pythonDemoSystem;
        } else {
            throw new Error('Python demo system not available');
        }
    }
    
    async initializeNewsFeed() {
        if (window.aiNewsFeed) {
            this.systems.newsFeed = window.aiNewsFeed;
        } else {
            throw new Error('AI news feed not available');
        }
    }
    
    async initializeChatSystem() {
        if (window.chatSystem) {
            this.systems.chatSystem = window.chatSystem;
        } else {
            throw new Error('Chat system not available');
        }
    }
    
    async initializeStatistics() {
        // Initialize Chart.js charts for statistics
        this.setupStatisticsCharts();
    }
    
    setupGlobalEvents() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeyboard(e);
        });
        
        // Global click effects
        document.addEventListener('click', (e) => {
            this.handleGlobalClick(e);
        });
        
        // Window resize handling
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // Error handling
        window.addEventListener('error', (e) => {
            this.handleGlobalError(e);
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            this.handleUnhandledRejection(e);
        });
    }
    
    handleGlobalKeyboard(e) {
        // Global keyboard shortcuts
        const shortcuts = {
            'Escape': () => this.handleEscapeKey(),
            'F11': (e) => this.toggleFullscreen(e),
            '?': () => this.showKeyboardShortcuts()
        };
        
        // Developer shortcuts (Ctrl + combinations)
        if (e.ctrlKey) {
            const devShortcuts = {
                'k': () => this.focusSearch(e),
                '/': () => this.focusChat(e),
                'd': () => this.toggleDarkMode(e),
                'r': () => this.handleRefresh(e)
            };
            
            if (devShortcuts[e.key]) {
                devShortcuts[e.key]();
            }
        }
        
        if (shortcuts[e.key]) {
            shortcuts[e.key](e);
        }
    }
    
    handleGlobalClick(e) {
        // Add ripple effect to buttons
        if (e.target.matches('button, .btn, .quick-action, .filter-btn')) {
            this.createRippleEffect(e.target, e);
        }
        
        // Neural background click effect
        if (this.systems.neuralBackground && e.target.id === 'neural-background') {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.systems.neuralBackground.addRippleEffect(x * 500, y * 500);
        }
        
        // Analytics (if implemented)
        this.trackClick(e.target);
    }
    
    createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        // Ensure element has relative positioning
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        element.style.overflow = 'hidden';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    handleResize() {
        // Notify all systems of resize
        Object.values(this.systems).forEach(system => {
            if (system.handleResize) {
                system.handleResize();
            }
        });
        
        // Update viewport units
        this.updateViewportUnits();
    }
    
    updateViewportUnits() {
        // Fix viewport height issues on mobile
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause expensive operations when tab is not visible
            this.pauseAnimations();
        } else {
            // Resume when tab becomes visible
            this.resumeAnimations();
        }
    }
    
    pauseAnimations() {
        if (this.systems.neuralBackground && this.systems.neuralBackground.pause) {
            this.systems.neuralBackground.pause();
        }
    }
    
    resumeAnimations() {
        if (this.systems.neuralBackground && this.systems.neuralBackground.resume) {
            this.systems.neuralBackground.resume();
        }
    }
    
    handleEscapeKey() {
        // Close any open modals
        const openModals = document.querySelectorAll('.modal-overlay.show');
        openModals.forEach(modal => {
            modal.classList.remove('show');
        });
        
        // Clear search if focused
        const activeElement = document.activeElement;
        if (activeElement && activeElement.type === 'search') {
            activeElement.value = '';
            activeElement.blur();
        }
    }
    
    toggleFullscreen(e) {
        e.preventDefault();
        
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn('Could not enter fullscreen:', err);
            });
        } else {
            document.exitFullscreen().catch(err => {
                console.warn('Could not exit fullscreen:', err);
            });
        }
    }
    
    focusSearch(e) {
        e.preventDefault();
        const searchInput = document.getElementById('news-search');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    focusChat(e) {
        e.preventDefault();
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.focus();
            chatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    toggleDarkMode(e) {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        if (this.systems.animations && this.systems.animations.applyTheme) {
            this.systems.animations.applyTheme(newTheme);
        }
    }
    
    handleRefresh(e) {
        // Manual refresh for news feed
        if (this.systems.newsFeed && this.systems.newsFeed.refreshNews) {
            e.preventDefault();
            this.systems.newsFeed.refreshNews(true);
        }
    }
    
    setupStatisticsCharts() {
        // Initialize Chart.js charts for the statistics section
        this.initializeResponseTimeChart();
        this.initializeAccuracyChart();
        this.initializeActivityChart();
    }
    
    initializeResponseTimeChart() {
        const canvas = document.createElement('canvas');
        canvas.id = 'response-time-chart';
        canvas.width = 300;
        canvas.height = 150;
        
        // Find a stat card to add the chart to
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards[0] && window.Chart) {
            const ctx = canvas.getContext('2d');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['1m', '2m', '3m', '4m', '5m'],
                    datasets: [{
                        label: 'Response Time',
                        data: [180, 165, 172, 158, 167],
                        borderColor: 'rgba(0, 240, 255, 1)',
                        backgroundColor: 'rgba(0, 240, 255, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    elements: {
                        point: { radius: 0 }
                    }
                }
            });
        }
    }
    
    initializeAccuracyChart() {
        // Circular progress chart for accuracy
        const accuracyCards = document.querySelectorAll('.stat-card .stat-circular');
        if (accuracyCards.length > 0) {
            // Chart.js doughnut chart could be added here
            console.log('Accuracy chart placeholder ready');
        }
    }
    
    initializeActivityChart() {
        // Activity heatmap or area chart
        console.log('Activity chart placeholder ready');
    }
    
    startPerformanceMonitoring() {
        // Monitor frame rate
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkFrameRate = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                this.performanceMetrics.animationFrameRate = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // Adjust quality if performance is poor
                if (this.performanceMetrics.animationFrameRate < 30) {
                    this.reduceAnimationQuality();
                }
            }
            
            requestAnimationFrame(checkFrameRate);
        };
        
        requestAnimationFrame(checkFrameRate);
        
        // Memory monitoring (if available)
        if (performance.memory) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
                    console.warn('High memory usage detected');
                    this.optimizeMemoryUsage();
                }
            }, 30000); // Check every 30 seconds
        }
    }
    
    reduceAnimationQuality() {
        console.log('Reducing animation quality for better performance');
        
        // Reduce neural background quality
        if (this.systems.neuralBackground && this.systems.neuralBackground.reduceQuality) {
            this.systems.neuralBackground.reduceQuality();
        }
        
        // Reduce animation speed
        document.documentElement.style.setProperty('--animation-speed-multiplier', '0.5');
    }
    
    optimizeMemoryUsage() {
        console.log('Optimizing memory usage');
        
        // Clear old conversation history
        if (this.systems.chatSystem) {
            const history = this.systems.chatSystem.conversationHistory;
            if (history.length > 50) {
                this.systems.chatSystem.conversationHistory = history.slice(-30);
            }
        }
        
        // Clear old news articles
        if (this.systems.newsFeed) {
            if (this.systems.newsFeed.articles.length > 100) {
                this.systems.newsFeed.articles = this.systems.newsFeed.articles.slice(0, 50);
            }
        }
    }
    
    handleGlobalError(e) {
        console.error('Global error:', e.error);
        
        // Show user-friendly error message
        this.showErrorNotification('Something went wrong, but I\'m still here to help!');
        
        // Try to recover gracefully
        this.attemptErrorRecovery();
    }
    
    handleUnhandledRejection(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault(); // Prevent default browser error handling
        
        this.showErrorNotification('A minor hiccup occurred, but everything should still work!');
    }
    
    attemptErrorRecovery() {
        // Try to restart failed systems
        setTimeout(() => {
            Object.entries(this.systems).forEach(([name, system]) => {
                if (system && system.isInitialized === false) {
                    console.log(`Attempting to restart ${name} system`);
                    // Implementation specific to each system
                }
            });
        }, 1000);
    }
    
    showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">⚠️</span>
                <span class="notification-text">${message}</span>
                <button class="close-notification" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 0, 60, 0.1);
            border: 1px solid var(--neon-red);
            border-radius: 12px;
            padding: 16px;
            color: var(--text-primary);
            z-index: 10001;
            backdrop-filter: blur(10px);
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    showInitializationComplete() {
        // Create a brief "initialization complete" effect
        const effect = document.createElement('div');
        effect.className = 'init-complete-effect';
        effect.innerHTML = `
            <div class="init-message">
                <div class="init-icon">🚀</div>
                <div class="init-text">AtaBot Ready!</div>
            </div>
        `;
        
        effect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--surface);
            border: 1px solid var(--neon-cyan);
            border-radius: 16px;
            padding: 24px;
            color: var(--text-primary);
            z-index: 10002;
            backdrop-filter: blur(15px);
            text-align: center;
            animation: initComplete 2s ease forwards;
        `;
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 2000);
    }
    
    showInitializationError(error) {
        console.error('Initialization error details:', error);
        
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 0, 60, 0.1);
                border: 2px solid var(--neon-red);
                border-radius: 16px;
                padding: 32px;
                color: var(--text-primary);
                z-index: 10003;
                backdrop-filter: blur(15px);
                text-align: center;
                max-width: 400px;
            ">
                <div style="font-size: 48px; margin-bottom: 16px;">❌</div>
                <h3>AtaBot Initialization Error</h3>
                <p>Some features may not work correctly.</p>
                <button onclick="location.reload()" style="
                    margin-top: 16px;
                    padding: 12px 24px;
                    background: var(--neon-red);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                ">Reload Page</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
    }
    
    trackClick(element) {
        // Simple click analytics (could be extended)
        if (element.classList.contains('btn') || element.tagName === 'BUTTON') {
            const buttonText = element.textContent.trim();
            console.log(`Button clicked: ${buttonText}`);
        }
    }
    
    // Public API methods
    getSystemStatus() {
        const status = {
            initialized: this.isInitialized,
            loadTime: this.performanceMetrics.loadTime,
            frameRate: this.performanceMetrics.animationFrameRate,
            systems: {}
        };
        
        Object.entries(this.systems).forEach(([name, system]) => {
            status.systems[name] = {
                available: !!system,
                initialized: system.isInitialized || false
            };
        });
        
        return status;
    }
    
    triggerEasterEgg(type = 'neural-storm') {
        switch (type) {
            case 'neural-storm':
                if (this.systems.neuralBackground && this.systems.neuralBackground.neuralStorm) {
                    this.systems.neuralBackground.neuralStorm();
                }
                break;
                
            case 'chat-welcome':
                if (this.systems.chatSystem && this.systems.chatSystem.triggerWelcome) {
                    this.systems.chatSystem.triggerWelcome();
                }
                break;
                
            case 'demo-cycle':
                if (this.systems.pythonDemos) {
                    // Cycle through all demos
                    for (let i = 0; i < 7; i++) {
                        setTimeout(() => {
                            this.systems.pythonDemos.loadDemo(i);
                            if (i === 6) {
                                setTimeout(() => {
                                    this.systems.pythonDemos.executeDemo();
                                }, 1000);
                            }
                        }, i * 2000);
                    }
                }
                break;
        }
    }
}

// Add CSS animations for effects
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    @keyframes ripple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes initComplete {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
    
    .init-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }
    
    .init-icon {
        font-size: 48px;
        animation: pulse 1s ease infinite;
    }
    
    .init-text {
        font-size: 18px;
        font-weight: 600;
        color: var(--neon-cyan);
    }
    
    .close-notification {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 18px;
        margin-left: 12px;
        transition: color var(--transition-fast);
    }
    
    .close-notification:hover {
        color: var(--neon-red);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .ripple-effect {
            display: none;
        }
        
        @keyframes initComplete {
            0%, 100% { 
                opacity: 0; 
                transform: translate(-50%, -50%); 
            }
            50% { 
                opacity: 1; 
                transform: translate(-50%, -50%); 
            }
        }
    }
`;
document.head.appendChild(globalStyles);

// Initialize the application
let ataBotApp;

// Wait for all dependencies to load
const initializeApp = () => {
    if (!ataBotApp) {
        ataBotApp = new AtaBotApp();
        
        // Expose to global scope for debugging
        window.ataBotApp = ataBotApp;
        
        // Add some fun console messages
        console.log('%c🤖 AtaBot Console Interface Ready!', 'color: #00f0ff; font-size: 16px; font-weight: bold;');
        console.log('%cTry: ataBotApp.getSystemStatus()', 'color: #b624ff; font-style: italic;');
        console.log('%cTry: ataBotApp.triggerEasterEgg("neural-storm")', 'color: #ff0080; font-style: italic;');
    }
};

// Initialize when DOM is ready or immediately if already ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}