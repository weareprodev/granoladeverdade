# 🎯 Primeiro Acesso — Passo a Passo

Bem-vindo! Siga este guia para conhecer e testar seu novo projeto.

---

## 1️⃣ Abrir a Página

### Método Recomendado: Live Server (VS Code)

```bash
1. Abra VS Code
2. Instale a extensão "Live Server" (procure na aba Extensions)
3. Abra a pasta granolaHTMLPRO em VS Code (File → Open Folder)
4. Clique com botão direito em granola-de-verdade.html
5. Escolha "Open with Live Server"
6. A página abre em http://localhost:5500
```

### Método Alternativo: Duplo clique

```bash
1. Windows Explorer
2. Navegue para c:\Users\Avell\Documents\granolaHTMLPRO\
3. Duplo clique em granola-de-verdade.html
4. Abre no seu navegador padrão
```

---

## 2️⃣ Explorar a Página

Abra `granola-de-verdade.html` e clique em:

- ✅ **Logo** (canto superior esquerdo) — volta para home
- ✅ **"Fazer pedido"** (botão topo) — vai para página de pedido
- ✅ **Hero badges** — elementos flutuantes com badges
- ✅ **"Conhecer a granola"** — scroll suave até seção sobre
- ✅ **Depoimentos** — card central em destaque (marrom)
- ✅ **Cards de quantidade** — clique em um para ver resumo
- ✅ **WhatsApp** — botão flutuante no canto inferior direito

---

## 3️⃣ Testar Funcionalidades

### A. Selecionar quantidade
```
1. Clique em "Fazer pedido" (topo)
2. Clique em um dos 4 cards de quantidade
3. Veja o resumo do pedido aparecer embaixo
4. Total deve atualizar com o preço correto
```

### B. Abrir WhatsApp
```
1. Clique em "Fazer meu pedido pelo WhatsApp"
2. Deve abrir WhatsApp (web ou app) com mensagem pré-preenchida
3. Verifique se o número está correto: 554599646156
```

### C. Testar No Celular
```
1. No PC: descubra seu IP local (ipconfig no CMD)
2. No celular: navegue para http://[seu-ip]:5500
3. Teste os botões no celular
4. Verifique responsividade (layout adapta?)
```

---

## 4️⃣ Fazer Primeira Edição

### Editar Preço (teste sua primeira edição!)

1. Abra `config.js` no editor de texto
2. Procure por `prices: [` (linha ~140)
3. Encontre a linha `price: 55.00,` (card "Experimente")
4. Mude para `price: 60.00,`
5. Salve (Ctrl+S)
6. Volta ao navegador com a página aberta
7. **A página recarrega automaticamente** (se estiver com Live Server)
8. Veja o novo preço: R$ 60,00

---

## 5️⃣ Checklist de Testes

Teste cada funcionalidade:

### Página Home
- [ ] Logo clicável
- [ ] Botão "Fazer pedido" funciona
- [ ] Ingredientes rolam continuamente
- [ ] Hero image aparece
- [ ] Depoimentos renderizam (3 cards)
- [ ] Botão "Escolher meu pacote" funciona

### Página de Pedido
- [ ] Product strip mostra imagem
- [ ] 4 cards de quantidade aparecem
- [ ] Ao clicar em um card, ele fica destacado
- [ ] Resumo do pedido aparece
- [ ] Entrega grátis mostra em verde para 3 pacotes
- [ ] Botão "Fazer pedido pelo WhatsApp" funciona

### Responsividade
- [ ] Abra DevTools (F12)
- [ ] Clique no ícone de celular (Toggle device toolbar)
- [ ] Teste em iPhone (375px), iPad (768px) e Desktop (1200px)
- [ ] Layout adapta corretamente?

### WhatsApp
- [ ] Clique em "Fazer pedido" na navbar
- [ ] Selecione uma quantidade
- [ ] Clique em "Fazer meu pedido pelo WhatsApp"
- [ ] Abre WhatsApp com mensagem pré-preenchida
- [ ] Mensagem tem: produto, quantidade, peso, entrega, total

---

## 6️⃣ Próximas Edições Recomendadas

1. **Seu número de WhatsApp**
   - Abra `config.js`
   - Procure por `whatsapp: '554599646156'`
   - Mude para seu número

2. **Sua região de entrega**
   - Procure por `region: 'M.C.R - PR'`
   - Mude para sua cidade/região

3. **Seus preços**
   - Procure por `prices: [`
   - Atualize todos os valores

4. **Suas fotos**
   - Copie suas imagens para `GVIMG/`
   - Atualize os caminhos em `config.js`

---

## 7️⃣ Dúvidas Frequentes Nesta Fase

### P: A página não carrega com live server?
**R:** Certifique-se que a extensão está instalada e ativa. Veja a barra vermelha no canto inferior direito do VS Code.

### P: Ao editar config.js, a página não atualiza?
**R:** Live Server recarrega automaticamente, mas às vezes demora. Atualize manualmente (F5) ou reinicie o servidor.

### P: WhatsApp não abre?
**R:** Pode estar bloqueado pelo navegador. Tente abrir em outra aba. Ou abra WhatsApp manualmente e envie a mensagem.

### P: Onde editei está quebrado?
**R:** Verifique:
- Não delele aspas ou chaves
- Não quebre estrutura do JSON
- Se fez mudanças suspeitas, abra `config.js` em um editor de texto com realce de sintaxe

### P: Como desfaço uma edição?
**R:** Se usou VS Code, Ctrl+Z desfaz. Se deletou arquivo, procure na lixeira.

---

## 📚 Próximos Passos

1. Leia **README.md** para entender toda a estrutura
2. Leia **GUIA_RAPIDO.md** para edições do dia a dia
3. Customize com suas cores, imagens e textos
4. Teste tudo antes de compartilhar o link

---

## 🎓 Estrutura Aprendida

Agora você entende:

- ✅ Como funciona uma página HTML profissional
- ✅ Como separar dados (config.js), estilos (CSS) e lógica (JS)
- ✅ Como editar sem quebrar nada
- ✅ Como testar funcionalidades básicas
- ✅ Como fazer a página responsiva

---

## 📞 Suporte Rápido

Se algo não funcionar:

1. **Recarregue a página:** F5
2. **Limpe cache:** Ctrl+Shift+Delete
3. **Verifique console:** F12 → Console → veja mensagens de erro
4. **Releia README.md** para troubleshooting mais detalhado

---

**Pronto para começar? Abra a página e explore! 🥣**
