// =============================================
// ARQUIVO: app.js
// RESPONSABILIDADE: Todos (integração geral)
// FUNÇÃO: Inicialização e orquestração da app
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Mural de Recados iniciando...');

  // ─── Inicializar componentes do Felipe ──────────────────────────────────
  window.Form.inicializarFormulario();

  // ─── Carregar recados do Banco de Dados (Matheus) ───────────────────────
  await carregarRecados();

  // ─── Eventos do Modal ────────────────────────────────────────────────────
  const btnAbrirModal  = document.getElementById('btn-abrir-modal');
  const btnFecharModal = document.getElementById('btn-fechar-modal');
  const btnCancelar    = document.getElementById('btn-cancelar');
  const modalOverlay   = document.getElementById('modal-recado');

  function abrirModal() {
    modalOverlay.classList.add('aberto');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('input-autor')?.focus(), 100);
  }

  btnAbrirModal.addEventListener('click', abrirModal);
  btnFecharModal.addEventListener('click', window.Form.fecharModal);
  btnCancelar.addEventListener('click', window.Form.fecharModal);

  // Fecha modal ao clicar fora
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) window.Form.fecharModal();
  });

  // Fecha modal com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.Form.fecharModal();
  });
});

// ─── Carrega todos os recados do banco ────────────────────────────────────
async function carregarRecados() {
  const grid = document.getElementById('cards-grid');

  try {
    const recados = await window.SupabaseDB.buscarRecados();

    // Atualiza contador no hero
    const totalEl = document.getElementById('total-recados');
    if (totalEl) totalEl.textContent = recados.length;

    // Renderiza os cards (função do Felipe)
    window.Componentes.renderizarCards(recados);

  } catch (err) {
    console.error('Erro ao carregar recados:', err);
    grid.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">⚠️</span>
        <p>Erro ao conectar com o banco de dados.</p>
        <p style="font-size:0.8rem;margin-top:0.5rem;">Configure as credenciais do Supabase no arquivo <code>matheus/database/supabase.js</code></p>
      </div>
    `;
  }
}
