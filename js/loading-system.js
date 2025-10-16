/**
 * AtaBot Advanced Loading System
 * Ensures everything loads perfectly within 1.7 seconds
 */

class LoadingSystem {
    constructor() {
        this.startTime = performance.now();
        this.maxLoadTime = 1700; // 1.7 seconds
        this.progress = 0;
        this.loadingSteps = [
            { name: 'Initializing core systems...', weight: 15 },
            { name: 'Loading neural networks...', weight: 20 },
            { name: 'Preparing Python engine...', weight: 15 },
            { name: 'Setting up chat interface...', weight: 15 },
            { name: 'Loading analytics dashboard...', weight: 10 },
            { name: 'Optimizing performance...', weight: 10 },
            { name: 'Finalizing setup...', weight: 15 }
        ];
        this.currentStep = 0;
        this.resourcesLoaded = 0;
        this.totalResources = 0;
        
        this.init();
    }
    
    init() {
        this.preloadCriticalResources();
        this.startLoadingSequence();
        this.monitorResourceLoading();
        this.setupFallbackTimer();
    }
    
    preloadCriticalResources() {
        const criticalResources = [
            'css/styles.css',
            'js/neural-background.js',
            'js/animations.js',
            'js/python-demos.js',
            'js/news-feed.js',
            'js/chat-system.js',
            'js/main.js'
        ];
        
        this.totalResources = criticalResources.length + 5; // +5 for images
        
        // Preload scripts and styles
        criticalResources.forEach(resource => {
            if (resource.endsWith('.css')) {
                this.preloadStylesheet(resource);
            } else if (resource.endsWith('.js')) {
                this.preloadScript(resource);
            }
        });
        
        // Preload images
        this.preloadImages();
    }
    
    preloadStylesheet(href) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.onload = () => this.incrementResourceLoaded();
        link.onerror = () => this.incrementResourceLoaded();
        document.head.appendChild(link);
    }
    
    preloadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => this.incrementResourceLoaded();
        script.onerror = () => this.incrementResourceLoaded();
        document.head.appendChild(script);
    }
    
    preloadImages() {
        const images = [
            'picture_1.jpg',
            'picture_2.jpg', 
            'picture_3.jpg',
            'picture_4.jpg',
            'picture_5.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.onload = () => this.incrementResourceLoaded();
            img.onerror = () => {
                console.warn(`Failed to load image: ${src}`);
                this.incrementResourceLoaded();
            };
            img.src = src;
        });
    }
    
    incrementResourceLoaded() {
        this.resourcesLoaded++;
        const resourceProgress = (this.resourcesLoaded / this.totalResources) * 40; // 40% for resources
        this.updateProgress(Math.min(resourceProgress, 40));
        
        if (this.resourcesLoaded >= this.totalResources) {
            this.onResourcesLoaded();
        }
    }
    
    onResourcesLoaded() {
        console.log('✅ All critical resources loaded');
        this.updateProgress(50);
        this.continueLoadingSequence();
    }
    
    startLoadingSequence() {
        // Start with first step
        this.executeLoadingStep(0);
    }
    
    executeLoadingStep(stepIndex) {
        if (stepIndex >= this.loadingSteps.length) {
            this.completeLoading();
            return;
        }
        
        const step = this.loadingSteps[stepIndex];
        this.updateLoadingText(step.name);
        
        // Activate feature indicator
        this.activateFeature(stepIndex);
        
        // Calculate timing for this step
        const stepDuration = (this.maxLoadTime * step.weight) / 100;
        const minDuration = 200; // Minimum 200ms per step
        const actualDuration = Math.max(stepDuration, minDuration);
        
        setTimeout(() => {
            // Update progress
            const stepProgress = this.loadingSteps
                .slice(0, stepIndex + 1)
                .reduce((sum, s) => sum + s.weight, 0);
            
            this.updateProgress(50 + (stepProgress * 0.5)); // 50% base + 50% for steps
            
            // Continue to next step
            this.executeLoadingStep(stepIndex + 1);
        }, actualDuration);
    }
    
    continueLoadingSequence() {
        // Continue from where we left off
        if (this.currentStep < this.loadingSteps.length) {
            this.executeLoadingStep(this.currentStep);
        }
    }
    
    activateFeature(stepIndex) {
        const features = document.querySelectorAll('.feature-item');
        const featureMap = {
            0: 'neural',   // Initializing core systems
            1: 'neural',   // Loading neural networks
            2: 'python',   // Preparing Python engine
            3: 'chat',     // Setting up chat interface
            4: 'analytics',// Loading analytics dashboard
            5: 'analytics',// Optimizing performance
            6: 'chat'      // Finalizing setup
        };
        
        const featureType = featureMap[stepIndex];
        if (featureType && features.length > 0) {
            const feature = document.querySelector(`[data-feature="${featureType}"]`);
            if (feature && !feature.classList.contains('loaded')) {
                feature.classList.add('loaded');
                
                // Add activation animation
                feature.style.animation = 'featureActivate 0.5s ease';
            }
        }
    }
    
    updateProgress(percentage) {
        this.progress = Math.min(percentage, 100);
        
        const progressBar = document.getElementById('loading-progress');
        const progressText = document.getElementById('loading-percentage');
        
        if (progressBar) {
            progressBar.style.width = `${this.progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${Math.round(this.progress)}%`;
        }
    }
    
    updateLoadingText(text) {
        const loadingText = document.getElementById('loading-text');
        if (loadingText) {
            loadingText.style.animation = 'textFadeOut 0.2s ease';
            
            setTimeout(() => {
                loadingText.textContent = text;
                loadingText.style.animation = 'textFadeIn 0.3s ease';
            }, 200);
        }
    }
    
    setupFallbackTimer() {
        // Ensure loading completes within max time
        setTimeout(() => {
            if (this.progress < 100) {
                console.warn('Loading taking longer than expected, forcing completion');
                this.forceComplete();
            }
        }, this.maxLoadTime);
    }
    
    forceComplete() {
        this.updateProgress(100);
        this.updateLoadingText('Ready to launch! 🚀');
        
        setTimeout(() => {
            this.completeLoading();
        }, 300);
    }
    
    completeLoading() {
        const elapsedTime = performance.now() - this.startTime;
        console.log(`✅ Loading completed in ${elapsedTime.toFixed(2)}ms`);
        
        // Ensure all features are activated
        document.querySelectorAll('.feature-item').forEach(feature => {
            feature.classList.add('loaded');
        });
        
        this.updateProgress(100);
        this.updateLoadingText('Welcome to AtaBot! 🎉');
        
        // Hide loading screen with animation
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 500);
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
                this.onLoadingComplete();
            }, 800);
        }
    }
    
    onLoadingComplete() {
        // Trigger any post-loading initialization
        document.dispatchEvent(new CustomEvent('loadingComplete'));
        
        // Initialize main application
        if (window.AtaBotApp && !window.ataBotApp) {
            setTimeout(() => {
                window.ataBotApp = new window.AtaBotApp();
            }, 100);
        }
        
        // Add entry animation to main content
        this.animateMainContent();
    }
    
    animateMainContent() {
        const sections = document.querySelectorAll('section, nav');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Performance monitoring
    getLoadingMetrics() {
        return {
            totalTime: performance.now() - this.startTime,
            progress: this.progress,
            resourcesLoaded: this.resourcesLoaded,
            totalResources: this.totalResources
        };
    }
}

// Add CSS animations for loading effects
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    @keyframes featureActivate {
        0% {
            transform: scale(1);
            background: var(--surface);
        }
        50% {
            transform: scale(1.05);
            background: rgba(251, 191, 36, 0.1);
        }
        100% {
            transform: scale(1);
            background: var(--surface);
        }
    }
    
    @keyframes textFadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
    
    @keyframes textFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .loading-screen {
        background: 
            radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(29, 78, 216, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(251, 191, 36, 0.05) 0%, transparent 50%),
            var(--gradient-bg);
        background-size: 100% 100%, 100% 100%, 100% 100%, 100% 100%;
        animation: backgroundShift 8s ease infinite;
    }
    
    @keyframes backgroundShift {
        0%, 100% { background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%; }
        25% { background-position: 25% 25%, 75% 75%, 75% 25%, 0% 0%; }
        50% { background-position: 50% 50%, 50% 50%, 25% 75%, 0% 0%; }
        75% { background-position: 75% 25%, 25% 75%, 75% 75%, 0% 0%; }
    }
`;
document.head.appendChild(loadingStyles);

// Initialize loading system immediately
document.addEventListener('DOMContentLoaded', () => {
    window.loadingSystem = new LoadingSystem();
});

// Export for use in other modules
window.LoadingSystem = LoadingSystem;