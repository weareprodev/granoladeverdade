/**
 * CONFIG.JS — arquivo central de conteudo e estilo
 *
 * Ordem do arquivo:
 * 1. Mesmo fluxo visual da pagina, de cima para baixo.
 * 2. Cada troca de container/secao tem comentario de mapa visual.
 * 3. O HTML fica apenas com estrutura; edicao de conteudo acontece aqui.
 */

const CONFIG = {
  // ============================================================
  // BASE GLOBAL DO SITE
  // Visao visual:
  // [Documento / Head]
  // ============================================================
  site: {
    title: 'Granola de Verdade — Artesanal e Natural',
    metaDescription: 'Granola artesanal de verdade. Ingredientes 100% naturais, sem conservantes. Entrega em M.C.R - PR.'
  },

  // ============================================================
  // TOKENS VISUAIS GLOBAIS
  // Visao visual:
  // [Tema compartilhado por toda a pagina]
  // ============================================================
  theme: {
    cssVars: {
      '--bg': '#F9F5EF',
      '--bg-warm': '#F0E9DC',
      '--surface': '#FFFFFF',
      '--primary': '#7C4A1E',
      '--primary-h': '#9A5E28',
      '--accent': '#C8833A',
      '--gold': '#E4A84B',
      '--green': '#4A7A42',
      '--green-bg': '#EDF7EC',
      '--text': '#1E1208',
      '--text-2': '#5C3D22',
      '--text-3': '#9B7A5A',
      '--border': '#DDD0BC',
      '--shadow': 'rgba(124, 74, 30, 0.12)',
      '--wa': '#25D366',
      '--nav-logo-cursor': 'pointer',
      '--interactive-cursor': 'pointer',
      '--order-footer-margin-top': '56px',
      '--summary-neutral-color': 'var(--text-3)',
      '--summary-free-color': 'var(--green)'
    }
  },

  // ============================================================
  // CONTATO GLOBAL
  // Visao visual:
  // [Usado em botoes e acoes de WhatsApp ao longo da pagina]
  // ============================================================
  whatsapp: '554599646156',
  region: 'M.C.R - PR',

  // ============================================================
  // BLOCO 1 — NAVEGACAO FIXA
  // Visao visual:
  // [Nav]
  //   [Logo] [Botao CTA]
  // ============================================================
  nav: {
    logoAlt: 'Granola de Verdade',
    ctaText: '🛒 Fazer pedido'
  },

  // ============================================================
  // BLOCO 2 — HOME / HERO
  // Visao visual:
  // [Home]
  //   [Container]
  //     [Hero]
  //       [Texto]
  //       [Acoes]
  //       [Imagem]
  // ============================================================
  hero: {
    badge: 'Produção 100% Artesanal',
    title: 'A melhor granola pra quem busca uma alimentação nutritiva, sem perder as delícias da vida!',
    highlightText: 'sem perder as delícias da vida!',
    description: 'Uma escolha inteligente pra quem busca uma nutrição leve e equilibrada, porque cuidar de si começa pelo que você escolhe comer.',
    floatBadges: [
      '✓ Ingredientes naturais',
      '✓ Rico em fibras e nutrientes',
      '✓ Feita com carinho'
    ],
    ctaText: '🛒 Pedir meu pacote',
    ghostText: '↓ Conheça nossa granola',
    heroImage: 'GVIMG/Hero Produto.jpg',
    heroImageAlt: 'Granola de Verdade - Produto'
  },

  // ============================================================
  // BLOCO 3 — FAIXA DE INGREDIENTES
  // Visao visual:
  // [Faixa horizontal com scroll]
  //   [Ingrediente] [Ingrediente] [Ingrediente] ...
  // ============================================================
  ingredients: [
    'Castanha de Caju',
    'Amêndoa',
    'Semente de Girassol',
    'Semente de Abóbora',
    'Goji Berry',
    'Kiwi Desidratado',
    'Aveia',
    'Coco',
    'Melado Orgânico',
  ],

  // ============================================================
  // BLOCO 4 — BARRA DE ESTATISTICAS
  // Visao visual:
  // [Barra escura]
  //   [Stat 1] [Stat 2] [Stat 3]
  // ============================================================
  stats: [
    { value: 'Natural', label: '11+ Ingredientes selecionados' },
    { value: '400g', label: 'Em cada pacote' },
    { value: 'Zero', label: 'Conservantes adicionados' },
  ],

  // ============================================================
  // BLOCO 5 — SECAO SOBRE
  // Visao visual:
  // [Secao "Nossa Granola"]
  //   [Container]
  //     [Imagem] [Texto + Pills]
  // ============================================================
  about: {
    label: 'Como tudo começou..',
    title: 'Da nossa mesa pra sua 🐿️',
    description: 'A Granola de Verdade nasceu do amor por comer bem sem abrir mão do prazer. Do desejo por um alimento crocante, gostoso e nutritivo de verdade, que combinasse com o objetivo da nossa família de viver um estilo de vida mais saudável.\n\nNossa cozinha foi o laboratório: entre erros e acertos nós melhoramos até chegar na nossa receita perfeita. Foi compartilhando nossa granola com amigos e familiares que decidimos, pelo incentivo e elogios deles, que queremos levar essa experiência da nossa família pra sua.',
    pills: [
      '🍀 Naturalmente doce',
      '🌰 Castanhas selecionadas'
    ],
    image: 'GVIMG/Nossa Granola.jpeg',
    imageAlt: 'Nossa Granola - Processo'
  },

  // ============================================================
  // BLOCO 6 — SECAO DE DEPOIMENTOS (CABECALHO / CONFIANCA)
  // Visao visual:
  // [Cabecalho da secao]
  //   [Label]
  //   [Titulo]
  // [Faixa de confianca]
  //   [Avatares] [Texto + estrelas]
  // ============================================================
  testimonialsSection: {
    label: 'Quem já provou aprovou',
    title: 'O que nossos clientes dizem',
    trustText: '+200 clientes satisfeitos',
    trustStars: '⭐⭐⭐⭐⭐',
    trustAvatars: ['🥰', '💬', '😍']
  },

  // ============================================================
  // BLOCO 7 — CARDS DE DEPOIMENTOS
  // Visao visual:
  // [Grid / Stack de cards]
  //   [Card 1] [Card 2] [Card 3]
  // ============================================================
  testimonials: [
    {
      avatar: '👩',
      name: 'Ana Paula M.',
      meta: 'Cliente há 4 meses',
      stars: '⭐⭐⭐⭐⭐',
      text: 'Comprei os 3 pacotes por causa da entrega grátis e não me arrependo. É a melhor granola que já comi. Já indiquei pra todo mundo!',
      featured: false
    },
    {
      avatar: '👨',
      name: 'Rodrigo S.',
      meta: 'Cliente frequente',
      stars: '⭐⭐⭐⭐⭐',
      text: 'Diferente de qualquer granola do supermercado. Dá pra sentir que é artesanal. Minha família inteira virou fã. Peço toda semana.',
      featured: true
    },
    {
      avatar: '👩‍⚕️',
      name: 'Dra. Fernanda L.',
      meta: 'Nutricionista',
      stars: '⭐⭐⭐⭐⭐',
      text: 'Sou nutricionista e indico para meus pacientes. Lista limpa, sem enrolação. Incrível com iogurte grego e frutas.',
      featured: false
    }
  ],

  // ============================================================
  // BLOCO 8 — CTA FINAL DA HOME
  // Visao visual:
  // [Container]
  //   [Bloco de CTA]
  //     [Titulo]
  //     [Texto]
  //     [Botao]
  // ============================================================
  cta: {
    title: 'Pronto pra experimentar uma Granola de Verdade?',
    image: 'GVIMG/bownGranola.jpg',
    imageAlt: 'Bowl de granola',
    description: 'Faça seu pedido pelo site, participe do nosso programa de fidelidade e receba um desconto progressivo, quanto mais você pedir, menos você paga.',
    buttonText: '🛒 Escolher meu pacote'
  },

  // ============================================================
  // BLOCO 9 — FOOTER DA HOME
  // Visao visual:
  // [Footer]
  //   [Logo]
  //   [Texto]
  // ============================================================
  footer: {
    text: 'Powered by • WE ARE PRO\nCNPJ: 53.179.294/0001-27',
    helpText: 'Dúvidas? WhatsApp',
    logo: 'GVIMG/Logo Fundo Transparente.png'
  },

  // ============================================================
  // BLOCO 10 — PAGINA DE PEDIDO / HERO
  // Visao visual:
  // [Pagina de pedido]
  //   [Container]
  //     [Hero de pedido]
  // ============================================================
  orderHero: {
    label: 'Quanto de granola você quer?',
    title: 'Pronto para encomendar?',
    description: 'Quanto mais você leva, mais economiza. A partir de 3 pacotes, a entrega é por nossa conta.'
  },

  // ============================================================
  // BLOCO 11 — STRIP DO PRODUTO
  // Visao visual:
  // [Container]
  //   [Resumo do produto]
  //     [Thumb] [Texto + badges]
  // ============================================================
  orderProduct: {
    name: 'Granola de Verdade',
    description: '100% Artesanal • Sabor único • 400g/pacote',
    image: 'GVIMG/produto pagina pedido.jpg',
    imageAlt: 'Granola de Verdade',
    badges: [
      { text: 'Sem conservantes', type: 'green' },
      { text: 'Ingredientes Naturais', type: 'green' },
      { text: 'Sempre fresca 🍀', type: 'warm' }
    ]
  },

  // ============================================================
  // BLOCO 12 — TITULO DA GRADE DE QUANTIDADES
  // Visao visual:
  // [Label acima dos cards]
  // ============================================================
  orderQtyLabel: 'Selecione a quantidade',

  // ============================================================
  // BLOCO 13 — CARDS DE PRECO / QUANTIDADE
  // Visao visual:
  // [Grid / Stack]
  //   [Card 1] [Card 2] [Card 3] [Card personalizado]
  // ============================================================
  prices: [
    {
      name: 'Experimente',
      icon: '😋',
      quantity: 1,
      grams: 400,
      price: 55.00,
      pricePerUnit: '55,00',
      ribbon: null,
      ribbonColor: null,
      isCustom: false
    },
    {
      name: 'Mais Popular',
      icon: '⭐',
      quantity: 2,
      grams: 800,
      price: 100.00,
      pricePerUnit: '50,00',
      ribbon: 'Mais popular',
      ribbonColor: 'default',
      isCustom: false
    },
    {
      name: 'Melhor Valor',
      icon: '🥇',
      quantity: 3,
      grams: 1200,
      price: 145.00,
      pricePerUnit: '48,33',
      ribbon: '🚚 Entrega grátis',
      ribbonColor: 'green',
      isCustom: false,
      freeDelivery: true
    },
    {
      name: 'Pedido Personalizado',
      icon: '📞',
      quantity: 'Consultar',
      grams: 'kg • Atacado',
      price: 'Consultar',
      pricePerUnit: '',
      ribbon: null,
      ribbonColor: null,
      isCustom: true,
      customButton: 'Conversar no WhatsApp'
    }
  ],

  // ============================================================
  // BLOCO 14 — AVISO DE ENTREGA
  // Visao visual:
  // [Box informativo verde]
  // ============================================================
  orderDeliveryNote: '🚚 3 pacotes ou mais: nós realizamos a entrega gratuita. Pedidos menores: a taxa de entrega é de R$ 5,00.\nEntregas apenas em M.C.R - PR',

  // ============================================================
  // BLOCO 15 — ESTADO VAZIO (ANTES DA SELECAO)
  // Visao visual:
  // [Mensagem central antes de escolher um card]
  // ============================================================
  orderEmptyState: '👆 Selecione uma opção acima para continuar',

  // ============================================================
  // BLOCO 16 — RESUMO DO PEDIDO
  // Visao visual:
  // [Card de resumo]
  //   [Titulo]
  //   [Linhas de resumo]
  //   [Botao WhatsApp]
  //   [Regiao]
  // ============================================================
  orderSummary: {
    title: '🛒 Resumo do pedido',
    labels: {
      product: 'Produto',
      quantity: 'Quantidade',
      weight: 'Peso total',
      delivery: 'Entrega',
      total: 'Total'
    },
    emptyValue: '—',
    deliveryFreeLabel: 'GRÁTIS 🎉',
    deliveryPendingLabel: 'A combinar',
    regionPrefix: '📍',
    whatsappButton: '🛒 Fazer meu pedido pelo WhatsApp'
  },

  // ============================================================
  // BLOCO 17 — MENSAGENS DE WHATSAPP
  // Visao visual:
  // [Nao aparece como secao]
  // [Suporta os cliques do card personalizado e do checkout]
  // ============================================================
  whatsappMessages: {
    customOrder: {
      intro: '👋 Olá! Gostaria de fazer um pedido personalizado de',
      outro: 'Pode me passar informações sobre preços por kg e disponibilidade?'
    },
    checkout: {
      titlePrefix: '🥣 *Pedido — ',
      confirmText: 'Pode confirmar meu pedido? 😊',
      freeDelivery: 'GRÁTIS ✅',
      pendingDelivery: 'a combinar'
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
