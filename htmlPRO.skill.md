# Skill: htmlPRO
> Transforma um `index.html` monolítico em uma arquitetura profissional vanilla HTML/CSS/JS orientada a dados, com separação de responsabilidades, design system via CSS custom properties, SPA de múltiplas "páginas", ambiente de dev local e deploy estático.

---

## Quando usar esta skill

Use `htmlPRO` quando o usuário tiver:
- Um `index.html` simples (monolítico — HTML, CSS e JS misturados ou conteúdo hardcoded)
- Necessidade de separar conteúdo/lógica/estilo em arquivos distintos
- Intenção de manter e evoluir a página sem framework ou build tool
- Necessidade de rodar localmente como `localhost` e fazer deploy estático

---

## Stack alvo (sem exceções)

| Camada | Tecnologia |
|--------|-----------|
| Estrutura | HTML5 vanilla — sem dados hardcoded |
| Conteúdo | `config.js` — objeto `CONFIG`, única fonte de verdade |
| Lógica + Render | `app.js` — renderiza tudo a partir do CONFIG |
| Estilo | `styles.css` — design system com CSS custom properties |
| Assets | `IMGFOLDER/` — pasta dedicada para imagens |
| Dev server | `npx serve -p 5500 .` |
| Versionamento | Git + `.gitignore` padrão |
| Deploy | Vercel (vercel.json) ou Netlify (netlify.toml) — arquivos estáticos |

> **Sem npm no frontend.** O único `package.json` aceito é para o `serve` (devDependency). Nenhuma dependência de runtime no browser.

---

## Fase 0 — Auditoria do index.html existente

Antes de criar qualquer arquivo, leia o `index.html` completo e mapeie:

1. **Seções visuais** — identifique cada bloco distinto (hero, sobre, depoimentos, preços, footer, etc.)
2. **Conteúdo hardcoded** — textos, preços, URLs, números de telefone, caminhos de imagem
3. **CSS inline ou `<style>`** — extraia para `styles.css`
4. **JS inline ou `<script>`** — extraia para `app.js`
5. **Imagens** — liste todos os `src` de `<img>` (serão movidos para `IMGFOLDER/`)
6. **Múltiplas "páginas"** — se houver mais de um estado visual principal (ex: home + checkout), mapeie como páginas SPA
7. **Integrações externas** — WhatsApp, formulários, analytics, etc.

Documente o mapeamento antes de começar a transformação.

---

## Fase 1 — Estrutura de arquivos

Crie os seguintes arquivos na raiz do projeto:

```
/
├── index.html          ← HTML puro (sem dados hardcoded)
├── config.js           ← Única fonte de verdade
├── app.js              ← Lógica + render
├── styles.css          ← Design system
├── IMGFOLDER/          ← Assets de imagem (renomeie conforme o projeto)
├── .gitignore
├── package.json        ← Apenas para "serve" (devDependency)
├── vercel.json         ← Deploy Vercel (ou netlify.toml)
└── CLAUDE.md           ← Instruções para futura sessão do Claude Code
```

> O `index.html` original passa a ser o arquivo de entrada. Se o projeto já usa outro nome (ex: `granola-de-verdade.html`), mantenha o nome mas configure o servidor para servir este arquivo como root.

---

## Fase 2 — config.js

### Estrutura obrigatória do objeto CONFIG

O CONFIG segue o fluxo visual da página de cima para baixo. Cada seção tem um comentário de "mapa visual" explicando o que representa.

```js
/**
 * CONFIG.JS — arquivo central de conteúdo e estilo
 * Ordem: mesmo fluxo visual da página, de cima para baixo.
 * NUNCA coloque conteúdo hardcoded no HTML. Edite apenas aqui.
 */

const CONFIG = {

  // ============================================================
  // BASE GLOBAL DO SITE
  // ============================================================
  site: {
    title: '',           // <title> da página
    metaDescription: ''  // <meta name="description">
  },

  // ============================================================
  // TOKENS VISUAIS GLOBAIS
  // Aplicados via applyTheme() no DOMContentLoaded
  // Sobrepõem os valores default do :root em styles.css
  // ============================================================
  theme: {
    cssVars: {
      '--bg': '#FFFFFF',
      '--primary': '#000000',
      '--accent': '#FF0000',
      // ... todos os tokens usados no CSS
    }
  },

  // ============================================================
  // CONTATO / INTEGRAÇÕES GLOBAIS
  // ============================================================
  whatsapp: '',    // Número sem formatação: '5511999999999'
  region: '',      // Região de atuação exibida na UI

  // ============================================================
  // [BLOCO N] — NOME DA SEÇÃO
  // Visão visual:
  // [Descrição ASCII do layout]
  // ============================================================
  // ... uma chave por seção visual identificada na Fase 0

};

// Compatibilidade Node.js (testes, scripts)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
```

### Regras do CONFIG

- **Uma chave por seção visual** mapeada na Fase 0
- **Arrays para listas repetíveis**: depoimentos, cards de preço, ingredientes, etc.
- **Objetos para seções com múltiplos campos**: hero, about, footer, etc.
- **Strings para textos simples**: labels, botões, notas
- **Caminhos de imagem** sempre com `/` (nunca `\`): `'IMGFOLDER/hero.jpg'`
- **Flags booleanas** para variações de estilo: `featured: true`, `isCustom: true`, `freeDelivery: true`
- **Templates de mensagem** para integrações (WhatsApp, email) ficam em CONFIG, não no app.js

---

## Fase 3 — index.html (esqueleto)

### Princípios

- **Zero dados hardcoded** — títulos, textos, preços, imagens: tudo vem do CONFIG via app.js
- **Atributos vazios** nos elementos que receberão conteúdo: `src=""`, `alt=""`, `textContent` via JS
- **IDs e classes semânticos** que o app.js usa para selecionar elementos
- **SPA com páginas** — se houver múltiplos estados, use `id="page-home"`, `id="page-pedido"` etc. com a classe `.active` controlando visibilidade

### Template de estrutura SPA

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <title></title>
  <!-- Fontes externas (requerem internet) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<nav id="main-nav">
  <div class="nav-inner">
    <div class="nav-logo" onclick="goHome()">
      <img src="" alt="">
    </div>
    <button class="nav-cta" onclick="goPage2()"></button>
  </div>
</nav>

<!-- PÁGINA 1: Home -->
<div id="page-home" class="page active">
  <!-- Estrutura HTML pura. Conteúdo injetado pelo app.js -->
</div>

<!-- PÁGINA 2: Outra página (se necessário) -->
<div id="page-outra" class="page">
  <!-- Estrutura HTML pura. Conteúdo injetado pelo app.js -->
</div>

<!-- Scripts na ordem certa: CONFIG antes de APP -->
<script src="config.js"></script>
<script src="app.js"></script>
</body>
</html>
```

### CSS de controle de páginas SPA (em styles.css)

```css
.page { display: none; }
.page.active { display: block; }
```

---

## Fase 4 — app.js

### Estrutura obrigatória

```js
/**
 * APP.JS — lógica e render da aplicação
 * Lê CONFIG de config.js. Nunca tem strings de conteúdo hardcoded.
 */

// ─── Estado global (somente se necessário) ───────────────────
let selectedOption = null;

// ─── Utilitários ─────────────────────────────────────────────

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value || '';
}

// ─── Tema ─────────────────────────────────────────────────────

function applyTheme() {
  const vars = CONFIG.theme?.cssVars || {};
  Object.entries(vars).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, String(value));
  });
}

// ─── Meta ─────────────────────────────────────────────────────

function renderSiteMeta() {
  document.title = CONFIG.site?.title || '';
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', CONFIG.site?.metaDescription || '');
}

// ─── Render functions (uma por seção do CONFIG) ───────────────

function renderBranding() { /* ... */ }
function renderHero() { /* ... */ }
// ... uma função render por seção mapeada na Fase 0

// ─── Navegação SPA ────────────────────────────────────────────

function goHome() {
  document.getElementById('page-home').classList.add('active');
  document.getElementById('page-outra').classList.remove('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goPage2() {
  document.getElementById('page-home').classList.remove('active');
  document.getElementById('page-outra').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Inicialização ────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  renderSiteMeta();
  renderBranding();
  renderHero();
  // ... todas as funções render na ordem visual de cima para baixo
  setupNavScroll();
  setupFadeIn();
});
```

### Regras do app.js

- **Nenhum conteúdo hardcoded** — toda string de UI vem de `CONFIG`
- **`element.textContent`** para textos (seguro, sem XSS). Usar `.innerHTML` apenas quando necessário com `escapeHtml()` obrigatório
- **`document.createElement()`** para listas dinâmicas (depoimentos, cards, etc.)
- **Fade-in via IntersectionObserver** para elementos com classe `.fade-in`
- **Nav scroll** — adicionar classe `scrolled` ao `#main-nav` quando `scrollY > 20`
- **Estado de pedido/seleção** — reiniciar via função `reset()` ao navegar entre páginas

---

## Fase 5 — styles.css

### Estrutura obrigatória

```css
/* ============================================================
   DESIGN SYSTEM — tokens visuais globais
   Valores default. Sobrescritos por CONFIG.theme.cssVars em runtime.
   ============================================================ */
:root {
  /* Cores */
  --bg: #FFFFFF;
  --surface: #F5F5F5;
  --primary: #000000;
  --primary-h: #333333;   /* hover do primary */
  --accent: #FF0000;
  --text: #111111;
  --text-2: #444444;
  --text-3: #888888;
  --border: #E0E0E0;
  --shadow: rgba(0,0,0,0.08);

  /* Tipografia */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  /* Espaçamentos */
  --container-max: 1100px;
  --section-gap: 80px;

  /* Cursores */
  --interactive-cursor: pointer;
}

/* ============================================================
   RESET MÍNIMO
   ============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font-body); background: var(--bg); color: var(--text); }

/* ============================================================
   UTILITÁRIOS
   ============================================================ */
.container { max-width: var(--container-max); margin: 0 auto; padding: 0 20px; }
.page { display: none; }
.page.active { display: block; }
.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-in.visible { opacity: 1; transform: none; }

/* ============================================================
   NAVEGAÇÃO
   ============================================================ */
/* ... */

/* ============================================================
   [SEÇÃO POR SEÇÃO — na ordem visual da página]
   ============================================================ */
/* ... */

/* ============================================================
   RESPONSIVO (mobile-first)
   Breakpoints: 480px / 600px / 768px / 1100px
   ============================================================ */
@media (max-width: 768px) { /* ... */ }
```

### Regras do styles.css

- **Dois níveis de tokens**: `:root` (default) + `CONFIG.theme.cssVars` (runtime override)
- **Para mudar cores**, preferir `CONFIG.theme.cssVars` (fonte única). O `:root` é o fallback.
- **Mobile-first** com breakpoints em `480px`, `600px`, `768px`, `1100px`
- **Sem valores hardcoded fora do `:root`** — use sempre `var(--token)`
- **Sem `!important`** exceto para reset específico de terceiros

---

## Fase 6 — Ambiente de dev local

### package.json

```json
{
  "name": "nome-do-projeto",
  "version": "1.0.0",
  "description": "Landing page estática",
  "scripts": {
    "dev": "npx serve -p 5500 .",
    "start": "npx serve -p 5500 ."
  },
  "devDependencies": {
    "serve": "^14.0.0"
  }
}
```

### .claude/launch.json

```json
{
  "command": "npx serve -p 5500 .",
  "url": "http://localhost:5500"
}
```

> Isso permite que o Claude Code inicie o servidor automaticamente ao abrir o projeto.

### Como rodar

```bash
npm install       # instala o serve (apenas primeira vez)
npm run dev       # inicia em http://localhost:5500
```

---

## Fase 7 — Git

### .gitignore

```gitignore
node_modules/
.DS_Store
Thumbs.db
*.log
.env
.env.local
dist/
.vercel/
```

### Commits iniciais (sequência recomendada)

```
feat: estrutura inicial — config.js, app.js, styles.css separados
feat: config.js com todo conteúdo extraído do HTML original
feat: app.js com render functions e navegação SPA
feat: styles.css com design system e breakpoints responsivos
feat: ambiente de dev com npx serve e launch.json
feat: deploy config (vercel.json / netlify.toml)
docs: CLAUDE.md e GUIA_RAPIDO.md
```

---

## Fase 8 — Deploy

### Vercel (recomendado para estáticos)

**vercel.json** — na raiz:
```json
{
  "rewrites": [
    { "source": "/", "destination": "/index.html" }
  ]
}
```

Se o arquivo de entrada não for `index.html` (ex: `granola-de-verdade.html`):
```json
{
  "rewrites": [
    { "source": "/", "destination": "/granola-de-verdade.html" }
  ]
}
```

Deploy:
```bash
npx vercel --prod
```

### Netlify (alternativa)

**netlify.toml** — na raiz:
```toml
[build]
  publish = "."

[[redirects]]
  from = "/"
  to = "/index.html"
  status = 200
```

---

## Fase 9 — CLAUDE.md do projeto

Gere um `CLAUDE.md` adaptado ao projeto com:

```markdown
# CLAUDE.md

## Visão Geral
[Descrição do produto/negócio em 2-3 linhas]

## Como Rodar
\`\`\`bash
npm run dev   # http://localhost:5500
\`\`\`

## Arquitetura

| Arquivo | Responsabilidade |
|---------|-----------------|
| `index.html` | Estrutura HTML (sem dados hardcoded) |
| `config.js` | **Única fonte de verdade** — conteúdo, preços, textos, imagens |
| `app.js` | Render de conteúdo via CONFIG, navegação SPA, integrações |
| `styles.css` | Design system com CSS custom properties |
| `IMGFOLDER/` | Assets de imagem |

## Editar Conteúdo
SEMPRE edite em `config.js`. Nunca edite textos diretamente no HTML.

## Objeto CONFIG
[Descreva as seções do CONFIG específicas deste projeto]

## Pontos de Atenção
- Caminhos de imagem usam `/` (não `\`)
- Conteúdo via `element.textContent` (seguro contra XSS)
- Google Fonts requerem conexão à internet
```

---

## Fase 10 — GUIA_RAPIDO.md

Gere um `GUIA_RAPIDO.md` com as edições mais comuns para o **usuário não-técnico**:

- Como trocar preços
- Como trocar textos e títulos
- Como trocar número de WhatsApp/contato
- Como trocar imagens (passo a passo: copiar arquivo + mudar caminho no config.js)
- Como adicionar depoimentos/cards
- Como mudar cores
- Checklist de edições básicas
- Troubleshooting rápido (página não carrega, imagens não aparecem, etc.)

---

## Checklist de entrega

Antes de declarar a transformação concluída, confirme:

- [ ] `index.html` não tem nenhum texto ou dado hardcoded
- [ ] Todo conteúdo está em `config.js` (objeto CONFIG)
- [ ] `app.js` renderiza tudo via CONFIG, sem strings hardcoded
- [ ] `styles.css` usa CSS custom properties; sem valores hardcoded fora do `:root`
- [ ] `CONFIG.theme.cssVars` aplicado via `applyTheme()` no DOMContentLoaded
- [ ] Imagens estão em `IMGFOLDER/` e referenciadas por caminho relativo no CONFIG
- [ ] SPA funcional (múltiplas páginas se necessário, com `.active` alternando)
- [ ] Fade-in via IntersectionObserver nas seções `.fade-in`
- [ ] Nav com scroll behavior (`scrolled` class)
- [ ] `npx serve -p 5500 .` funciona e a página carrega corretamente
- [ ] `.gitignore` exclui `node_modules/` e arquivos de sistema
- [ ] `vercel.json` ou `netlify.toml` configurado
- [ ] `.claude/launch.json` com comando de dev
- [ ] `CLAUDE.md` gerado e descrevendo a arquitetura do projeto
- [ ] `GUIA_RAPIDO.md` gerado para o usuário não-técnico
- [ ] Sem erros no console do browser (F12)
- [ ] Responsivo — testado em 375px (mobile) e 1280px (desktop)

---

## Antipadrões — o que NÃO fazer

| ❌ Proibido | ✅ Correto |
|------------|-----------|
| Texto hardcoded no HTML | Texto vem do CONFIG via app.js |
| CSS inline no HTML | CSS em styles.css com CSS vars |
| JS inline no HTML | JS em app.js |
| `innerHTML` com dados não escapados | `textContent` ou `escapeHtml()` antes de `innerHTML` |
| Framework (React, Vue, etc.) | Vanilla JS puro |
| Build tool (Webpack, Vite) | Sem build — servir arquivos diretamente |
| npm packages no frontend | Apenas `serve` como devDependency |
| Caminhos com `\` (Windows) | Sempre `/` nos caminhos de imagem |
| Cores hardcoded no CSS | `var(--token)` em todo lugar |
| Abrir HTML com duplo clique | `npx serve` para localhost correto |
