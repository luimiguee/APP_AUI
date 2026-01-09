# 🔄 Comandos para Reiniciar o Projeto

## ⚡ Reiniciar Servidor de Desenvolvimento

### **Parar o servidor:**
```bash
# Pressione Ctrl + C no terminal onde o servidor está rodando
```

### **Iniciar novamente:**
```bash
cd /Users/miguelpato/APP_AUI
npm run dev
```

---

## 🧹 Limpeza Completa (Se houver problemas)

### **1. Parar todos os processos:**
```bash
# Pressione Ctrl + C para parar o servidor
# Ou feche o terminal
```

### **2. Limpar cache e reinstalar:**
```bash
cd /Users/miguelpato/APP_AUI

# Remover node_modules e lock files
rm -rf node_modules package-lock.json

# Reinstalar dependências
npm install

# Iniciar servidor
npm run dev
```

---

## 🔨 Reiniciar com Build Limpo

### **Limpar build anterior e reconstruir:**
```bash
cd /Users/miguelpato/APP_AUI

# Remover pasta dist (build anterior)
rm -rf dist

# Fazer novo build
npm run build

# Preview do build
npm run preview
```

---

## 🚀 Comandos Rápidos

### **Iniciar servidor de desenvolvimento:**
```bash
npm run dev
```

### **Parar servidor:**
```
Ctrl + C
```

### **Reiniciar servidor (rápido):**
```bash
# 1. Pressione Ctrl + C
# 2. Execute:
npm run dev
```

---

## 🐛 Se o servidor não iniciar

### **Verificar porta ocupada:**
```bash
# Verificar se a porta 5173 está em uso
lsof -ti:5173

# Matar processo na porta 5173 (se necessário)
kill -9 $(lsof -ti:5173)

# Depois reinicie
npm run dev
```

### **Usar porta diferente:**
```bash
npm run dev -- --port 3000
```

---

## 📋 Checklist de Reinício

1. ✅ Parar servidor atual (Ctrl + C)
2. ✅ Limpar cache (se necessário): `rm -rf node_modules && npm install`
3. ✅ Iniciar servidor: `npm run dev`
4. ✅ Acessar: http://localhost:5173

---

## 💡 Dicas

- **Problemas de cache?** Limpe o cache do navegador (Cmd+Shift+R ou Ctrl+Shift+R)
- **Erros de dependências?** Execute `rm -rf node_modules && npm install`
- **Porta ocupada?** Use `npm run dev -- --port 3000` para usar outra porta
- **Build quebrado?** Execute `rm -rf dist && npm run build`

---

## 🎯 Comando Mais Comum

```bash
# Simplesmente:
npm run dev
```

O servidor iniciará em: **http://localhost:5173**

