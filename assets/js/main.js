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
      header.classList.add('shadow-lg', 'border-b', 'border-indigo-500/10');
    } else {
      header.classList.remove('shadow-lg', 'border-b', 'border-indigo-500/10');
    }
  }
});

// Manipulador do Formulário de Lead (Simulação Interativa)
const leadForm = document.getElementById('lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = leadForm.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const originalContent = submitBtn.innerHTML;

    // Simular Estado de Carregamento
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Enviando...
    `;

    setTimeout(() => {
      // Criar Toast Acessível dinamicamente com SVG inline
      const toast = document.createElement('div');
      toast.setAttribute('role', 'alert');
      toast.className = 'fixed bottom-5 right-5 z-50 bg-indigo-900 border-2 border-indigo-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-500 transform translate-y-10 opacity-0';
      toast.innerHTML = `
        <svg class="w-6 h-6 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <div>
          <span class="block font-bold">Solicitação Enviada!</span>
          <span class="text-xs text-slate-300">Nossa equipe entrará em contato em breve.</span>
        </div>
      `;
      document.body.appendChild(toast);

      // Animar entrada do Toast
      setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
      }, 100);

      // Limpar Formulário e Restaurar Botão
      leadForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;

      // Remover Toast após 5 segundos
      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
      }, 5000);

    }, 1200);
  });
}
