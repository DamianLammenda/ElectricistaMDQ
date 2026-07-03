/**
 * Electricista Mar del Plata - Pure JS
 * Logic for animations, slider, calculator, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
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

  // --- Before/After Slider ---
  const baContainer = document.querySelector('.ba-container');
  if (baContainer) {
    const afterImg = baContainer.querySelector('.ba-after');
    const handle = baContainer.querySelector('.ba-handle');
    
    const moveSlider = (e) => {
      let x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const rect = baContainer.getBoundingClientRect();
      let position = ((x - rect.left) / rect.width) * 100;
      
      if (position < 0) position = 0;
      if (position > 100) position = 100;
      
      afterImg.style.width = `${position}%`;
      handle.style.left = `${position}%`;
    };

    baContainer.addEventListener('mousemove', moveSlider);
    baContainer.addEventListener('touchmove', moveSlider);
  }

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const galleryItems = document.querySelectorAll('.masonry-item img');

  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
      }
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }

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

  // --- Counters ---
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(runCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  };

  // Intersection Observer for counters
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      runCounters();
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  const counterSection = document.querySelector('.counter-section');
  if (counterSection) observer.observe(counterSection);

  // --- WhatsApp Float Badge ---
  const waBadge = document.querySelector('.wa-badge');
  setTimeout(() => {
    if (waBadge) waBadge.style.display = 'block';
  }, 20000);

  // --- Back to Top ---
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTop.style.opacity = '1';
    } else {
      backToTop.style.opacity = '0';
    }
  });
});
