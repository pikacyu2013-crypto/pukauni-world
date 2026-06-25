# 📸 LP 撮影素材チェックリスト

このディレクトリに実写写真を配置すると、LPのプレースホルダーが自動で差し替わります。

---

## 必要な写真（優先順）

### 🔴 Must Have — ローンチ前必須

| ファイル名 | 用途 | 推奨仕様 |
|---|---|---|
| `hero-portrait.jpg` | HERO（ファーストビュー全画面） | 縦構図 / 1080×1920 以上 / JPG or WebP |
| `hero-portrait@2x.jpg` | HERO Retina対応 | 2160×3840 |
| `origin-drums.jpg` | ドラムボーカル時代の物語セクション | 4:5 縦 / 最小 800×1000 |
| `og-hero.jpg` | OGP / SNSシェア用 | 1200×630 |

### 🟡 Should Have — 配信初週までに

| ファイル名 | 用途 |
|---|---|
| `session-voice.jpg` | セッション中の声を出す瞬間（Visual-2 訴求） |
| `venue-osaka.jpg` | 大阪会場の空間写真 |
| `venue-tokyo.jpg` | 東京会場の空間写真 |

### 🟢 Nice to Have — リスティング運用後

| ファイル名 | 用途 |
|---|---|
| `circle.jpg` | 会場円陣の俯瞰カット |
| `portrait-landscape.jpg` | デスクトップ横構図バージョン |

---

## 撮影要件（image-brief.md より）

- **PIKA本人の実写**が最優先（AI生成画像禁止）
- プロフェッショナルフォトグラファー推奨
- 参加者が写る場合は**本人許諾必須**
- **PIKA☆UNIA** 表記（☆入り）のみ使用

---

## 配置後の動作

1. このディレクトリに上記ファイル名で画像を配置
2. LP の `index.html` の `photo-slot` 要素に `data-src="./assets/photos/hero-portrait.jpg"` を追加
3. 自動でプレースホルダー背景が差し替わる（`script.js` の lazy load ハンドラ）

---

## 暫定運用（撮影完了まで）

PIKA☆本人のFacebook/Instagram既存写真を本人許諾の上で暫定利用可能。
既存SNS素材の参照: `../../transcripts/` （テキスト中心・写真確認は別途）
