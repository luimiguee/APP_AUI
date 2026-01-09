# 🚀 Guia Completo: Hospedar no GitHub Pages (github.io)

Este guia vai te ensinar passo a passo como hospedar sua aplicação StudyFlow no GitHub Pages de forma gratuita!

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ Conta no GitHub (gratuita)
- ✅ Git instalado no seu computador
- ✅ Projeto funcionando localmente (`npm run dev` funciona)
- ✅ Node.js instalado (versão 16 ou superior)

---

## 🎯 Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha os dados:
   - **Repository name:** `APP_AUI` (ou outro nome de sua escolha)
   - **Description:** "StudyFlow - Plataforma de gestão de estudos"
   - **Visibilidade:** ⚠️ **Público** (obrigatório para GitHub Pages gratuito)
   - ⚠️ **NÃO marque** "Add a README file", "Add .gitignore" ou "Choose a license"
5. Clique em **"Create repository"**

📝 **Anote o nome do repositório!** Você vai precisar dele nos próximos passos.

---

## 🔧 Passo 2: Preparar o Projeto Localmente

### 2.1 Navegar até a pasta do projeto

Abra o terminal na pasta raiz do projeto (certifique-se de estar na pasta onde está o `package.json`).

### 2.2 Verificar se Git está inicializado

```bash
git status
```

Se der erro, inicialize o Git:

```bash
git init
```

### 2.3 Verificar e ajustar o nome do repositório

⚠️ **IMPORTANTE:** Verifique se o nome do repositório que você criou no GitHub corresponde ao que está configurado no código.

**Verifique `vite.config.ts` (linha 11):**
```typescript
base: process.env.NODE_ENV === 'production' ? '/APP_AUI/' : '/',
```

**Verifique `src/App.tsx` (linha 31):**
```typescript
const basename = import.meta.env.MODE === 'production' ? '/APP_AUI' : '';
```

🔧 **Se o nome do seu repositório for diferente de `APP_AUI`**, você precisa alterar esses arquivos:

**Exemplo:** Se seu repositório se chama `studyflow`:
- No `vite.config.ts`: `base: process.env.NODE_ENV === 'production' ? '/studyflow/' : '/',`
- No `src/App.tsx`: `const basename = import.meta.env.MODE === 'production' ? '/studyflow' : '';`

**Exemplo:** Se seu repositório se chama `username.github.io` (repositório especial):
- No `vite.config.ts`: `base: '/',`
- No `src/App.tsx`: `const basename = '';`

### 2.4 Adicionar arquivos ao Git

```bash
git add .
```

### 2.5 Fazer o primeiro commit

```bash
git commit -m "Initial commit - StudyFlow"
```

Se for a primeira vez usando Git, configure seu nome e email:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

---

## 📤 Passo 3: Conectar com o GitHub

### 3.1 Adicionar o repositório remoto

⚠️ **Substitua `SEU_USUARIO` pelo seu username do GitHub!**

```bash
git remote add origin https://github.com/SEU_USUARIO/APP_AUI.git
```

**Exemplo:**
```bash
git remote add origin https://github.com/miguelpato/APP_AUI.git
```

### 3.2 Definir branch principal

```bash
git branch -M main
```

### 3.3 Enviar código para o GitHub

```bash
git push -u origin main
```

⚠️ **Se pedir autenticação:**
- Use seu **username** do GitHub
- Use um **Personal Access Token** (não sua senha)
- Para criar um token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token

---

## ⚙️ Passo 4: Configurar Deploy Automático (GitHub Actions)

### 4.1 Criar o workflow do GitHub Actions

Crie a pasta e o arquivo necessários:

```bash
mkdir -p .github/workflows
```

Agora crie o arquivo de workflow:

**Crie o arquivo:** `.github/workflows/deploy.yml`

Cole o seguinte conteúdo:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4.2 Fazer commit do workflow

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow for deployment"
git push
```

---

## 🌐 Passo 5: Ativar GitHub Pages

1. No GitHub, vá para o seu repositório
2. Clique em **"Settings"** (Configurações)
3. No menu lateral, clique em **"Pages"**
4. Em **"Source"**, selecione **"GitHub Actions"**
5. ⚠️ **NÃO precisa selecionar branch nem pasta**
6. O GitHub Actions vai fazer tudo automaticamente!

---

## ⏳ Passo 6: Aguardar o Deploy

1. Aguarde 2-5 minutos
2. Vá para a aba **"Actions"** no seu repositório do GitHub
3. Você verá o workflow rodando
4. Quando aparecer um ✅ verde, o deploy está completo!

---

## 🎉 Passo 7: Acessar seu Site!

Seu site estará disponível em:

**URL:** `https://SEU_USUARIO.github.io/APP_AUI/`

⚠️ **Substitua `SEU_USUARIO` pelo seu username do GitHub!**

**Exemplo:**
- Username: `miguelpato`
- URL: `https://miguelpato.github.io/APP_AUI/`

---

## 🔄 Como Atualizar o Site

Sempre que você fizer alterações no código:

1. **Teste localmente:**
   ```bash
   npm run dev
   ```

2. **Teste o build:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Faça commit e push:**
   ```bash
   git add .
   git commit -m "Descrição das alterações"
   git push
   ```

4. **Aguarde 2-5 minutos** - O GitHub Actions fará o deploy automaticamente!

---

## ❓ Resolução de Problemas

### ❌ Problema: Página em branco

**Solução:**
1. Verifique se o nome do repositório está correto em `vite.config.ts` e `src/App.tsx`
2. Verifique se o repositório é **público**
3. Limpe o cache do navegador: `Cmd+Shift+R` (Mac) ou `Ctrl+Shift+R` (Windows)
4. Verifique o console do navegador (F12) para erros

### ❌ Problema: Rotas não funcionam (404)

**Solução:**
- Certifique-se de que o `basename` no `src/App.tsx` corresponde ao nome do repositório
- Verifique se está usando a URL completa: `https://SEU_USUARIO.github.io/APP_AUI/`

### ❌ Problema: Assets não carregam (CSS/JS não aparecem)

**Solução:**
1. Verifique se o base path está correto no `vite.config.ts`
2. Limpe o cache do navegador
3. Verifique se o build foi feito corretamente no GitHub Actions

### ❌ Problema: Build falha no GitHub Actions

**Solução:**
1. Vá na aba **"Actions"** do seu repositório
2. Clique no workflow que falhou
3. Veja os logs para identificar o erro
4. Comum: faltam dependências no `package.json` ou erros de TypeScript

### ❌ Problema: Git push pede senha

**Solução:**
Use um Personal Access Token em vez da senha:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Marque a opção `repo`
4. Copie o token e use como senha

---

## ✅ Checklist Final

Use esta checklist para garantir que tudo está configurado:

- [ ] Repositório criado no GitHub (público)
- [ ] Git inicializado localmente
- [ ] Nome do repositório corresponde ao `basename` em `App.tsx` e `vite.config.ts`
- [ ] Código enviado para o GitHub (`git push`)
- [ ] Workflow `.github/workflows/deploy.yml` criado
- [ ] GitHub Pages ativado com "GitHub Actions"
- [ ] Deploy concluído com sucesso (ver na aba Actions)
- [ ] Site acessível em `https://SEU_USUARIO.github.io/APP_AUI/`
- [ ] Todas as páginas carregam corretamente
- [ ] CSS e JavaScript carregam corretamente

---

## 🎯 URL Final do Site

Seu site estará disponível em:

```
https://SEU_USUARIO.github.io/APP_AUI/
```

⚠️ **Lembre-se:**
- Substitua `SEU_USUARIO` pelo seu username do GitHub
- Substitua `APP_AUI` pelo nome do seu repositório (se for diferente)

---

## 💡 Dicas Importantes

1. **O site só é atualizado após você fazer `git push`**
2. **Pode demorar 2-5 minutos para o deploy ser concluído**
3. **Sempre teste localmente antes de fazer push** (`npm run build && npm run preview`)
4. **O repositório precisa ser público** para GitHub Pages gratuito
5. **Commits frequentes** ajudam a identificar problemas

---

## 🎉 Pronto!

Seu site StudyFlow está agora hospedado gratuitamente no GitHub Pages!

Qualquer atualização que você fizer e enviar para o GitHub será automaticamente publicada.

**Boa sorte com seu projeto! 🚀**

---

## 📞 Precisa de Ajuda?

Se tiver problemas:
1. Verifique os logs no GitHub Actions (aba "Actions")
2. Verifique o console do navegador (F12)
3. Certifique-se de que seguiu todos os passos do guia

