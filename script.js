// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.classList.toggle('active');
        });
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Form submission handling
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your booking request! We will contact you soon.');
        form.reset();
    });
}

// Star Rating System
const stars = document.querySelectorAll('.star');
const ratingMessage = document.getElementById('ratingMessage');
const submitRatingBtn = document.getElementById('submitRating');

let currentRating = 0;

if (stars.length > 0) {
    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-value'));
            updateStars(currentRating);
        });

        star.addEventListener('mouseenter', function() {
            const hoverValue = parseInt(this.getAttribute('data-value'));
            previewStars(hoverValue);
        });

        star.addEventListener('mouseleave', function() {
            updateStars(currentRating);
        });
    });

    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
                star.style.color = '#800020';
            } else {
                star.classList.remove('active');
                star.style.color = '#ddd';
            }
        });
    }

    function previewStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#800020';
            } else {
                star.style.color = '#ddd';
            }
        });
    }
}

if (submitRatingBtn) {
    submitRatingBtn.addEventListener('click', function() {
        if (currentRating === 0) {
            alert('Please select a rating before submitting!');
            return;
        }
        
        const message = ratingMessage ? ratingMessage.value.trim() : '';
        
        if (message) {
            alert(`Thank you for your ${currentRating}-star rating and feedback!`);
        } else {
            alert(`Thank you for your ${currentRating}-star rating!`);
        }
        
        // Reset the rating
        currentRating = 0;
        updateStars(0);
        if (ratingMessage) {
            ratingMessage.value = '';
        }
    });
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll with stagger delays
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation to service cards, product cards, and testimonials with stagger
    const cards = document.querySelectorAll('.service-card, .product-card, .testimonial');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add tilt effect to cards (desktop only)
    if (window.matchMedia('(hover: hover)').matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // Add parallax effect to hero image (mobile-friendly)
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollPosition = window.pageYOffset;
                    if (scrollPosition < window.innerHeight) {
                        heroImage.style.transform = `translateY(${scrollPosition * 0.15}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Add typing effect to hero h1
    const heroH1 = document.querySelector('.hero-content h1');
    if (heroH1) {
        const text = heroH1.textContent;
        heroH1.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroH1.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    // Add floating animation to nav links on hover
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'float 0.5s ease-in-out';
        });
        link.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Add pulse animation to contact button on load
    const contactBtn = document.querySelector('#contact .btn');
    if (contactBtn) {
        setTimeout(() => {
            contactBtn.style.animation = 'pulse 1s ease-in-out 3';
        }, 2000);
    }
});
