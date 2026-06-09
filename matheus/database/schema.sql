-- =============================================
-- ARQUIVO: matheus/database/schema.sql
-- RESPONSÁVEL: Matheus Oliveira Da Silva
-- FUNÇÃO: Script SQL para criar a tabela no Supabase
-- =============================================
-- Execute este script no Editor SQL do Supabase (supabase.com > SQL Editor)

-- Cria a tabela de recados
CREATE TABLE IF NOT EXISTS recados (
  id          BIGSERIAL PRIMARY KEY,
  autor       TEXT NOT NULL,
  mensagem    TEXT NOT NULL,
  cor         TEXT NOT NULL DEFAULT '#f9c74f',
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Habilita Row Level Security (RLS) — segurança por linha
ALTER TABLE recados ENABLE ROW LEVEL SECURITY;

-- Política: qualquer pessoa pode LER os recados
CREATE POLICY "Leitura pública" ON recados
  FOR SELECT USING (true);

-- Política: qualquer pessoa pode INSERIR recados
CREATE POLICY "Inserção pública" ON recados
  FOR INSERT WITH CHECK (true);

-- Política: qualquer pessoa pode EXCLUIR recados
CREATE POLICY "Exclusão pública" ON recados
  FOR DELETE USING (true);

-- Política: qualquer pessoa pode ATUALIZAR recados
CREATE POLICY "Atualização pública" ON recados
  FOR UPDATE USING (true);

-- Insere 3 recados de exemplo para teste inicial
INSERT INTO recados (autor, mensagem, cor) VALUES
  ('Matheus', 'Olá! Bem-vindo ao Mural de Recados! 🎉', '#f9c74f'),
  ('Felipe', 'Boa sorte no projeto pessoal! 💪', '#90be6d'),
  ('Arthur', 'Deploy funcionando! ✅', '#4cc9f0');
