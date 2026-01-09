# 🚀 Como Publicar no GitHub Pages

Este guia vai te ajudar a publicar o StudyFlow no GitHub Pages de forma fácil!

## 📋 Pré-requisitos

1. Conta no GitHub
2. Git instalado no seu computador
3. Projeto configurado e funcionando localmente

---

## 🔧 Passo a Passo

### **Passo 1: Criar Repositório no GitHub**

1. Acesse [github.com](https://github.com)
2. Clique em **"New repository"** (ou **"+"** no canto superior direito)
3. Preencha:
   - **Repository name:** `APP_AUI` (ou o nome que preferir)
   - **Description:** "StudyFlow - Plataforma de gestão de estudos"
   - **Visibilidade:** Público (necessário para GitHub Pages gratuito)
   - ⚠️ **NÃO** marque "Initialize with README"
4. Clique em **"Create repository"**

---

### **Passo 2: Configurar o Projeto Localmente**

1. **Abra o terminal** na pasta do projeto (certifique-se de estar na raiz do projeto)

2. **Inicialize Git** (se ainda não foi feito):
   ```bash
   git init
   ```

3. **Adicione todos os arquivos:**
   ```bash
   git add .
   ```

4. **Faça o primeiro commit:**
   ```bash
   git commit -m "Initial commit - StudyFlow"
   ```

5. **Adicione o repositório remoto:**
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/APP_AUI.git
   ```
   ⚠️ **Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub!**

6. **Envie para o GitHub:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

---

### **Passo 3: Ajustar Configuração do Vite**

⚠️ **IMPORTANTE:** O arquivo `vite.config.ts` já está configurado com o base path `/APP_AUI/`.

**Se seu repositório tiver nome diferente**, edite o `vite.config.ts`:

```typescript
base: process.env.NODE_ENV === 'production' ? '/NOME_DO_SEU_REPO/' : '/',
```

**Exemplos:**
- Se o repositório se chama `studyflow`: `base: '/studyflow/'`
- Se o repositório é `username.github.io`: `base: '/'` (sem barra no final)

---

### **Passo 4: Configurar GitHub Pages (Método Automático - Recomendado)**

#### **Opção A: GitHub Actions (Automático)**

1. No GitHub, vá em **Settings** do repositório
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **"GitHub Actions"**
4. O arquivo `.github/workflows/deploy.yml` já está configurado!
5. Faça um commit e push:
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push
   ```
6. Aguarde alguns minutos e acesse: `https://SEU_USUARIO.github.io/APP_AUI/`

#### **Opção B: Branch gh-pages (Manual)**

1. **Instale o gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Faça o build:**
   ```bash
   npm run build
   ```

3. **Configure o repositório no GitHub:**
   - Vá em **Settings** → **Pages**
   - Em **Source**, selecione **"Deploy from a branch"**
   - Selecione branch: **gh-pages**
   - Folder: **/ (root)**

4. **Publique:**
   ```bash
   npm run deploy
   ```

   ⚠️ Na primeira vez, pode pedir autenticação do GitHub

---

### **Passo 5: Verificar Publicação**

1. Aguarde 2-5 minutos após o deploy
2. Acesse: `https://SEU_USUARIO.github.io/APP_AUI/`
3. Se não carregar, verifique:
   - Se o repositório é público
   - Se o nome do repositório está correto na URL
   - Se o base path no `vite.config.ts` está correto

---

## 🔧 Troubleshooting

### **Problema: Página em branco**

**Solução:**
- Verifique se o base path no `vite.config.ts` corresponde ao nome do repositório
- Certifique-se de que o build foi feito: `npm run build`
- Verifique o console do navegador (F12) para erros

### **Problema: Rotas não funcionam (404)**

**Solução:**
- Certifique-se de que está usando `BrowserRouter` com `basename` configurado
- Para GitHub Pages, considere usar `HashRouter` em vez de `BrowserRouter`

### **Problema: Assets não carregam (CSS/JS)**

**Solução:**
- Verifique se o base path está correto
- Limpe o cache do navegador (Cmd+Shift+R ou Ctrl+Shift+R)
- Verifique se todos os arquivos foram commitados

### **Problema: Build falha**

**Solução:**
```bash
# Limpe node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📝 Atualizar o Site

Após fazer alterações:

1. **Teste localmente:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Commit e push:**
   ```bash
   git add .
   git commit -m "Atualização do site"
   git push
   ```

3. **Aguarde o GitHub Actions fazer o deploy** (2-5 minutos)

---

## 🌐 Domínio Personalizado (Opcional)

Se você tiver um domínio próprio:

1. No GitHub, vá em **Settings** → **Pages**
2. Em **Custom domain**, adicione seu domínio
3. Configure o DNS no seu provedor de domínio:
   - Tipo: **CNAME**
   - Nome: `www` (ou subdomínio desejado)
   - Valor: `SEU_USUARIO.github.io`

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Código enviado para o GitHub
- [ ] Base path configurado corretamente
- [ ] GitHub Pages habilitado
- [ ] Site acessível em `https://SEU_USUARIO.github.io/APP_AUI/`
- [ ] Todas as páginas carregam corretamente
- [ ] Assets (CSS/JS) carregam corretamente

---

## 🎉 Pronto!

Seu site está online! Qualquer atualização que você fizer e enviar para o GitHub será automaticamente publicado.

**URL do site:** `https://SEU_USUARIO.github.io/APP_AUI/`

---

## 💡 Dicas

1. **Commits frequentes:** Faça commits regulares para ter histórico
2. **Mensagens descritivas:** Use mensagens de commit claras
3. **Teste antes:** Sempre teste localmente antes de fazer push
4. **Verifique o build:** Execute `npm run build` antes de publicar

Boa sorte com seu projeto! 🚀


