
// Inject header
document.getElementById("footer").innerHTML = `  

<!-- ===== CTA BANNER (Trollify Version with Buttons) ===== -->
<section class="ve-cta-banner bg-img" style="background-image:url(img/bg-img/6.jpg);">
    <div class="ve-cta-overlay"></div>
    <div class="container ve-cta-content">
        <div class="row align-items-center">

            <div class="col-12 col-lg-8">
                <h2>Ready to Grow Your <span>Business Digitally?</span></h2>
                <p>
                    Get in touch with us for website development, school systems, 
                    video editing, and complete digital solutions.
                </p>

                <p style="margin-top:10px;">
                    📞 +91 9754113218, +91 9752776923
                </p>
            </div>

            <div class="col-12 col-lg-4 text-lg-right">

                <!-- Call Button -->
                <a href="tel:+919754113218" class="ve-btn-white" style="margin-right:10px;">
                    📞 Call Now
                </a>

                <!-- WhatsApp Button -->
                <a href="https://wa.me/919754113218" class="ve-btn-white">
                    💬 WhatsApp
                </a>

            </div>

        </div>
    </div>
</section>


<!-- ===== CONTACT / ENQUIRY SECTION ===== -->
<section class="ve-newsletter-section">
    <div class="container">
        <div class="ve-newsletter-wrap">

            <div class="ve-nl-left">
                <i class="fa fa-headset"></i>
                <div>
                    <h3>Get in Touch with Trollify Infotech</h3>
                    <p>Contact us for school systems, website development, video editing, and more services.</p>
                </div>
            </div>

            <div class="ve-nl-right">
                <form class="ve-nl-form" action="#" method="post">
                    <input type="tel" placeholder="Your Phone Number" required>

                    <button type="submit">Send Enquiry</button>
                </form>
            </div>

        </div>
    </div>
</section>
    
<!-- ===== FOOTER (Trollify Version) ===== -->
<footer class="ve-footer">
    <div class="container">
        <div class="row">

            <!-- Col 1: Brand -->
            <div class="col-12 col-sm-6 col-lg-4 mb-50">
                <div class="ve-footer-brand">
                    <a href="index.html" class="ve-footer-logo">
                      <!-----  <span class="ve-logo-icon">T</span> --->
                        <span class="ve-logo-text"><img src="img/logo-bg.png" width="200px" ></span>
                    </a>
                    <p>Providing smart digital solutions for schools, businesses, and creators with fast and affordable services.</p>

                    <div class="ve-social">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-instagram"></i></a>
                        <a href="#"><i class="fa fa-youtube"></i></a>
                        <a href="#"><i class="fa fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>

            <!-- Col 2: Quick Links -->
            <div class="col-12 col-sm-6 col-lg-2 mb-50">
                <h5 class="ve-footer-title">Quick Links</h5>
                <ul class="ve-footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="portfolio.html">Our Work</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>

            <!-- Col 3: Services -->
            <div class="col-12 col-sm-6 col-lg-3 mb-50">
                <h5 class="ve-footer-title">Our Services</h5>
                <ul class="ve-footer-links">
                    <li><a href="#">School Management System</a></li>
                    <li><a href="#">Website Development</a></li>
                    <li><a href="#">Business Growth Solutions</a></li>
                    <li><a href="#">Video Editing</a></li>
                    <li><a href="#">Freelancing & Design</a></li>
                </ul>
            </div>

            <!-- Col 4: Contact -->
            <div class="col-12 col-sm-6 col-lg-3 mb-50">
                <h5 class="ve-footer-title">Get In Touch</h5>
                <ul class="ve-footer-contact">
                    <li><i class="fa fa-map-marker"></i> Pipariya Khurd, Post Khamra, teh Bichhua, Dist Chhindwara, Madhya Pradesh, 480111</li>
                    <li><i class="fa fa-phone"></i> +91 9754113218, +91 9752776923</li>
                    <li><i class="fa fa-envelope"></i> trollifyinfotech@gmail.com</li>
                    <li><i class="fa fa-clock-o"></i> Mon–Sat, 9am – 7pm</li>
                </ul>
            </div>

        </div>
    </div>

    <!-- Footer Bottom -->
    <div class="ve-footer-bottom">
        <div class="container">
            <div class="ve-footer-bottom-inner">
                <p>
                    Copyright &copy; 
                    <script>document.write(new Date().getFullYear());</script> 
                    <a href="index.html" class="text-white" >Trollify Infotech.</a> All Rights Reserved | Developed by <a href="#" class="text-white">Prem Janghela</a>
                </p>

                <ul>
                    <li><a href="terms_conditions.html">Privacy Policy</a></li>
                    <li><a href="terms_conditions.html">Terms of Use</a></li>
                    <li><a href="contect.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>

`;

// Sidebar toggle
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Dropdown toggle
function toggleDropdown(id) {
  document.getElementById(id).classList.toggle("show");
}