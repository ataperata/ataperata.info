// Enhanced Portfolio JavaScript
// Author: Ata Perata
// Modern, Interactive Portfolio Experience

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initNavigation();
    initTypedText();
    initAnimatedCounters();
    initSkillsChart();
    initProficiencyRings();
    initImpactCharts();
    initNewsFilters();
    initEnhancedNewsSystem();
    initScrollEffects();
    initParallax();
    initLazyLoading();
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
});

// ========== LOADING SCREEN ========== //
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress - optimized for 2 seconds
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20 + 10; // Smooth progressive loading
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 200); // Quick transition
        }
        
        if (loadingProgress) {
            loadingProgress.style.width = progress + '%';
        }
    }, 80); // Optimized intervals for 2-second completion
    
    // Hide loading screen after 2 seconds max
    setTimeout(() => {
        if (!loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 2000); // Perfect 2 second max loading time
}

// ========== NAVIGATION ========== //
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
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
    });
}

// ========== TYPED TEXT ANIMATION ========== //
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Quality Systems Architect',
                'Quality Assurance Leader',
                'Process Innovation Leader',
                'Risk Management Specialist',
                'Digital Transformation Catalyst'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }
}

// ========== ANIMATED COUNTERS ========== //
function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    };
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                entry.target.setAttribute('data-animated', 'true');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ========== SKILLS CHART ========== //
function initSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    
    if (ctx && typeof Chart !== 'undefined') {
        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Quality Systems (ISO 13485)',
                    'FDA QSR Compliance',
                    'Risk Management (ISO 14971)',
                    'Data Analytics & SPC',
                    'Process Excellence',
                    'Digital Transformation',
                    'Project Management',
                    'Team Leadership'
                ],
                datasets: [{
                    label: 'Proficiency Level',
                    data: [60, 70, 70, 85, 91, 75, 87, 93],
                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                    borderColor: 'rgba(30, 64, 175, 0.8)',
                    borderWidth: 3,
                    pointBackgroundColor: '#d4af37',
                    pointBorderColor: '#b7950b',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#d4af37',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.r}% proficiency`;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(30, 64, 175, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(30, 64, 175, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            color: '#475569'
                        },
                        ticks: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
        
        // Animate chart on scroll
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chart.update('active');
                }
            });
        }, { threshold: 0.3 });
        
        chartObserver.observe(ctx);
    }
}

// ========== PROFICIENCY RINGS ========== //
function initProficiencyRings() {
    const rings = document.querySelectorAll('.ring-progress');
    
    const animateRing = (ring) => {
        const percentage = parseInt(ring.getAttribute('data-percentage'));
        const circumference = 2 * Math.PI * 45; // radius = 45
        const offset = circumference - (percentage / 100) * circumference;
        
        // Add gradient definition to SVG
        const svg = ring.closest('svg');
        if (!svg.querySelector('defs')) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'gradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#1e40af');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', '#d4af37');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.appendChild(defs);
        }
        
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = circumference;
        
        // Animate the ring
        setTimeout(() => {
            ring.style.transition = 'stroke-dashoffset 2s ease-out';
            ring.style.strokeDashoffset = offset;
        }, 100);
    };
    
    // Intersection Observer for ring animation
    const ringObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                entry.target.setAttribute('data-animated', 'true');
                animateRing(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    rings.forEach(ring => {
        ringObserver.observe(ring);
    });
}

// ========== IMPACT CHARTS ========== //
function initImpactCharts() {
    // Accuracy Improvement Chart
    const accuracyCtx = document.getElementById('accuracyChart');
    if (accuracyCtx && typeof Chart !== 'undefined') {
        new Chart(accuracyCtx, {
            type: 'line',
            data: {
                labels: ['Baseline', 'Month 3', 'Month 6', 'Month 9', 'Current'],
                datasets: [{
                    data: [60, 68, 75, 82, 80],
                    borderColor: '#1e40af',
                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
    
    // Defect Reduction Chart
    const defectCtx = document.getElementById('defectChart');
    if (defectCtx && typeof Chart !== 'undefined') {
        new Chart(defectCtx, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    data: [45, 35, 25, 15],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(16, 185, 129, 0.8)'
                    ],
                    borderRadius: 4,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
    }
    
    // Time Savings Chart
    const timeCtx = document.getElementById('timeChart');
    if (timeCtx && typeof Chart !== 'undefined') {
        new Chart(timeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Time Saved', 'Original Time'],
                datasets: [{
                    data: [8, 12],
                    backgroundColor: ['#10b981', 'rgba(100, 116, 139, 0.3)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                cutout: '70%'
            }
        });
    }
}

// ========== ENHANCED NEWS SYSTEM ========== //
function initNewsFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const refreshBtn = document.getElementById('refresh-news');
    const lastUpdateTime = document.getElementById('last-update-time');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter news cards with enhanced animation
            newsCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Enhanced refresh functionality
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshNews();
        });
    }
    
    // Auto-refresh every hour (3600000 ms)
    setInterval(refreshNews, 3600000);
    
    // News card click handlers with enhanced interaction
    newsCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
                // Simulate analytics tracking
                console.log('News article clicked:', card.querySelector('h3').textContent);
            }, 150);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Initialize update time
    updateLastRefreshTime();
}

// Refresh news function
function refreshNews() {
    const refreshBtn = document.getElementById('refresh-news');
    const refreshIcon = refreshBtn?.querySelector('i');
    const refreshText = refreshBtn?.querySelector('.refresh-text');
    
    if (refreshBtn) {
        refreshBtn.classList.add('refreshing');
        refreshBtn.disabled = true;
        if (refreshText) refreshText.textContent = 'Refreshing...';
        
        // Simulate news refresh (in real implementation, this would fetch from API)
        setTimeout(() => {
            refreshBtn.classList.remove('refreshing');
            refreshBtn.disabled = false;
            if (refreshText) refreshText.textContent = 'Refresh';
            updateLastRefreshTime();
            
            // Add subtle success feedback
            refreshBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            setTimeout(() => {
                refreshBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--ap-gold))';
            }, 1000);
            
            console.log('News refreshed successfully!');
        }, 2000);
    }
}

// Update last refresh time
function updateLastRefreshTime() {
    const lastUpdateElement = document.getElementById('last-update-time');
    if (lastUpdateElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        lastUpdateElement.textContent = `Updated ${timeString}`;
    }
}

// Enhanced news system initialization
function initEnhancedNewsSystem() {
    // Add dynamic news loading indicators
    const newsCards = document.querySelectorAll('.news-card');
    
    // Stagger card animations on page load
    newsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add enhanced visual effects for AI news
    const aiCards = document.querySelectorAll('.news-card[data-category="ai"]');
    aiCards.forEach(card => {
        // Add subtle glow effect
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
}

// ========== SCROLL EFFECTS ========== //
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroParticles = document.querySelector('.hero-particles');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    // Add progress bar styles
    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(30, 64, 175, 0.1);
            z-index: 9999;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #1e40af, #d4af37);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(progressStyles);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = scrollPercent + '%';
        }
    });
}

// ========== PARALLAX EFFECTS ========== //
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ========== LAZY LOADING ========== //
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== UTILITY FUNCTIONS ========== //

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add intersection observer polyfill check
if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver not supported. Some animations may not work.');
}

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Portfolio loaded in ${loadTime}ms`);
    });
}

// ========== CONTACT FORM ENHANCEMENTS ========== //
function initContactEnhancements() {
    // Add subtle hover effects to contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', () => {
            method.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', () => {
            method.style.transform = '';
        });
    });
    
    // Enhanced resume download tracking
    const resumeButtons = document.querySelectorAll('a[href*="resume"]');
    resumeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Track download event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'resume_download', {
                    'event_category': 'engagement',
                    'event_label': 'Resume PDF'
                });
            }
            
            // Visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
}

// ========== DARK MODE TOGGLE (OPTIONAL) ========== //
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    // Add dark mode styles
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
        .dark-mode-toggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            transition: all var(--transition-normal);
            z-index: 1000;
        }
        
        .dark-mode-toggle:hover {
            transform: scale(1.1);
            box-shadow: var(--shadow-xl);
        }
        
        @media (max-width: 768px) {
            .dark-mode-toggle {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(darkModeStyles);
    document.body.appendChild(darkModeToggle);
    
    // Dark mode functionality (basic implementation)
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

// Initialize contact enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initContactEnhancements();
    initEnhancedInteractions();
    // Uncomment to enable dark mode
    // initDarkMode();
});

// ========== ENHANCED INTERACTIONS ========== //
function initEnhancedInteractions() {
    // Enhanced hover effects for stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
    
    // Enhanced card interactions
    const cards = document.querySelectorAll('.competency-card, .dashboard-card, .news-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '';
        });
    });
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn, .filter-btn, .refresh-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
    
    // Add smooth scrolling enhancement
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== PERFORMANCE OPTIMIZATIONS ========== //

// Use requestAnimationFrame for smooth animations
function smoothAnimation(callback) {
    let ticking = false;
    
    return function() {
        if (!ticking) {
            requestAnimationFrame(callback);
            ticking = true;
        }
    };
}

// Optimize scroll handlers
const optimizedScrollHandler = throttle(() => {
    // Navbar effects
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Progress bar
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = scrollPercent + '%';
    }
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ========== ACCESSIBILITY ENHANCEMENTS ========== //

// Keyboard navigation for interactive elements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const focusStyles = document.createElement('style');
focusStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--ap-gold) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(focusStyles);

// ========== FINAL INITIALIZATION ========== //
console.log('🚀 Enhanced Portfolio Loaded Successfully!');
console.log('📊 Interactive charts and animations ready');
console.log('🎯 All systems operational');