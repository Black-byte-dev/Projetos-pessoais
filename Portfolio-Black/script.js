// Scroll reveal de seções com animações
window.addEventListener('scroll', () => {
  const elementos = document.querySelectorAll('.fade-in, .zoom-in, .slide-in');
  const windowHeight = window.innerHeight;
  
  elementos.forEach(el => {
    const posicaoTopo = el.getBoundingClientRect().top;
    if (posicaoTopo < windowHeight - 100) {
      el.style.animationPlayState = 'running';
    }
  });
});

// Envio de formulário com animação de status
document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const status = document.getElementById('statusMsg');
  status.textContent = "Enviando...";
  status.style.color = "#00aeef";

  setTimeout(() => {
    status.textContent = "Mensagem enviada com sucesso!";
    status.style.color = "#00ff88";
    this.reset();
  }, 2000);
});
