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
    if (i === 0) btn.classList.add('selecionada');
    btn.style.backgroundColor = cor.hex;
    btn.title = cor.nome;
    btn.setAttribute('data-cor', cor.hex);
    btn.addEventListener('click', () => selecionarCor(btn, cor.hex));
    container.appendChild(btn);
  });
}

/**
 * Seleciona uma cor no seletor
 */
function selecionarCor(btnEl, hex) {
  document.querySelectorAll('.cor-btn').forEach(b => b.classList.remove('selecionada'));
  btnEl.classList.add('selecionada');
  corSelecionada = hex;

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
    const autor = document.getElementById('input-autor').value.trim();
    const mensagem = document.getElementById('input-mensagem').value.trim();

    if (!autor || !mensagem) {
      mostrarToast('Preencha todos os campos!', 'aviso');
      return;
    }

    if (mensagem.length > 300) {
      mostrarToast('A mensagem deve ter no máximo 300 caracteres.', 'aviso');
      return;
    }

    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

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

      const card = window.Componentes.criarCardRecado(novoRecado);
      grid.prepend(card);

      form.reset();
      corSelecionada = CORES_DISPONIVEIS[0].hex;
      inicializarSeletorCores();
      mostrarToast('Recado enviado! 🎉', 'sucesso');

      // Fecha o modal
      fecharModal();
    } catch (err) {
      mostrarToast('Erro ao enviar recado. Tente novamente.', 'erro');
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.textContent = 'Publicar Recado';
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
  }
}

// Exporta para uso global
window.Form = { inicializarFormulario, fecharModal };
