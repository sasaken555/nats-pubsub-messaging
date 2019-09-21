# NATS with Kubernetes

## About

NATS Operatorを使ってKubernetes上にNATSサーバのクラスタを構築します。

NATS OperatorのインストールはYAMLファイルの適用とHelm Chartの利用の2種類あります。  
Helm Chartが一番楽ですが、クラスタ同士の連結のような機能に制限があります。
このリポジトリではYAMLファイルの適用による方法を紹介します。

Helm Chartによるインストール方法は以下を参照してください。
[NATS Operator Helm Chart](https://github.com/nats-io/nats-operator/tree/master/helm/nats-operator)

## How to use

```bash
kubectl apply -f 00-prereqs.yaml
kubectl apply -f 10-deployment.yaml
kubectl apply -f 20-nats-cluster.yaml
```

## Deep Dive

### `00-prereqs.yaml`

* NATS Operatorの操作に必要な権限設定を作成します。

* NameSpace, ServiceAccount, ClusterRole, ClusterRoleBindingを作成します。

### `10-deployment.yaml`

* NATS Operator本体のDeploymentを作成します。

* Operatorを作成すると、`natsclusters`と`natsserviceroles`の2つのCRDが作成されます。

* `natsclusters.nats.io`
  * NATSサーバのクラスタ作成を司るCRD

* `natsserviceroles.nats.io`
  * NATSサーバの認証認可を司るCRD

### `20-nats-cluster.yaml`

* NATSサーバのクラスタを作成します。

* ファイル名先頭が21/22のファイルは置き換え可能です。
