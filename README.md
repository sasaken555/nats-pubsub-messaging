# NATSで始めるPub/Subメッセージング入門

## About

『NATSで始めるPub/Subメッセージング入門』の文中に出てくるコードのリポジトリです。 
 
## How to use

NATS, NATS Exporter, Prometheus, Grafanaを立ち上げる
 
 ```bash
cd setup/nats
docker-compose up -d
```

NATSを3ノードのクラスタで立ち上げる
 
 ```bash
cd setup/nats
docker-compose -f docker-compose-clustered.yml up -d
```
