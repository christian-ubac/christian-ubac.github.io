(function () {
  "use strict";

  /**
   * Enhanced UI/UX animations and interactions
   */
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize all features
    initHeroAnimations();
    initSmoothScroll();
    initScrollAnimations();
    updateCurrentYear();
    initImageLazyLoading();
    initAccessibilityFeatures();
    initPerformanceMonitoring();
    initDynamicNavigation();
    initSmartPreloader();
    initParallaxEffect();
    init3DForm();
    init3DProfileCard();
    initContactForm();
  });
  
  /**
   * Performance monitoring and optimization
   */
  function initPerformanceMonitoring() {
    // Monitor page load performance
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log performance metrics for optimization
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // Prefetch important pages on hover
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      link.addEventListener('mouseenter', function() {
        const url = this.href;
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = url;
        document.head.appendChild(prefetchLink);
      }, { once: true });
    });
  }
  
  /**
   * Smart preloader with progress
   */
  function initSmartPreloader() {
    const preloader = document.querySelector('#preloader');
    if (!preloader) return;
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
    }, 100);
    
    window.addEventListener('load', () => {
      progress = 100;
      clearInterval(interval);
    });
  }
  
  /**
   * Dynamic navigation highlighting
   */
  function initDynamicNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navmenu a[href^="#"]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  }

  /**
   * Update footer year automatically
   */
  function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /**
   * Initialize hero section animations
   */
  function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
      setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
      }, 300);
    }
    
    if (heroSubtitle) {
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
      }, 600);
    }
  }

  /**
   * Lazy loading for images
   */
  function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  /**
   * Scroll-based animations
   */
  function initScrollAnimations() {
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
    
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1 });
    
    animateOnScroll.forEach(el => scrollObserver.observe(el));
  }

  /**
   * Accessibility improvements
   */
  function initAccessibilityFeatures() {
    // Add keyboard navigation for custom elements
    document.querySelectorAll('.social-icon').forEach(link => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });
    
    // Focus visible for keyboard users
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }



  /**
   * Smooth scroll behavior for navigation
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#top') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }





  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  // Initialize Typed.js with enhanced settings
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",").map(s => s.trim());
    
    setTimeout(() => {
      new Typed(".typed", {
        strings: typed_strings,
        loop: true,
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        fadeOut: false,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true,
      });
    }, 800);
  }

  // Enhanced UI interactions
  // Add ripple effect to buttons
  document.querySelectorAll('.btn-modern, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  // Mobile nav toggle
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  headerToggleBtn.addEventListener("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  // Profile image resizing
  document.addEventListener("DOMContentLoaded", function () {
    const profileImg = document.querySelector(".header .profile-img");
    if (profileImg) {
      profileImg.addEventListener("mousedown", function (e) {
        e.preventDefault();

        function onMouseMove(e) {
          const newWidth = e.clientX - profileImg.getBoundingClientRect().left;
          const newHeight = e.clientY - profileImg.getBoundingClientRect().top;
          if (newWidth > 50 && newHeight > 50) {
            profileImg.style.width = newWidth + "px";
            profileImg.style.height = newHeight + "px";
          }
        }

        function onMouseUp() {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
    }

    // Header resizing
    const header = document.querySelector(".header");
    if (header) {
      header.addEventListener("mousedown", function (e) {
        e.preventDefault();

        function onMouseMove(e) {
          const newWidth = e.clientX - header.getBoundingClientRect().left;
          if (newWidth > 200 && newWidth < 500) {
            header.style.width = newWidth + "px";
          }
        }

        function onMouseUp() {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
    }
  });

  // Toggle mobile nav dropdowns
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  // Preloader - remove immediately
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    // Remove preloader instantly on DOM ready
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 200);
    }, 100);
  }
  // Enhanced theme system - colors now controlled by theme toggler
  // Removed automatic color changing to maintain design consistency

  // Scroll top button
  const scrollTopButton = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTopButton) {
      window.scrollY > 100
        ? scrollTopButton.classList.add("active")
        : scrollTopButton.classList.remove("active");
    }
  }

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  // Animation on scroll init - optimized
  function aos_init() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  }

  window.addEventListener("load", aos_init);




})();

document.addEventListener("DOMContentLoaded", function () {
  var $container = document.querySelector(".isotope-container");
  if ($container) {
    var iso = new Isotope($container, {
      itemSelector: ".portfolio-item",
      layoutMode: "masonry",
      filter: "*",
    });

    // Bind filter button click
    var filtersElem = document.querySelector(".isotope-filters");
    filtersElem.addEventListener("click", function (event) {
      if (!event.target.matches("li")) {
        return;
      }
      var filterValue = event.target.getAttribute("data-filter");
      iso.arrange({ filter: filterValue });
      // Change active class on filter buttons
      var filterButtons = filtersElem.querySelectorAll("li");
      filterButtons.forEach(function (button) {
        button.classList.remove("filter-active");
      });
      event.target.classList.add("filter-active");
    });
  }
  
  /**
   * Parallax scrolling effect for hero section
   */
  function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero img');
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    const heroSocial = document.querySelector('.hero .social-links');
    const heroCta = document.querySelector('.hero-cta');
    
    if (!heroSection) return;
    
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const heroHeight = heroSection.offsetHeight;
      
      // Only apply parallax if we're within the hero section view
      if (scrolled < heroHeight) {
        const parallaxSpeed = 0.5;
        const contentSpeed = 0.3;
        
        // Parallax background image - moves slower
        if (heroImage) {
          heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        // Parallax content - moves at different speeds for depth
        if (heroTitle) {
          heroTitle.style.transform = `translateY(${scrolled * contentSpeed * 0.8}px)`;
          heroTitle.style.opacity = 1 - (scrolled / heroHeight) * 0.8;
        }
        
        if (heroText) {
          heroText.style.transform = `translateY(${scrolled * contentSpeed * 1.2}px)`;
          heroText.style.opacity = 1 - (scrolled / heroHeight) * 1;
        }
        
        if (heroSocial) {
          heroSocial.style.transform = `translateY(${scrolled * contentSpeed * 1.5}px)`;
          heroSocial.style.opacity = 1 - (scrolled / heroHeight) * 1.2;
        }
        
        if (heroCta) {
          heroCta.style.transform = `translateY(${scrolled * contentSpeed * 1.8}px)`;
          heroCta.style.opacity = 1 - (scrolled / heroHeight) * 1.5;
        }
      }
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial update
    updateParallax();
  }
  
  /**
   * 3D Mouse Tracking Effect for Contact Form
   */
  function init3DForm() {
    const form = document.querySelector('.form-3d');
    if (!form) return;
    
    const inputs = form.querySelectorAll('.form-control');
    
    form.addEventListener('mousemove', (e) => {
      const rect = form.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const rotateX = ((y - rect.height / 2) / rect.height) * 8;
      const rotateY = ((x - rect.width / 2) / rect.width) * 8;
      
      form.style.transform = `rotateX(${rotateX}deg) rotateY(${-rotateY}deg)`;
    });
    
    form.addEventListener('mouseleave', () => {
      form.style.transform = 'rotateX(0) rotateY(0)';
    });
    
    // Floating label animation for inputs
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });
    });
  }
  
  /**
   * 3D Profile Card Mouse Tracking
   */
  function init3DProfileCard() {
    const profileCard = document.querySelector('.profile-card-3d');
    if (!profileCard) return;
    
    const cardInner = profileCard.querySelector('.profile-card-inner');
    
    profileCard.addEventListener('mousemove', (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const rotateX = ((y - rect.height / 2) / rect.height) * 15;
      const rotateY = ((x - rect.width / 2) / rect.width) * 15;
      
      cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
      cardInner.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
  }
  
  /**
   * Contact Form Handler
   */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name-field').value,
        email: document.getElementById('email-field').value,
        subject: document.getElementById('subject-field').value,
        message: document.getElementById('message-field').value
      };
      
      // Validate form
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Create mailto link as fallback
      const mailtoLink = `mailto:christianubac789@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
      // Try to send via FormSubmit.co (serverless form handler)
      fetch('https://formspree.io/f/xyzpvjwn', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          // Show success message
          const successDiv = document.createElement('div');
          successDiv.className = 'alert alert-success';
          successDiv.textContent = 'Message sent successfully! Thank you for contacting me.';
          form.parentElement.insertBefore(successDiv, form);
          
          // Reset form
          form.reset();
          
          // Remove success message after 5 seconds
          setTimeout(() => successDiv.remove(), 5000);
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.log('FormSpree failed, opening email client as fallback...');
        // Fallback: open mailto link
        window.location.href = mailtoLink;
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }
});
