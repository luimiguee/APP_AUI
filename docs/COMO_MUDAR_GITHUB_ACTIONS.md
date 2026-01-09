# 🔧 Como Mudar GitHub Pages para GitHub Actions

## ❌ Problema Atual

O GitHub Pages está configurado para **"Deploy from a branch"**, o que faz com que:
- Serva o `index.html` da raiz do repositório (desenvolvimento)
- **NÃO** serve o build de produção do `dist/`
- Resultado: Página em branco com erro `src/main.tsx:1 404`

## ✅ Solução: Mudar para GitHub Actions

### Passo a Passo:

1. **No GitHub, vá para o repositório:**
   - Acesse: `https://github.com/luimiguee/APP_AUI`

2. **Acesse Settings:**
   - Clique na aba **"Settings"** no topo do repositório

3. **Vá para Pages:**
   - No menu lateral esquerdo, clique em **"Pages"** (em "Code and automation")

4. **Altere a Source:**
   - Na seção **"Build and deployment"**
   - Encontre o dropdown **"Source"**
   - Atualmente está: **"Deploy from a branch"**
   - **Mude para:** **"GitHub Actions"**
   - ⚠️ **NÃO** precisa clicar em "Save" - a mudança é automática

5. **Aguarde o Deploy:**
   - Após mudar, o GitHub Actions vai executar automaticamente
   - Vá para a aba **"Actions"** para ver o workflow rodando
   - Aguarde 2-5 minutos

6. **Verifique:**
   - Acesse: `https://luimiguee.github.io/APP_AUI/`
   - A página deve carregar corretamente agora!

## 📸 Visual da Mudança

**ANTES (Errado):**
```
Source: [Deploy from a branch ▼]
Branch: [main ▼] [/ (root) ▼] [Save]
```

**DEPOIS (Correto):**
```
Source: [GitHub Actions ▼]
(Workflow automático será usado)
```

## ✅ O Que Acontece Depois

Quando você muda para "GitHub Actions":
1. O workflow `.github/workflows/deploy.yml` será executado
2. Fará o build de produção (`npm run build`)
3. Fazer upload do conteúdo da pasta `dist/` (build de produção)
4. Fazer deploy automaticamente no GitHub Pages
5. O site passará a servir o `dist/index.html` correto com os assets compilados

## 🔍 Verificação

Depois de mudar e aguardar o deploy:

1. **Abra o site:** `https://luimiguee.github.io/APP_AUI/`
2. **Ver código-fonte** (botão direito → "Ver código-fonte da página")
3. **Procure por:** `<script type="module"`
4. **Deve aparecer:**
   ```html
   <script type="module" crossorigin src="/APP_AUI/assets/index-XXXXX.js"></script>
   ```
5. **NÃO deve aparecer:**
   ```html
   <script type="module" src="/src/main.tsx"></script>
   ```

Se aparecer o primeiro (com `/APP_AUI/assets/`), está correto! ✅

## 🚨 Se Ainda Não Funcionar

1. **Verifique o workflow:**
   - Vá para **Actions** → Veja se há um workflow "Deploy to GitHub Pages" rodando
   - Se houver erro, clique nele para ver os detalhes

2. **Force um novo deploy:**
   - Vá para **Actions** → "Deploy to GitHub Pages" → "Run workflow"

3. **Aguarde mais tempo:**
   - Às vezes pode demorar 5-10 minutos para propagar

## 📝 Notas Importantes

- ⚠️ **Não precisa** fazer nada na branch ou pasta `/ (root)` após mudar
- ⚠️ **Não precisa** clicar em "Save" após selecionar "GitHub Actions"
- ✅ O workflow **já está configurado** no arquivo `.github/workflows/deploy.yml`
- ✅ O GitHub Actions vai fazer tudo automaticamente após a mudança

## 🎉 Resumo

**Antes:** Deploy from a branch → Serve `index.html` da raiz (errado)  
**Depois:** GitHub Actions → Serve `dist/index.html` do build (correto)

Mude a Source de "Deploy from a branch" para "GitHub Actions" e o problema será resolvido!

