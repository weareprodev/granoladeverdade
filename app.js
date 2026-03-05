/**
 * APP.JS — logica da aplicacao Granola de Verdade
 * Le configuracoes de config.js e gerencia navegacao, render e pedidos.
 */

let qty = null;
let price = null;
let free = false;
let selectedOption = null;

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function formatHeroTitle(title, highlightText) {
  const safeTitle = escapeHtml(title);
  const safeHighlight = escapeHtml(highlightText ?? '');

  if (!safeHighlight) return safeTitle;

  const index = safeTitle.toLowerCase().indexOf(safeHighlight.toLowerCase());
  if (index === -1) return safeTitle;

  return (
    safeTitle.slice(0, index) +
    '<em>' + safeTitle.slice(index, index + safeHighlight.length) + '</em>' +
    safeTitle.slice(index + safeHighlight.length)
  );
}

function formatCurrencyBRL(value) {
  if (typeof value !== 'number') return String(value ?? '');
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function formatWeight(value) {
  if (typeof value === 'number') return value + 'g';
  return String(value ?? getSummaryEmptyValue());
}

function getAboutPillClass(text) {
  const normalized = String(text ?? '').toLowerCase();
  return /(castanha|natural|orgânic|organ|sem conservantes)/.test(normalized) ? 'pill green' : 'pill';
}

function getSummaryEmptyValue() {
  return (CONFIG.orderSummary || {}).emptyValue || '—';
}

function getOrderHeroConfig() {
  return CONFIG.orderHero || {};
}

function getOrderProductConfig() {
  return CONFIG.orderProduct || {};
}

function getOrderSummaryConfig() {
  return CONFIG.orderSummary || {};
}

function buildWhatsAppUrl(message) {
  return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(message);
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value || '';
}

function applyTheme() {
  const vars = CONFIG.theme?.cssVars || {};
  const root = document.documentElement;

  Object.entries(vars).forEach(([name, value]) => {
    root.style.setProperty(name, String(value));
  });
}

function renderSiteMeta() {
  document.title = CONFIG.site?.title || '';

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', CONFIG.site?.metaDescription || '');
}

function renderBranding() {
  const productName = CONFIG.orderProduct?.name || CONFIG.nav?.logoAlt || 'Granola de Verdade';
  const logoPath = CONFIG.footer?.logo || '';

  const navLogo = document.querySelector('.nav-logo img');
  if (navLogo && logoPath) {
    navLogo.src = logoPath;
    navLogo.alt = productName;
  }

  const navCta = document.querySelector('.nav-cta');
  if (navCta) navCta.textContent = CONFIG.nav?.ctaText || '';

  document.querySelectorAll('.footer-logo').forEach((img) => {
    if (logoPath) img.src = logoPath;
    img.alt = productName;
  });

  document.querySelectorAll('footer p').forEach((text) => {
    text.textContent = CONFIG.footer?.text || '';
  });

  const waFloat = document.querySelector('.wa-float');
  if (waFloat) {
    const icon = waFloat.querySelector('svg, img');
    const iconClone = icon ? icon.cloneNode(true) : null;

    waFloat.innerHTML = '';
    if (iconClone) waFloat.appendChild(iconClone);
    waFloat.setAttribute('aria-label', CONFIG.footer?.helpText || 'WhatsApp');
    waFloat.setAttribute('title', CONFIG.footer?.helpText || 'WhatsApp');
  }
}

function renderHero() {
  const hero = CONFIG.hero || {};
  const testimonialsSection = CONFIG.testimonialsSection || {};

  const badge = document.querySelector('.hero-badge');
  const title = document.querySelector('.hero h1');
  const description = document.querySelector('.hero-desc');
  const image = document.querySelector('.hero-img-wrap img');
  const badgeWrap = document.querySelector('.float-badges');
  const primaryBtn = document.querySelector('.hero-actions .btn-primary');
  const ghostBtn = document.querySelector('.hero-actions .btn-ghost');
  const trustText = document.querySelector('.testimonials-trust .hero-trust-text');
  const avatars = document.querySelector('.testimonials-trust .hero-avatars');

  if (badge) badge.textContent = hero.badge || '';
  if (title) title.innerHTML = formatHeroTitle(hero.title || '', hero.highlightText);
  if (description) description.textContent = hero.description || '';

  if (image && hero.heroImage) {
    image.src = hero.heroImage;
    image.alt = hero.heroImageAlt || hero.title || 'Granola de Verdade';
  }

  if (badgeWrap) {
    badgeWrap.innerHTML = '';

    (hero.floatBadges || []).forEach((text) => {
      const item = document.createElement('div');
      item.className = /^✓/.test(text) ? 'fbadge green' : 'fbadge';
      item.textContent = text;
      badgeWrap.appendChild(item);
    });
  }

  if (avatars) {
    avatars.innerHTML = '';

    (testimonialsSection.trustAvatars || []).forEach((avatarText) => {
      const avatar = document.createElement('div');
      avatar.className = 'av';
      avatar.textContent = avatarText;
      avatars.appendChild(avatar);
    });
  }

  if (primaryBtn) primaryBtn.textContent = hero.ctaText || '';
  if (ghostBtn) ghostBtn.textContent = hero.ghostText || '';

  if (trustText) {
    trustText.innerHTML =
      '<strong>' + escapeHtml(testimonialsSection.trustText || '') + '</strong><br>' +
      escapeHtml((testimonialsSection.trustStars || '') + ' ' + (testimonialsSection.trustChannel || ''));
  }
}

function renderIngredients() {
  const track = document.getElementById('ingredients-track');
  if (!track || !Array.isArray(CONFIG.ingredients)) return;

  track.innerHTML = '';

  const buildGroup = () => {
    const group = document.createElement('div');
    group.className = 'ing-group';

    CONFIG.ingredients.forEach((ingredient) => {
      const item = document.createElement('div');
      item.className = 'item';

      const icon = document.createElement('span');
      icon.textContent = '✦';

      item.appendChild(icon);
      item.appendChild(document.createTextNode(' ' + ingredient));
      group.appendChild(item);
    });

    return group;
  };

  const baseGroup = buildGroup();
  track.appendChild(baseGroup);

  const groupWidth = Math.ceil(baseGroup.getBoundingClientRect().width);
  if (!groupWidth) return;

  const viewportWidth = track.parentElement?.clientWidth || window.innerWidth;
  const totalGroups = Math.max(2, Math.ceil(viewportWidth / groupWidth) + 2);

  for (let i = 1; i < totalGroups; i += 1) {
    track.appendChild(baseGroup.cloneNode(true));
  }

  track.style.setProperty('--ing-shift', groupWidth + 'px');
}

function setupIngredientsMarquee() {
  let resizeTimeout = null;

  const rerender = () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      renderIngredients();
    }, 140);
  };

  window.addEventListener('resize', rerender);
  window.addEventListener('orientationchange', rerender);

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      renderIngredients();
    }).catch(() => {});
  }
}

function renderStats() {
  const grid = document.querySelector('.stats-grid');
  if (!grid || !Array.isArray(CONFIG.stats)) return;

  grid.innerHTML = '';

  CONFIG.stats.forEach((stat) => {
    const item = document.createElement('div');
    item.className = 'stat-item';

    const value = document.createElement('strong');
    value.textContent = stat.value || '';

    const label = document.createElement('span');
    label.textContent = stat.label || '';

    item.appendChild(value);
    item.appendChild(label);
    grid.appendChild(item);
  });
}

function renderAbout() {
  const about = CONFIG.about || {};
  const section = document.getElementById('sobre');
  if (!section) return;

  const label = section.querySelector('.section-label');
  const title = section.querySelector('h2');
  const description = section.querySelector('.about-copy p');
  const image = section.querySelector('.about-img-wrap img');
  const pills = section.querySelector('.pills');

  if (label) label.textContent = about.label || '';
  if (title) title.textContent = about.title || '';
  if (description) description.textContent = about.description || '';

  if (image && about.image) {
    image.src = about.image;
    image.alt = about.imageAlt || about.title || 'Nossa Granola';
  }

  if (pills) {
    pills.innerHTML = '';

    (about.pills || []).forEach((text) => {
      const pill = document.createElement('div');
      pill.className = getAboutPillClass(text);
      pill.textContent = text;
      pills.appendChild(pill);
    });
  }
}

function renderTestimonialsHeader() {
  setText('#testimonials-label', CONFIG.testimonialsSection?.label || '');
  setText('#testimonials-title', CONFIG.testimonialsSection?.title || '');
}

function renderTestimonials() {
  const stack = document.querySelector('.t-stack');
  if (!stack || !Array.isArray(CONFIG.testimonials)) return;

  stack.innerHTML = '';

  CONFIG.testimonials.forEach((testimonial) => {
    const card = document.createElement('div');
    card.className = testimonial.featured ? 'tcard featured' : 'tcard';

    const stars = document.createElement('div');
    stars.className = 'tcard-stars';
    stars.textContent = testimonial.stars || '';

    const text = document.createElement('div');
    text.className = 'tcard-text';
    text.textContent = '"' + (testimonial.text || '') + '"';

    const author = document.createElement('div');
    author.className = 'tcard-author';

    const avatar = document.createElement('div');
    avatar.className = 'tcard-av';

    if (testimonial.avatarImage) {
      const avatarImg = document.createElement('img');
      avatarImg.className = 'tcard-av-img';
      avatarImg.src = testimonial.avatarImage;
      avatarImg.alt = testimonial.name ? ('Foto de ' + testimonial.name) : 'Foto do cliente';
      avatarImg.loading = 'lazy';
      avatarImg.decoding = 'async';
      avatar.appendChild(avatarImg);
    } else {
      avatar.textContent = testimonial.avatar || '•';
    }

    const metaWrap = document.createElement('div');

    const name = document.createElement('div');
    name.className = 'tcard-name';
    name.textContent = testimonial.name || '';

    const meta = document.createElement('div');
    meta.className = 'tcard-meta';
    meta.textContent = testimonial.meta || '';

    metaWrap.appendChild(name);
    metaWrap.appendChild(meta);
    author.appendChild(avatar);
    author.appendChild(metaWrap);

    card.appendChild(stars);
    card.appendChild(text);
    card.appendChild(author);
    stack.appendChild(card);
  });
}

function renderCta() {
  const cta = CONFIG.cta || {};
  const block = document.querySelector('.cta-block');
  if (!block) return;

  const title = block.querySelector('h2');
  const images = block.querySelectorAll('.cta-image');
  const description = block.querySelector('p');
  const button = block.querySelector('.btn-light');

  if (title) title.textContent = cta.title || '';
  images.forEach((image) => {
    if (!cta.image) return;
    image.src = cta.image;
    image.alt = cta.imageAlt || cta.title || '';
  });
  if (description) description.textContent = cta.description || '';
  if (button) button.textContent = cta.buttonText || '';
}

function renderOrderSummaryLabels() {
  const labels = getOrderSummaryConfig().labels || {};

  setText('#sum-label-product', labels.product || '');
  setText('#sum-label-qty', labels.quantity || '');
  setText('#sum-label-weight', labels.weight || '');
  setText('#sum-label-delivery', labels.delivery || '');
  setText('#sum-label-total', labels.total || '');
}

function renderOrderPage() {
  const orderHero = getOrderHeroConfig();
  const orderProduct = getOrderProductConfig();
  const orderSummary = getOrderSummaryConfig();

  setText('.pedido-hero .lbl', orderHero.label || '');
  setText('.pedido-hero h1', orderHero.title || '');
  setText('.pedido-hero p', orderHero.description || '');

  const productImage = document.querySelector('.pi-img img');
  const productTitle = document.querySelector('.pi-text h3');
  const productDesc = document.querySelector('.pi-text p');
  const productBadges = document.querySelector('.pi-badges');

  if (productImage && orderProduct.image) {
    productImage.src = orderProduct.image;
    productImage.alt = orderProduct.imageAlt || orderProduct.name || 'Granola de Verdade';
  }

  if (productTitle) productTitle.textContent = orderProduct.name || '';
  if (productDesc) productDesc.textContent = orderProduct.description || '';

  if (productBadges) {
    productBadges.innerHTML = '';

    (orderProduct.badges || []).forEach((badge) => {
      const item = document.createElement('div');
      item.className = 'badge ' + (badge.type || 'warm');
      item.textContent = badge.text || '';
      productBadges.appendChild(item);
    });
  }

  setText('.qty-label-row', CONFIG.orderQtyLabel || '');

  const stack = document.querySelector('.qty-stack');
  if (stack) {
    stack.innerHTML = '';

    (CONFIG.prices || []).forEach((option, index) => {
      const card = document.createElement('div');
      card.className = 'qty-card' + (option.isCustom ? ' custom-card' : '');

      if (option.ribbon) {
        const ribbon = document.createElement('div');
        ribbon.className = 'qty-ribbon' + (option.ribbonColor === 'green' ? ' green-r' : '');
        ribbon.textContent = option.ribbon;
        card.appendChild(ribbon);
      }

      const icon = document.createElement('div');
      icon.className = 'qty-card-icon';
      icon.textContent = option.icon || '•';

      const body = document.createElement('div');
      body.className = 'qty-card-body';

      const name = document.createElement('div');
      name.className = 'qty-card-name';
      name.textContent = option.name || '';

      const sub = document.createElement('div');
      sub.className = 'qty-card-sub';
      sub.textContent = option.isCustom
        ? String(option.grams || '')
        : String(option.quantity) + (option.quantity === 1 ? ' pacote' : ' pacotes') +
          ' • ' + formatWeight(option.grams);

      body.appendChild(name);
      body.appendChild(sub);

      const right = document.createElement('div');
      right.className = 'qty-card-right';

      const priceEl = document.createElement('div');
      priceEl.className = 'qty-price' + (option.isCustom ? ' custom' : '');
      priceEl.textContent = formatCurrencyBRL(option.price);
      right.appendChild(priceEl);

      if (option.isCustom) {
        const waHint = document.createElement('div');
        waHint.className = 'wa-hint';

        const iconWrap = document.createElement('span');
        iconWrap.className = 'wa-hint-icon-wrap';

        const iconImg = document.createElement('img');
        iconImg.className = 'wa-hint-icon';
        iconImg.src = 'GVIMG/Digital_Glyph_White.svg';
        iconImg.alt = '';

        iconWrap.appendChild(iconImg);
        waHint.appendChild(iconWrap);
        waHint.appendChild(document.createTextNode(option.customButton || 'WhatsApp'));

        waHint.addEventListener('click', (event) => {
          event.stopPropagation();
          customOrder();
        });
        right.appendChild(waHint);
      } else {
        if (option.pricePerUnit) {
          const per = document.createElement('div');
          per.className = 'qty-per';
          per.textContent = 'R$ ' + option.pricePerUnit + '/un';
          right.appendChild(per);
        }
        card.addEventListener('click', () => selectQty(card, index));
      }

      card.appendChild(icon);
      card.appendChild(body);
      card.appendChild(right);
      stack.appendChild(card);
    });
  }

  setText('.delivery-note', CONFIG.orderDeliveryNote || '');
  setText('#empty-state', CONFIG.orderEmptyState || '');
  setText('.order-summary h3', orderSummary.title || '');
  setText('#sum-product', orderProduct.name || '');
  setText('.btn-wa', orderSummary.whatsappButton || '');

  renderOrderSummaryLabels();

  document.querySelectorAll('.region-note').forEach((note) => {
    note.textContent = (orderSummary.regionPrefix || '📍') + ' ' + (CONFIG.region || '');
  });

  reset();
}

function goHome() {
  document.getElementById('page-home').classList.add('active');
  document.getElementById('page-pedido').classList.remove('active');
  document.body.classList.remove('has-sticky-summary');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goPedido() {
  document.getElementById('page-home').classList.remove('active');
  document.getElementById('page-pedido').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  reset();
}

function selectQty(el, optionOrQty, legacyPrice, legacyFree) {
  document.querySelectorAll('.qty-card').forEach((card) => card.classList.remove('selected'));

  if (typeof legacyPrice === 'number') {
    selectedOption = {
      quantity: optionOrQty,
      grams: optionOrQty * 400,
      price: legacyPrice,
      freeDelivery: !!legacyFree
    };
  } else {
    const option = CONFIG.prices?.[optionOrQty];
    if (!option || option.isCustom) return;
    selectedOption = option;
  }

  el.classList.add('selected');

  qty = selectedOption.quantity;
  price = typeof selectedOption.price === 'number' ? selectedOption.price : null;
  free = !!selectedOption.freeDelivery;

  updateSummary();
}

function reset() {
  const emptyValue = getSummaryEmptyValue();
  const orderSummary = document.getElementById('order-summary-wrap');
  const emptyState = document.getElementById('empty-state');
  const deliveryEl = document.getElementById('sum-delivery');

  document.querySelectorAll('.qty-card').forEach((card) => card.classList.remove('selected'));

  qty = null;
  price = null;
  free = false;
  selectedOption = null;
  document.body.classList.remove('has-sticky-summary');

  if (orderSummary) orderSummary.classList.remove('visible');
  if (emptyState) emptyState.style.display = 'block';

  setText('#sum-qty', emptyValue);
  setText('#sum-weight', emptyValue);
  setText('#sum-delivery', emptyValue);
  setText('#sum-total', 'R$ ' + emptyValue);

  if (deliveryEl) {
    deliveryEl.classList.remove('status-free');
    deliveryEl.classList.add('status-neutral');
  }
}

function updateSummary() {
  if (!selectedOption) return;

  const summaryConfig = getOrderSummaryConfig();
  const emptyState = document.getElementById('empty-state');
  const orderSummaryWrap = document.getElementById('order-summary-wrap');
  const deliveryEl = document.getElementById('sum-delivery');

  if (emptyState) emptyState.style.display = 'none';
  if (orderSummaryWrap) orderSummaryWrap.classList.add('visible');
  document.body.classList.add('has-sticky-summary');

  setText(
    '#sum-qty',
    selectedOption.quantity + (selectedOption.quantity === 1 ? ' pacote' : ' pacotes')
  );
  setText('#sum-weight', formatWeight(selectedOption.grams));

  if (deliveryEl) {
    if (selectedOption.freeDelivery) {
      deliveryEl.textContent = summaryConfig.deliveryFreeLabel || 'GRÁTIS 🎉';
      deliveryEl.classList.remove('status-neutral');
      deliveryEl.classList.add('status-free');
    } else {
      deliveryEl.textContent = summaryConfig.deliveryPendingLabel || 'A combinar';
      deliveryEl.classList.remove('status-free');
      deliveryEl.classList.add('status-neutral');
    }
  }

  setText('#sum-total', formatCurrencyBRL(selectedOption.price));
}

function customOrder() {
  const productName = CONFIG.orderProduct?.name || 'Granola de Verdade';
  const message = CONFIG.whatsappMessages?.customOrder || {};

  window.open(
    buildWhatsAppUrl(
      (message.intro || '👋 Olá! Gostaria de fazer um pedido personalizado de') + ' ' + productName + '.\n\n' +
      (message.outro || 'Pode me passar informações sobre preços por kg e disponibilidade?')
    ),
    '_blank'
  );
}

function sendWhatsApp() {
  if (!selectedOption) return;

  const productName = CONFIG.orderProduct?.name || 'Granola de Verdade';
  const checkout = CONFIG.whatsappMessages?.checkout || {};
  const deliveryText = selectedOption.freeDelivery
    ? (checkout.freeDelivery || 'GRÁTIS ✅')
    : (checkout.pendingDelivery || 'a combinar');

  window.open(
    buildWhatsAppUrl(
      (checkout.titlePrefix || '🥣 *Pedido — ') + productName + '*\n\n' +
      '• Produto: ' + productName + '\n' +
      '• Pacotes: ' + selectedOption.quantity + '\n' +
      '• Peso total: ' + formatWeight(selectedOption.grams) + '\n' +
      '• Entrega: ' + deliveryText + '\n' +
      '• Total: ' + formatCurrencyBRL(selectedOption.price) + '\n\n' +
      (checkout.confirmText || 'Pode confirmar meu pedido? 😊')
    ),
    '_blank'
  );
}

function setupNavScroll() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

function setupFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  renderSiteMeta();
  renderBranding();
  renderHero();
  renderIngredients();
  setupIngredientsMarquee();
  renderStats();
  renderAbout();
  renderTestimonialsHeader();
  renderTestimonials();
  renderCta();
  renderOrderPage();
  setupNavScroll();
  setupFadeIn();

  console.log('Granola de Verdade — app iniciado');
  console.log('WhatsApp:', CONFIG.whatsapp);
});
