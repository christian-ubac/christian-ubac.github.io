(function () {
  "use strict";

  // Function to create the sparkle effect on specified elements
  function createSparkleEffect(element) {
    const colors = ["#ffffff", "#ff00ff", "#00ffff", "#ffff00"];
    let colorIndex = 0;

    setInterval(() => {
      element.style.textShadow = `
        0 0 5px ${colors[colorIndex]},
        0 0 10px ${colors[colorIndex]},
        0 0 15px ${colors[colorIndex]},
        0 0 20px ${colors[colorIndex]},
        0 0 25px ${colors[colorIndex]},
        0 0 30px ${colors[colorIndex]},
        0 0 35px ${colors[colorIndex]}
      `;
      colorIndex = (colorIndex + 1) % colors.length;
    }, 500); // Sparkle effect updates every 500ms
  }

  // Apply the sparkle effect to all elements with the class "sparkle-text"
  document.addEventListener("DOMContentLoaded", () => {
    const sparkleElements = document.querySelectorAll(".sparkle-text");
    sparkleElements.forEach((element) => createSparkleEffect(element));
  });

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

  // Theme Color Toggle
  const themeColor = document.querySelectorAll(".theme-toggler span");
  if (themeColor) {
    themeColor.forEach((color) =>
      color.addEventListener("click", () => {
        let background = color.style.background;
        document.querySelector("body").style.background = background;
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

  // Preloader
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }
  const colors = [
    "rgb(126, 157, 165)", // Color 1
    "rgb(92, 107, 192)", // Color 2
    "rgb(25, 138, 101)", // Color 3
  ];
  let colorIndex = 0;

  // Function to change the --background-color variable
  function changeBackgroundColor() {
    document.documentElement.style.setProperty(
      "--background-color",
      colors[colorIndex]
    );
    colorIndex = (colorIndex + 1) % colors.length; // Loop back to the first color after the last
  }

  // Set interval to change the background color every 3 seconds
  setInterval(changeBackgroundColor, 3000);

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

  // Animation on scroll init
  function aos_init() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
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
