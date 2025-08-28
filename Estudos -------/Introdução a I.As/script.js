document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function startCountdown() {
        let duration = 30 * 60; // 30 minutes in seconds
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        const timer = setInterval(() => {
            let minutes = parseInt(duration / 60, 10);
            let seconds = parseInt(duration % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            countdownElement.textContent = minutes + ":" + seconds;

            if (--duration < 0) {
                clearInterval(timer);
                countdownElement.textContent = 'OFERTA EXPIRADA!';
                countdownElement.style.color = '#FF6B6B';
            }
        }, 1000);
    }

    // Modal Handling
    function setupModal() {
        const modal = document.getElementById('sampleModal');
        const btn = document.getElementById('sample-btn');
        const span = document.querySelector('.close-modal');
        const form = document.querySelector('.modal-form');

        if (!modal || !btn || !span) return;

        btn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        span.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        // Handle form submission
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                
                if (email) {
                    // Simulate form submission
                    const button = form.querySelector('button');
                    const originalText = button.textContent;
                    button.textContent = 'ENVIANDO...';
                    button.disabled = true;
                    
                    setTimeout(() => {
                        button.textContent = 'ENVIADO!';
                        button.style.background = '#4CAF50';
                        
                        setTimeout(() => {
                            modal.style.display = 'none';
                            document.body.style.overflow = 'auto';
                            button.textContent = originalText;
                            button.disabled = false;
                            button.style.background = '';
                            form.reset();
                        }, 2000);
                    }, 1500);
                }
            });
        }
    }

    // Smooth scrolling for anchor links
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href.length < 2) return;
                
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Header scroll effect
    function setupHeaderScrollEffect() {
        const header = document.querySelector('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(13, 13, 13, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(13, 13, 13, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Mobile menu toggle
    function setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('nav ul');
        
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'rgba(13, 13, 13, 0.98)';
            nav.style.padding = '20px';
            nav.style.borderTop = '1px solid #333';
        });

        // Close mobile menu when clicking on a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            });
        });
    }

    // Intersection Observer for animations
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.benefit-card, .content-item, .testimonial, .author-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Add floating animation to CTA buttons
    function setupFloatingAnimation() {
        const ctaButtons = document.querySelectorAll('.btn-hero');
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.animation = 'float 2s ease-in-out infinite';
            });
            button.addEventListener('mouseleave', () => {
                button.style.animation = '';
            });
        });

        // Add CSS for float animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(-3px); }
                50% { transform: translateY(-8px); }
            }
        `;
        document.head.appendChild(style);
    }

    // Add particle effect to hero section
    function setupParticleEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#00AEEF';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `twinkle ${2 + Math.random() * 3}s infinite`;
            hero.appendChild(particle);
        }

        // Add CSS for twinkle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.5); }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize all functions
    startCountdown();
    setupModal();
    setupSmoothScrolling();
    setupHeaderScrollEffect();
    setupMobileMenu();
    setupScrollAnimations();
    setupFloatingAnimation();
    setupParticleEffect();

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

