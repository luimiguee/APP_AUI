# 🔍 Como Verificar Erros no Workflow do GitHub Actions

## 🚨 Problema Identificado

Na aba Actions, vejo que o workflow **"Deploy to GitHub Pages"** está **falhando** (❌).

Isso significa que mesmo que você mude para "GitHub Actions" nas configurações, o workflow não vai funcionar até corrigirmos os erros.

## 📋 Passo a Passo para Ver o Erro

1. **Na aba Actions do GitHub:**
   - Clique no workflow **"Deploy to GitHub Pages"** (o que tem o ❌ vermelho)

2. **Clique na execução que falhou:**
   - Clique na execução mais recente (a que mostra ❌)

3. **Veja os logs:**
   - Você verá os steps do workflow
   - Clique no step que tem ❌ (geralmente será "Build" ou "Deploy")
   - Veja os logs para identificar o erro

4. **Anote o erro:**
   - Copie a mensagem de erro que aparece
   - Envie para eu verificar

## 🔧 Erros Comuns e Soluções

### Erro 1: "npm ci failed"

**Sintoma:**
```
npm ERR! ci can only install packages when your package.json and package-lock.json are in sync
```

**Solução:**
```bash
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Erro 2: "Build failed"

**Sintoma:**
```
error TS2307: Cannot find module '...'
```

**Solução:**
- Verifique se há erros de TypeScript
- Execute localmente: `npm run build`
- Corrija os erros antes de fazer push

### Erro 3: "Permission denied"

**Sintoma:**
```
Error: Resource not accessible by integration
```

**Solução:**
- Verifique se as permissões do workflow estão corretas
- O workflow já tem as permissões necessárias configuradas

### Erro 4: "path './dist' does not exist"

**Sintoma:**
```
Error: path './dist' does not exist
```

**Solução:**
- O build falhou, então não criou a pasta `dist`
- Verifique os logs do step "Build" para ver o erro

## ✅ Checklist

- [ ] Acessei a aba Actions
- [ ] Cliquei no workflow "Deploy to GitHub Pages"
- [ ] Cliquei na execução que falhou (❌)
- [ ] Identifiquei qual step falhou
- [ ] Li os logs do erro
- [ ] Anotei a mensagem de erro

## 📝 Próximos Passos

Após identificar o erro:

1. **Envie a mensagem de erro completa** para que eu possa ajudar a corrigir
2. **Ou tente as soluções acima** se for um erro comum
3. **Depois de corrigir:**
   - Faça commit e push
   - O workflow vai executar automaticamente
   - Verifique se agora passa (✅)

## 🎯 Objetivo

O workflow precisa passar (✅ verde) para que o GitHub Pages use o build correto do `dist/` em vez do `index.html` da raiz.

