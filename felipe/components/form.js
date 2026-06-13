// =============================================
// ARQUIVO: felipe/components/form.js
// RESPONSÁVEL: Felipe Gabriel Oliveira Da Silva
// FUNÇÃO: Componente do formulário de novo recado
// =============================================

const CORES_DISPONIVEIS = [
  { hex: '#f9c74f', nome: 'Amarelo' },
  { hex: '#f94144', nome: 'Vermelho' },
  { hex: '#90be6d', nome: 'Verde' },
  { hex: '#4cc9f0', nome: 'Azul' },
  { hex: '#c77dff', nome: 'Roxo' },
  { hex: '#f8961e', nome: 'Laranja' },
  { hex: '#ff6b9d', nome: 'Rosa' },
];

let corSelecionada = CORES_DISPONIVEIS[0].hex;

/**
 * Inicializa os seletores de cor no formulário
 */
function inicializarSeletorCores() {
  const container = document.getElementById('seletor-cores');
  if (!container) return;

  container.innerHTML = '';
  CORES_DISPONIVEIS.forEach((cor, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('cor-btn');
    btn.style.backgroundColor = cor.hex;
    btn.title = cor.nome;
    btn.setAttribute('data-cor', cor.hex);
    btn.setAttribute('aria-label', `Cor ${cor.nome}`);
    btn.addEventListener('click', () => selecionarCor(btn, cor.hex));
    container.appendChild(btn);
    if (i === 0) {
      // Seleciona a primeira cor por padrão e exibe o nome
      btn.classList.add('selecionada');
      const nomeEl = document.getElementById('cor-selecionada-nome');
      if (nomeEl) nomeEl.textContent = `Cor selecionada: ${cor.nome}`;
    }
  });
}

/**
 * Seleciona uma cor no seletor
 */
function selecionarCor(btnEl, hex) {
  document.querySelectorAll('.cor-btn').forEach(b => b.classList.remove('selecionada'));
  btnEl.classList.add('selecionada');
  corSelecionada = hex;

  // Exibe o nome da cor selecionada para o usuário
  const nomeEl = document.getElementById('cor-selecionada-nome');
  if (nomeEl) nomeEl.textContent = `Cor selecionada: ${btnEl.title}`;

  // Atualiza preview do card
  const preview = document.getElementById('form-preview');
  if (preview) preview.style.setProperty('--card-color', hex);
}

/**
 * Inicializa e configura o formulário de envio
 */
function inicializarFormulario() {
  const form = document.getElementById('form-recado');
  if (!form) return;

  inicializarSeletorCores();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btnEnviar = document.getElementById('btn-enviar');
    const inputAutor = document.getElementById('input-autor');
    const inputMensagem = document.getElementById('input-mensagem');
    const autor = inputAutor.value.trim();
    const mensagem = inputMensagem.value.trim();

    // Limpa erros anteriores
    limparErros();

    let valido = true;
    if (!autor) {
      exibirErro('erro-autor', 'Por favor, informe seu nome antes de publicar.');
      inputAutor.focus();
      valido = false;
    }
    if (!mensagem) {
      exibirErro('erro-mensagem', 'Por favor, escreva uma mensagem antes de publicar.');
      if (valido) inputMensagem.focus();
      valido = false;
    } else if (mensagem.length > 300) {
      exibirErro('erro-mensagem', 'A mensagem deve ter no máximo 300 caracteres.');
      valido = false;
    }
    if (!valido) return;

    btnEnviar.disabled = true;
    btnEnviar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Publicando...';

    try {
      const novoRecado = await window.SupabaseDB.criarRecado({
        autor,
        mensagem,
        cor: corSelecionada
      });

      // Adiciona o novo card no topo do grid
      const grid = document.getElementById('cards-grid');
      const emptyState = grid.querySelector('.empty-state');
      if (emptyState) emptyState.remove();

      // Atualiza o contador de recados no hero
      const totalEl = document.getElementById('total-recados');
      if (totalEl) totalEl.textContent = parseInt(totalEl.textContent || '0') + 1;

      const card = window.Componentes.criarCardRecado(novoRecado);
      grid.prepend(card);

      form.reset();
      corSelecionada = CORES_DISPONIVEIS[0].hex;
      inicializarSeletorCores();
      mostrarToast('Recado publicado com sucesso! 🎉', 'sucesso');

      // Fecha o modal
      fecharModal();
    } catch (err) {
      mostrarToast('Erro ao publicar recado. Verifique sua conexão e tente novamente.', 'erro');
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Publicar Recado';
    }
  });

  // Contador de caracteres
  const inputMensagem = document.getElementById('input-mensagem');
  const contador = document.getElementById('contador-chars');
  if (inputMensagem && contador) {
    inputMensagem.addEventListener('input', () => {
      const len = inputMensagem.value.length;
      contador.textContent = `${len}/300`;
      contador.style.color = len > 280 ? '#f94144' : '#aaa';
    });
  }
}

function fecharModal() {
  const modal = document.getElementById('modal-recado');
  if (modal) {
    modal.classList.remove('aberto');
    document.body.style.overflow = '';
    limparErros();
  }
}

function exibirErro(id, mensagem) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = mensagem;
    el.classList.add('visivel');
    // Marca o campo associado com borda vermelha
    const campo = el.previousElementSibling;
    if (campo) campo.classList.add('campo-invalido');
  }
}

function limparErros() {
  document.querySelectorAll('.campo-erro').forEach(el => {
    el.textContent = '';
    el.classList.remove('visivel');
  });
  document.querySelectorAll('.campo-invalido').forEach(el => el.classList.remove('campo-invalido'));
}

// Exporta para uso global
window.Form = { inicializarFormulario, fecharModal };
