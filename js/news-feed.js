/**
 * AtaBot AI News Feed System
 * Dynamic news aggregation with beautiful animations and filtering
 */

class AINewsFeed {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.articlesPerPage = 12;
        this.isLoading = false;
        this.refreshInterval = 5 * 60 * 1000; // 5 minutes
        this.lastRefresh = Date.now();
        
        this.categories = {
            'hot': { name: 'Hot', icon: '🔥', color: '#dc2626' },
            'ai': { name: 'AI Tech', icon: '🤖', color: '#1d4ed8' },
            'python': { name: 'Python', icon: '🐍', color: '#fbbf24' },
            'tips': { name: 'Tips', icon: '💡', color: '#fbbf24' },
            'frameworks': { name: 'Frameworks', icon: '⚡', color: '#1e40af' },
            'industry': { name: 'Industry', icon: '📊', color: '#dc2626' }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.generateSampleArticles();
        this.renderNews();
        this.startAutoRefresh();
    }
    
    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.setFilter(filter);
            });
        });
        
        // Search functionality
        const searchInput = document.getElementById('news-search');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.searchArticles(e.target.value);
                }, 300);
            });
        }
        
        // Load more button
        const loadMoreBtn = document.getElementById('load-more-news');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreArticles();
            });
        }
        
        // Manual refresh
        this.setupManualRefresh();
    }
    
    setupManualRefresh() {
        let refreshClickCount = 0;
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'r') {
                refreshClickCount++;
                if (refreshClickCount >= 2) {
                    e.preventDefault();
                    this.refreshNews(true);
                    refreshClickCount = 0;
                }
            }
        });
    }
    
    generateSampleArticles() {
        // Generate realistic sample articles for demonstration
        const sampleArticles = [
            {
                id: 1,
                title: "OpenAI Announces GPT-5: Revolutionary Breakthrough in AI Reasoning",
                summary: "OpenAI's latest language model shows unprecedented reasoning capabilities and multimodal understanding, setting new benchmarks across multiple AI evaluation metrics.",
                category: 'hot',
                source: 'OpenAI Blog',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%2300f0ff"/></svg>',
                url: 'https://openai.com',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
                timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
                isHot: true
            },
            {
                id: 2,
                title: "Python 3.13 Released with Enhanced AI/ML Libraries Integration",
                summary: "The latest Python release includes native optimizations for machine learning workloads and improved compatibility with popular AI frameworks like PyTorch and TensorFlow.",
                category: 'python',
                source: 'Python.org',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23ffd343"/></svg>',
                url: 'https://python.org',
                image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
                timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
                isHot: false
            },
            {
                id: 3,
                title: "5 Essential Tips for Building Production-Ready AI Applications",
                summary: "Learn best practices for deploying machine learning models at scale, including monitoring, versioning, and performance optimization strategies.",
                category: 'tips',
                source: 'AI Engineering',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23ffed4e"/></svg>',
                url: 'https://aiengineering.com',
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
                timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
                isHot: false
            },
            {
                id: 4,
                title: "Google Releases Gemini 2.0: Multimodal AI with Real-Time Processing",
                summary: "Google's next-generation AI model processes text, images, audio, and video simultaneously with unprecedented speed and accuracy.",
                category: 'ai',
                source: 'Google AI',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%2300f0ff"/></svg>',
                url: 'https://ai.google',
                image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
                timestamp: Date.now() - 8 * 60 * 60 * 1000, // 8 hours ago
                isHot: true
            },
            {
                id: 5,
                title: "TensorFlow 3.0 Beta: Unified Framework for Edge and Cloud AI",
                summary: "The major update brings seamless deployment across devices, improved performance, and simplified model development workflow.",
                category: 'frameworks',
                source: 'TensorFlow',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23b624ff"/></svg>',
                url: 'https://tensorflow.org',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
                timestamp: Date.now() - 12 * 60 * 60 * 1000, // 12 hours ago
                isHot: false
            },
            {
                id: 6,
                title: "Microsoft Invests $10B in AI Startup Focused on Enterprise Solutions",
                summary: "The significant investment signals Microsoft's commitment to AI-powered enterprise tools and business automation platforms.",
                category: 'industry',
                source: 'TechCrunch',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23ff0080"/></svg>',
                url: 'https://techcrunch.com',
                image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
                timestamp: Date.now() - 18 * 60 * 60 * 1000, // 18 hours ago
                isHot: false
            },
            {
                id: 7,
                title: "PyTorch 2.2 Introduces Native GPU Memory Optimization",
                summary: "New memory management features reduce GPU memory usage by up to 40% while maintaining training speed for large language models.",
                category: 'frameworks',
                source: 'PyTorch',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23b624ff"/></svg>',
                url: 'https://pytorch.org',
                image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
                timestamp: Date.now() - 20 * 60 * 60 * 1000, // 20 hours ago
                isHot: false
            },
            {
                id: 8,
                title: "Breakthrough in AI Code Generation: 97% Accuracy on Complex Tasks",
                summary: "Researchers achieve new milestone in automated programming with AI models that can write, debug, and optimize code with human-level performance.",
                category: 'ai',
                source: 'Nature AI',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%2300f0ff"/></svg>',
                url: 'https://nature.com',
                image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
                timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
                isHot: true
            },
            {
                id: 9,
                title: "Advanced Python Debugging Techniques for Machine Learning Models",
                summary: "Comprehensive guide to debugging ML pipelines, identifying performance bottlenecks, and optimizing model training workflows.",
                category: 'tips',
                source: 'ML Mastery',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23ffed4e"/></svg>',
                url: 'https://machinelearningmastery.com',
                image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=250&fit=crop',
                timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
                isHot: false
            },
            {
                id: 10,
                title: "Anthropic's Claude 3 Shows Superior Performance in Reasoning Tasks",
                summary: "Latest benchmarks reveal Claude 3's advanced capabilities in logical reasoning, mathematical problem-solving, and creative writing tasks.",
                category: 'ai',
                source: 'Anthropic',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%2300f0ff"/></svg>',
                url: 'https://anthropic.com',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
                timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
                isHot: false
            },
            {
                id: 11,
                title: "New Python Library Simplifies Neural Network Deployment",
                summary: "EasyDeploy library reduces neural network deployment complexity from hours to minutes with automatic optimization and scaling.",
                category: 'python',
                source: 'PyPI News',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23ffd343"/></svg>',
                url: 'https://pypi.org',
                image: 'https://images.unsplash.com/photo-1555949963-f9fe0c87cd04?w=400&h=250&fit=crop',
                timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
                isHot: false
            },
            {
                id: 12,
                title: "AI Industry Reaches $500B Valuation Milestone",
                summary: "Global AI market surpasses half-trillion dollar mark, driven by enterprise adoption and breakthrough applications across industries.",
                category: 'industry',
                source: 'AI Business',
                sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23ff0080"/></svg>',
                url: 'https://aibusiness.com',
                image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
                timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
                isHot: false
            }
        ];
        
        this.articles = sampleArticles;
        this.filterArticles();
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.filterArticles();
        this.renderNews();
        
        // Trigger neural background effect
        if (window.neuralBackground) {
            window.neuralBackground.neuralStorm();
        }
    }
    
    filterArticles() {
        if (this.currentFilter === 'all') {
            this.filteredArticles = [...this.articles];
        } else {
            this.filteredArticles = this.articles.filter(article => 
                article.category === this.currentFilter
            );
        }
        
        // Sort by timestamp (newest first)
        this.filteredArticles.sort((a, b) => b.timestamp - a.timestamp);
    }
    
    searchArticles(query) {
        if (!query.trim()) {
            this.filterArticles();
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredArticles = this.articles.filter(article => 
                article.title.toLowerCase().includes(searchTerm) ||
                article.summary.toLowerCase().includes(searchTerm) ||
                article.source.toLowerCase().includes(searchTerm)
            );
        }
        
        this.currentPage = 1;
        this.renderNews();
        
        // Show search results count
        this.updateSearchResults(query, this.filteredArticles.length);
    }
    
    updateSearchResults(query, count) {
        let resultDiv = document.getElementById('search-results');
        if (!resultDiv) {
            resultDiv = document.createElement('div');
            resultDiv.id = 'search-results';
            resultDiv.className = 'search-results';
            
            const newsHeader = document.querySelector('.news-header');
            if (newsHeader) {
                newsHeader.appendChild(resultDiv);
            }
        }
        
        if (query.trim()) {
            resultDiv.innerHTML = `
                <div class="search-result-text">
                    Found ${count} article${count !== 1 ? 's' : ''} for "${query}"
                    <button class="clear-search" onclick="this.clearSearch()">✕</button>
                </div>
            `;
            resultDiv.style.display = 'block';
        } else {
            resultDiv.style.display = 'none';
        }
    }
    
    clearSearch() {
        const searchInput = document.getElementById('news-search');
        if (searchInput) {
            searchInput.value = '';
            this.searchArticles('');
        }
    }
    
    renderNews() {
        const newsGrid = document.getElementById('news-grid');
        if (!newsGrid) return;
        
        // Show loading state
        if (this.isLoading) {
            this.showLoadingState(newsGrid);
            return;
        }
        
        // Calculate articles to show
        const startIndex = 0;
        const endIndex = this.currentPage * this.articlesPerPage;
        const articlesToShow = this.filteredArticles.slice(startIndex, endIndex);
        
        // Clear existing articles
        newsGrid.innerHTML = '';
        
        if (articlesToShow.length === 0) {
            this.showEmptyState(newsGrid);
            return;
        }
        
        // Create article cards
        articlesToShow.forEach((article, index) => {
            const card = this.createNewsCard(article);
            newsGrid.appendChild(card);
            
            // Staggered animation
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 50);
        });
        
        // Update load more button
        this.updateLoadMoreButton();
        
        // Update refresh indicator
        this.updateRefreshIndicator();
    }
    
    createNewsCard(article) {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.setAttribute('data-category', article.category);
        
        const category = this.categories[article.category];
        const timeAgo = this.getTimeAgo(article.timestamp);
        
        card.innerHTML = `
            <div class="news-card-image" style="background-image: url('${article.image}')">
                <div class="news-badge ${article.isHot ? 'hot-badge' : ''}" style="--badge-color: ${category.color}">
                    ${category.icon} ${article.isHot ? 'HOT' : category.name.toUpperCase()}
                </div>
            </div>
            
            <div class="news-card-content">
                <h3 class="news-headline">${article.title}</h3>
                <p class="news-summary">${article.summary}</p>
                
                <div class="news-meta">
                    <img src="${article.sourceFavicon}" class="source-icon" alt="" onerror="this.style.display='none'">
                    <span class="source-name">${article.source}</span>
                    <span class="separator">•</span>
                    <span class="timestamp">${timeAgo}</span>
                </div>
                
                <a href="${article.url}" target="_blank" rel="noopener" class="read-more">
                    Read More →
                </a>
            </div>
        `;
        
        // Add click handler
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('read-more')) {
                window.open(article.url, '_blank');
            }
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            this.enhanceCardHover(card);
        });
        
        return card;
    }
    
    enhanceCardHover(card) {
        // Add dynamic particle effect
        const rect = card.getBoundingClientRect();
        const particles = [];
        
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'news-card-particle';
            particle.style.cssText = `
                position: fixed;
                top: ${rect.top + Math.random() * rect.height}px;
                left: ${rect.left + Math.random() * rect.width}px;
                width: 4px;
                height: 4px;
                background: var(--neon-cyan);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                opacity: 0.8;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 0.8 },
                { 
                    transform: `translate(${(Math.random() - 0.5) * 50}px, ${-30 - Math.random() * 20}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }
    
    showLoadingState(container) {
        container.innerHTML = '';
        
        // Create skeleton cards
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'news-card skeleton-card';
            skeleton.innerHTML = `
                <div class="skeleton-image shimmer-effect"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line shimmer-effect" style="width: 90%; height: 20px; margin-bottom: 10px;"></div>
                    <div class="skeleton-line shimmer-effect" style="width: 100%; height: 14px; margin-bottom: 6px;"></div>
                    <div class="skeleton-line shimmer-effect" style="width: 80%; height: 14px; margin-bottom: 6px;"></div>
                    <div class="skeleton-line shimmer-effect" style="width: 60%; height: 12px; margin-top: 15px;"></div>
                </div>
            `;
            container.appendChild(skeleton);
        }
    }
    
    showEmptyState(container) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No articles found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button class="btn btn-secondary" onclick="window.aiNewsFeed.setFilter('all')">
                    Reset Filters
                </button>
            </div>
        `;
    }
    
    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return new Date(timestamp).toLocaleDateString();
    }
    
    loadMoreArticles() {
        if (this.isLoading) return;
        
        this.currentPage++;
        this.renderNews();
        
        // Smooth scroll to new content
        setTimeout(() => {
            const newCards = document.querySelectorAll('.news-card:not(.animate-in)');
            if (newCards.length > 0) {
                newCards[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 300);
    }
    
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-news');
        if (!loadMoreBtn) return;
        
        const totalShown = this.currentPage * this.articlesPerPage;
        const hasMore = totalShown < this.filteredArticles.length;
        
        if (hasMore) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = `Load More News... (${this.filteredArticles.length - totalShown} remaining)`;
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    updateRefreshIndicator() {
        const indicator = document.getElementById('refresh-indicator');
        if (!indicator) return;
        
        const lastRefreshElement = document.getElementById('last-refresh');
        if (lastRefreshElement) {
            const timeAgo = this.getTimeAgo(this.lastRefresh);
            lastRefreshElement.textContent = timeAgo;
        }
    }
    
    startAutoRefresh() {
        setInterval(() => {
            this.refreshNews();
        }, this.refreshInterval);
        
        // Update refresh indicator every minute
        setInterval(() => {
            this.updateRefreshIndicator();
        }, 60000);
    }
    
    refreshNews(manual = false) {
        if (manual) {
            this.showRefreshNotification('Refreshing news...');
        }
        
        // Simulate fetching new articles
        setTimeout(() => {
            const newArticlesCount = Math.floor(Math.random() * 3) + 1;
            
            if (newArticlesCount > 0) {
                // Add some new articles (simulate new content)
                for (let i = 0; i < newArticlesCount; i++) {
                    const newArticle = this.generateRandomArticle();
                    this.articles.unshift(newArticle);
                }
                
                // Remove old articles to prevent infinite growth
                if (this.articles.length > 50) {
                    this.articles = this.articles.slice(0, 50);
                }
                
                this.lastRefresh = Date.now();
                this.filterArticles();
                
                if (manual || this.currentPage === 1) {
                    this.renderNews();
                    this.showRefreshNotification(`${newArticlesCount} new article${newArticlesCount > 1 ? 's' : ''} added!`);
                }
            }
        }, manual ? 1000 : 0);
    }
    
    generateRandomArticle() {
        const titles = [
            "New AI Breakthrough Achieves Human-Level Performance",
            "Python Framework Revolutionizes Machine Learning Workflow", 
            "Tech Giants Announce Major AI Research Collaboration",
            "Open Source AI Model Outperforms Commercial Solutions",
            "Quantum Computing Meets AI: New Possibilities Emerge"
        ];
        
        const categories = ['ai', 'python', 'industry', 'frameworks'];
        const sources = ['AI Research', 'Tech Daily', 'ML News', 'Developer Hub'];
        
        return {
            id: Date.now() + Math.random(),
            title: titles[Math.floor(Math.random() * titles.length)],
            summary: "Latest developments in artificial intelligence and machine learning continue to push the boundaries of what's possible with modern technology.",
            category: categories[Math.floor(Math.random() * categories.length)],
            source: sources[Math.floor(Math.random() * sources.length)],
            sourceFavicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%2300f0ff"/></svg>',
            url: 'https://example.com',
            image: `https://images.unsplash.com/photo-${1600000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=250&fit=crop`,
            timestamp: Date.now(),
            isHot: Math.random() > 0.7
        };
    }
    
    showRefreshNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'news-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🔔</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Animate out
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiNewsFeed = new AINewsFeed();
    
    // Add clear search functionality to window
    window.clearSearch = () => {
        if (window.aiNewsFeed) {
            window.aiNewsFeed.clearSearch();
        }
    };
});

// Add additional CSS for news feed effects
const newsStyles = document.createElement('style');
newsStyles.textContent = `
    .skeleton-card {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .skeleton-image {
        width: 100%;
        height: 200px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px 8px 0 0;
    }
    
    .skeleton-content {
        padding: 24px;
    }
    
    .skeleton-line {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }
    
    .empty-state {
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 20px;
        text-align: center;
        color: var(--text-secondary);
    }
    
    .empty-icon {
        font-size: 64px;
        margin-bottom: 20px;
        opacity: 0.5;
    }
    
    .empty-state h3 {
        font-size: 24px;
        margin-bottom: 12px;
        color: var(--text-primary);
    }
    
    .empty-state p {
        font-size: 16px;
        margin-bottom: 24px;
    }
    
    .search-results {
        background: rgba(0, 240, 255, 0.1);
        border: 1px solid rgba(0, 240, 255, 0.3);
        border-radius: 8px;
        padding: 12px 16px;
        margin-top: 16px;
        display: none;
    }
    
    .search-result-text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: var(--neon-cyan);
    }
    
    .clear-search {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 16px;
        padding: 0;
        margin-left: 12px;
        transition: color var(--transition-fast);
    }
    
    .clear-search:hover {
        color: var(--neon-red);
    }
    
    .news-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: var(--surface);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(0, 240, 255, 0.3);
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .news-notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--text-primary);
        font-weight: 500;
    }
    
    .notification-icon {
        font-size: 20px;
    }
    
    @media (max-width: 768px) {
        .news-notification {
            right: 10px;
            left: 10px;
            right: 10px;
        }
    }
`;
document.head.appendChild(newsStyles);