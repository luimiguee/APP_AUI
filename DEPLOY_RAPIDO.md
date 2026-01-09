# ⚡ Deploy Rápido - GitHub Pages

## 🚀 Passos Rápidos (5 minutos)

### 1️⃣ Criar Repositório no GitHub
1. Vá em [github.com/new](https://github.com/new)
2. Nome: `APP_AUI` (ou outro nome)
3. Público ✅
4. **NÃO** marque "Initialize with README"
5. Clique em "Create repository"

### 2️⃣ Subir o Código
```bash
cd /Users/miguelpato/APP_AUI
git init
git add .
git commit -m "Initial commit - StudyFlow"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/APP_AUI.git
git push -u origin main
```
⚠️ **Substitua `SEU_USUARIO` pelo seu username do GitHub!**

### 3️⃣ Ajustar o Base Path (Se Necessário)

**Se o repositório se chama `APP_AUI`:**
- Já está configurado! ✅

**Se o repositório tem outro nome:**
Edite `vite.config.ts` linha 8:
```typescript
base: process.env.NODE_ENV === 'production' ? '/NOME_DO_SEU_REPO/' : '/',
```

E edite `src/App.tsx` linha 29:
```typescript
const basename = '/NOME_DO_SEU_REPO';
```

### 4️⃣ Configurar GitHub Pages

**Opção A - Automático (Recomendado):**
1. No GitHub: Settings → Pages
2. Source: **GitHub Actions**
3. O deploy acontecerá automaticamente! ✅

**Opção B - Manual:**
1. No GitHub: Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `main` ou `gh-pages`
4. Folder: `/root`
5. Salve

### 5️⃣ Aguardar e Acessar
1. Aguarde 2-5 minutos
2. Acesse: `https://SEU_USUARIO.github.io/APP_AUI/`
3. Pronto! 🎉

---

## 🔄 Atualizar o Site

Depois de fazer alterações:
```bash
git add .
git commit -m "Atualização"
git push
```

O GitHub Actions fará o deploy automaticamente!

---

## ❓ Problemas?

**Página em branco?**
- Verifique se o nome do repositório no `vite.config.ts` e `App.tsx` está correto
- Verifique se o repositório é público

**Rotas não funcionam?**
- Verifique se o `basename` no `App.tsx` está correto
- Deve ser igual ao nome do repositório

**Assets não carregam?**
- Limpe o cache do navegador (Cmd+Shift+R)
- Verifique se o build foi feito: `npm run build`

---

## ✅ Checklist

- [ ] Repositório criado no GitHub
- [ ] Código enviado (git push)
- [ ] Base path configurado corretamente
- [ ] GitHub Pages habilitado
- [ ] Site funcionando em `https://SEU_USUARIO.github.io/APP_AUI/`

---

**URL Final:** `https://SEU_USUARIO.github.io/APP_AUI/`

Troque `SEU_USUARIO` pelo seu username do GitHub! 🚀


