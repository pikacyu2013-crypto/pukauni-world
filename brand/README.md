# PIKA☆UNIA LP — 2026 Q2 無料体験キャンペーン

静的HTML/CSS/JS LP。Vercel or Cloudflare Pages にそのままデプロイ可能。

---

## 🎯 開発サーバー

```bash
cd "$(git rev-parse --show-toplevel)"
python3 -m http.server 4200 --directory lp
# → http://localhost:4200
```

プロジェクトルートから全体を serve している場合は http://localhost:3457/lp/ でアクセス可能。

---

## 🔑 デプロイ前の必須設定

### 1. Meta Pixel ID / Google Tag ID の注入

`lp/index.html` の以下の行を編集:
```html
<!-- fbq('init', '{{META_PIXEL_ID}}'); → 実IDに置換 -->
<!-- コメントアウト (// ) を外して有効化 -->
```

### 2. LINE 公式アカウント友だち追加URL

`lp/script.js` の先頭 or `index.html` の `<head>` に以下を追加:
```html
<script>
  window.__PIKA_CONFIG = {
    lineAddUrl: 'https://lin.ee/xxxxxxxx'  // ← LINE Developers Console から取得
  };
</script>
```

`lin.ee` 短縮URL未取得時は、LINE公式アカウントのチャネルURLで代替可能。

### 3. 実写画像の配置

`lp/assets/photos/` の [README](./assets/photos/README.md) を参照。
最低限 `hero-portrait.jpg` / `origin-drums.jpg` / `og-hero.jpg` の3枚でローンチ可能。

---

## 📐 訴求軸別バリアント（UTM駆動）

広告の `utm_content` パラメータで Hero Copy を自動切替:

| utm_content 値 | Hero Copy |
|---|---|
| `*pain*` | 笑いたいのに、笑えなかった私が辿り着いた90分。 |
| `*benefit*` | あなたの本音が、世界の価値になる。（デフォルト） |
| `*curiosity*` | 年商1400万の先で、私は何に氣づいたのか。 |
| `*proof*` | 400回のセッションが、辿り着いた90分。 |

広告の Ad Set 命名規則と合わせる:
- `meta-creative-1-pain` → utm_content=`meta_creative_1_pain` → Pain variant
- `meta-creative-2-benefit` → utm_content=`meta_creative_2_benefit` → Benefit variant

---

## 🧪 動作確認

```bash
# 各バリアント確認
open "http://localhost:4200/?utm_content=pain"
open "http://localhost:4200/?utm_content=benefit"
open "http://localhost:4200/?utm_content=curiosity"
open "http://localhost:4200/?utm_content=proof"
```

---

## 🚀 デプロイ（推奨）

### Vercel（推奨・静的サイト）
```bash
npx vercel --cwd lp --yes
```

### Cloudflare Pages
```bash
wrangler pages deploy lp --project-name=pika-unia-lp
```

### カスタムドメイン
- ブランドドメイン: （ユーザー確定）
- SSL: Vercel/Cloudflare 自動発行

---

## ✅ ローンチ前チェック

- [ ] Meta Pixel ID 注入済み
- [ ] Google Tag ID 注入済み（任意）
- [ ] LINE 友だち追加URL 注入済み
- [ ] `hero-portrait.jpg` 配置済み
- [ ] `origin-drums.jpg` 配置済み
- [ ] `og-hero.jpg` 配置済み
- [ ] 4バリアント（utm_content=pain/benefit/curiosity/proof）動作確認
- [ ] モバイル（iPhone 13 / Safari）で FV完全表示 + CTA 視認
- [ ] Lighthouse Performance 90以上
- [ ] リンク「男性でも参加できますか？」の回答確定
- [ ] FAQ「オンライン参加」回答確定（現状: 対面のみ）

---

## 🎨 デザイン仕様

- ベース色: `#F7F4EE` オフホワイト
- 墨黒: `#1A1A1A`
- 深紅アクセント: `#8B1A1A`
- 金アクセント: `#B8860B`
- フォント: Shippori Mincho（和文明朝） / Noto Sans JP（ゴシック）
- LINE緑: `#06C755`（CTAボタン）

image-brief.md / lp-brief.md と整合。
