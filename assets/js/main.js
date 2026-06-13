// Menu Mobile Interativo (Acessível)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

function toggleMenu() {
  const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';

  mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);

  if (!isExpanded) {
    // Abrir Menu
    mobileMenu.classList.remove('hidden');
    // Pequeno delay para animação de fade-in
    setTimeout(() => {
      mobileMenu.classList.remove('opacity-0', '-translate-y-2');
      mobileMenu.classList.add('opacity-100', 'translate-y-0');
    }, 10);

    // Trocar ícone para X (fechar)
    if (menuIcon && closeIcon) {
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  } else {
    // Fechar Menu
    mobileMenu.classList.remove('opacity-100', 'translate-y-0');
    mobileMenu.classList.add('opacity-0', '-translate-y-2');

    // Trocar ícone de volta para menu
    if (menuIcon && closeIcon) {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }

    // Esconder após transição acabar
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMenu);
}

// Fechar menu ao clicar em links
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenuBtn && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
      toggleMenu();
    }
  });
});

// Controlar sombra do Header ao Rolar
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 10) {
      header.classList.add('shadow-lg', 'border-b', 'border-primary-100/10');
    } else {
      header.classList.remove('shadow-lg', 'border-b', 'border-primary-100/10');
    }
  }
});


// Inicializar Animate On Scroll (AOS)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
});

// Efeito de Brilho Dinâmico Seguidor de Cursor nos Cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card-border-glow-primary, .card-border-glow-secundary');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

