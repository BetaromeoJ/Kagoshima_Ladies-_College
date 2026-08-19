# ロイロ×Google維新 in鹿児島 2026

## サイトの目的

「ロイロ×Google維新 in鹿児島 2026　〜ロイロとGoogleで紡ぎ逢い〜」（令和8年8月8日(土) 10:00〜16:30／宝山ホール／主催：LEG鹿児島）の登壇に合わせて作成した、スマートフォン・iPad対応のイベントポータルサイトです。単なる登壇資料ではなく、次の3つの役割を持ちます。

1. セッション当日に参加者が操作しながら使う
2. セッション後に復習できる
3. 校務や授業で困ったときに、必要なプロンプトや手順を見直せる

基礎的な操作（ボイスメモの録音、Geminiへの添付、Canvaへの読み込みなど）は「基礎操作」ページの動画へ誘導し、6つの講座（本編）では校務改善・授業改善・教材作成・安全な活用に集中できる構成にしています。

デザイン（配色・タイポグラフィ・カードの浮き上がり演出・スプラッシュ演出）は、中種子町情報教育部会研修会サイトの仕様を踏襲しています。

## ファイル構成

```
/
├── index.html                      トップページ（ヒーロー、セッションのゴール、6講座カード、講師紹介、著作紹介）
├── courses/
│   ├── 01-voice-gemini.html         第1講座：iPadの音声をGeminiで仕事に変える
│   ├── 02-document-transform.html   第2講座：同じ情報をGemini Notebookで別の文書に変換する
│   ├── 03-gemini-notebook.html      第3講座：Gemini Notebookで資料を活用する
│   ├── 04-lesson-reflection.html    第4講座：授業音声を振り返りに生かす
│   ├── 05-studio-canva.html         第5講座：StudioとCanvaで教材を作る
│   └── 06-safety.html               第6講座：学校で安全に生成AIを使う
├── guides/
│   ├── basic-operation.html         基礎操作（7項目・動画＋手順）
│   ├── troubleshooting.html         トラブル対処
│   └── youtube.html                 解説動画一覧（basic-operation.htmlの動画リンク集）
├── assets/
│   ├── css/style.css                共通スタイル（配色・演出はすべてここで管理）
│   ├── js/main.js                   共通スクリプト（コピー・アコーディオン・スプラッシュ等）
│   └── images/                      講師写真・書影・バッジ・QRコードを置く場所
└── README.md
```

ビルド環境は不要な**静的HTML**です。ファイル一式をそのままアップロードするだけで動作します。

## GitHub Pagesでの公開方法

1. このフォルダ一式（`index.html` と `courses/` `guides/` `assets/` を含む）をGitHubリポジトリのルート（または `docs/` フォルダ）にアップロードします。
2. リポジトリの `Settings > Pages` で、公開元のブランチとフォルダ（`/root` または `/docs`）を指定します。
3. 数分後に `https://（ユーザー名）.github.io/（リポジトリ名）/` で公開されます。
4. 公開後、スマートフォン・iPad・PCそれぞれで表示を確認してください（下記「公開前の確認事項」も参照）。

`file://` で直接HTMLファイルを開いても、フォルダ内リンク・コピー機能ともに動作します（外部からのHTML取り込み処理は使用していません）。

## 画像の配置状況（このバージョンで反映済み）

| ファイル名 | 用途 | 状態 |
|---|---|---|
| `working-with-chromebook.gif` | 講師紹介の写真（トップページ `#instructor`） | 配置済み |
| `google-trainer-badge.png` | Google for Education 認定トレーナーのバッジ画像 | 配置済み |
| `canvassador-badge.png` | Canva Canvassadorのバッジ画像 | 配置済み |
| `geg-kagoshima-openchat-qr.png` | GEG Kagoshima オープンチャットのQRコード | 配置済み |
| `book-cover.png` | 著作カードの書影 | 配置済み |
| `step2-demo-audio-qr.png` | STEP2演習用デモ音声のQRコード | 配置済み |

画像が見つからない場合も背景色とアイコンでレイアウトが崩れないようになっています（講師写真・バッジ・書影は `onerror` でフォールバック表示に切り替わります）。

## 講師プロフィールの編集箇所

`index.html` 内の以下のコメントで囲まれた範囲を編集してください。

```html
<!-- 講師プロフィール：ここから編集 -->
  …氏名、読み仮名、所属、資格バッジ（.grad-pill）、経歴、まとめのひとこと（.quote-box）…
<!-- 講師プロフィール：ここまで -->
```

現在、講師写真には `assets/images/working-with-chromebook.gif` を使用しています。差し替える場合は、`index.html` の `.instructor-photo` 内の `<img src="...">` のパスを書き換えてください。資格バッジの画像は `assets/images/google-trainer-badge.png`（Google for Education 認定トレーナー）と `assets/images/canvassador-badge.png`（Canva Canvassador）です。

## 書籍情報の編集箇所

`index.html` 内の以下のコメントで囲まれた範囲を編集してください。

```html
<!-- 著作情報：ここから編集 -->
  <!-- 著作カード1：ここから編集（書名・出版社・著者・紹介文・画像・リンクを差し替え） -->
    … .book-card 1ブロック …
  <!-- 著作カード1：ここまで -->
<!-- 著作情報：ここまで -->
```

書影は `assets/images/book-cover.png` です。書籍を増やす場合は、`.book-card` 1ブロックをコピーして貼り付け、書名・出版社/著者・定価等のリスト・画像パス・リンク先を書き換えてください。画像が無くても本のアイコンが表示され、レイアウトは崩れません。

## YouTube URLの変更方法

`guides/basic-operation.html` の各カードにある以下のコメント箇所を編集します。

```html
<!-- YouTube URL：ここを差し替え（下のiframeのコメントを外し、srcを実際のURLに変更してください） -->
<!-- <iframe src="https://www.youtube.com/embed/XXXXXXXXXXX" ...></iframe> -->
```

1. `<iframe>` 行のコメント（`<!--` `-->`）を外す
2. `src` の `XXXXXXXXXXX` を実際のYouTube動画ID（`https://www.youtube.com/embed/`の後ろの文字列）に差し替える
3. 直下の「動画を開く」ボタン（`<a href="...">`）のリンク先も、実際の動画URLに差し替える

`guides/youtube.html` にも同じ動画への一覧リンクがあるため、同様にURLを差し替えてください。

## 新しい講座ページの追加方法（例：第7講座）

1. `courses/06-safety.html` をコピーし、`courses/07-〇〇〇.html` として保存します。
2. パンくずリスト・講座番号バッジ・タイトル・各見出しの内容を書き換えます。
3. `index.html` の「講座一覧」セクションに、`.course-card` 1ブロックをコピーして追加します。
4. 直前の講座ページ（この例では `06-safety.html`）の「次の講座へ」ボタンのリンク先を `07-〇〇〇.html` に差し替えます。
5. 各ページのヘッダー・モバイルメニュー内のリンクは、必要に応じて追加してください（必須ではありません）。

## プロンプトの追加方法

各講座ページの以下のコメントで囲まれた範囲に、`.prompt-card` 1ブロックをコピーして追加してください。

```html
<!-- コピー用プロンプト：ここから -->
  <div class="prompt-card"> … </div>
<!-- コピー用プロンプト：ここまで -->
```

`.prompt-body` の `id` は、その講座ページ内で重複しないユニークな値にしてください（例：`prompt1-4`）。`.copy-btn` の `data-copy-target` に、対応する `.prompt-body` の `id` を `#` 付きで指定すると、コピー機能が自動的に有効になります。

## 配色の変更方法

`assets/css/style.css` の先頭にある `:root { ... }` ブロック（配色設定）の値だけを書き換えれば、サイト全体の色が変わります。個別のHTMLやクラスを探して直す必要はありません。

```css
:root {
  --color-blue: #4f6df5;   /* メインカラー */
  --color-purple: #7c5cf0; /* サブカラー（グラデーション用） */
  --color-ink: #111114;    /* ボタン・見出しの濃い色 */
  ...
}
```

## 公開前の確認事項

- [ ] すべての相対リンク（`courses/` `guides/` `assets/` への行き来）が正しくつながっているか
- [ ] すべてのページで `style.css` と `main.js` が読み込まれているか
- [ ] 第2階層（`courses/` `guides/`）の各ページから、トップページへ戻れるか
- [ ] iPad Safariで表示したときに横スクロールが発生しないか
- [ ] プロンプトのコピーボタンが動作し、「コピーしました」の通知が表示されるか
- [ ] トップページ・6つの講座ページのオープニング演出（黒い幕が下から上へ流れて消える）が2秒程度で終わり、操作を妨げないか（各ページ、同一セッション中は再訪時に表示されないことも確認）
- [ ] 講師写真・書影の画像が無い状態でもレイアウトが崩れないか
- [ ] 講師プロフィール・著作情報が最新の内容になっているか
- [ ] YouTube動画のURLを実際のリンクに差し替えたか
- [ ] GitHub Pagesで公開後、実機（スマートフォン・iPad・PC）で表示確認したか
- [ ] すべてのページが日本語で表示されているか
