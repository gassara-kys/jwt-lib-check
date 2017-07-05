# jwt-lib-check

## 準備

- 公開暗号鍵の生成
- ※本来プラベートキーはpublicリポジトリにコミットしちゃダメゼッタイ。（今回はサンプルのためコミット）
```bash
# 鍵の準備
$ openssl genrsa 2048 > private-key.pem
$ openssl rsa -pubout < private-key.pem > public-key.pem
```

- 必要なモジュールインストール
```bash
# 依存モジュール(package.json)
$ npm install

# DB準備
$ brew install mongodb

# mongoDBを自動起動
$ ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```

## 構成

```
jwt-lib-check/nodejs
|--README.md
|--app
|  |--api
|  |  |--user
|  |  |  |--index.js      // 認証が必要なAPI
|  |--models
|  |  |--user.js          // ユーザースキーマ定義
|--config.js
|--node_modules
|  |--(いろいろ)
|--package.json
|--samplekey
|  |--private-key.pem     // 秘密鍵  （JWT作成）
|  |--public-key.pem      // 公開鍵  （JWT署名検証）
|--scripts
|  |--gen_hmac_jwt.js     // JWTお試し作成HMAC-SHA256
|  |--gen_rsa256_jwt.js   // JWTお試し作成RSA256
|  |--verify_jwt.js       // JWTの署名のお試し検証
|--server.js

```

## お試し

```bash
# テストデータ作成
$ curl http://localhost:8080/setup
```

### JWT

```bash
# Token取得
$ curl http://localhost:8080/api/authenticate \
  -d "name=demouser" -d "password=password" -XPOST

# 認可が必要なエンドポイント（token valid:200, invalid:403 ）
$ curl http://localhost:8080/api/ -H "x-access-token:{token}"

# JWT :
#   {base64(ヘッダ)}+"."+{base64(ペイロード)}+"."+{署名}
#     ※{署名}= alg(secretKey, base64(ヘッダ)}+"."+{base64(ペイロード))


$ curl http://localhost:8080/api/ \
  -H "x-access-token:{JWT}"

```

## scripts

```bash
# JWT作成 HS256
$ node nodejs/scripts/gen_hmac_jwt.js
{JWT}

# JWT作成 RSA256
$ node nodejs/scripts/gen_rsa256_jwt.js
{JWT}

$ node nodejs/scripts/verify_jwt.js {JWT}

```
