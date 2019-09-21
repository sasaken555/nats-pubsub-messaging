# NATSで始めるPub/Subメッセージング入門

## About

『NATSによるPub/Subメッセージング入門』に掲載されているソースコードのリポジトリです。
本文では扱えなかったトピックについても参考までに格納しています。

当リポジトリで利用するNATSサーバのバージョンは`2.0.4`です。

**-------2019/09/21追記 ここから-------**

2019/09/21にマイナーアップデートバージョンの`2.1.0`がリリースされました。
最新バージョンでの変更内容は追って反映する予定です。

**-------2019/09/21追記 ここまで-------**

## Topic

### 本文中に扱ったもの

* NATSサーバのセットアップ
* NATSの3つのメッセージングパターン別のクライアントアプリケーションの実装
* 認証・認可
* NATSサーバのクラスタ構築
* モニタリング

### 本文中で扱わなかったもの

* NATS Operatorを使ったKubernetes上での実行
* NATSと類似するプロダクトを使ったクライアントアプリケーションの実装比較
  * NATS Streaming
  * Kafka
  * Google Cloud Pub/Sub

## How to run NATS

### バイナリを実行

以下のリンクからダウンロードしてZIPファイルを解凍して実行ファイルにパスを通しましょう。  
https://github.com/nats-io/nats-server/releases

macOSユーザーならば、Homebrewからダウンロード可能です。

```bash
brew install nats-server
nats-server --help
```

### Kubernetesで実行

Kubernetes Operatorを使います。**個人的にオススメの方法です。**  
NATSの設定ファイルの操作をうまく隠しながらクラスタの立ち上げ・運用作業を実行できます。

詳細は `setup/nats/k8s` を参照してください。

### Docker Composeで実行

 ```bash
cd setup/nats/docker-compose
docker-compose up -d
```

詳細は `setup/nats/docker-compose` を参照してください。
