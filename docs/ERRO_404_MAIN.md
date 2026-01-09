# ❌ Erro: Failed to load resource: src/main.tsx:1 404

## 🔍 Diagnóstico

Se você está vendo este erro:
```
src/main.tsx:1  Failed to load resource: the server responded with a status of 404 ()
```

**Isso significa que:** O GitHub Pages está servindo o `index.html` da raiz do repositório (desenvolvimento) em vez do `dist/index.html` (produção).

### Por que isso acontece?

O `index.html` na raiz tem:
```html
<script type="module" src="/src/main.tsx"></script>
```

Este é o arquivo de **desenvolvimento** usado pelo Vite dev server. O arquivo de **produção** (em `dist/index.html`) tem:
```html
<script type="module" crossorigin src="/APP_AUI/assets/index-XXXXX.js"></script>
<link rel="stylesheet" crossorigin href="/APP_AUI/assets/index-XXXXX.css">
```

## ✅ Soluções

### Solução 1: Verificar Configuração do GitHub Pages

**IMPORTANTE:** O GitHub Pages deve estar configurado para usar **GitHub Actions**, NÃO a branch `main` diretamente.

1. Vá para o repositório no GitHub
2. **Settings** → **Pages**
3. Em **Source**, verifique:
   - ✅ Deve estar selecionado: **"GitHub Actions"**
   - ❌ NÃO deve estar: **"Deploy from a branch"**

Se estiver usando "Deploy from a branch", mude para "GitHub Actions".

### Solução 2: Verificar se o Workflow Está Funcionando

1. Vá para a aba **"Actions"** no seu repositório
2. Verifique se há um workflow rodando ou completado recentemente
3. Se houver erro, clique nele para ver os detalhes

### Solução 3: Fazer Novo Deploy

1. Force um novo deploy:
   ```bash
   git commit --allow-empty -m "Trigger GitHub Pages deploy"
   git push
   ```

2. Ou vá em **Actions** → **Deploy to GitHub Pages** → **Run workflow**

### Solução 4: Verificar se o Build Foi Feito Corretamente

O arquivo `dist/index.html` deve conter:
```html
<script type="module" crossorigin src="/APP_AUI/assets/index-XXXXX.js"></script>
```

**NÃO** deve conter:
```html
<script type="module" src="/src/main.tsx"></script>
```

## 🔧 Verificação Rápida

### No Console do Navegador (F12):

1. **Console Tab:**
   - Se você vê erro sobre `src/main.tsx` → GitHub Pages está servindo o HTML errado
   - Se você vê erros sobre `/APP_AUI/assets/...` → Base path pode estar incorreto

2. **Network Tab:**
   - Recarregue a página (F5)
   - Veja qual `index.html` está sendo carregado
   - Se for `index.html` (sem path) → Está servindo da raiz (ERRADO)
   - Se for `/APP_AUI/index.html` → Está correto

3. **Ver código-fonte da página:**
   - Botão direito → "Ver código-fonte da página"
   - Procure pela linha: `<script type="module"`
   - Se encontrar `src="/src/main.tsx"` → HTML errado (desenvolvimento)
   - Se encontrar `src="/APP_AUI/assets/index-XXXXX.js"` → HTML correto (produção)

## 📝 Checklist

- [ ] GitHub Pages está configurado para usar **"GitHub Actions"**
- [ ] Workflow do GitHub Actions completou com sucesso
- [ ] Build foi feito (`npm run build`)
- [ ] O arquivo `dist/index.html` tem os assets corretos
- [ ] Fiz commit e push das alterações
- [ ] Aguardei 2-5 minutos após o deploy

## 🚨 Se Nada Funcionar

1. **Verifique o histórico do GitHub Actions:**
   - Vá em Actions → clique no último workflow
   - Veja os logs do step "Upload artifact"
   - Verifique se há erros

2. **Teste o build localmente:**
   ```bash
   npm run build
   npm run preview
   ```
   - Se funcionar localmente, o problema é no deploy
   - Se não funcionar, o problema é no build

3. **Verifique a URL:**
   - Certifique-se de que está acessando: `https://SEU_USUARIO.github.io/APP_AUI/`
   - NÃO: `https://SEU_USUARIO.github.io/` (sem o nome do repositório)

4. **Limpe o cache:**
   - Limpe o cache do navegador (Cmd+Shift+R ou Ctrl+Shift+R)
   - Tente em modo anônimo/privado

## 💡 Resumo

O erro `src/main.tsx:1 404` acontece porque o GitHub Pages está servindo o HTML de desenvolvimento da raiz em vez do HTML de produção do `dist/`. Isso geralmente significa que:

1. GitHub Pages não está configurado para usar GitHub Actions, OU
2. O workflow do GitHub Actions não completou ou falhou, OU
3. O deploy ainda não foi feito

**Solução mais comum:** Configure o GitHub Pages para usar "GitHub Actions" nas Settings → Pages → Source.

