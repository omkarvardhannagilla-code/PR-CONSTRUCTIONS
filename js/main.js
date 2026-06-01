/* ============================================================
   PR CONSTRUCTIONS — MAIN JS
   Animations from video analysis:
   44: Pill nav highlight
   55: Footer watermark reveal
   66: FAQ smooth accordion
   77: Typewriter hero
   88: Parallax depth cards
   99: Staggered avatar reveal
   ============================================================ */

(function () {
  'use strict';

  /* ---- PRELOADER (BITS Design split-panel reveal) ---- */
  function initPreloader() {
    const pre = document.getElementById('preloader');
    if (!pre) return;
    document.body.classList.add('no-scroll');
    // Wait for fonts + assets before dismissing
    const dismiss = () => {
      pre.classList.add('done');
      document.body.classList.remove('no-scroll');
      // Trigger hero animations
      document.querySelectorAll('[data-hero-anim]').forEach(el => el.classList.add('started'));
    };
    // Min display time 2s, then dismiss
    let fontsReady = false, timerDone = false;
    function tryDismiss() {
      if (fontsReady && timerDone) dismiss();
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { fontsReady = true; tryDismiss(); });
    } else {
      fontsReady = true;
    }
    setTimeout(() => { timerDone = true; tryDismiss(); }, 2200);
  }

  /* ---- SCROLL PROGRESS ---- */
  function initScrollBar() {
    const bar = document.querySelector('.scroll-bar');
    if (!bar) return;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total ? (window.scrollY / total * 100) + '%' : '0%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---- NAVBAR ---- */
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    // Sticky scroll behavior
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Video 44 — Pill highlight that tracks hovered nav items
    const links  = nav.querySelectorAll('.nav-links .nav-link');
    const pill   = nav.querySelector('.nav-pill');
    const linksWrap = nav.querySelector('.nav-links');
    if (pill && linksWrap) {
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          const lRect = link.getBoundingClientRect();
          const wRect = linksWrap.getBoundingClientRect();
          pill.style.left  = (lRect.left  - wRect.left)  + 'px';
          pill.style.width = lRect.width  + 'px';
          pill.style.opacity = '1';
        });
      });
      linksWrap.addEventListener('mouseleave', () => {
        pill.style.opacity = '0';
      });
    }

    // Hamburger
    const burger   = nav.querySelector('.nav-burger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (burger && mobileNav) {
      burger.addEventListener('click', () => {
        const open = mobileNav.classList.toggle('open');
        burger.classList.toggle('open', open);
        document.body.classList.toggle('no-scroll', open);
        burger.setAttribute('aria-expanded', open);
      });
      mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          burger.classList.remove('open');
          document.body.classList.remove('no-scroll');
        });
      });
    }

    // Active link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('.nav-link').forEach(l => {
      const href = (l.getAttribute('href') || '').split('/').pop();
      l.classList.toggle('active', href === path);
    });
  }

  /* ---- SCROLL REVEAL ---- */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* ---- COUNTER ANIMATION ---- */
  function initCounters() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el     = e.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        const dur    = 1600;
        let start    = null;
        const ease   = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const tick   = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.round(ease(p) * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(el => obs.observe(el));
  }

  /* ---- VIDEO 88: Parallax depth cards ---- */
  function initParallax() {
    const cards = document.querySelectorAll('.depth-card');
    if (!cards.length) return;
    const hero  = document.getElementById('hero');
    if (!hero) return;
    // Initial transform offsets per card
    const offsets = [
      { rx: -6, ry: 0 }, { rx: 3, ry: 0 },
      { rx: -2, ry: 0 }, { rx: 8, ry: 0 }
    ];
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      cards.forEach((card, i) => {
        const depth = (i + 1) * 0.4;
        const base  = offsets[i] || { rx: 0, ry: 0 };
        const tx    = dx * 18 * depth;
        const ty    = dy * 12 * depth;
        card.style.transform = `rotate(${base.rx}deg) translate(${tx}px, ${ty}px)`;
      });
    });
    // Scroll parallax
    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      cards.forEach((card, i) => {
        const speed = (i + 1) * 0.12;
        card.style.marginTop = -(sy * speed) + 'px';
      });
    }, { passive: true });
  }

  /* ---- VIDEO 77: Typewriter cursor in hero ---- */
  function initTypewriter() {
    const cursorEls = document.querySelectorAll('.type-cursor');
    if (!cursorEls.length) return;
    // Activate cursor after hero animations complete
    setTimeout(() => {
      cursorEls.forEach(c => c.closest('.cursor-active') || c.parentElement.classList.add('cursor-active'));
    }, 3000);
  }

  /* ---- VIDEO 66: FAQ Accordion ---- */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', () => {
        const isOpen = q.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-q.open').forEach(openQ => {
          openQ.classList.remove('open');
          const sibling = openQ.nextElementSibling;
          if (sibling && sibling.classList.contains('faq-a')) sibling.style.maxHeight = '0';
        });
        // Open clicked
        if (!isOpen) {
          q.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  }

  /* ---- TESTIMONIALS SLIDER ---- */
  function initSlider() {
    const track = document.querySelector('.testi-track');
    const cards = document.querySelectorAll('.testi-card');
    const prevB = document.querySelector('.testi-btn.prev');
    const nextB = document.querySelector('.testi-btn.next');
    if (!track || !cards.length) return;
    let idx = 0;
    const visible = () => window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
    const maxIdx  = () => Math.max(0, cards.length - visible());
    const move = () => {
      const v = visible();
      cards.forEach(c => c.style.minWidth = (100 / v) + '%');
      const offset = (100 / v) * idx;
      track.style.transform = `translateX(-${offset}%)`;
    };
    prevB?.addEventListener('click', () => { idx = Math.max(0, idx - 1); move(); });
    nextB?.addEventListener('click', () => { idx = Math.min(maxIdx(), idx + 1); move(); });
    window.addEventListener('resize', () => { idx = Math.min(idx, maxIdx()); move(); });
    move();
    // Auto-advance
    setInterval(() => {
      idx = idx >= maxIdx() ? 0 : idx + 1;
      move();
    }, 5500);
  }

  /* ---- VIDEO 99: Staggered avatar reveal ---- */
  function initAvatarReveal() {
    const avRow = document.querySelector('.testi-avatars');
    if (!avRow) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        // Re-trigger animation by toggling class
        avRow.querySelectorAll('.testi-av, .testi-av-count').forEach((av, i) => {
          av.style.animation = 'none';
          av.offsetHeight; // reflow
          av.style.animation = '';
        });
        obs.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    obs.observe(avRow);
  }

  /* ---- VIDEO 55: Footer watermark ---- */
  function initFooterWatermark() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        footer.classList.toggle('in-view', e.isIntersecting);
      });
    }, { threshold: 0.1 });
    obs.observe(footer);
  }

  /* ---- BACK TO TOP ---- */
  function initBackTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- CONTACT FORM ---- */
  function initForms() {
    document.querySelectorAll('.contact-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = 'Sending…';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = '✓ Message Sent';
          btn.style.background = '#2a6a40';
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.disabled = false;
            btn.style.background = '';
            form.reset();
          }, 3500);
        }, 1600);
      });
    });
  }

  /* ---- VIDEO autoplay safety ---- */
  function initVideos() {
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.play().catch(() => {});
    });
  }

  /* ---- MARQUEE duplication ---- */
  function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(t => {
      t.innerHTML += t.innerHTML;
    });
  }

  /* ---- BLOG FILTER ---- */
  window.filterBlog = function(btn, cat) {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = '';
      b.style.color = '';
      b.style.borderColor = '';
    });
    btn.classList.add('active');
    btn.style.background = 'var(--ink)';
    btn.style.color = '#fff';
    btn.style.borderColor = 'var(--ink)';
    document.querySelectorAll('[data-cat]').forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
      card.style.opacity = '0';
      if (show) {
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.4s';
          card.style.opacity = '1';
        });
      }
    });
  };

  /* ---- INIT ---- */
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollBar();
    initNav();
    initReveal();
    initCounters();
    initParallax();
    initTypewriter();
    initFAQ();
    initSlider();
    initAvatarReveal();
    initFooterWatermark();
    initBackTop();
    initForms();
    initMarquee();
    initVideos();
  });

})();
