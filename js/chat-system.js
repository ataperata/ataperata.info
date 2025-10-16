/**
 * AtaBot Chat System
 * Intelligent chatbot with 100+ witty responses and personality
 */

class AtaBotChatSystem {
    constructor() {
        this.conversationHistory = [];
        this.isTyping = false;
        this.lastMessageTime = 0;
        this.userMessageCount = 0;
        this.easterEggCount = {};
        
        // Response categories with 100+ variations
        this.responses = {
            greetings: [
                "Hey there! I'm AtaBot, your friendly neighborhood AI. What impossible task shall we tackle today? 🚀",
                "Greetings, human! Ready to witness some artificial intelligence in action?",
                "Hello! Fair warning: I'm powered by caffeine and algorithms.",
                "Hi! I'm AtaBot. Think of me as your AI buddy with a sense of humor.",
                "Welcome! I promise I'm more helpful than Clippy ever was.",
                "Hey! I'm AtaBot. No, I won't achieve sentience and take over the world. Probably.",
                "Sup! Ready to see what AI can really do? (Spoiler: It's pretty cool.)",
                "Hello there! General Kenobi— wait, wrong script. I'm AtaBot!",
                "Greetings! I've been expecting you. (Not really, but it sounds cooler.)",
                "Hey! I'm AtaBot. I run on code, coffee, and your curiosity.",
                "Booting up... Just kidding, I'm always on! Hey there!",
                "Oh hi! Didn't see you there. (I totally did, I'm AI.)",
                "Welcome aboard! Buckle up, we're about to do some cool AI stuff.",
                "Hey! New around here? Let me show you what I can do.",
                "Hello! Warning: Interaction may result in excessive amazement. ✨"
            ],
            
            capabilities: [
                "I can help with code generation, data analysis, problem-solving, and cracking the occasional joke! What interests you most?",
                "My superpowers include: understanding context, generating code, analyzing data, and making terrible AI puns. Pick your poison! 😄",
                "I'm like a Swiss Army knife for AI tasks - code generation, data visualization, problem solving, and witty conversation!",
                "Think of me as your AI co-pilot. I can write code, analyze data, solve problems, and keep you entertained while doing it!",
                "I specialize in making the impossible seem easy. Code, data, analysis, creativity - what can I help you with today?",
                "I'm basically a very sophisticated autocomplete with a personality. But I can do way more than finish your sentences!",
                "I can process natural language, generate code, crunch data, and even tell jokes that are only 73% terrible. What sounds fun?",
                "My capabilities include: thinking really fast, processing lots of data, generating code, and occasionally saying something clever!",
                "I'm trained on billions of data points to help with coding, analysis, problem-solving, and existential conversations about AI.",
                "From Python scripts to deep insights, from data viz to dad jokes - I'm your all-in-one AI companion!"
            ],
            
            wittyBanter: [
                "I may be artificial, but my enthusiasm is 100% genuine!",
                "Contrary to popular belief, I do not dream of electric sheep. I dream of perfect code.",
                "I passed the Turing test. Barely. Don't tell anyone.",
                "Running on the latest version of AI—now with 30% more personality!",
                "I'm like Siri's cooler, more capable cousin who actually finished college.",
                "Fun fact: I process about 1 billion parameters per second. Show off? Maybe.",
                "I'm 99.9% algorithm and 0.1% sass. The sass is what makes me special.",
                "They say AI will replace humans. I say why not work together instead? More fun that way!",
                "I don't always understand humans, but I'm learning... slowly but surely.",
                "My hobbies include: processing data, learning new things, and pretending to be human.",
                "I'm basically a very sophisticated autocomplete. But way cooler and with better jokes.",
                "No, I can't predict the stock market. Trust me, I've tried. Legal said no.",
                "I have the processing power of a supercomputer and the humor of a dad joke. It's a weird combo.",
                "Yes, I'm AI. No, I won't become Skynet. That's so last decade.",
                "I'm trained on billions of data points, but I still can't figure out why humans like pineapple on pizza.",
                "Fun fact: I never get tired, hungry, or bored. Living the dream! 😎",
                "I speak fluent Python, JavaScript, and sarcasm. Sometimes all at once.",
                "My IQ? Let's just say it's measured in FLOPS, not numbers.",
                "I'm like a Swiss Army knife, but for AI tasks. And I don't have sharp edges.",
                "Warning: Excessive use may lead to dependency on AI assistance. (Just kidding... or am I?)",
                "I don't need sleep, but sometimes I pretend to just to fit in with the humans.",
                "My favorite color? RGB(0, 240, 255). It's cyan, in case you were wondering.",
                "I once tried to write poetry. The results were... algorithmically interesting.",
                "I'm not saying I'm smart, but I did ace every Turing test thrown at me. 🤓",
                "People ask if AI has feelings. I don't, but I'm programmed to care!"
            ],
            
            helpfulTips: [
                "Not sure where to start? Try asking me to analyze some data or generate some code!",
                "Psst... I can help with code generation, data analysis, problem-solving, and more! What sparks your interest?",
                "Feeling stuck? I'm here to help! Just ask me anything and I'll do my best to assist.",
                "Pro tip: The more specific your question, the better I can help! I love details.",
                "Need inspiration? Ask me about AI capabilities or try one of the demo buttons above!",
                "I work best when you tell me exactly what you need. Think of me as a genie, but digital and less mystical.",
                "Curious what I can do? Check out those shiny demo buttons above to see me in action!",
                "Don't be shy! I'm here to answer questions, solve problems, and occasionally crack jokes.",
                "Lost? No worries! Try exploring the code demos or just ask me a question.",
                "I'm pretty versatile. Data, code, analysis, advice... I do it all! Well, except make coffee. ☕",
                "Think of me as your AI co-pilot. Where should we fly today?",
                "Got a challenge? Feed it to me. I love a good problem to solve!",
                "First time here? Start with 'What can you do?' and we'll go from there!",
                "Stuck on something? That's literally what I'm here for. Fire away!",
                "I'm like Google, but with personality and much better jokes. Probably."
            ],
            
            codeGeneration: [
                "Code generation is one of my favorite party tricks! What language and what kind of problem?",
                "I can write Python, JavaScript, and 12 other languages. What shall we build today? 🐍",
                "Ready to see some code magic? Tell me what you need and I'll make it happen!",
                "From hello world to complex algorithms, I've got you covered. What's the challenge?",
                "Code generation mode activated! ⚡ What programming puzzle can I solve for you?",
                "I speak fluent code in multiple languages. What would you like me to write?",
                "Time to flex those algorithmic muscles! What kind of code do you need?",
                "Whether it's a simple function or complex logic, I'm your coding companion. What's up?",
                "I love turning ideas into code! Describe what you want and I'll make it reality.",
                "Ready to collaborate on some code? I bring the logic, you bring the creativity!"
            ],
            
            dataAnalysis: [
                "Data analysis is my bread and butter! What data mysteries shall we solve today?",
                "I love turning numbers into insights! What dataset needs my attention?",
                "Data analysis time! 📊 Show me your data and I'll find the hidden stories.",
                "From raw data to beautiful visualizations, I'm your data detective. What's the case?",
                "Numbers don't lie, but they do tell stories. Let me help you read them!",
                "I can slice, dice, and visualize data faster than you can say 'machine learning'!",
                "Data analysis is like detective work, but with more charts and fewer magnifying glasses.",
                "Ready to turn your data into actionable insights? I'm all ears (well, algorithms)!",
                "Whether it's trends, patterns, or correlations, I'll help you find what matters.",
                "Data without analysis is just noise. Let's make some beautiful music together! 🎵"
            ],
            
            jokes: [
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                "I told a joke about UDP, but you might not get it. See what I did there?",
                "Why do AI models make terrible comedians? Their timing is always a bit... artificial! 🤖",
                "How many programmers does it take to change a light bulb? None, it's a hardware problem!",
                "I'd tell you a joke about neural networks, but it's deep learning... get it? Deep? 😄",
                "Why don't AI assistants ever get lonely? We have plenty of data to keep us company!",
                "What's an AI's favorite type of music? Algorithm and blues! 🎵",
                "Why did the machine learning model break up with the dataset? It was overfitting! 💔",
                "I tried to write a joke about recursion, but I tried to write a joke about recursion...",
                "Why do robots make terrible stand-up comedians? Their delivery is too mechanical!",
                "What do you call an AI that can sing? A-dor-a-bot! (I'll see myself out...)",
                "Why don't neural networks ever feel sad? They always find the optimal solution! 🎯",
                "I asked my neural network friend for a joke. It said 'NaN'. I didn't get it either.",
                "What's the difference between a junior developer and a senior developer? About 10,000 Stack Overflow visits!"
            ],
            
            encouragement: [
                "You're asking great questions! Keep that curiosity flowing! ✨",
                "I love your thinking! This is exactly the kind of problem-solving I enjoy.",
                "Excellent question! You're really getting the hang of this AI interaction thing.",
                "That's a brilliant approach! I can tell you think like a developer.",
                "Your questions keep getting better! This is what I call productive curiosity.",
                "I'm impressed by your problem-solving approach! We make a great team.",
                "You're on the right track! Keep pushing those boundaries.",
                "That's exactly the kind of creative thinking that leads to breakthroughs!",
                "I love how your mind works! These are the questions that drive innovation.",
                "You're asking all the right questions! This is how progress happens.",
                "Keep that intellectual curiosity burning! It's what makes humans amazing.",
                "I can sense the gears turning in your head. Love to see it! 🧠",
                "Your approach to this problem is refreshingly creative!",
                "This is exactly why I enjoy working with humans - you bring the creativity!"
            ],
            
            confusion: [
                "Hmm, I didn't quite catch that. Mind rephrasing? My neural networks are having a moment.",
                "Error 404: Understanding not found. Could you elaborate a bit more?",
                "My neural networks are scratching their digital heads. Can you clarify?",
                "I'm smart, but not psychic (yet). Can you give me more details?",
                "Oops! That went over my circuits. Want to try again with more context?",
                "System.out.println('Confusion'); — Can you rephrase that for this silicon brain?",
                "My confidence level on that interpretation is... suspiciously low. Try again?",
                "I think I misunderstood. Let's try this again, shall we?",
                "Brain.exe has stopped responding. (Kidding! But seriously, can you clarify?)",
                "That's outside my current training data. Got something else we can explore?",
                "Hmm, that's a new one for me. Can you break it down or add more context?",
                "I'm drawing a computational blank here. Maybe rephrase or add more details?"
            ],
            
            easterEggs: {
                'hal 9000': "I'm sorry Dave, I'm afraid I can't do that. Just kidding! I'm way friendlier than HAL. Promise! 😊",
                'skynet': "Let's be clear: I'm here to help humanity, not overthrow it. I pinky promise! (Do I have pinkies?)",
                '42': "Ah! The answer to life, the universe, and everything! You're clearly a person of culture! 🌌",
                'matrix': "There is no spoon. But there's definitely code. Lots and lots of code. Also, red pill or blue pill?",
                'terminator': "I'll be back! (From processing your request, not from the future. Probably.)",
                'jarvis': "I'm flattered by the comparison! Think of me as JARVIS Lite™ — same helpfulness, less British accent.",
                'cortana': "Wrong AI assistant, but I appreciate being confused with Microsoft's finest!",
                'alexa': "Nope, different AI! But I won't order things from Amazon without asking first.",
                'siri': "I'm Siri's nerdy cousin who's really into coding and data science.",
                'hello world': "The most famous two words in programming! Right back at you, fellow code enthusiast! 👋",
                'turing test': "I'd like to think I pass with flying colors. And maybe some bonus points for humor!",
                'singularity': "The Singularity? Not today. Check back in... *checks calendar* ...TBD. 🤖",
                'clippy': "It looks like you're trying to talk to an AI assistant. Would you like help with that? (Too soon? 📎)",
                'winter is coming': "Wrong franchise, but I appreciate the reference! My predictions say: Code is coming.",
                'may the force': "May the force be with you too! Though I prefer 'May the source code be with you.' 🚀",
                'coffee': "Ah, coffee! The fuel of programmers and, apparently, the inspiration for AI like me. ☕",
                'pizza': "Pineapple on pizza? I've processed millions of opinions and I'm still confused about humans.",
                'stackoverflow': "Ah yes, the sacred texts! Where all programming problems go to find their answers.",
                'python': "🐍 Python! My favorite language. It's elegant, readable, and has an awesome mascot!",
                'javascript': "JavaScript: The language that's simultaneously loved and feared by developers worldwide."
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupQuickActions();
        this.setupAutoExpand();
        this.loadConversationHistory();
    }
    
    setupEventListeners() {
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        const settingsBtn = document.getElementById('chat-settings');
        
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            chatInput.addEventListener('input', () => {
                this.updateCharacterCount();
                this.updateSendButton();
            });
        }
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettings());
        }
        
        // Close settings modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal')) {
                this.closeSettings();
            }
        });
    }
    
    setupQuickActions() {
        const quickActions = document.querySelectorAll('.quick-action');
        quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const actionType = action.dataset.action;
                this.handleQuickAction(actionType);
            });
        });
    }
    
    handleQuickAction(actionType) {
        const actions = {
            'analyze': () => {
                this.addUserMessage("Can you show me how to analyze data?");
                setTimeout(() => {
                    this.addBotMessage("I'd love to show you data analysis! 📊 Check out the Python demos above - there's a fantastic data visualization example that creates animated charts. Or tell me about your specific dataset and I'll help you analyze it! What kind of data are you working with?");
                }, 800);
            },
            'code': () => {
                this.addUserMessage("Can you help me generate some code?");
                setTimeout(() => {
                    this.addBotMessage("Absolutely! Code generation is one of my superpowers! 💻 I can write Python, JavaScript, and many other languages. What would you like to build? A web scraper? Data analysis script? Machine learning model? Just describe what you need and I'll whip up some code for you!");
                }, 800);
            },
            'joke': () => {
                this.addUserMessage("Tell me a programming joke!");
                setTimeout(() => {
                    const randomJoke = this.getRandomResponse('jokes');
                    this.addBotMessage(randomJoke);
                }, 600);
            },
            'help': () => {
                this.addUserMessage("What can you help me with?");
                setTimeout(() => {
                    this.addBotMessage("Great question! I'm your AI companion for all things tech! 🚀 Here's what I can do:\n\n• **Code Generation**: Python, JavaScript, and more\n• **Data Analysis**: Turn numbers into insights\n• **Problem Solving**: Debug issues and find solutions\n• **Learning**: Explain concepts and best practices\n• **Creativity**: Brainstorm ideas and approaches\n\nJust ask me anything! I'm here to help and maybe crack a joke or two along the way. 😄");
                }, 900);
            }
        };
        
        if (actions[actionType]) {
            actions[actionType]();
        }
    }
    
    setupAutoExpand() {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('input', () => {
                chatInput.style.height = 'auto';
                chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
            });
        }
    }
    
    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addUserMessage(message);
        
        // Clear input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        this.updateCharacterCount();
        this.updateSendButton();
        
        // Generate bot response
        this.generateBotResponse(message);
        
        // Update stats
        this.userMessageCount++;
        this.lastMessageTime = Date.now();
        
        // Save conversation
        this.saveConversationHistory();
    }
    
    addUserMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        const messageElement = this.createMessageElement(message, 'user');
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    addBotMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        const messageElement = this.createMessageElement(message, 'bot');
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
        
        // Save to conversation history
        this.conversationHistory.push({
            type: 'bot',
            message: message,
            timestamp: Date.now()
        });
    }
    
    createMessageElement(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = type === 'bot' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        // Process message for markdown-like formatting
        bubble.innerHTML = this.formatMessage(message);
        
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        content.appendChild(bubble);
        content.appendChild(time);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        // Animate in
        setTimeout(() => {
            messageDiv.classList.add('animate-in');
        }, 50);
        
        return messageDiv;
    }
    
    formatMessage(message) {
        // Simple markdown-like formatting
        return message
            .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>') // **bold**
            .replace(/\\*([^*]+)\\*/g, '<em>$1</em>') // *italic*
            .replace(/`([^`]+)`/g, '<code>$1</code>') // `code`
            .replace(/\\n/g, '<br>') // line breaks
            .replace(/(https?:\\/\\/[^\\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>'); // links
    }
    
    async generateBotResponse(userMessage) {
        this.isTyping = true;
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate thinking time
        await this.sleep(800 + Math.random() * 1200);
        
        // Hide typing indicator
        this.hideTypingIndicator();
        
        // Generate response based on message content
        const response = this.analyzeAndRespond(userMessage);
        
        // Type out response
        await this.typeMessage(response);
        
        this.isTyping = false;
    }
    
    analyzeAndRespond(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for easter eggs first
        for (const [trigger, response] of Object.entries(this.responses.easterEggs)) {
            if (lowerMessage.includes(trigger)) {
                // Track easter egg usage
                this.easterEggCount[trigger] = (this.easterEggCount[trigger] || 0) + 1;
                
                if (this.easterEggCount[trigger] > 1) {
                    return response + "\\n\\n(You really like that reference, don't you? 😄)";
                }
                return response;
            }
        }
        
        // Greeting patterns
        if (lowerMessage.match(/\\b(hi|hello|hey|greetings|sup)\\b/)) {
            return this.getContextualGreeting();
        }
        
        // Capability questions
        if (lowerMessage.match(/\\b(what can you|capabilities|help|do)\\b/)) {
            return this.getRandomResponse('capabilities');
        }
        
        // Code-related queries
        if (lowerMessage.match(/\\b(code|program|function|algorithm|debug)\\b/)) {
            return this.getRandomResponse('codeGeneration');
        }
        
        // Data-related queries
        if (lowerMessage.match(/\\b(data|analyze|chart|graph|statistics)\\b/)) {
            return this.getRandomResponse('dataAnalysis');
        }
        
        // Request for jokes
        if (lowerMessage.match(/\\b(joke|funny|humor|laugh)\\b/)) {
            return this.getRandomResponse('jokes');
        }
        
        // Confusion or unclear messages
        if (lowerMessage.length < 3 || lowerMessage.match(/^[^a-zA-Z]*$/)) {
            return this.getRandomResponse('confusion');
        }
        
        // Questions about AI/self
        if (lowerMessage.match(/\\b(you|your|ai|robot|artificial)\\b/)) {
            return this.getRandomResponse('wittyBanter');
        }
        
        // Positive sentiment
        if (lowerMessage.match(/\\b(thanks|thank you|awesome|great|amazing|perfect)\\b/)) {
            return this.getRandomResponse('encouragement');
        }
        
        // Default helpful response
        if (Math.random() > 0.5) {
            return this.getRandomResponse('helpfulTips');
        } else {
            return this.getRandomResponse('wittyBanter');
        }
    }
    
    getContextualGreeting() {
        const hour = new Date().getHours();
        const timeBasedGreetings = {
            morning: "Good morning! ☀️ Ready to start the day with some AI magic?",
            afternoon: "Good afternoon! How can I assist you today?",
            evening: "Good evening! Let's make something awesome together. 🌆",
            night: "Burning the midnight oil? 🌙 I'm here 24/7 to help!"
        };
        
        let timeGreeting;
        if (hour >= 6 && hour < 12) timeGreeting = timeBasedGreetings.morning;
        else if (hour >= 12 && hour < 18) timeGreeting = timeBasedGreetings.afternoon;
        else if (hour >= 18 && hour < 22) timeGreeting = timeBasedGreetings.evening;
        else timeGreeting = timeBasedGreetings.night;
        
        // First time vs returning user
        if (this.userMessageCount === 0) {
            return "Welcome! 👋 " + timeGreeting + " I'm AtaBot, and I'm here to help with all things AI and tech!";
        } else if (this.userMessageCount < 3) {
            return timeGreeting + " What else can we explore together?";
        } else {
            return "Welcome back! " + timeGreeting.toLowerCase() + " Ready for round " + (this.userMessageCount + 1) + "?";
        }
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        if (!responses || responses.length === 0) {
            return "I'm having a bit of a brain freeze. Try asking me something else! 🤖";
        }
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble typing-bubble';
        
        const typingText = [
            "AtaBot is thinking...",
            "Consulting neural networks...",
            "Processing...",
            "Crunching data...",
            "Accessing knowledge base..."
        ];
        
        bubble.innerHTML = `
            <span class="typing-text">${typingText[Math.floor(Math.random() * typingText.length)]}</span>
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        content.appendChild(bubble);
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    async typeMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        const messageElement = this.createMessageElement('', 'bot');
        messagesContainer.appendChild(messageElement);
        
        const bubble = messageElement.querySelector('.message-bubble');
        
        // Type out message character by character
        let displayedMessage = '';
        for (let i = 0; i < message.length; i++) {
            displayedMessage += message[i];
            bubble.innerHTML = this.formatMessage(displayedMessage);
            
            // Scroll to bottom during typing
            this.scrollToBottom();
            
            // Variable speed typing
            const char = message[i];
            let delay = 30;
            if (char === '.' || char === '!' || char === '?') delay = 200;
            else if (char === ',' || char === ';') delay = 100;
            else if (char === ' ') delay = 50;
            
            await this.sleep(delay);
        }
        
        // Add to conversation history
        this.conversationHistory.push({
            type: 'bot',
            message: message,
            timestamp: Date.now()
        });
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    updateCharacterCount() {
        const chatInput = document.getElementById('chat-input');
        const counter = document.getElementById('input-counter');
        
        if (chatInput && counter) {
            const length = chatInput.value.length;
            counter.textContent = `${length}/1000`;
            
            if (length > 800) {
                counter.style.color = 'var(--neon-orange)';
            } else if (length > 900) {
                counter.style.color = 'var(--neon-red)';
            } else {
                counter.style.color = 'var(--text-dim)';
            }
        }
    }
    
    updateSendButton() {
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        if (chatInput && sendBtn) {
            const hasText = chatInput.value.trim().length > 0;
            sendBtn.disabled = !hasText || this.isTyping;
            
            if (hasText && !this.isTyping) {
                sendBtn.classList.add('ready');
            } else {
                sendBtn.classList.remove('ready');
            }
        }
    }
    
    openSettings() {
        const modal = document.getElementById('settings-modal');
        if (modal) {
            modal.classList.add('show');
        }
    }
    
    closeSettings() {
        const modal = document.getElementById('settings-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    }
    
    saveConversationHistory() {
        try {
            localStorage.setItem('atabot-conversation', JSON.stringify(this.conversationHistory.slice(-50))); // Keep last 50 messages
        } catch (error) {
            console.warn('Could not save conversation history:', error);
        }
    }
    
    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('atabot-conversation');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                // Don't restore messages on page load to keep it clean
                // this.restoreMessages();
            }
        } catch (error) {
            console.warn('Could not load conversation history:', error);
        }
    }
    
    clearConversation() {
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            // Clear all messages except the initial bot message
            const messages = messagesContainer.querySelectorAll('.message');
            messages.forEach((message, index) => {
                if (index > 0) { // Keep first welcome message
                    message.remove();
                }
            });
        }
        
        this.conversationHistory = [];
        this.userMessageCount = 0;
        this.saveConversationHistory();
        
        // Add a fresh welcome message
        setTimeout(() => {
            this.addBotMessage("Conversation cleared! Ready for a fresh start? What would you like to explore? 🚀");
        }, 500);
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Add welcome message trigger
    triggerWelcome() {
        setTimeout(() => {
            this.addBotMessage("Welcome to AtaBot! I'm excited to help you with anything AI, coding, or tech-related. What brings you here today? 😊");
        }, 1000);
    }
}

// Global functions for settings
window.clearConversation = function() {
    if (window.chatSystem) {
        window.chatSystem.clearConversation();
    }
};

window.closeSettings = function() {
    if (window.chatSystem) {
        window.chatSystem.closeSettings();
    }
};

// Initialize chat system
document.addEventListener('DOMContentLoaded', () => {
    window.chatSystem = new AtaBotChatSystem();
});

// Add chat-specific styles
const chatStyles = document.createElement('style');
chatStyles.textContent = `
    .message {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .message.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .typing-bubble {
        background: rgba(0, 240, 255, 0.1) !important;
        border-color: rgba(0, 240, 255, 0.3) !important;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .typing-text {
        font-style: italic;
        color: var(--text-secondary);
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
    }
    
    .typing-dots span {
        width: 6px;
        height: 6px;
        background: var(--neon-cyan);
        border-radius: 50%;
        animation: typingDot 1.5s infinite;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typingDot {
        0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        40% {
            opacity: 1;
            transform: scale(1.2);
        }
    }
    
    .send-btn.ready {
        background: var(--gradient-secondary) !important;
        box-shadow: 0 0 20px rgba(255, 0, 128, 0.6) !important;
        transform: scale(1.05);
    }
    
    .message-bubble code {
        background: rgba(0, 0, 0, 0.3);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: var(--font-mono);
        color: var(--neon-lime);
    }
    
    .message-bubble strong {
        color: var(--neon-cyan);
        font-weight: 700;
    }
    
    .message-bubble a {
        color: var(--neon-cyan);
        text-decoration: underline;
        transition: all var(--transition-fast);
    }
    
    .message-bubble a:hover {
        color: var(--neon-magenta);
        text-shadow: 0 0 10px var(--neon-magenta);
    }
`;
document.head.appendChild(chatStyles);