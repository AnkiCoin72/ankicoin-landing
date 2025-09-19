# AnkiCoin - The Return of the Gods 🌟

A revolutionary cryptocurrency project combining ancient Anunnaki mythology with cutting-edge blockchain technology. This repository contains the official AnkiCoin landing page - a high-end, responsive, and accessible website built with modern web standards.

![AnkiCoin Logo](logo.png)

## 🚀 Project Overview

AnkiCoin is a meme cryptocurrency that transcends traditional boundaries by weaving together ancient wisdom and digital innovation. Built on the Ethereum blockchain with a total supply of 72 million tokens, AnkiCoin represents the digital awakening of Anunnaki consciousness in the modern world.

### Key Features

- **🎭 Mythological Theme**: Rich storytelling based on ancient Anunnaki mythology
- **⚡ Modern Technology**: Built on Ethereum blockchain with ERC-20 standard
- **🌍 Community Driven**: Decentralized governance and community ownership
- **🎮 Future Utility**: Planned gaming integration and NFT collections
- **🔒 Security First**: Audited smart contracts and locked liquidity

## 🌐 Website Features

### Technical Excellence
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Performance Optimized**: Fast loading times with advanced caching
- **SEO Optimized**: Comprehensive meta tags and structured data
- **Accessibility Compliant**: WCAG 2.1 AA standards with screen reader support
- **PWA Ready**: Progressive Web App with offline capabilities

### User Experience
- **Interactive Animations**: Smooth CSS animations and particle effects
- **Modern UI/UX**: Glassmorphism design with gold gradient theme
- **Navigation**: Smooth scrolling and mobile-friendly navigation
- **Analytics**: Comprehensive tracking and user behavior analysis

## 📁 Project Structure

```
ankicoin-landing/
├── index.html              # Main landing page
├── whitepaper.html          # Comprehensive project whitepaper
├── terms.html              # Terms of service and privacy policy
├── styles.css              # Main stylesheet with responsive design
├── whitepaper.css          # Whitepaper-specific styles
├── script.js               # Interactive functionality and animations
├── analytics.js            # Advanced analytics and tracking
├── manifest.json           # PWA manifest file
├── sw.js                   # Service worker for offline functionality
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
├── logo.png                # Project logo and favicon
├── CNAME                   # Domain configuration
└── README.md               # Project documentation
```

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Advanced styling with custom properties and animations
- **JavaScript ES6+**: Modern JavaScript with class-based architecture
- **Progressive Web App**: Service worker and manifest for app-like experience

### Performance & SEO
- **Structured Data**: Schema.org markup for better search visibility
- **Meta Tags**: Comprehensive Open Graph and Twitter card support
- **Analytics**: Google Analytics 4 integration with custom event tracking
- **Optimization**: Image optimization, lazy loading, and caching strategies

### Accessibility
- **WCAG 2.1 AA**: Compliant with web accessibility guidelines
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Support for high contrast and reduced motion preferences

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development)

### Local Development

**⚠️ Important:** Always use a local server to avoid CORS issues with PWA manifest and other resources.

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankicoin/ankicoin-landing.git
   cd ankicoin-landing
   ```

2. **Start the development server**
   
   **Option A: Use the provided script (Recommended)**
   ```bash
   # Starts server and opens browser automatically
   python3 serve.py
   
   # Or use the shell script
   ./start-server.sh
   ```
   
   **Option B: Manual server setup**
   ```bash
   # Using Python 3 (Recommended)
   python3 -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

**🚫 Don't open HTML files directly** (`file://` protocol) as this causes CORS errors with PWA features.

### Production Deployment

The website is designed to be deployed on any static hosting service:

- **GitHub Pages**: Automatic deployment from repository
- **Netlify**: Drag and drop deployment with CDN
- **Vercel**: Git-based deployment with edge functions
- **AWS S3**: Static website hosting with CloudFront
- **Traditional Web Hosting**: Upload files via FTP/SFTP

## 📊 Analytics Setup

To enable analytics tracking:

1. **Google Analytics 4**
   - Replace `GA_MEASUREMENT_ID` in `analytics.js` with your actual ID
   - Configure custom events and conversions in GA4 dashboard

2. **Custom Tracking**
   - Events are automatically tracked for user interactions
   - Performance metrics and Core Web Vitals are monitored
   - Conversion tracking for external links and important actions

## 🎨 Customization

### Colors and Branding
The website uses CSS custom properties for easy theming:

```css
:root {
  --primary-gold: #FFD700;
  --gold-gradient: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  --dark-bg: #0a0a0a;
  --dark-secondary: #1a1a1a;
  --text-light: #f5f5f5;
  --text-muted: #cccccc;
}
```

### Content Updates
- **Token Information**: Update contract address and tokenomics in `index.html`
- **Social Links**: Modify community links in the footer and community section
- **Roadmap**: Update project milestones in the roadmap section
- **Whitepaper**: Edit `whitepaper.html` for detailed project information

## 📱 Mobile Optimization

The website is fully responsive with breakpoints for:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: 320px - 479px

## ♿ Accessibility Features

- **Skip Navigation**: Jump to main content
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper headings and ARIA labels
- **High Contrast Mode**: Automatic adaptation for accessibility preferences
- **Reduced Motion**: Respects user's motion preferences

## 🔒 Security Considerations

- **Content Security Policy**: Implement CSP headers for production
- **HTTPS Only**: Ensure all external resources use HTTPS
- **Input Validation**: Sanitize any user inputs (if forms are added)
- **Privacy Compliance**: GDPR/CCPA compliant analytics implementation

## 📈 Performance Metrics

Target performance benchmarks:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **PageSpeed Score**: > 90

## 🤝 Contributing

We welcome contributions to improve the AnkiCoin website:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Test on multiple devices and browsers
- Ensure accessibility compliance
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Community

- **Website**: [ankicoin.com](https://ankicoin.com)
- **Telegram**: [t.me/ankicoin72](https://t.me/ankicoin72)
- **Contract**: `0x23564253FC155270B179Cacf51efafd5522aCDFa`
- **Etherscan**: [View on Etherscan](https://etherscan.io/token/0x23564253FC155270B179Cacf51efafd5522aCDFa)

## ⚠️ Disclaimer

AnkiCoin is a meme cryptocurrency created for entertainment and community purposes. This project involves significant risks, and you should carefully consider whether participating is suitable for your financial situation. Always do your own research and never invest more than you can afford to lose.

## 🙏 Acknowledgments

- **Ancient Mythology**: Inspired by Mesopotamian Anunnaki legends
- **Community**: Built with love for the crypto community
- **Open Source**: Utilizing various open-source technologies and libraries
- **Design Inspiration**: Modern web design trends and cryptocurrency aesthetics

---

**The gods have returned. Will you answer the call?** 🌟

*Built with ❤️ by the AnkiCoin Team*
