// Advanced AnkiCoin Website Script
class AnkiCoinWebsite {
  constructor() {
    this.targetDate = new Date("2025-08-08T00:00:00Z").getTime();
    this.particles = [];
    this.init();
  }

  init() {
    this.setupCountdown();
    this.setupParticles();
    this.setupAnimations();
    this.setupInteractions();
    this.setupNavigation();
    this.setupScrollEffects();
  }

  // Countdown Timer
  setupCountdown() {
    const countdownEl = document.getElementById('countdown');
    const countdownText = document.getElementById('countdown-text');
    
    if (!countdownEl || !countdownText) return; // Exit if countdown elements don't exist
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = this.targetDate - now;

      // Remove loading class
      countdownEl.classList.remove('loading');

      if (distance <= 0) {
        countdownText.innerHTML = "⚡ The Return has begun ⚡";
        countdownEl.classList.add('completed');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownText.innerHTML = `
        <div class="countdown-grid">
          <div class="countdown-item">
            <span class="countdown-number">${days}</span>
            <span class="countdown-label">Days</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${hours}</span>
            <span class="countdown-label">Hours</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${minutes}</span>
            <span class="countdown-label">Minutes</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${seconds}</span>
            <span class="countdown-label">Seconds</span>
          </div>
        </div>
      `;
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Particle System
  setupParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return; // Exit if particles container doesn't exist
    
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(particleContainer);
    }

    // Continuous particle creation
    setInterval(() => {
      if (this.particles.length < particleCount) {
        this.createParticle(particleContainer);
      }
    }, 2000);
  }

  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    container.appendChild(particle);
    this.particles.push(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
        this.particles = this.particles.filter(p => p !== particle);
      }
    }, 10000);
  }

  // Animations and Effects
  setupAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el);
    });

    // Logo hover effects
    const logo = document.getElementById('logo');
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.1) rotate(5deg)';
      });

      logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1) rotate(0deg)';
      });
    }

    // Removed parallax effect to prevent hero section from going behind other sections
  }

  // Interactive Features
  setupInteractions() {
    // Button click animations
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Contract address interactions
    const contractAddress = document.getElementById('contract-address');
    if (contractAddress) {
      contractAddress.addEventListener('mouseenter', () => {
        contractAddress.style.transform = 'scale(1.02)';
      });

      contractAddress.addEventListener('mouseleave', () => {
        contractAddress.style.transform = 'scale(1)';
      });
    }
  }

  // Navigation Setup
  setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Smooth scrolling for navigation links (only for internal links)
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle internal links that start with #
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
        // External links (like whitepaper.html) will work normally
      });
    });
  }

  // Scroll Effects
  setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      // Navbar background change on scroll
      if (scrolled > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }

      // Removed parallax effect for hero section to prevent overlapping issues

      // Animate elements on scroll
      this.animateOnScroll();
    });
  }

  // Animate elements when they come into view
  animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }

  // Enhanced Particle System
  createAdvancedParticles() {
    const particleContainer = document.getElementById('particles');
    const particleCount = 75;

    for (let i = 0; i < particleCount; i++) {
      this.createAdvancedParticle(particleContainer);
    }
  }

  createAdvancedParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning and properties
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 2;
    
    particle.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.8 + 0.2};
    `;
    
    container.appendChild(particle);
    this.particles.push(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
        this.particles = this.particles.filter(p => p !== particle);
      }
    }, (duration + delay) * 1000);
  }

  // Section-specific animations
  setupSectionAnimations() {
    // Story cards animation
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
    });

    // Tokenomics cards animation
    const tokenomicsCards = document.querySelectorAll('.tokenomics-card');
    tokenomicsCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.15}s`;
    });

    // Roadmap items animation
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    roadmapItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.3}s`;
    });

    // Community cards animation
    const communityCards = document.querySelectorAll('.community-card');
    communityCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
    });
  }

  // Utility Functions
  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Easter egg: Konami code
  setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          this.activateGodMode();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
  }

  activateGodMode() {
    this.showToast('🌟 The Anunnaki have blessed you with divine powers! 🌟', 'success');
    
    // Add special visual effects
    document.body.classList.add('god-mode');
    
    // Create extra particles
    this.createAdvancedParticles();
    
    // Enhanced logo glow
    const logo = document.getElementById('logo');
    if (logo) {
      logo.style.filter = 'drop-shadow(0 0 50px rgba(255, 215, 0, 0.8))';
    }
    
    setTimeout(() => {
      document.body.classList.remove('god-mode');
      if (logo) {
        logo.style.filter = '';
      }
    }, 10000);
  }
}

// Copy to Clipboard Function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    website.showToast('Contract address copied to clipboard!', 'success');
  }).catch(err => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      website.showToast('Contract address copied to clipboard!', 'success');
    } catch (err) {
      website.showToast('Failed to copy address', 'error');
    }
    document.body.removeChild(textArea);
  });
}

// Initialize website when DOM is loaded (only on main page)
let website;
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize the main website functionality on the main page
  const isMainPage = document.getElementById('main-content') !== null;
  
  if (isMainPage) {
    website = new AnkiCoinWebsite();
    
    // Setup additional features
    website.setupSectionAnimations();
    website.setupKonamiCode();
    
    // Trigger initial scroll animation
    website.animateOnScroll();
  } else {
    // For other pages (whitepaper, terms), just setup basic navigation
    setupBasicNavigation();
  }
});

// Basic navigation for non-main pages
function setupBasicNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
    });
  });
}

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open modals or overlays
    document.querySelectorAll('.modal, .overlay').forEach(el => {
      el.classList.remove('active');
    });
  }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
} 