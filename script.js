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
  }

  // Countdown Timer
  setupCountdown() {
    const countdownEl = document.getElementById('countdown');
    const countdownText = document.getElementById('countdown-text');
    
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

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
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

  // Utility Functions
  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
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

// Initialize website when DOM is loaded
let website;
document.addEventListener('DOMContentLoaded', () => {
  website = new AnkiCoinWebsite();
});

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