# NATS with Docker Compose

## About

Docker Composeを使ってNATSサーバを立ち上げます。
シンプルなものから応用編まで4種類用意しました。

## Which to use?

* シンプルにNATSサーバを立てたい。(1〜N台)
  * `docker-compose.yml`
  * ただし気をつけてください！このYAMLファイルで複数台のNATSサーバを立てた場合は、サーバ間でメッセージを共有しません！

* NATSサーバのクラスタを構築したい。
  * `docker-compose-clustered.yml`

* NATSサーバのクラスタを2つのシードサーバで構築したい。
  * `docker-compose-clustered-2seed.yml`

* Prometheus/Grafanaを使ってNATSサーバをモニタリングしたい。
  * `docker-compose-with-monitoring.yml`

## How to use

```bash
# 立ち上げる
$ docker-compose -f docker-compose-clustered.yml up -d
Creating network "docker-compose_default" with the default driver
Creating docker-compose_nats-seed_1 ... done
Creating docker-compose_nats-2_1    ... done
Creating docker-compose_nats-3_1    ... done

# 削除する
$ docker-compose -f docker-compose-clustered.yml down
Stopping docker-compose_nats-seed_1 ... done
Stopping docker-compose_nats-2_1    ... done
Stopping docker-compose_nats-3_1    ... done
Removing docker-compose_nats-seed_1 ... done
Removing docker-compose_nats-2_1    ... done
Removing docker-compose_nats-3_1    ... done
Removing network docker-compose_default
```
