// =============================================
// ARQUIVO: felipe/components/toast.js
// RESPONSÁVEL: Felipe Gabriel Oliveira Da Silva
// FUNÇÃO: Sistema de notificações (toasts)
// =============================================

/**
 * Exibe uma notificação temporária na tela
 * @param {string} mensagem - Texto da notificação
 * @param {'sucesso'|'erro'|'aviso'} tipo - Tipo da notificação
 * @param {number} duracao - Duração em milissegundos (padrão: 3000)
 */
function mostrarToast(mensagem, tipo = 'sucesso', duracao = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icones = {
    sucesso: '✅',
    erro: '❌',
    aviso: '⚠️'
  };

  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${tipo}`);
  toast.innerHTML = `
    <span class="toast-icone">${icones[tipo]}</span>
    <span class="toast-mensagem">${mensagem}</span>
  `;

  container.appendChild(toast);

  // Animação de entrada
  requestAnimationFrame(() => {
    toast.classList.add('toast-visivel');
  });

  // Remove após a duração
  setTimeout(() => {
    toast.classList.remove('toast-visivel');
    toast.addEventListener('transitionend', () => toast.remove());
  }, duracao);
}

// Exporta para uso global
window.mostrarToast = mostrarToast;
