# ⚡ Guia Rápido — Edições Mais Comuns

Use este guia para as edições do dia a dia. Tudo que você precisa editar está em **`config.js`**.

---

## 🛒 Alterar Preço de um Card

**Arquivo:** `config.js`
**Linha:** Procure por `prices: [`

```javascript
prices: [
  {
    name: 'Experimente',
    quantity: 1,
    price: 55.00,        // ← MUDE AQUI
    pricePerUnit: '55,00'
  },
  // ...
]
```

**Exemplo:** Mudar de R$ 55,00 para R$ 60,00
```javascript
price: 60.00,
pricePerUnit: '60,00'
```

---

## 📝 Editar Título Principal

**Arquivo:** `config.js`
**Linha:** Procure por `hero: {`

```javascript
hero: {
  title: 'Granola feita do jeito certo, de verdade',  // ← MUDE AQUI
  description: '...',
}
```

---

## 📱 Mudar Número de WhatsApp

**Arquivo:** `config.js`
**Linha:** Procure por `const CONFIG = {`

```javascript
const CONFIG = {
  whatsapp: '554599646156',  // ← MUDE AQUI (seu número, sem formatação)
  region: 'M.C.R - PR',
}
```

---

## 🖼️ Trocar Imagem

### Opção 1 — Através de `config.js` (se configurado assim)

```javascript
hero: {
  heroImage: 'GVIMG/Hero Produto.jpg'  // ← MUDE PARA: 'GVIMG/nova-imagem.jpg'
}
```

### Opção 2 — Direto no HTML

**Arquivo:** `granola-de-verdade.html`
Procure por `<img src="GVIMG/...">` e mude o caminho:

```html
<!-- ANTES -->
<img src="GVIMG/Hero Produto.jpg" alt="Granola de Verdade">

<!-- DEPOIS -->
<img src="GVIMG/minha-nova-foto.jpg" alt="Descrição">
```

### Passos:
1. Copie sua imagem para a pasta `GVIMG/`
2. Mude o caminho no código (veja acima)
3. Salve e recarregue o navegador

---

## ⭐ Adicionar/Editar Depoimento

**Arquivo:** `config.js`
**Linha:** Procure por `testimonials: [`

```javascript
testimonials: [
  {
    avatar: '👩',                          // Emoji do cliente
    name: 'Ana Paula M.',                  // Nome
    meta: 'Cliente há 4 meses',            // Subtítulo
    stars: '⭐⭐⭐⭐⭐',                     // Estrelas
    text: 'Comprei os 3 pacotes...',       // Depoimento (texto longo ok)
    featured: false                        // true = card destaque (marrom)
  },
  // ... mais depoimentos
]
```

**Exemplo:** Adicionar novo depoimento
```javascript
{
  avatar: '🧑‍💼',
  name: 'João Silva',
  meta: 'Cliente novo',
  stars: '⭐⭐⭐⭐⭐',
  text: 'Adorei a qualidade. Muito bom mesmo!',
  featured: false
}
```

---

## 🏷️ Editar Badges/Emblemas

### Hero badges (topo da página)
**Arquivo:** `config.js` → `hero` → `floatBadges`

```javascript
floatBadges: [
  '✓ Sem conservantes',
  '✓ 100% Natural',
  '📦 Artesanal',
  '📦 400g/pacote'  // ← EDITE AQUI
]
```

### About pills (seção "Nossa Granola")
**Arquivo:** `config.js` → `about` → `pills`

```javascript
pills: [
  'Feita a mão',
  'Sem conservantes',
  'Sem gordura trans',
  'Castanhas selecionadas',
  '400g por pacote'  // ← EDITE AQUI
]
```

---

## 📍 Mudar Descrição de Entrega

**Arquivo:** `config.js`
**Linha:** Procure por `order: {`

```javascript
order: {
  deliveryNote: '🚚 3 pacotes ou mais: entrega gratuita em M.C.R - PR. Pedidos menores: combinamos na entrega.'  // ← MUDE AQUI
}
```

---

## 🎯 Adicionar Novo Card de Quantidade

1. Abra `config.js`
2. Procure por `prices: [`
3. Adicione um novo objeto ao final (antes do fechamento `]`):

```javascript
prices: [
  // ... 3 cards existentes ...
  {
    name: 'Super Kit',              // Nome
    icon: '🎁',                    // Emoji
    quantity: 4,                   // Número de pacotes
    grams: 1600,                   // Gramas (4 × 400)
    price: 190.00,                 // Preço total
    pricePerUnit: '47,50',         // Preço por unidade
    ribbon: '⚡ Melhor deal',       // Ribbon (fita no card)
    ribbonColor: 'green',          // 'default' ou 'green'
    isCustom: false,
    freeDelivery: true             // Entrega grátis?
  }
]
```

4. Salve. O novo card aparece automaticamente na página!

---

## 🔤 Editar Textos da Seção "Sobre"

**Arquivo:** `config.js`
**Linha:** Procure por `about: {`

```javascript
about: {
  label: 'Produção artesanal — feita com amor',        // ← Label (laranja)
  title: 'Nossa Granola',                               // ← Título
  description: 'Cada pacote é preparado com dedicação...'  // ← Parágrafo (pode ter múltiplas linhas)
}
```

**Dica:** Para quebrar linha no parágrafo, use `\n`:
```javascript
description: 'Primeira linha\nSegunda linha\nTerceira linha'
```

---

## 🎨 Mudar Cores

**Arquivo:** `styles.css`
**Procure por:** `:root {`

```css
:root {
  --primary: #7C4A1E;      /* Marrom (botões, títulos) */
  --bg: #F9F5EF;           /* Fundo creme */
  --accent: #C8833A;       /* Laranja (labels) */
  --green: #4A7A42;        /* Verde (natural, grátis) */
  --wa: #25D366;           /* Verde WhatsApp */
}
```

**Exemplo:** Mudar marrom principal para verde-escuro
```css
--primary: #2D5016;
```

Todas as cores da página atualizam automaticamente!

---

## 🧮 Checklist de Edições Básicas

- [ ] Número de WhatsApp atualizado
- [ ] Preços dos 4 cards corretos
- [ ] Imagens nas pastas (não base64)
- [ ] Descrição do produto está correta
- [ ] Depoimentos têm dados reais
- [ ] Região de entrega correta (M.C.R - PR)
- [ ] Recarreguei o navegador após edições

---

## 🆘 Se Algo Quebrar

### A página não carrega
- Verifique se abriu com **Live Server** (não duplo clique)
- Verifique console (F12) para erros

### Preços não atualizam
- Verifique a sintaxe em `config.js` (virgulas, aspas)
- Recarregue a página (Ctrl+R)

### Imagens não aparecem
- Verifique se o caminho em `config.js` está correto
- Verifique se o arquivo existe em `GVIMG/`
- Use sempre `/` (não `\`) nos caminhos

### WhatsApp não abre
- Verifique se o número está sem caracteres especiais
- Teste: https://wa.me/554599646156?text=Olá

---

**Dúvida?** Releia o README.md para informações completas.
