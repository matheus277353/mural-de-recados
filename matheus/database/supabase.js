// =============================================
// ARQUIVO: matheus/database/supabase.js
// RESPONSÁVEL: Matheus Oliveira Da Silva
// FUNÇÃO: Configuração e conexão com o Supabase
// =============================================

// Substitua pelos seus dados do Supabase
const SUPABASE_URL = window.ENV_SUPABASE_URL || 'https://xhdojzmvhjvyiemhabkf.supabase.co';
const SUPABASE_ANON_KEY = window.ENV_SUPABASE_KEY || 'sb_publishable_64Y5fI6ESG7EWr1BoXEKFg_c2aVqhP0';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================================
// CRUD - Recados
// =============================================

/**
 * Busca todos os recados do banco de dados
 * @returns {Promise<Array>} Lista de recados
 */
async function buscarRecados() {
  const { data, error } = await db
    .from('recados')
    .select('*')
    .order('criado_em', { ascending: false });

  if (error) {
    console.error('Erro ao buscar recados:', error.message);
    throw error;
  }

  return data;
}

/**
 * Cria um novo recado no banco de dados
 * @param {Object} recado - { autor, mensagem, cor }
 * @returns {Promise<Object>} Recado criado
 */
async function criarRecado(recado) {
  const { data, error } = await db
    .from('recados')
    .insert([{
      autor: recado.autor,
      mensagem: recado.mensagem,
      cor: recado.cor || '#f9c74f',
      criado_em: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar recado:', error.message);
    throw error;
  }

  return data;
}

/**
 * Exclui um recado pelo ID
 * @param {number} id - ID do recado
 */
async function excluirRecado(id) {
  const { error } = await db
    .from('recados')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao excluir recado:', error.message);
    throw error;
  }
}

/**
 * Atualiza a mensagem de um recado
 * @param {number} id - ID do recado
 * @param {string} novaMensagem - Nova mensagem
 */
async function atualizarRecado(id, novaMensagem) {
  const { data, error } = await db
    .from('recados')
    .update({ mensagem: novaMensagem })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar recado:', error.message);
    throw error;
  }

  return data;
}

/**
 * Busca todos os recados de um autor específico
 * @param {string} autor - Nome do autor
 * @returns {Promise<Array>} Lista de recados filtrados
 */
async function buscarRecadosPorAutor(autor) {
  const { data, error } = await db
    .from('recados')
    .select('*')
    .eq('autor', autor)
    .order('criado_em', { ascending: false });

  if (error) {
    console.error(`Erro ao buscar recados do autor ${autor}:`, error.message);
    throw error;
  }

  return data;
}

// Exporta para uso global
window.SupabaseDB = {
  buscarRecados,
  criarRecado,
  excluirRecado,
  atualizarRecado,
  buscarRecadosPorAutor,
  db
};
