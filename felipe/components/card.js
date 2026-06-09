// =============================================
// ARQUIVO: felipe/components/card.js
// RESPONSÁVEL: Felipe Gabriel Oliveira Da Silva
// FUNÇÃO: Componente visual de card de recado
// =============================================

/**
 * Cria o elemento HTML de um card de recado
 * @param {Object} recado - { id, autor, mensagem, cor, criado_em }
 * @returns {HTMLElement} Elemento do card
 */
function criarCardRecado(recado) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', recado.id);
  card.style.setProperty('--card-color', recado.cor);

  const data = new Date(recado.criado_em).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  card.innerHTML = `
    <div class="card-header">
      <div class="card-avatar">${recado.autor.charAt(0).toUpperCase()}</div>
      <div class="card-meta">
        <span class="card-autor">${escapeHtml(recado.autor)}</span>
        <span class="card-data">${data}</span>
      </div>
      <button class="card-btn-excluir" title="Excluir recado" data-id="${recado.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>
    </div>
    <p class="card-mensagem">${escapeHtml(recado.mensagem)}</p>
  `;

  // Evento de excluir
  card.querySelector('.card-btn-excluir').addEventListener('click', async (e) => {
    e.stopPropagation();
    await handleExcluirRecado(recado.id, card);
  });

  // Animação de entrada
  card.style.opacity = '0';
  card.style.transform = 'scale(0.8) translateY(20px)';
  requestAnimationFrame(() => {
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    card.style.opacity = '1';
    card.style.transform = 'scale(1) translateY(0)';
  });

  return card;
}

/**
 * Escapa HTML para evitar XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

/**
 * Remove um card do DOM com animação
 */
async function handleExcluirRecado(id, cardEl) {
  if (!confirm('Tem certeza que quer excluir este recado?')) return;

  try {
    await window.SupabaseDB.excluirRecado(id);
    cardEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    cardEl.style.opacity = '0';
    cardEl.style.transform = 'scale(0.8)';
    setTimeout(() => cardEl.remove(), 300);
    mostrarToast('Recado excluído!', 'sucesso');
  } catch (err) {
    mostrarToast('Erro ao excluir recado.', 'erro');
  }
}

/**
 * Renderiza todos os cards no grid
 */
function renderizarCards(recados) {
  const grid = document.getElementById('cards-grid');
  grid.innerHTML = '';

  if (recados.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📭</span>
        <p>Nenhum recado ainda. Seja o primeiro!</p>
      </div>
    `;
    return;
  }

  recados.forEach(recado => {
    grid.appendChild(criarCardRecado(recado));
  });
}

// Exporta para uso global
window.Componentes = { criarCardRecado, renderizarCards, escapeHtml };
