# express_cloudflarer2
Expressでapiを作成して、cloudflareのR2に画像データを保存するプロセス

## .envを設定しよう。keyはcloudflareのR2のGUI画面から取得する
```
R2_ACCESS_KEY_ID=*********
R2_SECRET_ACCESS_KEY=*********
ENDPOINT=*********
BUKET_NAME=*********
```

### つぎはこのライブラリも試してみたい。
[hono-storage](https://github.com/sor4chi/hono-storage)