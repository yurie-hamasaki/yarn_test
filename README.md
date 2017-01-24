# yarn (+ webpack) 作業環境

## 事前準備

`yarn` を使用します。
```
$ npm install --g yarn

```

## 構築

ターミナルで `$ yarn i` を実行します。  
`node_modules` ディレクトリが作成され、必要モジュールが格納されます。

## 実行

```
$ yarn start
```

## ディレクトリ構成

```
├─ public	  // コンパイル先ディレクトリ
│   └── images    // コピーできなかったので直接置いてます…
│
├─ src    // 開発用ディレクトリ
│   ├── js     // main.jsをコンパイルしてpublicへ
│   ├── pug    // index.pugをコンパイルしてpublicへ
│   ├── images // うまくコンパイルができなかったのでどっちにも置いてます
│   └── styl   // main.stylをコンパイルしてpublicへ
│
├─ node_modules
├─ .git/
├─ .gitignore
├─ bs-config.js
├─ package.json
├─ webpack.config.babel.js
├─ yarn.lock
└─ README.md
```

### TODO
 * imageのコンパイルがうまくいきませんでした。TODO: なぜだ？
 * file-loaderでoutputPathを指定しているが、指定されているところと違う場所に生成されてしまう TODO: なぜだ？
 *  buildタスクをかく（buildタスクいるのか？）  
   * "build": "NODE_ENV=production webpack --progress --hide-modules"
   * webpack.config.babel.js内を分けた方がいいのか、別ファイルを用意した方がいいのか
