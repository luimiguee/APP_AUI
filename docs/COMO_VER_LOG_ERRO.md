# 🔍 Como Ver o Log de Erro do Workflow

## 📋 Passo a Passo

Na página que você está vendo (a execução que falhou):

1. **Na seção "All jobs" no lado esquerdo:**
   - Clique no job **"❌ build"** (o que tem o X vermelho)

2. **Você verá os steps do job:**
   - "Checkout"
   - "Setup Node.js"
   - "Install dependencies"
   - "Build" (provavelmente tem ❌ aqui)

3. **Clique no step que falhou:**
   - Provavelmente será o step **"Build"**
   - Clique nele para expandir

4. **Veja os logs:**
   - Você verá a saída completa do comando
   - Procure por linhas em **vermelho** ou com palavras como "Error", "Failed", "error:"
   - A última linha geralmente mostra o erro específico

5. **Copie o erro:**
   - Copie as últimas 10-20 linhas dos logs
   - Especialmente as que contêm "Error" ou mensagens de falha

## 🎯 O Que Procurar

Procure por mensagens como:

- `Error: ...`
- `npm ERR! ...`
- `error TS...` (erro do TypeScript)
- `Failed to ...`
- `Command failed ...`
- `Cannot find module ...`
- `Permission denied ...`

## 📝 Exemplo

Se você ver algo como:

```
npm ERR! ci can only install packages when your package.json and package-lock.json are in sync
```

ou

```
error TS2307: Cannot find module '...'
```

Essas são as informações que preciso para corrigir o problema!

## ✅ Depois de Identificar o Erro

1. **Envie a mensagem de erro completa** para mim
2. Eu vou corrigir o problema
3. Você faz commit e push
4. O workflow vai executar novamente e (esperamos!) passar ✅

## 💡 Dica

Se os logs forem muito longos, role até o final - o erro geralmente aparece no final dos logs!

