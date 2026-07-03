/**
 * Electricista Mar del Plata - Pure JS
 * Logic for animations, slider, calculator, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Initialize Lucide Icons ---
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Scroll Reveal Animation ---
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check


  // --- Quick Calculator ---
  const calcButtons = document.querySelectorAll('.calc-btn');
  const calcSubmit = document.getElementById('calc-submit');
  let selectedOption = "";

  calcButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      calcButtons.forEach(b => b.classList.remove('bg-electric-yellow', 'text-black'));
      calcButtons.forEach(b => b.classList.add('bg-gray-100', 'text-gray-700'));
      
      btn.classList.remove('bg-gray-100', 'text-gray-700');
      btn.classList.add('bg-electric-yellow', 'text-black');
      selectedOption = btn.textContent.trim();
    });
  });

  if (calcSubmit) {
    calcSubmit.addEventListener('click', () => {
      if (!selectedOption) {
        alert('Por favor, seleccioná una opción.');
        return;
      }
      const phone = "549223000000"; // Placeholder number
      const message = encodeURIComponent(`Hola.\nNecesito presupuesto para:\n${selectedOption}`);
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // --- WhatsApp Float Badge ---
  const waBadge = document.querySelector('.wa-badge');
  setTimeout(() => {
    if (waBadge) waBadge.style.display = 'block';
  }, 20000);

  // --- Back to Top ---
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
