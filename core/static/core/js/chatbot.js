// Chatbot functionality
class Chatbot {
  constructor() {
    this.faqData = null;
    this.isOpen = false;
    this.init();
  }

  async init() {
    await this.loadFAQ();
    this.setupEventListeners();
    this.showWelcomeMessage();
  }

  async loadFAQ() {
    try {
      const response = await fetch('/static/core/data/faq.json');
      this.faqData = await response.json();
    } catch (error) {
      console.error('Error loading FAQ data:', error);
    }
  }

  setupEventListeners() {
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotInput = document.getElementById('chatbotInput');

    chatbotButton.addEventListener('click', () => this.toggleChat());
    chatbotClose.addEventListener('click', () => this.closeChat());
    chatbotSend.addEventListener('click', () => this.sendMessage());
    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  toggleChat() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      chatbotWindow.classList.add('active');
    } else {
      chatbotWindow.classList.remove('active');
    }
  }

  closeChat() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    chatbotWindow.classList.remove('active');
    this.isOpen = false;
  }

  showWelcomeMessage() {
    const welcomeMessage = 'سلام! به انجمن رمز دانشگاه علم و صنعت خوش آمدید. چطور می‌توانم کمکتان کنم؟';
    this.addMessage(welcomeMessage, 'bot');
    
    // Show quick questions
    setTimeout(() => {
      this.showQuickQuestions();
    }, 500);
  }

  showQuickQuestions() {
    const quickQuestions = [
      'انجمن رمز چیست؟',
      'چگونه عضو شوم؟',
      'چه رویدادهایی دارید؟',
      'چگونه تماس بگیرم؟'
    ];

    const messagesContainer = document.getElementById('chatbotMessages');
    const quickQuestionsDiv = document.createElement('div');
    quickQuestionsDiv.className = 'quick-questions';
    quickQuestionsDiv.innerHTML = '<div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">سوالات پرتکرار:</div>';

    quickQuestions.forEach(question => {
      const btn = document.createElement('button');
      btn.className = 'quick-question-btn';
      btn.textContent = question;
      btn.addEventListener('click', () => {
        this.handleQuickQuestion(question);
      });
      quickQuestionsDiv.appendChild(btn);
    });

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content" style="max-width: 85%;">
        ${quickQuestionsDiv.outerHTML}
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  handleQuickQuestion(question) {
    this.addMessage(question, 'user');
    this.processMessage(question);
  }

  sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();

    if (!message) return;

    this.addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    this.showTypingIndicator();

    // Process message after a short delay
    setTimeout(() => {
      this.hideTypingIndicator();
      this.processMessage(message);
    }, 1000);
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const avatar = sender === 'user' ? '👤' : '🤖';
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">${text}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;

    messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  processMessage(message) {
    if (!this.faqData) {
      this.addMessage('متأسفانه در حال حاضر نمی‌توانم پاسخ دهم. لطفاً بعداً تلاش کنید.', 'bot');
      return;
    }

    const normalizedMessage = this.normalizeText(message);
    let bestMatch = null;
    let highestScore = 0;

    // Search through FAQs
    this.faqData.faqs.forEach(faq => {
      const score = this.calculateMatchScore(normalizedMessage, faq);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    });

    // If we found a good match (score > 0.3), return the answer
    if (bestMatch && highestScore > 0.3) {
      this.addMessage(bestMatch.answer, 'bot');
    } else {
      // No good match found, return default response
      this.addMessage(this.faqData.defaultResponse, 'bot');
    }
  }

  normalizeText(text) {
    // Remove extra spaces and convert to lowercase
    return text.trim().toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[؟?!.،,]/g, '');
  }

  calculateMatchScore(message, faq) {
    let score = 0;
    const messageWords = message.split(' ');

    // Check keywords
    faq.keywords.forEach(keyword => {
      const normalizedKeyword = this.normalizeText(keyword);
      if (message.includes(normalizedKeyword)) {
        score += 1;
      }
      
      // Check individual words
      messageWords.forEach(word => {
        if (word.length > 2 && normalizedKeyword.includes(word)) {
          score += 0.5;
        }
      });
    });

    // Check question similarity
    const normalizedQuestion = this.normalizeText(faq.question);
    const questionWords = normalizedQuestion.split(' ');
    
    messageWords.forEach(word => {
      if (word.length > 2 && questionWords.includes(word)) {
        score += 0.3;
      }
    });

    return score;
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById('chatbotMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Chatbot();
});
