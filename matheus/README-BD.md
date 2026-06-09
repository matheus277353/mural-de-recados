# 🏗️ Matheus Oliveira Da Silva — Backend & Banco de Dados

## Responsabilidades
- Configurar o Supabase (banco de dados na nuvem)
- Criar as tabelas no banco via SQL
- Implementar todas as funções de CRUD (Create, Read, Update, Delete)

## Como Configurar o Supabase

### 1. Criar conta gratuita
Acesse: https://supabase.com e crie uma conta gratuita.

### 2. Criar novo projeto
- Clique em "New Project"
- Escolha um nome: `mural-de-recados`
- Defina uma senha para o banco
- Selecione a região: South America (São Paulo)

### 3. Criar a tabela
- No painel do Supabase, vá em **SQL Editor**
- Cole e execute o conteúdo do arquivo `schema.sql`

### 4. Pegar as credenciais
- Vá em **Project Settings > API**
- Copie a **Project URL** e a **anon public key**
- Cole no arquivo `.env` na raiz do projeto:
  ```
  SUPABASE_URL=https://xxxx.supabase.co
  SUPABASE_KEY=eyJhbGci...
  ```

### 5. Atualizar o código
- Abra `database/supabase.js`
- Substitua `COLOQUE_SUA_URL_AQUI` e `COLOQUE_SUA_CHAVE_AQUI` pelas credenciais

## Arquivos desta pasta
| Arquivo | Descrição |
|---------|-----------|
| `database/supabase.js` | Conexão e funções CRUD do Supabase |
| `database/schema.sql` | Script SQL para criar a tabela |

## Pull Request
> Branch: `feature/database-integration`
> Descrição do PR: "Integração com Supabase — CRUD de recados"
