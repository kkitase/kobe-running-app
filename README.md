# フォームチェッカー

ランニングフォームをAIが分析し、改善アドバイスとトレーニングメニューを提案するWebアプリケーションです。

## 特徴

- **AI フォーム分析**: Gemini AI がランニングフォームを解剖学的・力学的に分析
- **改善アドバイス**: 接地位置、体幹の傾き、腕振りなどの具体的な改善点を提示
- **トレーニング提案**: 弱点克服のための練習ドリルを提案
- **音声読み上げ**: 分析結果を音声で聴くことができます
- **レスポンシブデザイン**: スマートフォンからも快適に操作可能

## 使用技術

| カテゴリ | 技術 |
|---------|------|
| Frontend | React 19, TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| AI | Google Gemini API |
| Icons | Lucide React |

## セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/tsuyoshikoutou/kobe-running-app.git
cd kobe-running-app
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env` ファイルを作成し、Gemini API キーを設定:

```
GEMINI_API_KEY=your_api_key_here
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

## ディレクトリ構成

```
├── components/          # UIコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ImageUploader.tsx
│   ├── StatusDisplay.tsx
│   └── AnalysisResultDisplay.tsx
├── hooks/               # カスタムフック
│   └── useRunningAnalysis.ts
├── services/            # 外部サービス連携
│   └── geminiService.ts
├── App.tsx              # メインアプリケーション
├── types.ts             # TypeScript型定義
└── vite.config.ts       # Vite設定
```

## 使い方

1. ランニングフォームの画像をアップロード（またはサンプル画像を選択）
2. 「AI診断を開始」ボタンをクリック
3. 分析結果（アドバイス・トレーニングメニュー）を確認
4. 必要に応じて音声で聴く・結果を共有

## 撮影のコツ

- 足が地面に着いた瞬間を撮影
- 真横から全身が入るように撮影
- 明るい場所でブレないように

## アーキテクチャ

詳細は [docs/architecture.md](docs/architecture.md) を参照してください。

```
┌─────────────────────────────────────────────────────────────┐
│                     React App (Vite)                        │
├─────────────────────────────────────────────────────────────┤
│  Components        Hooks                Services            │
│  ┌──────────┐     ┌──────────────────┐  ┌────────────────┐  │
│  │ Header   │     │useRunningAnalysis│  │ geminiService  │  │
│  │ Uploader │ ──▶ │  (状態管理)       │──▶│  (API連携)     │  │
│  │ Display  │     └──────────────────┘  └───────┬────────┘  │
│  └──────────┘                                   │           │
└─────────────────────────────────────────────────┼───────────┘
                                                  ▼
                                    ┌─────────────────────────┐
                                    │   Google Gemini API     │
                                    │  ・画像分析 (Vision)     │
                                    │  ・音声合成 (TTS)        │
                                    └─────────────────────────┘
```

## ライセンス

MIT License
