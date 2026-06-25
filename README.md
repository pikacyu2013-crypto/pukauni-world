# pukauni.world

PIKA UNIA の3つのLPを統合した本番デプロイ用リポジトリ。
Cloudflare Pages により `pukauni.world` で配信される。

## 構成

| パス | LP | 出典 |
|------|----|----|
| `/` | ★ PIKA☆UNIA体験会 最新版 | `~/Desktop/PIKA☆UNIA体験会/lp/` |
| `/brand/` | PIKA brand 版 | `~/Desktop/PIKA brand/lp/` |
| `/old/` | taiken-session 旧版 | `~/Desktop/PIKA UNIA/Sales/taiken-session/lp/` |

## 更新方法

各 LP の修正は **元リポジトリ** で行い、本リポジトリに反映する場合は staging スクリプトで再同期する。
本リポジトリ内のファイルを直接編集しない。
