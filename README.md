# 本の感想共有アプリケーション<br>The Books

## - The Booksの説明 -
これは、本の感想を共有するためのアプリケーションです。

### バックエンド使用言語 ／ フレームワーク
- Node.js / Express

### フロントエンド使用言語 ／ フレームワーク
- HTML
- CSS
- Javascript / Vue.js

### ライブラリ

### アプリケーションの主な機能
- ユーザー登録機能
- ログイン／ログアウト機能
- トップページ
  - 新着投稿の表示(最大5記事でページネーション)
  - ジャンル切り替え(プルダウンのリストから非同期で記事をソート)
  - 感想投稿ボタン(ログイン後に表示)
- ユーザページ
  - ジャンル別投稿数の表示(ボタンを押すとジャンルで本をソート)
  - 感想を投稿した本のリスト表示(最大9件でページネーション)
  - 投稿した感想の更新／削除
- 感想投稿ページ
  - 本のタイトル、著者、本の画像登録
  - 感想のタイトル、感想文の入力
- 投稿記事詳細ページ
  - 投稿された感想の内容を表示
