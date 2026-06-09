# ⚙️ Arthur Borges Rodrigues da Silva — CI/CD, Testes & Deploy

## Responsabilidades
- Manter o GitHub Actions funcionando e verde ✅
- Escrever testes automatizados com Jest
- Garantir que o CI roda em todos os Pull Requests
- Manter o deploy atualizado (Vercel)
- Atualizar o README principal do projeto

## Arquivos desta pasta
| Arquivo | Descrição |
|---------|-----------|
| `tests/app.test.js` | Suite completa de testes com Jest (12 testes) |
| `helpers/escapeHtml.js` | Módulo auxiliar usado nos testes |

## Como Rodar os Testes Localmente
```bash
# Na raiz do projeto:
npm install
npm test
```

## Como Configurar o Deploy na Vercel

### 1. Criar conta gratuita
Acesse: https://vercel.com e crie uma conta com o GitHub.

### 2. Importar o repositório
- Clique em "Add New... > Project"
- Selecione o repositório `mural-de-recados`
- Clique em "Deploy"

### 3. Configurar variáveis de ambiente
Na Vercel, vá em **Settings > Environment Variables** e adicione:
```
SUPABASE_URL = [URL do Supabase do Matheus]
SUPABASE_KEY = [Chave do Supabase do Matheus]
```

### 4. Deploy automático
Todo push na `main` fará o deploy automaticamente na Vercel! 🚀

## Pipeline CI (GitHub Actions)
O arquivo `.github/workflows/ci.yml` garante que:
- ✅ Testes rodam a cada Pull Request
- ✅ PR só pode ser mergeado se o CI estiver verde
- ✅ Verificação de qualidade com ESLint

## Pull Request
> Branch: `feature/ci-tests-deploy`
> Descrição do PR: "CI/CD com GitHub Actions + Testes Jest + Deploy na Vercel"
