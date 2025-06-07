(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 20;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true,
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true,
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Initiate glightbox
   */
  // const glightbox = GLightbox({
  //   selector: '.glightbox'
  // });

  // function getCurrentScroll() {
  //   return window.pageYOffset || document.documentElement.scrollTop;
  // }

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Select the .sideb_bar_menu div and clear its content
    const sidebarMenu = document.querySelector(".sideb_bar_menu");
    sidebarMenu.innerHTML = "";

    // Define the HTML structure as a string
    const menuHtml = `
      <ul>
         <li><a href="patient-registration.html">Register Now</a></li>
         <li><a href="return_patient.html">Return Patients</a></li>
         <li class="side_menu_arrow">
            <a
               class="collapsed"
               data-bs-toggle="collapse"
               href="#sm1"
               role="button"
               aria-expanded="false"
               aria-controls="sm1"
               >
            About
            </a>
         </li>
         <div class="collapse" id="sm1">
            <li class="m_mleft"><a href="delware.html">Telepsychology</a></li>
            <li class="m_mleft"><a href="about.html">Team</a></li>
         </div>
         <li class="side_menu_arrow">
            <a
               class="collapsed"
               data-bs-toggle="collapse"
               href="#location"
               role="button"
               aria-expanded="false"
               aria-controls="location"
               >
            Locations
            </a>
         </li>
         <div class="collapse" id="location">
            <li class="m_mleft"><a href="delware.html">Delaware</a></li>
         </div>
         <div class="collapse" id="location">
            <li class="m_mleft"><a href="minnesota.html">Minnesota</a></li>
         </div>
         <div class="collapse" id="location">
            <li class="m_mleft"><a href="kentucky.html">Kentucky</a></li>
         </div>
         <div class="collapse" id="location">
            <li class="m_mleft"><a href="north-dakota.html">North Dakota</a></li>
         </div>
         <div class="collapse" id="location">
            <li class="m_mleft"><a href="oregon.html">Oregon</a></li>
         </div>
         <li class="side_menu_arrow">
            <a
               class="collapsed"
               data-bs-toggle="collapse"
               href="#insurance"
               role="button"
               aria-expanded="false"
               aria-controls="insurance"
               >
            Insurance
            </a>
         </li>
         <div class="collapse" id="insurance">
            <li class="m_mleft">
               <a href="auto-insurance.html">Auto Insurance</a>
            </li>
            <li class="m_mleft">
               <a href="premise-liability.html">Premises Liability </a>
            </li>
         </div>
         <li class="side_menu_arrow">
            <a
               class="collapsed"
               data-bs-toggle="collapse"
               href="#sm2"
               role="button"
               aria-expanded="false"
               aria-controls="sm2"
               >
            Referrals
            </a>
         </li>
         <div class="collapse" id="sm2">
            <li class="m_mleft">
               <a href="healthcare-provider-referal.html">Healthcare Providers</a>
            </li>
            <li class="m_mleft"><a href="attorneys.html">Lawyers</a></li>
         </div>
         <li class="side_menu_arrow">
            <a
               class="collapsed"
               data-bs-toggle="collapse"
               href="#sm3"
               role="button"
               aria-expanded="false"
               aria-controls="sm3"
               >
            Services
            </a>
         </li>
         <div class="collapse" id="sm3">
    <li class="side_menu_arrow">
        <a
            class="collapsed"
            data-bs-toggle="collapse"
            href="#sub-dropdown2"
            role="button"
            aria-expanded="false"
            aria-controls="sub-dropdown2"
        >
            Emotional
        </a>
    </li>

    <div class="collapse" id="sub-dropdown2">
        <li class="side_menu_arrow">
            <a
                class="collapsed"
                data-bs-toggle="collapse"
                href="#sub-dropdown-cognitive"
                role="button"
                aria-expanded="false"
                aria-controls="sub-dropdown-cognitive"
            >
                Cognitive
            </a>
        </li>

        <div class="collapse" id="sub-dropdown-cognitive">
            <li class="m_mleft">
                <a href="tbi-testing.html">TBI Testing</a>
            </li>
            <li class="m_mleft">
                <a href="cog-rehab.html">Cognitive Rehabilitation</a>
            </li>
            <li class="m_mleft">
                <a href="tbi-counseling.html">TBI Counseling</a>
            </li>
        </div>

        <li class="m_mleft">
            <a href="psychological-testing.html">Psychology Tests</a>
        </li>
        <li class="m_mleft">
            <a href="counseling.html">Counseling</a>
        </li>
    </div>
</div>

         <li class="side_menu_arrow">
            <a
               class="collapsed"
               data-bs-toggle="collapse"
               href="#sm4"
               role="button"
               aria-expanded="false"
               aria-controls="sm4"
               >
            Conditions
            </a>
         </li>
         <div class="collapse" id="sm4">
            <li class="m_mleft">
               <a href="anxiety.html">Anxiety</a>
            </li>
            <li class="m_mleft">
               <a href="depression.html">Depression</a>
            </li>
            <li class="m_mleft">
              <a href="PTSD.html">PTSD</a>
            </li>
            <li class="m_mleft">
               <a href="TBI.html">TBI</a>
            </li>
         </div>
         
         <li>
            <a href="contact-us.html">Contacts</a>
         </li>
      </ul>
   `;

    // Insert the HTML structure into the .sideb_bar_menu div
    sidebarMenu.innerHTML = menuHtml;
  });

  // Select the `.footer-top` element
  const footerTop = document.querySelector(".footer-top");

  // Ensure the `.footer-top` element exists
  if (footerTop) {
    // Select the last `.row` inside `.footer-top`
    const lastRow = footerTop.querySelector(".row:last-of-type");

    // If a last `.row` exists, remove it
    if (lastRow) {
      lastRow.remove();
    }

    // Define the new row HTML structure
    const newRowHTML = `
    <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-6 footer-links roboto">
            <ul>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="patient-registration.html">Register Now</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="return_patient.html">Return Patients</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="delware.html">Telepsychology</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="contact-us.html">Contacts</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-4 col-6 footer-links nunito">
            <ul>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="locations.html">Locations</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="policy.html">PHI / Privacy Policy</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="terms.html">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
    </div>
  `;

    // Append the new row HTML to `.footer-top`
    footerTop.insertAdjacentHTML("beforeend", newRowHTML);
  }

  // Create a new script element
  const script = document.createElement("script");

  // Set the src attribute to the provided URL
  script.src = "https://website-widgets.pages.dev/dist/sienna.min.js";

  // Set the defer attribute (optional but useful for scripts that load after HTML parsing)
  script.defer = true;

  // Append the script to the document head
  document.head.appendChild(script);
})();
