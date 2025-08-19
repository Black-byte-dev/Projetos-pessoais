// Menu hambúrguer para mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de entrada dos elementos ao scroll
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

// Aplicar animação aos elementos
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.category, .pricing-card, .feature, .promo-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header transparente ao scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(191, 70, 59, 0.95), rgba(191, 82, 57, 0.95))';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #BF463B, #BF5239)';
        header.style.backdropFilter = 'none';
    }
});

// Formulário de contato
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simular envio do formulário
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Mensagem Enviada!';
        button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        // Reset do formulário
        this.reset();
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = 'linear-gradient(135deg, #F28705, #BF5239)';
        }, 3000);
    }, 2000);
});

// Efeito parallax suave no hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    if (hero && heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Contador animado para preços (opcional)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = `R$ ${start.toFixed(2)}`;
        
        if (start >= target) {
            element.textContent = `R$ ${target.toFixed(2)}`;
            clearInterval(timer);
        }
    }, 16);
}

// Ativar contadores quando a seção de preços estiver visível
const priceObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const priceElements = entry.target.querySelectorAll('.price');
            priceElements.forEach(priceEl => {
                const priceText = priceEl.textContent;
                const priceValue = parseFloat(priceText.replace('R$ ', '').replace(',', '.'));
                if (!isNaN(priceValue)) {
                    priceEl.textContent = 'R$ 0,00';
                    setTimeout(() => {
                        animateCounter(priceEl, priceValue, 1500);
                    }, 200);
                }
            });
            priceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const pricingSection = document.querySelector('.pricing');
    if (pricingSection) {
        priceObserver.observe(pricingSection);
    }
});

// Adicionar classe ativa ao menu baseado na seção atual
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Adicionar estilo para link ativo
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #F28705 !important;
        position: relative;
    }
    
    .nav-menu a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #F28705;
        border-radius: 2px;
    }
`;
document.head.appendChild(style);

