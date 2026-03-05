# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão Geral

Landing page estática de e-commerce para venda de granola artesanal via WhatsApp. Projeto vanilla HTML/CSS/JS — sem framework, sem build tool, sem dependências npm no frontend.

## Como Rodar

Servidor de desenvolvimento configurado em `.claude/launch.json`:

```bash
npx serve -p 5500 .
```

Acesse `http://localhost:5500/granola-de-verdade.html`. Não há processo de build, testes automatizados ou linting configurados.

## Arquitetura

O projeto funciona como uma SPA simples com duas "páginas" exibidas/ocultadas via classe CSS `.active`:

- **`page-home`** — hero, ingredientes, stats, sobre, depoimentos e CTA
- **`page-pedido`** — seleção de quantidade, resumo do pedido e integração WhatsApp

Navegação controlada por `goHome()` e `goPedido()` em `app.js`.

### Separação de responsabilidades

| Arquivo | Responsabilidade |
|---------|-----------------|
| `granola-de-verdade.html` | Estrutura HTML (sem dados hardcoded) |
| `config.js` | **Única fonte de verdade** — todos os textos, preços, número WA, caminhos de imagem |
| `app.js` | Render de todo conteúdo a partir do CONFIG, navegação SPA, pedidos WA, fade-in |
| `styles.css` | Design system com CSS custom properties em `:root` (valores default) |
| `GVIMG/` | Assets de imagem (referenciados por caminho relativo em `config.js`) |

### Objeto CONFIG (config.js)

Todas as edições de conteúdo são feitas no objeto `CONFIG`. Seções completas:

| Chave | Conteúdo |
|-------|----------|
| `site` | `title`, `metaDescription` |
| `theme.cssVars` | Tokens CSS injetados no `:root` em runtime (sobrepõe `styles.css`) |
| `whatsapp` | Número sem formatação (`554599646156`) |
| `region` | Texto de região exibido na página de pedido |
| `nav` | `ctaText` do botão da navbar |
| `hero` | Textos, imagem, badges, botões, highlight |
| `ingredients` | Array de strings para faixa de scroll infinito |
| `stats` | Array `{value, label}` para a grid de estatísticas |
| `about` | Label, título, descrição, imagem, pills |
| `testimonialsSection` | Cabeçalho da seção e trust bar do hero |
| `testimonials` | Array de depoimentos (`featured: true` = card marrom) |
| `cta` | Bloco CTA antes do footer |
| `prices` | Array de cards de quantidade (`isCustom: true` = card "Consultar") |
| `orderHero` | Hero da página de pedido (label, título, descrição) |
| `orderProduct` | Produto na página de pedido (imagem, nome, badges) |
| `orderSummary` | Labels e textos do resumo do pedido |
| `orderQtyLabel` | Label acima dos cards de quantidade |
| `orderDeliveryNote` | Nota de entrega abaixo dos cards |
| `orderEmptyState` | Texto exibido antes de selecionar quantidade |
| `whatsappMessages` | Templates de mensagem para `checkout` e `customOrder` |
| `footer` | Logo, texto e helpText do botão WA flutuante |

### Sequência de inicialização (app.js — DOMContentLoaded)

`applyTheme()` → `renderSiteMeta()` → `renderBranding()` → `renderHero()` → `renderIngredients()` → `renderStats()` → `renderAbout()` → `renderTestimonialsHeader()` → `renderTestimonials()` → `renderCta()` → `renderOrderPage()` → `setupNavScroll()` → `setupFadeIn()`

### Design System

Dois níveis de tokens visuais:
1. **`styles.css` `:root`** — valores CSS default (marrom `#7C4A1E`, creme `#F9F5EF`, etc.)
2. **`CONFIG.theme.cssVars`** — aplicados via `applyTheme()` no DOMContentLoaded, sobrepõe o CSS

Para mudar cores, prefira `CONFIG.theme.cssVars` (fonte única de verdade). Breakpoints no CSS: `480px`, `600px`, `768px`, `1100px` (mobile-first).

### Integração WhatsApp

Links gerados por `buildWhatsAppUrl()` via `https://wa.me/{CONFIG.whatsapp}?text={encodeURIComponent(...)}`:
- `sendWhatsApp()` — pedido padrão com qty/preço/entrega (requer `selectedOption` não-nulo)
- `customOrder()` — pedido personalizado (card "Consultar")

Templates das mensagens ficam em `CONFIG.whatsappMessages.checkout` e `CONFIG.whatsappMessages.customOrder`.

## Pontos de Atenção

- Caminhos de imagem usam `/` (não `\`) — ex: `GVIMG/Hero Produto.jpg`
- O HTML ainda tem alguns textos duplicados em relação ao `config.js` (herança de refatoração); ao editar, verificar se o texto está no HTML ou no CONFIG
- Estado global do pedido (`qty`, `price`, `free`, `selectedOption`) é reiniciado a cada navegação para `page-pedido` via `reset()`
- Conteúdo injetado via `element.textContent` é seguro contra XSS; apenas `hero h1` usa `.innerHTML` via `formatHeroTitle()` que escapa o input
- Google Fonts (Playfair Display, DM Sans) requerem conexão à internet
