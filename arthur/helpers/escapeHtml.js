// =============================================
// ARQUIVO: arthur/helpers/escapeHtml.js
// RESPONSÁVEL: Arthur Borges Rodrigues da Silva
// FUNÇÃO: Helper para ser usado nos testes
// =============================================

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} text 
 * @returns {string}
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = { escapeHtml };
