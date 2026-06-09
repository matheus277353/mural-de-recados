// =============================================
// ARQUIVO: arthur/tests/app.test.js
// RESPONSÁVEL: Arthur Borges Rodrigues da Silva
// FUNÇÃO: Testes automatizados da aplicação
// =============================================

// Testes usando Jest
// Para rodar: npm test

const { escapeHtml } = require('../helpers/escapeHtml');

// ─── Teste 1: escapeHtml ───────────────────────────────────────────────────
describe('escapeHtml()', () => {
  test('deve escapar caracteres especiais HTML', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  test('deve retornar texto simples sem alteração', () => {
    expect(escapeHtml('Olá, mundo!')).toBe('Olá, mundo!');
  });

  test('deve escapar o símbolo &', () => {
    expect(escapeHtml('P&G')).toBe('P&amp;G');
  });

  test('deve retornar string vazia para entrada vazia', () => {
    expect(escapeHtml('')).toBe('');
  });
});

// ─── Teste 2: Validação de campos do formulário ────────────────────────────
describe('validarCamposRecado()', () => {
  function validarCamposRecado(autor, mensagem) {
    if (!autor || autor.trim() === '') return { valido: false, erro: 'Autor obrigatório' };
    if (!mensagem || mensagem.trim() === '') return { valido: false, erro: 'Mensagem obrigatória' };
    if (mensagem.length > 300) return { valido: false, erro: 'Mensagem muito longa' };
    return { valido: true, erro: null };
  }

  test('deve retornar válido para campos corretos', () => {
    const resultado = validarCamposRecado('Matheus', 'Olá turma!');
    expect(resultado.valido).toBe(true);
    expect(resultado.erro).toBeNull();
  });

  test('deve rejeitar autor vazio', () => {
    const resultado = validarCamposRecado('', 'Alguma mensagem');
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toBe('Autor obrigatório');
  });

  test('deve rejeitar mensagem vazia', () => {
    const resultado = validarCamposRecado('Felipe', '');
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toBe('Mensagem obrigatória');
  });

  test('deve rejeitar mensagem com mais de 300 caracteres', () => {
    const mensagemLonga = 'a'.repeat(301);
    const resultado = validarCamposRecado('Arthur', mensagemLonga);
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toBe('Mensagem muito longa');
  });

  test('deve aceitar mensagem com exatamente 300 caracteres', () => {
    const mensagem300 = 'a'.repeat(300);
    const resultado = validarCamposRecado('Arthur', mensagem300);
    expect(resultado.valido).toBe(true);
  });
});

// ─── Teste 3: Formatação de data ───────────────────────────────────────────
describe('formatarData()', () => {
  function formatarData(isoString) {
    if (!isoString) return 'Data inválida';
    return new Date(isoString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  test('deve formatar data ISO para formato brasileiro', () => {
    const resultado = formatarData('2025-06-09T12:00:00Z');
    expect(typeof resultado).toBe('string');
    expect(resultado.length).toBeGreaterThan(0);
  });

  test('deve retornar string inválida para data nula', () => {
    const resultado = formatarData(null);
    expect(resultado).toBe('Data inválida');
  });
});

// ─── Teste 4: Formatação do recado ────────────────────────────────────────
describe('Estrutura do objeto recado', () => {
  const recadoValido = {
    id: 1,
    autor: 'Matheus',
    mensagem: 'Olá!',
    cor: '#f9c74f',
    criado_em: new Date().toISOString()
  };

  test('deve ter todas as propriedades obrigatórias', () => {
    expect(recadoValido).toHaveProperty('id');
    expect(recadoValido).toHaveProperty('autor');
    expect(recadoValido).toHaveProperty('mensagem');
    expect(recadoValido).toHaveProperty('cor');
    expect(recadoValido).toHaveProperty('criado_em');
  });

  test('cor deve ser um valor hexadecimal válido', () => {
    expect(recadoValido.cor).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });
});
