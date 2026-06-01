/* Shared components injected by each page */
(function(){
  // Topbar
  const topbarHTML = `
<div class="topbar">
  <div class="topbar-inner container">
    <div class="topbar-left">
      <a href="mailto:contact@theprconstructions.com">contact@theprconstructions.com</a>
      <a href="tel:+918555075797">+91 85550 75797</a>
      <span>Mon–Sat: 9AM–6PM</span>
    </div>
    <div class="topbar-right">
      <a href="https://facebook.com/profile.php?id=61586020482415" target="_blank" rel="noopener" aria-label="Facebook">Fb</a>
      <a href="https://instagram.com/prconstructions.co/" target="_blank" rel="noopener" aria-label="Instagram">Ig</a>
      <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">Li</a>
    </div>
  </div>
</div>`;

  // Nav
  const navHTML = `
<nav id="nav" role="navigation" aria-label="Main navigation">
  <div class="nav-inner container">
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-mark">PR</div>
      PR <em>Constructions</em>
    </a>
    <div class="nav-links" role="list">
      <div class="nav-pill" aria-hidden="true"></div>
      <div class="nav-item"><a href="index.html" class="nav-link" role="listitem">Home</a></div>
      <div class="nav-item"><a href="about.html" class="nav-link" role="listitem">About Us</a></div>
      <div class="nav-item">
        <a href="projects.html" class="nav-link" role="listitem">Projects ▾</a>
        <div class="nav-dropdown">
          <a href="projects.html">Ongoing Projects</a>
          <a href="projects.html#completed">Completed Projects</a>
        </div>
      </div>
      <div class="nav-item"><a href="why.html" class="nav-link" role="listitem">Why Us</a></div>
      <div class="nav-item"><a href="services.html" class="nav-link" role="listitem">Services</a></div>
      <div class="nav-item"><a href="blog.html" class="nav-link" role="listitem">Blog</a></div>
    </div>
    <a href="contact.html" class="nav-link nav-cta-btn">Contact Us</a>
    <button class="nav-burger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<nav class="mobile-nav" aria-label="Mobile navigation">
  <a href="index.html">Home</a>
  <a href="about.html">About Us</a>
  <a href="projects.html">Projects</a>
  <a href="why.html">Why Us</a>
  <a href="services.html">Services</a>
  <a href="blog.html">Blog</a>
  <a href="contact.html" class="m-cta">Contact Us</a>
</nav>`;

  const footerHTML = `
<footer>
  <div class="footer-watermark" aria-hidden="true">PR CONSTRUCTIONS</div>
  <div class="footer-top">
    <div>
      <div class="f-brand-logo">PR <em>Constructions</em></div>
      <p class="f-desc">Building quality homes and modern communities in Hyderabad since 2018. Your trusted partner for premium residential and commercial construction.</p>
      <div class="f-social">
        <a href="https://facebook.com/profile.php?id=61586020482415" target="_blank" rel="noopener" aria-label="Facebook">Fb</a>
        <a href="https://instagram.com/prconstructions.co/" target="_blank" rel="noopener" aria-label="Instagram">Ig</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">Li</a>
        <a href="https://x.com" target="_blank" rel="noopener" aria-label="X">X</a>
      </div>
    </div>
    <div>
      <div class="f-col-title">Navigation</div>
      <ul class="f-links">
        <li><a href="about.html">About Us</a></li>
        <li><a href="why.html">Why Choose Us</a></li>
        <li><a href="services.html">Our Services</a></li>
        <li><a href="projects.html">Our Projects</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
    </div>
    <div>
      <div class="f-col-title">Projects</div>
      <ul class="f-links">
        <li><a href="projects.html">Sunridge Homes</a></li>
        <li><a href="projects.html">Ongoing Projects</a></li>
        <li><a href="projects.html#completed">Completed Projects</a></li>
        <li><a href="contact.html">Book a Site Visit</a></li>
      </ul>
    </div>
    <div>
      <div class="f-col-title">Contact</div>
      <div class="f-contact-list">
        <div class="f-ci"><strong>Address</strong>Prashanthi Hills, Road No. 7,<br>Meerpet, Hyderabad – 500097</div>
        <div class="f-ci"><strong>Phone</strong><a href="tel:+918555075797">+91 85550 75797</a></div>
        <div class="f-ci"><strong>Email</strong><a href="mailto:contact@theprconstructions.com">contact@theprconstructions.com</a></div>
        <div class="f-ci"><strong>Hours</strong>Mon–Sat: 9AM–6PM</div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="f-copy">© 2026 PR Constructions. All Rights Reserved.</div>
    <div class="f-bottom-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Use</a>
    </div>
  </div>
</footer>
<button id="back-top" aria-label="Back to top">↑</button>`;

  // Inject into page
  document.addEventListener('DOMContentLoaded', () => {
    const topbarEl = document.getElementById('topbar-placeholder');
    const navEl    = document.getElementById('nav-placeholder');
    const footerEl = document.getElementById('footer-placeholder');
    if (topbarEl) topbarEl.outerHTML = topbarHTML;
    if (navEl)    navEl.outerHTML    = navHTML;
    if (footerEl) footerEl.outerHTML = footerHTML;
  });
})();
