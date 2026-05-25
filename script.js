// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Product filter
const filtros = document.querySelectorAll('.filtro');
const cards = document.querySelectorAll('.produto-card');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');

    const filtro = btn.dataset.filtro;

    cards.forEach(card => {
      if (filtro === 'todos' || card.dataset.categoria === filtro) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.produto-card, .depo-card, .info-card').forEach(el => {
  observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 20px rgba(212,160,23,0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
});
