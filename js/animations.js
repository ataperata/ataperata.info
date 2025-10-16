/**
 * AtaBot Animations & UI Interactions
 * Handles all animations, scroll effects, and user interactions
 */

class AtaBotAnimations {
    constructor() {
        this.isInitialized = false;
        this.observers = [];
        this.animations = new Map();
        this.scrollY = 0;
        
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHeroAnimations();
        this.setupNavigation();
        this.setupImageCarousel();
        this.setupStatistics();
        this.setupInteractions();
        this.setupThemes();
        
        this.isInitialized = true;
    }
    
    // Scroll-triggered animations
    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScrollAnimation(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(`
            .capability-card,
            .news-card,
            .stat-card,
            .section-title,
            .demo-container
        `);
        
        animatableElements.forEach(el => {
            scrollObserver.observe(el);
        });
        
        this.observers.push(scrollObserver);
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Parallax scrolling effects
        window.addEventListener('scroll', () => {
            this.handleParallaxScroll();
        });
    }
    
    triggerScrollAnimation(element) {
        const animationType = element.classList.contains('capability-card') ? 'slideInUp' :
                             element.classList.contains('news-card') ? 'slideInUp' :
                             element.classList.contains('stat-card') ? 'slideInUp' :
                             element.classList.contains('section-title') ? 'fadeInScale' :
                             'slideInUp';
        
        this.animateElement(element, animationType);
    }
    
    animateElement(element, animationType, delay = 0) {
        setTimeout(() => {
            switch (animationType) {
                case 'slideInUp':
                    element.style.animation = 'slideInUp 0.6s ease forwards';
                    break;
                case 'slideInLeft':
                    element.style.animation = 'slideInLeft 0.6s ease forwards';
                    break;
                case 'slideInRight':
                    element.style.animation = 'slideInRight 0.6s ease forwards';
                    break;
                case 'fadeInScale':
                    element.style.animation = 'fadeInScale 0.8s ease forwards';
                    break;
                case 'pulse':
                    element.style.animation = 'pulse 2s ease infinite';
                    break;
            }
        }, delay);
    }
    
    handleParallaxScroll() {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - this.scrollY;
        this.scrollY = scrollY;
        
        // Hero section parallax
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroOffset = scrollY * 0.5;
            heroSection.style.transform = `translateY(${heroOffset}px)`;
        }
        
        // Navigation background opacity
        const nav = document.querySelector('.nav-container');
        if (nav) {
            const navOpacity = Math.min(scrollY / 100, 1);
            nav.style.background = `rgba(10, 14, 39, ${0.3 + navOpacity * 0.5})`;
        }
        
        // Floating elements
        const floatingElements = document.querySelectorAll('.capability-card, .stat-card');
        floatingElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = scrollY * (0.1 + index * 0.05);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    // Hero section animations
    setupHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroImage = document.querySelector('.hero-image');
        const heroCTA = document.querySelector('.hero-cta');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        // Staggered entrance animations
        if (heroTitle) {
            this.animateElement(heroTitle, 'slideInUp', 200);
        }
        
        if (heroSubtitle) {
            this.setupTypingAnimation(heroSubtitle);
        }
        
        if (heroImage) {
            this.setupHeroImageEffects(heroImage);
        }
        
        if (heroCTA) {
            this.animateElement(heroCTA, 'slideInUp', 800);
        }
        
        if (scrollIndicator) {
            this.animateElement(scrollIndicator, 'slideInUp', 1000);
        }
        
        // Hero CTA button interactions
        const startChatBtn = document.getElementById('start-chat-btn');
        const seeActionBtn = document.getElementById('see-action-btn');
        
        if (startChatBtn) {
            startChatBtn.addEventListener('click', () => {
                this.scrollToSection('#chat');
                this.triggerChatWelcome();
            });
        }
        
        if (seeActionBtn) {
            seeActionBtn.addEventListener('click', () => {
                this.scrollToSection('#demos');
            });
        }
    }
    
    setupTypingAnimation(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 50 + Math.random() * 50);
            } else {
                // Add blinking cursor briefly
                element.textContent += '|';
                setTimeout(() => {
                    element.textContent = text;
                }, 500);
            }
        };
        
        setTimeout(typeChar, 1000);
    }
    
    setupHeroImageEffects(image) {
        // Mouse follow effect
        let mouseX = 0, mouseY = 0;
        let imageX = 0, imageY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        });
        
        const updateImagePosition = () => {
            imageX += (mouseX - imageX) * 0.1;
            imageY += (mouseY - imageY) * 0.1;
            
            image.style.transform = `translate(${imageX}px, ${imageY}px)`;
            requestAnimationFrame(updateImagePosition);
        };
        
        updateImagePosition();
        
        // Image loading animation
        if (!image.complete) {
            image.style.opacity = '0';
            image.addEventListener('load', () => {
                image.style.transition = 'opacity 1s ease';
                image.style.opacity = '1';
            });
        }
    }
    
    // Navigation effects
    setupNavigation() {
        const nav = document.querySelector('.nav-container');
        const navLinks = document.querySelectorAll('.nav-link');
        const socialLinks = document.querySelectorAll('.social-link');
        
        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        
        const updateActiveLink = () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };
        
        window.addEventListener('scroll', updateActiveLink);
        
        // Social link hover effects
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.createParticleTrail(link);
            });
        });
        
        // Mobile menu toggle (if needed)
        this.setupMobileMenu();
    }
    
    setupMobileMenu() {
        // Add mobile menu functionality if screen is small
        const createMobileMenu = () => {
            if (window.innerWidth <= 768) {
                const navLinks = document.querySelector('.nav-links');
                const navContent = document.querySelector('.nav-content');
                
                if (!document.querySelector('.mobile-menu-toggle')) {
                    const toggleBtn = document.createElement('button');
                    toggleBtn.className = 'mobile-menu-toggle';
                    toggleBtn.innerHTML = '☰';
                    toggleBtn.addEventListener('click', () => {
                        navLinks.classList.toggle('mobile-open');
                    });
                    
                    navContent.appendChild(toggleBtn);
                }
            }
        };
        
        window.addEventListener('resize', createMobileMenu);
        createMobileMenu();
    }
    
    // Image carousel
    setupImageCarousel() {
        const carousel = document.getElementById('image-carousel');
        if (!carousel) return;
        
        const track = document.getElementById('carousel-track');
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        const updateCarousel = (index) => {
            // Update track position
            track.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active states
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        };
        
        const nextSlide = () => {
            const next = (currentSlide + 1) % totalSlides;
            updateCarousel(next);
        };
        
        const prevSlide = () => {
            const prev = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel(prev);
        };
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateCarousel(index));
        });
        
        // Auto-rotation
        let autoRotate = setInterval(nextSlide, 4000);
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoRotate = setInterval(nextSlide, 4000);
        });
        
        // Touch/swipe support
        this.setupCarouselTouch(track, nextSlide, prevSlide);
    }
    
    setupCarouselTouch(track, nextSlide, prevSlide) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        const handleStart = (e) => {
            isDragging = true;
            startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        };
        
        const handleMove = (e) => {
            if (!isDragging) return;
            currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        };
        
        const handleEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        };
        
        track.addEventListener('mousedown', handleStart);
        track.addEventListener('mousemove', handleMove);
        track.addEventListener('mouseup', handleEnd);
        track.addEventListener('touchstart', handleStart);
        track.addEventListener('touchmove', handleMove);
        track.addEventListener('touchend', handleEnd);
    }
    
    // Statistics counter animations
    setupStatistics() {
        const statCards = document.querySelectorAll('.stat-card');
        
        statCards.forEach(card => {
            const valueElement = card.querySelector('.stat-value');
            const progressBar = card.querySelector('.stat-progress');
            const circularBar = card.querySelector('.circular-bar');
            
            if (valueElement) {
                this.setupCounterAnimation(valueElement);
            }
            
            if (progressBar) {
                this.setupProgressAnimation(progressBar);
            }
            
            if (circularBar) {
                this.setupCircularProgress(circularBar);
            }
        });
    }
    
    setupCounterAnimation(element) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseFloat(element.dataset.value);
                    this.animateCounter(element, 0, target, 2000);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    }
    
    animateCounter(element, start, end, duration) {
        const startTime = Date.now();
        const isDecimal = end % 1 !== 0;
        
        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (easeOutCubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;
            
            element.textContent = isDecimal ? 
                current.toFixed(1) : 
                Math.floor(current).toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = isDecimal ? 
                    end.toFixed(1) : 
                    end.toLocaleString();
            }
        };
        
        updateCounter();
    }
    
    setupProgressAnimation(progressBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = progressBar.dataset.progress;
                    progressBar.style.width = `${progress}%`;
                    observer.unobserve(progressBar);
                }
            });
        });
        
        observer.observe(progressBar);
    }
    
    setupCircularProgress(circularBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = parseFloat(circularBar.dataset.progress);
                    const circumference = 2 * Math.PI * 16; // radius = 16
                    const offset = circumference - (progress / 100) * circumference;
                    
                    circularBar.style.strokeDashoffset = offset;
                    observer.unobserve(circularBar);
                }
            });
        });
        
        observer.observe(circularBar);
    }
    
    // Interactive effects
    setupInteractions() {
        // Button hover effects
        const buttons = document.querySelectorAll('.btn, .control-btn, .quick-action');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createButtonGlow(button);
            });
        });
        
        // Card hover effects
        const cards = document.querySelectorAll('.capability-card, .news-card, .stat-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card);
            });
        });
        
        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.style.opacity = '1';
                    backToTop.style.visibility = 'visible';
                } else {
                    backToTop.style.opacity = '0';
                    backToTop.style.visibility = 'hidden';
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
    }
    
    createButtonGlow(button) {
        const rect = button.getBoundingClientRect();
        const glow = document.createElement('div');
        glow.className = 'button-glow-effect';
        glow.style.cssText = `
            position: fixed;
            top: ${rect.top}px;
            left: ${rect.left}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            background: radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%);
            border-radius: inherit;
            pointer-events: none;
            z-index: -1;
            animation: glowPulse 0.6s ease;
        `;
        
        document.body.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 600);
    }
    
    enhanceCardHover(card) {
        // Add dynamic lighting effect
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        document.addEventListener('mousemove', function lightingEffect(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
            
            const lightX = Math.cos(angle) * 50;
            const lightY = Math.sin(angle) * 50;
            
            card.style.boxShadow = `
                ${lightX}px ${lightY}px 40px rgba(0, 240, 255, 0.2),
                0 0 20px rgba(0, 240, 255, 0.1)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', arguments.callee);
            card.style.boxShadow = '';
        });
    }
    
    createParticleTrail(element) {
        const rect = element.getBoundingClientRect();
        const particles = [];
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-trail';
            particle.style.cssText = `
                position: fixed;
                top: ${rect.top + rect.height / 2}px;
                left: ${rect.left + rect.width / 2}px;
                width: 4px;
                height: 4px;
                background: var(--neon-cyan);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(particle);
            particles.push(particle);
            
            // Animate particle
            const angle = (i / 5) * Math.PI * 2;
            const distance = 20 + Math.random() * 30;
            const duration = 500 + Math.random() * 500;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: duration,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes modals
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal-overlay.show');
                if (openModal) {
                    this.closeModal(openModal);
                }
            }
            
            // Arrow keys for carousel navigation
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const carousel = document.querySelector('.gallery-carousel:hover');
                if (carousel) {
                    e.preventDefault();
                    if (e.key === 'ArrowLeft') {
                        document.getElementById('prev-btn')?.click();
                    } else {
                        document.getElementById('next-btn')?.click();
                    }
                }
            }
        });
    }
    
    // Theme management
    setupThemes() {
        const themeSelect = document.getElementById('theme-select');
        const animationSpeedSelect = document.getElementById('animation-speed');
        const soundToggle = document.getElementById('sound-toggle');
        
        // Load saved preferences
        const savedTheme = localStorage.getItem('atabot-theme') || 'dark';
        const savedAnimationSpeed = localStorage.getItem('atabot-animation-speed') || 'normal';
        const savedSoundEnabled = localStorage.getItem('atabot-sound') !== 'false';
        
        if (themeSelect) {
            themeSelect.value = savedTheme;
            this.applyTheme(savedTheme);
            
            themeSelect.addEventListener('change', (e) => {
                this.applyTheme(e.target.value);
                localStorage.setItem('atabot-theme', e.target.value);
            });
        }
        
        if (animationSpeedSelect) {
            animationSpeedSelect.value = savedAnimationSpeed;
            this.applyAnimationSpeed(savedAnimationSpeed);
            
            animationSpeedSelect.addEventListener('change', (e) => {
                this.applyAnimationSpeed(e.target.value);
                localStorage.setItem('atabot-animation-speed', e.target.value);
            });
        }
        
        if (soundToggle) {
            soundToggle.checked = savedSoundEnabled;
            window.soundEnabled = savedSoundEnabled;
            
            soundToggle.addEventListener('change', (e) => {
                window.soundEnabled = e.target.checked;
                localStorage.setItem('atabot-sound', e.target.checked);
            });
        }
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme-specific styles
        if (theme === 'light') {
            document.documentElement.style.setProperty('--bg-primary', '#f0f0f0');
            document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
            document.documentElement.style.setProperty('--text-primary', '#333333');
            document.documentElement.style.setProperty('--text-secondary', '#666666');
        } else {
            // Reset to dark theme defaults
            document.documentElement.style.removeProperty('--bg-primary');
            document.documentElement.style.removeProperty('--bg-secondary');
            document.documentElement.style.removeProperty('--text-primary');
            document.documentElement.style.removeProperty('--text-secondary');
        }
    }
    
    applyAnimationSpeed(speed) {
        const multiplier = {
            'fast': 0.5,
            'normal': 1,
            'slow': 2,
            'off': 0
        }[speed] || 1;
        
        document.documentElement.style.setProperty('--animation-speed-multiplier', multiplier);
        
        if (speed === 'off') {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        } else {
            document.documentElement.style.setProperty('--transition-fast', `${0.2 * multiplier}s`);
            document.documentElement.style.setProperty('--transition-normal', `${0.4 * multiplier}s`);
            document.documentElement.style.setProperty('--transition-slow', `${0.8 * multiplier}s`);
        }
    }
    
    // Utility methods
    scrollToSection(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    triggerChatWelcome() {
        // Trigger welcome animation in chat
        setTimeout(() => {
            const chatSystem = window.chatSystem;
            if (chatSystem) {
                chatSystem.addBotMessage("Ready to chat! What would you like to explore? 🚀");
            }
        }, 1000);
    }
    
    closeModal(modal) {
        modal.classList.remove('show');
    }
    
    // Cleanup
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.animations.clear();
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ataBotAnimations = new AtaBotAnimations();
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes glowPulse {
        0%, 100% {
            opacity: 0;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);