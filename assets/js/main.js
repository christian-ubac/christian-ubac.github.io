(function () {
  "use strict";

  // Remove preloader immediately with timeout (runs before DOM ready)
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    let preloaderRemoved = false;
    
    const removePreloader = () => {
      if (!preloaderRemoved && preloader) {
        preloaderRemoved = true;
        preloader.style.opacity = '0';
        setTimeout(() => {
          if (preloader && preloader.parentNode) {
            preloader.remove();
          }
        }, 200);
      }
    };
    
    // Force remove after 800ms maximum (fast loading)
    setTimeout(removePreloader, 800);
    
    // Also remove on page load if it happens sooner
    window.addEventListener("load", removePreloader);
    document.addEventListener("DOMContentLoaded", removePreloader);
  }

  /**
   * Enhanced UI/UX animations and interactions
   */
  document.addEventListener("DOMContentLoaded", () => {
    // Smooth fade-in for hero text
    const sparkleElements = document.querySelectorAll(".sparkle-text");
    sparkleElements.forEach((element) => {
      element.style.opacity = "1";
    });

    // Animated background particles
    createParticles();

    // Smooth scroll animations
    initSmoothScroll();

    // Parallax effect for hero image
    initParallax();

    // Cursor trail effect
    initCursorTrail();
  });

  /**
   * Create floating particles in background
   */
  function createParticles() {
    const particleCount = 30;
    const hero = document.querySelector('.hero');
    
    if (!hero) return;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${Math.random() > 0.5 ? 'rgba(0, 217, 255, 0.4)' : 'rgba(124, 58, 237, 0.4)'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 2;
        pointer-events: none;
        animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        box-shadow: 0 0 10px currentColor;
      `;
      hero.appendChild(particle);
    }
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
   * Parallax scrolling effect
   */
  function initParallax() {
    const heroImage = document.querySelector('.hero img');
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  }

  /**
   * Custom cursor trail effect
   */
  function initCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = [];
    const colors = ['rgba(0, 217, 255, 0.3)', 'rgba(124, 58, 237, 0.3)'];

    // Create trail circles
    for (let i = 0; i < 10; i++) {
      const circle = document.createElement('div');
      circle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${colors[i % 2]};
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
      `;
      document.body.appendChild(circle);
      circles.push(circle);
    }

    // Update cursor position
    window.addEventListener('mousemove', (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    // Animate circles
    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
        circle.style.opacity = (circles.length - index) / circles.length * 0.5;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.offsetLeft - x) * 0.3;
        y += (nextCircle.offsetTop - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    }
    animateCircles();
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

  // Initialize Typed.js with normal speed
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 70, // Normal typing speed
      backSpeed: 40, // Smooth backspacing speed
      backDelay: 1200, // Slightly reduced delay
    });
  }

  // Theme Color Toggle with smooth transitions
  const themeColor = document.querySelectorAll(".theme-toggler span");
  if (themeColor) {
    themeColor.forEach((color) =>
      color.addEventListener("click", () => {
        let background = color.style.background;
        
        // Add smooth transition effect
        document.body.style.transition = 'background 1s ease';
        document.querySelector("body").style.background = background;
        
        // Add visual feedback
        color.style.transform = 'scale(1.3)';
        setTimeout(() => {
          color.style.transform = 'scale(1)';
        }, 200);
        
        // Update all sections with matching theme
        document.querySelectorAll('section, .section').forEach(section => {
          section.style.transition = 'background 1s ease';
        });
      })
    );
  }

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

  // Animation on scroll init with enhanced settings
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
      offset: 100,
      delay: 50,
    });
  }

  window.addEventListener("load", aos_init);

  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00d9ff, #7c3aed);
    z-index: 10000;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // Add hover effect to navigation icons
  document.querySelectorAll('.navmenu a').forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(5px)';
    });
    
    link.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateX(0)';
      }
    });
  });

  // Enhanced header toggle animation
  const headerToggle = document.querySelector('.header-toggle');
  if (headerToggle) {
    headerToggle.addEventListener('click', function() {
      this.style.transform = this.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  }
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
});
