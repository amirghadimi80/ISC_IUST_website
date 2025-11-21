// Enhanced Binary Rain Animation
function createBinaryRain() {
  const binaryRain = document.getElementById('binaryRain');
  const symbols = ['0', '1'];
  const columns = 50; // افزایش تعداد ستون‌ها
  
  // ایجاد ستون‌های باینری عمودی
  for (let i = 0; i < columns; i++) {
    const column = document.createElement('div');
    column.className = 'binary-column';
    column.style.left = (i * (200 / columns)) + '%';
    column.style.animationDuration = (Math.random() * 8 + 8) + 's'; // سرعت‌های مختلف
    column.style.animationDelay = Math.random() * 3 + 's';
    
    // ایجاد رشته باینری طولانی‌تر
    let binaryText = '';
    const length = Math.floor(Math.random() * 25) + 35;
    for (let j = 0; j < length; j++) {
      binaryText += symbols[Math.floor(Math.random() * symbols.length)] + ' ';
    }
    column.textContent = binaryText;
    
    binaryRain.appendChild(column);
  }

  // ایجاد ذرات باینری شناور
  const particles = 20;
  for (let i = 0; i < particles; i++) {
    const particle = document.createElement('div');
    particle.className = 'binary-particle';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.fontSize = (Math.random() * 10 + 14) + 'px';
    
    // رنگ‌های تصادفی
    if (Math.random() > 0.5) {
      particle.style.color = 'var(--primary-cyan)';
      particle.style.textShadow = '0 0 10px var(--primary-cyan)';
    }
    
    binaryRain.appendChild(particle);
  }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Gallery Slider
let currentSlide = 0;
const galleryTrack = document.getElementById('galleryTrack');
if (galleryTrack) {
  const galleryItems = galleryTrack.querySelectorAll('.gallery-item');
  const totalSlides = galleryItems.length;
  
  // Only initialize slider if there are items
  if (totalSlides > 0) {
    // Create dots
    const galleryDots = document.getElementById('galleryDots');
    if (galleryDots) {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        galleryDots.appendChild(dot);
      }
    }
    
    function goToSlide(index) {
      if (totalSlides === 0) return;
      currentSlide = index;
      
      // Calculate the offset for RTL layout (negative for right-to-left)
      const offset = currentSlide * -100;
      galleryTrack.style.transform = `translateX(${offset}%)`;
      
      // Update dots
      if (galleryDots) {
        const dots = galleryDots.querySelectorAll('.gallery-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentSlide);
        });
      }
    }
    
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');
    
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
      });
    }
    
    // Auto slide - only if more than 1 slide
    if (totalSlides > 1) {
      setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
      }, 5000);
    }
  }
}

// Form Handlers - Note: Forms are now handled by Django, but we keep notification functionality
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'var(--primary-green)' : '#ff4444'};
    color: var(--dark-bg);
    padding: 1.5rem 2rem;
    border-radius: 12px;
    z-index: 10000;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      if (navLinks) {
        navLinks.classList.remove('active');
      }
    }
  });
});

// Initialize
createBinaryRain();

// SDK Integration
const defaultConfig = {
  site_title: "انجمن رمز دانشگاه علم و صنعت",
  welcome_message: "پیشبرد امنیت، رمزنگاری و هوش مصنوعی",
  join_button: "عضویت در انجمن",
  events_button: "ثبت‌نام در رویدادها",
  news_button: "آخرین اخبار",
  about_title: "درباره انجمن",
  mission_text: "ماموریت ما توسعه دانش رمزنگاری و امنیت سایبری در میان دانشجویان و پژوهشگران است.",
  contact_title: "تماس با ما",
  university_name: "دانشگاه علم و صنعت ایران",
  background_color: "#0a0a0f",
  primary_color: "#00ff88",
  secondary_color: "#00d4ff",
  text_color: "#ffffff",
  card_background: "#0f0f1a"
};

async function onConfigChange(config) {
  // Update colors and content based on config
  if (config.primary_color) {
    document.documentElement.style.setProperty('--primary-green', config.primary_color);
  }
  if (config.secondary_color) {
    document.documentElement.style.setProperty('--primary-cyan', config.secondary_color);
  }
  if (config.background_color) {
    document.documentElement.style.setProperty('--dark-bg', config.background_color);
  }
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (value) => {
            config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          }
        },
        {
          get: () => config.primary_color || defaultConfig.primary_color,
          set: (value) => {
            config.primary_color = value;
            window.elementSdk.setConfig({ primary_color: value });
          }
        },
        {
          get: () => config.secondary_color || defaultConfig.secondary_color,
          set: (value) => {
            config.secondary_color = value;
            window.elementSdk.setConfig({ secondary_color: value });
          }
        }
      ],
      borderables: [],
      fontEditable: undefined,
      fontSizeable: undefined
    }),
    mapToEditPanelValues: (config) => new Map([
      ["site_title", config.site_title || defaultConfig.site_title],
      ["welcome_message", config.welcome_message || defaultConfig.welcome_message],
      ["join_button", config.join_button || defaultConfig.join_button],
      ["events_button", config.events_button || defaultConfig.events_button],
      ["news_button", config.news_button || defaultConfig.news_button],
      ["about_title", config.about_title || defaultConfig.about_title],
      ["mission_text", config.mission_text || defaultConfig.mission_text],
      ["contact_title", config.contact_title || defaultConfig.contact_title],
      ["university_name", config.university_name || defaultConfig.university_name]
    ])
  });
}

