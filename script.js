// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.querySelector('header').style.boxShadow =
    window.scrollY > 50 ? '0 2px 20px rgba(212,160,23,0.1)' : 'none';
});

function renderizarProdutos(produtos) {
  const grid = document.getElementById('produtos-grid');
  grid.innerHTML = produtos.map(p => `
    <div class="produto-card" data-categoria="${p.categoria}">
      ${p.badge ? `<div class="produto-badge${p.badge_novo ? ' novo' : ''}">${p.badge}</div>` : ''}
      <div class="produto-img">
        <img src="${p.imagem}" alt="Camisa ${p.nome}" loading="lazy" />
      </div>
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <div class="produto-footer">
        <span class="preco">R$ ${p.preco}</span>
        <a href="#contato" class="btn-comprar">Comprar</a>
      </div>
    </div>
  `).join('');

  // Re-bind filters after dynamic render
  const filtros = document.querySelectorAll('.filtro');
  const cards = document.querySelectorAll('.produto-card');

  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      filtros.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const filtro = btn.dataset.filtro;
      cards.forEach(card => {
        card.classList.toggle('hidden', filtro !== 'todos' && card.dataset.categoria !== filtro);
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
}

async function carregarProdutos() {
  try {
    const res = await fetch('produtos.json?v=' + Date.now());
    const produtos = await res.json();
    renderizarProdutos(produtos);
  } catch {
    document.getElementById('produtos-grid').innerHTML =
      '<p style="text-align:center;color:#aaa;padding:40px">Erro ao carregar produtos. Tente recarregar a página.</p>';
  }
}

carregarProdutos();
