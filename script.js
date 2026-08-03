(function () {
  'use strict';

  const params = new URLSearchParams(location.search);

  /* ============ Dynamic H1 (5 variants from copy-variant-a.md) ============
   * URL ?v=A|B|C|D|E で Hero H1 を切り替える。
   * デフォルトは A（解放のドラム差別化）
   * utm_content の日本語キーワードからも fallback で判定
   */
  const VARIANTS = {
    A: {
      h1: '解放のドラムが、<br>あなたを変える。',
      sub: '人は、解放なしには生きていけない。<br>本音を叫ぶ120分。大阪・東京 — 完全無料リアル体験、受付中。'
    },
    B: {
      h1: '夢を止めてる、<br>そいつを、爆破する。',
      sub: '怒りも、悲しみも、苦しみも。解放のドラムが、全部、外に出す120分。'
    },
    C: {
      h1: '思考が、止まる。<br>残るのは、ありのままの自分。',
      sub: 'ヨガでも瞑想でも届かなかった奥に、解放のドラムだけが届く。120分のリアル体験。'
    },
    D: {
      h1: '目が笑ってないって、<br>もう言わせない。',
      sub: '本音を飲み込み続けたあなたへ。解放のドラムが、笑顔の奥を取り戻す120分。'
    },
    E: {
      h1: '本来の自分に戻る、<br>120分。',
      sub: 'PIKA☆UNIA 解放のドラム体験会。大阪・東京 — 完全無料、お一人さま1回限り。'
    }
  };

  /* ============ 参加者の声 VOICES データ ============
   * ⚠️ 実在の参加者の声のみ掲載すること。捏造は誇大広告・ダークパターンとして禁止。
   * 取得元: FB/Instagramコメント・LINEフィードバック・体験会後アンケート（掲載許諾を得たもの）。
   * 実名/顔出しNGの場合は seg（年代/都市/属性）のみで匿名表示。
   * 下記は placeholder:true のUI確認用サンプル。本番公開前に実証言へ差し替える。
   * 差し替え方法: quote=実際の声、seg=属性、placeholder行を削除。配列の件数がそのままスライド枚数。
   */
  const VOICES = [
    {
      photo: 'assets/voices/v1.png',
      headline: '思考が飛んで、一瞬で“自分に戻る感覚”があった。',
      quote: '涙も笑いも止まらない時間でした。ずっと置いてきた自分を迎えに行けた気がします。',
      seg: '栃木県在住　40代女性／飲食店経営'
    },
    {
      photo: 'assets/voices/v2.png',
      headline: '楽しすぎて童心の喜びがすごかった！',
      quote: '自分の“音”を初めて全身で浴びて、理屈じゃなくて気づいたら身体が先に動いてた！最幸の時間とセッションありがとうございました！',
      seg: '北海道在住　30代女性／コーチコンサルタント'
    },
    {
      photo: 'assets/voices/v3.png',
      headline: 'マジサイコーだったぁ！！！！ 鼓動が高鳴って最高に楽しかった',
      quote: 'これぞ「解放」を体感してやりたいことにチューニングできました！',
      seg: '東京都在住　20代女性／ときめきナビゲーターみほほ'
    },
    {
      photo: 'assets/voices/v4.png',
      headline: '言葉を交わさずとも私の中の本質を見抜かれたようなそんな時間でした。',
      quote: '人を優先してしまう私の癖が認識できて、音の解放は人生と繋がってる、もっと自分の音を出したくなりました！継続的に受けていきたいです。',
      seg: '福島県在住　30代女性／オンライン秘書'
    },
    {
      photo: 'assets/voices/v5.png',
      headline: 'まるで人生が聞こえて来るようでした。',
      quote: '胸の奥が揺さぶられて、溢れるほどにエネルギーに満ち溢れて、家族や周り、自分自身にも感謝の気持ちが湧き上がりました。ありがとうございました！',
      seg: '北海道在住　30代女性／シンガーソングライター　小澤ちひろ'
    },
    {
      photo: 'assets/voices/v6.png',
      headline: '受け取れたのは『世界の真理』でした。',
      quote: '自己解放セッションで安心感が身体に刻まれて、世界と繋がってる感がバチバチして、自分への無価値観が音を浴びた瞬間に、一瞬で消え自分の能力に気づけた。',
      seg: '兵庫県在住　30代女性／マインドコンサルタント'
    },
    {
      photo: 'assets/voices/v7.png',
      headline: '何にも縛られない自由な自分の感覚を思い出せた。',
      quote: '思考優位になっていて枠の中に収まる感覚だったけど、何にも縛られない自由な自分の感覚を思い出せた。',
      seg: '東京都在住　30代女性／心身調律師'
    },
    {
      photo: 'assets/voices/v8.png',
      headline: '人の目ばかり気にしてた自分が、思いっきり笑って叫んでた。',
      quote: '解放ってこういうことなんだ！自分ってこんなに感覚豊かだったんだって嬉しかったです。',
      seg: '大阪府在住　20代女性／学生'
    }
  ];

  const AXIS_KEYWORDS = {
    A: ['drum', 'ドラム', '解放', 'release'],
    B: ['pain', 'ペイン', '爆破', '夢', '怒り', 'anger'],
    C: ['mechanism', 'メカニズム', '思考', '愛着', 'core'],
    D: ['peripheral', '周辺', '笑え', '飲み込', '抑圧'],
    E: ['brand', 'ブランド', '認知', 'awareness', 'proof']
  };

  const vParam = (params.get('v') || '').toUpperCase();
  let chosen = VARIANTS[vParam] ? vParam : null;

  if (!chosen) {
    const contentKey = (params.get('utm_content') || '').toLowerCase();
    chosen = Object.keys(AXIS_KEYWORDS).find(k =>
      AXIS_KEYWORDS[k].some(kw => contentKey.includes(kw.toLowerCase()))
    );
  }

  if (chosen && chosen !== 'A') {
    const h1 = document.querySelector('.hero-headline');
    const sub = document.querySelector('.hero-sub');
    if (h1) {
      h1.innerHTML = VARIANTS[chosen].h1;
      h1.dataset.variant = chosen;
    }
    if (sub) sub.innerHTML = VARIANTS[chosen].sub;
  }

  /* ============ UTM Capture (fallback form hidden fields) ============ */
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(key => {
    const el = document.getElementById(key.replace('_', '-'));
    if (el) el.value = params.get(key) || '';
  });

  /* ============ LINE Add Friend URL Injection ============ */
  /* 広告経由の判定: 広告リンクだけが utm_source を運ぶ(オーガニックのfbclid等は無視)。
     一度広告と判定したら sessionStorage に保持し、ページ内遷移後もエルメの広告用流入経路(uLand=h8PD0L)へ誘導する */
  const AD_SOURCES = window.__PIKA_CONFIG?.adUtmSources || [];
  const utmSource = (params.get('utm_source') || '').toLowerCase();
  if (AD_SOURCES.includes(utmSource)) {
    try { sessionStorage.setItem('pika_ad_visitor', '1'); } catch (_) {}
  }
  let isAdVisitor = false;
  try { isAdVisitor = sessionStorage.getItem('pika_ad_visitor') === '1'; } catch (_) {}
  const LINE_ADD_URL = (isAdVisitor && window.__PIKA_CONFIG?.lineAddUrlAd)
    || window.__PIKA_CONFIG?.lineAddUrl
    || 'https://s.lmes.jp/landing-qr/2007823244-g627Jxpo?uLand=FDsNFP';
  const lineBtn = document.getElementById('line-add-friend');
  if (lineBtn) {
    lineBtn.href = LINE_ADD_URL;
    if (LINE_ADD_URL.includes('REPLACE_ME')) {
      lineBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('LINE公式アカウントのURLが未設定です。');
      });
    }
  }

  /* ============ Bottom Fixed CTA Visibility ============ */
  const fixedCTA = document.getElementById('cta-fixed');
  const hero = document.getElementById('hero');
  const ctaSection = document.getElementById('cta');

  if (fixedCTA && hero && 'IntersectionObserver' in window) {
    const heroObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          fixedCTA.classList.add('visible');
        } else {
          fixedCTA.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });
    heroObs.observe(hero);

    /* Hide fixed CTA when main CTA section is in view */
    if (ctaSection) {
      const ctaObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            fixedCTA.classList.remove('visible');
          } else if (window.scrollY > window.innerHeight * 0.5) {
            fixedCTA.classList.add('visible');
          }
        });
      }, { threshold: 0.2 });
      ctaObs.observe(ctaSection);
    }
  }

  /* ============ Click Tracking (Pixel + GA4) ============ */
  const trackEventMap = {
    hero_cta:  { ga: 'cta_hero_click',  meta: 'InitiateCheckout' },
    dates_cta: { ga: 'cta_dates_click', meta: null },
    main_cta:  { ga: 'cta_main_click',  meta: 'InitiateCheckout' },
    fixed_cta: { ga: 'cta_fixed_click', meta: null }
  };

  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-track]');
    if (!target) return;
    const trackId = target.dataset.track;
    const cfg = trackEventMap[trackId];
    if (!cfg) return;

    if (typeof fbq === 'function') {
      fbq('track', 'Lead', { content_name: trackId });
      if (cfg.meta) fbq('track', cfg.meta, { content_name: trackId });
    }
    if (typeof gtag === 'function') {
      gtag('event', cfg.ga, {
        event_category: 'engagement',
        event_label: trackId,
        utm_content: params.get('utm_content') || ''
      });
    }
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      console.log('[CTA]', trackId, { variant: chosen, utm_content: params.get('utm_content') });
    }
  });

  /* ============ Scroll Depth Tracking (70 / 100) ============ */
  const scrollMarks = [70, 100];
  const fired = new Set();
  let ticking = false;

  function checkScrollDepth() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((window.scrollY / docHeight) * 100);
    scrollMarks.forEach(m => {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        if (typeof gtag === 'function') {
          gtag('event', `scroll_${m}`, { depth_pct: m });
        }
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ============ Fallback Form Submit ============ */
  const form = document.getElementById('fallback-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));

      if (typeof fbq === 'function') {
        fbq('track', 'CompleteRegistration', { content_name: 'email_fallback' });
      }
      if (typeof gtag === 'function') {
        gtag('event', 'form_submit_email', { ...data });
      }

      console.log('[Lead submit]', data);
      alert('ありがとうございます。メールでスケジュールをお送りします。');
      form.reset();
    });
  }

  /* ============ FAQ Expand Tracking ============ */
  document.querySelectorAll('.faq details').forEach((d, i) => {
    d.addEventListener('toggle', () => {
      if (d.open && typeof gtag === 'function') {
        gtag('event', 'faq_expand', { faq_index: i });
      }
    });
  });

  /* ============ Scroll-triggered fade-in (optional, non-essential) ============ */
  if ('IntersectionObserver' in window) {
    const fadeObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });

    document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));
  }

  /* ============ 参加者の声 カルーセル ============ */
  (function initVoiceCarousel() {
    const section = document.getElementById('voice');
    if (!section) return;
    const track = section.querySelector('[data-carousel-track]');
    const dotsWrap = section.querySelector('[data-carousel-dots]');
    const prevBtn = section.querySelector('[data-carousel-prev]');
    const nextBtn = section.querySelector('[data-carousel-next]');
    if (!track) return;

    const list = (Array.isArray(VOICES) ? VOICES : []).filter(v => v && v.quote);
    if (!list.length) { section.hidden = true; return; }

    const hasPlaceholder = list.some(v => v.placeholder);
    section.dataset.state = hasPlaceholder ? 'sample' : 'live';
    if (hasPlaceholder) {
      console.warn(
        '[VOICE] プレースホルダーの声が ' + list.filter(v => v.placeholder).length +
        ' 件表示されています。本番公開前に script.js の VOICES を実証言へ差し替えてください。'
      );
    }

    const frag = document.createDocumentFragment();
    list.forEach(v => {
      const li = document.createElement('li');
      li.className = 'voice-card';
      if (v.placeholder) li.dataset.placeholder = 'true';

      const nodes = [];

      if (v.photo) {
        const fig = document.createElement('figure');
        fig.className = 'voice-avatar';
        const img = document.createElement('img');
        img.src = v.photo;
        img.alt = (v.seg ? v.seg + ' — ' : '') + '体験会参加者';
        img.loading = 'lazy';
        img.decoding = 'async';
        fig.appendChild(img);
        nodes.push(fig);
      }

      const mark = document.createElement('span');
      mark.className = 'voice-quote-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = '“';
      nodes.push(mark);

      if (v.headline) {
        const h = document.createElement('p');
        h.className = 'voice-headline';
        h.textContent = v.headline;
        nodes.push(h);
      }

      const q = document.createElement('p');
      q.className = 'voice-quote';
      q.textContent = v.quote;
      nodes.push(q);

      const a = document.createElement('p');
      a.className = 'voice-attribution';
      a.textContent = v.seg || '体験会参加者';
      nodes.push(a);

      li.append(...nodes);
      frag.appendChild(li);
    });
    track.appendChild(frag);

    const cards = Array.from(track.children);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'voice-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', (i + 1) + '番目の声へ');
      dot.addEventListener('click', () => scrollToCard(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function setActive(i) {
      current = i;
      dots.forEach((d, di) => d.classList.toggle('is-active', di === i));
      if (prevBtn) prevBtn.disabled = i <= 0;
      if (nextBtn) nextBtn.disabled = i >= cards.length - 1;
    }

    function scrollToCard(i) {
      i = Math.max(0, Math.min(cards.length - 1, i));
      const card = cards[i];
      const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      track.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? 'auto' : 'smooth' });
      setActive(i);
    }

    let scrollRaf = null;
    track.addEventListener('scroll', () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0, min = Infinity;
        cards.forEach((c, ci) => {
          const d = Math.abs((c.offsetLeft + c.clientWidth / 2) - center);
          if (d < min) { min = d; nearest = ci; }
        });
        if (nearest !== current) setActive(nearest);
      });
    }, { passive: true });

    if (prevBtn) prevBtn.addEventListener('click', () => scrollToCard(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollToCard(current + 1));

    setActive(0);
  })();
})();
