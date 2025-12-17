(function () {
  "use strict";

  /**
   * Enhanced UI/UX animations and interactions
   */
  document.addEventListener("DOMContentLoaded", () => {
    // Smooth fade-in for hero text
    const sparkleElements = document.querySelectorAll(".sparkle-text");
    sparkleElements.forEach((element) => {
      element.style.opacity = "1";
    });

    // Smooth scroll animations only
    initSmoothScroll();
  });



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
});
