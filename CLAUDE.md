# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão Geral

Landing page estática de e-commerce para venda de granola artesanal via WhatsApp. Projeto vanilla HTML/CSS/JS — sem framework, sem build tool, sem dependências npm.

## Como Rodar

Abrir `granola-de-verdade.html` diretamente no navegador via Live Server (VS Code) em `http://localhost:5500`. Duplo clique funciona, mas pode ter restrições de CORS.

Não há processo de build, testes automatizados ou linting configurados.

## Arquitetura

O projeto funciona como uma SPA simples com duas "páginas" exibidas/ocultadas via classe CSS `.active`:

- **`page-home`** — página inicial com hero, ingredientes, sobre, depoimentos e CTA
- **`page-pedido`** — página de pedido com seleção de quantidade e integração WhatsApp

Navegação controlada pelas funções `goHome()` e `goPedido()` em `app.js`.

### Separação de responsabilidades

| Arquivo | Responsabilidade |
|---------|-----------------|
| `granola-de-verdade.html` | Estrutura HTML (sem dados hardcoded) |
| `config.js` | **Única fonte de verdade** — todos os textos, preços, número WA, caminhos de imagem |
| `app.js` | Lógica: navegação SPA, seleção de qty, mensagens WA, fade-in via IntersectionObserver |
| `styles.css` | Design system com CSS custom properties em `:root` |
| `GVIMG/` | Assets de imagem (referenciados por caminho relativo em `config.js`) |

### Objeto CONFIG (config.js)

Todas as edições de conteúdo são feitas no objeto `CONFIG`. Seções principais:

- `CONFIG.whatsapp` — número sem formatação (`554599646156`)
- `CONFIG.hero` — textos e imagem do topo
- `CONFIG.ingredients` — faixa de scroll infinito
- `CONFIG.about` — seção "Nossa Granola"
- `CONFIG.testimonials` — array de depoimentos (`featured: true` = card marrom)
- `CONFIG.prices` — array de cards de quantidade (`isCustom: true` = card "Consultar")
- `CONFIG.order` — textos da página de pedido
- `CONFIG.footer` — textos e logo do rodapé

### Integração WhatsApp

Links gerados via `https://wa.me/{CONFIG.whatsapp}?text={encodeURIComponent(...)}`. Duas funções:
- `sendWhatsApp()` — pedido padrão com qty/preço/entrega selecionados
- `customOrder()` — pedido personalizado (card "Consultar")

### Design System (styles.css)

Tokens CSS em `:root` controlam toda a paleta:
- `--primary: #7C4A1E` (marrom), `--accent: #C8833A` (laranja), `--green: #4A7A42`
- `--bg: #F9F5EF` (creme), `--wa: #25D366` (WhatsApp)
- Breakpoints: `480px`, `600px`, `768px`, `1100px` (mobile-first)

## Pontos de Atenção

- Caminhos de imagem em `config.js` e no HTML usam `/` (não `\`) — ex: `GVIMG/Hero Produto.jpg`
- O HTML ainda tem alguns textos duplicados em relação ao `config.js` (herança da refatoração); ao editar, verificar se o texto está no HTML ou no CONFIG
- Estado global de pedido (`qty`, `price`, `free`) é reiniciado ao navegar para `page-pedido` via `reset()`
- Google Fonts (Playfair Display, DM Sans) requerem conexão à internet
