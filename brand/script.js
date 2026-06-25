(function () {
  'use strict';

  /* ============ UTM Capture ============ */
  const params = new URLSearchParams(location.search);
  const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  utmFields.forEach(key => {
    const el = document.getElementById(key.replace('_', '-'));
    if (el) el.value = params.get(key) || '';
  });

  /* ============ Headline Variant Switching ============ */
  /* utm_content に応じて Hero Copy を差し替え（メッセージマッチ）
     v2 (2026-05-05): meta.md v2 hook と完全一致 + ad_set_name 経由の utm_content
     (例: "Meta-/-周辺層-/-ペイン訴求") も正しく axis を判定する */
  const VARIANTS = {
    'pain': {
      headline: '笑顔の作り方を、<br>忘れてないか。',
      variant: 'pain',
    },
    'benefit': {
      headline: '身体の奥から、<br>本音が響く90分。',
      variant: 'benefit',
    },
    'curiosity': {
      headline: '20年、ステージで叫び続けた女が<br>設計した90分。',
      variant: 'curiosity',
    },
    'proof': {
      headline: '400人の声が変わった、<br>対面90分。',
      variant: 'proof',
    },
  };
  /* axis 判定: 直接キー一致 OR ad_set_name 経由の日本語キーワード一致 */
  const AXIS_KEYWORDS = {
    pain:      ['pain', 'ペイン', '問題', 'peripheral', '周辺'],
    benefit:   ['benefit', 'ベネフィット', 'core', 'コア'],
    curiosity: ['curiosity', '好奇心', 'ストーリー', 'story', 'curio'],
    proof:     ['proof', '社会的証明', '証明', '社会'],
  };
  const contentKey = (params.get('utm_content') || '').toLowerCase();
  const matched = Object.keys(VARIANTS).find(axis =>
    contentKey.includes(axis) || AXIS_KEYWORDS[axis].some(kw => contentKey.includes(kw.toLowerCase()))
  );
  if (matched) {
    const h = document.querySelector('.hero-headline');
    if (h) {
      h.innerHTML = VARIANTS[matched].headline;
      h.dataset.variant = VARIANTS[matched].variant;
    }
  }

  /* ============ Bottom Fixed CTA Visibility ============ */
  const fixedCTA = document.getElementById('cta-fixed');
  const hero = document.getElementById('hero');
  if (fixedCTA && hero && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          fixedCTA.classList.add('visible');
        } else {
          fixedCTA.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });
    obs.observe(hero);
  }

  /* ============ Click Tracking ============ */
  /* fbq('track', 'Lead') / gtag('event', 'conversion', ...) への橋渡し */
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-track]');
    if (!target) return;
    const trackId = target.dataset.track;

    /* Meta Pixel */
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', { content_name: trackId });
    }

    /* Google Tag */
    if (typeof gtag === 'function') {
      gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: trackId,
      });
    }

    /* Console trace for dev */
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      console.log('[CTA]', trackId, { utm_content: params.get('utm_content') });
    }
  });

  /* ============ LINE Add Friend URL Injection ============ */
  /* 環境変数 or config から LINE ID を差し込む（デプロイ時に置換） */
  const LINE_ADD_URL = window.__PIKA_CONFIG?.lineAddUrl || 'https://lin.ee/REPLACE_ME';
  const lineBtn = document.getElementById('line-add-friend');
  if (lineBtn) {
    lineBtn.href = LINE_ADD_URL;
    if (LINE_ADD_URL.includes('REPLACE_ME')) {
      lineBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('LINE公式アカウントのURLが未設定です。\n本番デプロイ前に window.__PIKA_CONFIG.lineAddUrl を設定してください。');
      });
    }
  }

  /* ============ Fallback Form Submit ============ */
  const form = document.getElementById('fallback-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));

      /* Pixel Lead event */
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', { content_name: 'email_fallback' });
      }

      /* 本番ではここで fetch('/api/lead', {method:'POST', body: JSON.stringify(data)}) 等に置き換え */
      console.log('[Lead submit]', data);
      alert('ありがとうございます。メールでスケジュールをお送りします。');
      form.reset();
    });
  }

  /* ============ Lazy load photos when real assets land ============ */
  document.querySelectorAll('.photo-slot[data-src]').forEach(slot => {
    const src = slot.dataset.src;
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      slot.style.backgroundImage = `url(${src})`;
      slot.style.backgroundSize = 'cover';
      slot.style.backgroundPosition = 'center';
      slot.querySelector('.photo-slot-label')?.remove();
    };
    img.src = src;
  });
})();
