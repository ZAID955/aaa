document.addEventListener('DOMContentLoaded', () => {

    // ======== 1. Stick Header on Scroll ========
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    // ======== 2. Language Toggle (Initial Setup: English LTR) ========
    const langToggle = document.getElementById('lang-toggle');
    const htmlEl = document.documentElement;

    // Set initial direction based on HTML
    if (htmlEl.getAttribute('dir') === 'rtl') {
        document.body.classList.add('rtl');
        langToggle.textContent = langToggle.getAttribute('data-ar'); // Should be EN
    } else {
        langToggle.textContent = langToggle.getAttribute('data-en'); // Should be AR
    }

    langToggle.addEventListener('click', () => {
        const isRtl = htmlEl.getAttribute('dir') === 'rtl';

        if (isRtl) {
            // Switch to LTR (English)
            htmlEl.setAttribute('dir', 'ltr');
            htmlEl.setAttribute('lang', 'en');
            document.body.classList.remove('rtl');
            langToggle.textContent = langToggle.getAttribute('data-en'); // Display AR to prompt switch
        } else {
            // Switch to RTL (Arabic)
            htmlEl.setAttribute('dir', 'rtl');
            htmlEl.setAttribute('lang', 'ar');
            document.body.classList.add('rtl');
            langToggle.textContent = langToggle.getAttribute('data-ar'); // Display EN to prompt switch
        }
        
        // Update all text elements
        updateText();
    });

    function updateText() {
        const isRtl = document.body.classList.contains('rtl');
        const elements = document.querySelectorAll('[data-en]');
        
        elements.forEach(el => {
            const text = isRtl ? el.getAttribute('data-ar') : el.getAttribute('data-en');
            // Check if element has child span (like in portfolio buttons)
            const spanChild = el.querySelector('span');
            if (spanChild) {
                spanChild.textContent = text;
            } else {
                 // For buttons (like lang toggle) and main text elements
                el.textContent = text;
            }
        });
    }
    // Initial text update to handle default language
    updateText();


    // ======== 3. Scroll Reveal Animation ========
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    // ======== 4. Portfolio Dropdown Button ========
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if(dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent link behavior
            const parent = dropdownToggle.closest('.portfolio-dropdown');
            parent.classList.toggle('open');
        });
    }

    // Close dropdown if clicking outside
    document.addEventListener('click', (e) => {
        const openDropdown = document.querySelector('.portfolio-dropdown.open');
        if (openDropdown && !openDropdown.contains(e.target)) {
            openDropdown.classList.remove('open');
        }
    });

    // ======== 5. Smooth Scroll for Nav Links ========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                // Calculate offset for sticky header
                const headerOffset = document.querySelector('.sticky-header').offsetHeight + 20; // Added 20px padding
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});