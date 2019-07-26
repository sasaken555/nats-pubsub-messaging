#!/bin/bash

gcloud pubsub topics create my-topic
gcloud pubsub subscriptions create --topic my-topic my-sub
