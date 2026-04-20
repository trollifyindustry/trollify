// Sidebar toggle
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Dropdown toggle
function toggleDropdown(id) {
  document.getElementById(id).classList.toggle("show");
}

// Inject header
document.getElementById("header").innerHTML = `  

<header class="ve-header" id="ve-sticky">
    <div class="container-fluid ve-nav-wrap">
        <!-- Logo -->
        <div class="ve-logo">
            <a href="index.html">
               <!-- <span class="ve-logo-icon"><img src="img/f-icon.png" ></span>--->
                <span class="ve-logo-text"><img src="img/logo-bg.png" width="200px" ></span>
            </a>
        </div>

        <!-- Nav Links -->
        <nav class="ve-nav">
            <ul>
                <li><a href="index.html" class="active">Home</a></li>
                <li class="has-drop">
                    <a href="about.html">About <i class="fa fa-angle-down"></i></a>
                    <ul class="ve-dropdown">
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Our Services</a></li>
                        <li><a href="elements.html">UI Elements</a></li>
                    </ul>
                </li>
                <li><a href="services.html">Services</a></li>
                <li class="has-drop">
                    <a href="#">Solutions <i class="fa fa-angle-down"></i></a>
                    <ul class="ve-dropdown">
                        <li><a href="#">Wealth Management</a></li>
                        <li><a href="#">Retirement Plans</a></li>
                        <li><a href="#">Tax Advisory</a></li>
                        <li><a href="#">Risk Analysis</a></li>
                    </ul>
                </li>
                <li><a href="post.html">Insights</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>

        <!-- CTA -->
        <div class="ve-nav-cta">
            <a href="contact.html" class="ve-cta-btn">Get Started <i class="fa fa-arrow-right"></i></a>
        </div>

        <!-- Mobile Toggle -->
        <button class="ve-toggler" id="ve-toggle">
            <span></span><span></span><span></span>
        </button>
    </div>

    <!-- Mobile Menu -->
    <div class="ve-mobile-menu" id="ve-mobile-menu">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Solutions</a></li>
            <li><a href="privacypolicy.html">Privacy Policy</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="contact.html">help & Support</a></li>
        </ul>
    </div>
</header>




`;

// ===== FIX: NAVBAR TOGGLE =====
setTimeout(() => {

    const toggleBtn = document.getElementById("ve-toggle");
    const mobileMenu = document.getElementById("ve-mobile-menu");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });
    }

}, 100);