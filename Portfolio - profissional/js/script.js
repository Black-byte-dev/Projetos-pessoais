document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Efeito de glitch aleatório
    function createGlitchEffect() {
        const glitchElements = document.querySelectorAll('.hero-title, .section-title');
        
        glitchElements.forEach(element => {
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% de chance
                    element.style.textShadow = `
                        ${Math.random() * 5}px 0 #ff0000,
                        ${Math.random() * -5}px 0 #00ffff,
                        0 0 30px var(--azul-eletrico)
                    `;
                    
                    setTimeout(() => {
                        element.style.textShadow = '0 0 30px var(--azul-eletrico)';
                    }, 100);
                }
            }, 2000);
        });
    }

    // Efeito de digitação para o terminal
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Animação de entrada dos cards
    function animateCards() {
        const cards = document.querySelectorAll('.pillar-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.1
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    // Efeito de partículas no background
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--azul-eletrico);
                border-radius: 50%;
                opacity: 0.3;
                animation: float ${Math.random() * 10 + 5}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            hero.appendChild(particle);
        }
        
        // Adicionar CSS para animação das partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 0.3; }
                90% { opacity: 0.3; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Efeito de hover nos botões
    function enhanceButtons() {
        const buttons = document.querySelectorAll('.cta-button, .cta-button-large');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 30px var(--azul-eletrico)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
            });
            
            button.addEventListener('click', function() {
                // Efeito de ripple
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: 50%;
                    top: 50%;
                    width: 20px;
                    height: 20px;
                    margin-left: -10px;
                    margin-top: -10px;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // CSS para animação de ripple
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Efeito de scroll reveal
    function scrollReveal() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => {
            if (!section.classList.contains('hero')) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'all 0.8s ease';
                observer.observe(section);
            }
        });
    }

    createGlitchEffect();
    animateCards();
    createParticles();
    enhanceButtons();
    scrollReveal();
    
    // Efeito de digitação no terminal (com delay)
    setTimeout(() => {
        const bioTexts = document.querySelectorAll('.bio-text');
        bioTexts.forEach((text, index) => {
            const originalText = text.textContent;
            if(text.textContent) {
                setTimeout(() => {
                    typeWriter(text, originalText, 30);
                }, index * 2000);
            }
        });
    }, 1000);

    // Efeito de cursor personalizado
    document.addEventListener('mousemove', function(e) {
        let cursor = document.querySelector('.custom-cursor');
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                border: 2px solid var(--azul-eletrico);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: all 0.1s ease;
            `;
            document.body.appendChild(cursor);
        }
        
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Ocultar cursor padrão em elementos interativos
    document.querySelectorAll('a, button, .pillar-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'none';
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.backgroundColor = 'var(--azul-eletrico)';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'transparent';
            }
        });
    });
});