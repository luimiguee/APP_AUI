# 🚀 Como Forçar Deploy no GitHub Pages

Se o site ainda está mostrando o HTML de desenvolvimento (`src="/src/main.tsx"`), você precisa forçar um novo deploy.

## Opção 1: Disparar o Workflow Manualmente

1. No GitHub, vá para a aba **"Actions"** do repositório
2. No menu lateral, clique em **"Deploy to GitHub Pages"**
3. Clique no botão **"Run workflow"** (no lado direito)
4. Deixe tudo como está e clique em **"Run workflow"** novamente
5. Aguarde 2-5 minutos para o workflow completar

## Opção 2: Fazer um Commit Vazio

Execute no terminal:

```bash
cd /Users/miguelpato/Documents/APP_AUI
git commit --allow-empty -m "Trigger GitHub Pages deploy"
git push
```

Isso vai disparar o workflow automaticamente.

## Opção 3: Verificar e Corrigir a Configuração

Se o GitHub Pages ainda estiver em "Deploy from a branch":

1. Vá para **Settings** → **Pages**
2. Na seção "Build and deployment"
3. Se aparecer "Deploy from a branch", mude para **"GitHub Actions"**
4. Não precisa salvar - a mudança é automática
5. Aguarde alguns minutos

## ✅ Como Verificar se Funcionou

1. Aguarde 2-5 minutos após disparar o workflow
2. Acesse: `https://luimiguee.github.io/APP_AUI/`
3. Botão direito → "Ver código-fonte da página"
4. Procure por: `<script type="module"`
5. **DEVE aparecer:** `src="/APP_AUI/assets/index-XXXXX.js"` ✅
6. **NÃO deve aparecer:** `src="/src/main.tsx"` ❌

## 🔍 Verificar o Status do Workflow

1. Vá para **Actions**
2. Clique no workflow "Deploy to GitHub Pages" mais recente
3. Verifique se todos os steps estão verdes (✅)
4. Se houver erro (❌), clique nele para ver os detalhes


