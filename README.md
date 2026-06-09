# 📌 Mural de Recados

> Projeto Final Colaborativo — Desenvolvimento de Software

Um mural digital onde usuários podem publicar, visualizar e excluir recados em tempo real, com dados persistidos em um banco de dados na nuvem.

![Preview da aplicação](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![CI](https://github.com/matheus277353/mural-de-recados/actions/workflows/ci.yml/badge.svg)

---

## 👥 Integrantes do Grupo

| Nome | GitHub | Papel |
|------|--------|-------|
| Matheus Oliveira Da Silva | [@matheus](https://github.com) | 🏗️ Backend & Banco de Dados |
| Felipe Gabriel Oliveira Da Silva | [@felipe](https://github.com) | 🎨 Frontend & UI |
| Arthur Borges Rodrigues da Silva | [@arthur](https://github.com) | ⚙️ CI/CD, Testes & Deploy |

---

## 🚀 Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML5 + CSS3 + JavaScript Vanilla |
| Banco de Dados | [Supabase](https://supabase.com) (PostgreSQL na nuvem) |
| CI/CD | GitHub Actions |
| Deploy | [Vercel](https://vercel.com) |

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org) v18+
- Conta gratuita no [Supabase](https://supabase.com)

### Passos

**1. Clone o repositório**
```bash
git clone https://github.com/matheus277353/mural-de-recados.git
cd mural-de-recados
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure o banco de dados**
- Crie um projeto no [Supabase](https://supabase.com)
- Execute o script `matheus/database/schema.sql` no SQL Editor do Supabase
- Copie suas credenciais (URL e chave anônima)

**4. Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env e preencha com suas credenciais
SUPABASE_URL=https://xhdojzmvhjvyiemhabkf.supabase.co
SUPABASE_KEY=SUA_CHAVE_ANONIMA
```

**5. Atualize o arquivo de conexão**

Abra `matheus/database/supabase.js` e substitua as constantes pelos valores do seu `.env`.

**6. Inicie o servidor local**
```bash
npm start
# Acesse: http://localhost:3000
```

---

## 🧪 Rodando os Testes

```bash
npm test
```

Os testes cobrem:
- ✅ Função `escapeHtml` (prevenção de XSS)
- ✅ Validação dos campos do formulário
- ✅ Formatação de data
- ✅ Estrutura do objeto recado

---

## 🔀 Fluxo de Trabalho Git

```
main (branch principal — protegida)
  ├── feature/database-integration  → Matheus
  ├── feature/frontend-ui           → Felipe
  └── feature/ci-tests-deploy       → Arthur
```

Cada integrante abre um **Pull Request** da sua branch para a `main`. O PR só é mergeado após:
1. ✅ CI (GitHub Actions) passar
2. ✅ Revisão e aprovação de outro integrante

---

## 🌐 Links

- **Repositório:** https://github.com/matheus277353/mural-de-recados
- **Aplicação publicada:** https://mural-de-recados.vercel.app

---

## 📁 Estrutura do Projeto

```
mural-de-recados/
├── matheus/              # Backend & Banco de Dados
│   └── database/
│       ├── supabase.js   # Conexão e CRUD Supabase
│       └── schema.sql    # Script SQL para criar tabelas
├── felipe/               # Frontend & UI
│   └── components/
│       ├── card.js       # Componente de card de recado
│       ├── form.js       # Formulário de criação
│       └── toast.js      # Notificações visuais
├── arthur/               # CI/CD, Testes & Deploy
│   ├── tests/
│   │   └── app.test.js   # Testes automatizados (Jest)
│   └── helpers/
│       └── escapeHtml.js # Módulo auxiliar
├── .github/
│   └── workflows/
│       └── ci.yml        # Pipeline GitHub Actions
├── index.html            # Página principal
├── style.css             # Estilos globais
├── app.js                # Orquestração da aplicação
├── package.json          # Dependências e scripts
├── .env.example          # Template de variáveis de ambiente
└── .gitignore
```
