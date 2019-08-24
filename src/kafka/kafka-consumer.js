"use strict";

const logger = require("../lib/logUtil").getLogger("kafka-consumer");

const kafka = require("kafka-node");
const client = new kafka.KafkaClient({
  kafkaHost: "localhost:9092"
});
const topics = [{ topic: "test", partition: 0 }];
const options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024
};
const consumer = new kafka.Consumer(client, topics, options);

consumer.on("message", msg => {
  logger.debug(`Message received : ${msg.value}`);
});

consumer.on("error", err => {
  logger.error(err);
});
