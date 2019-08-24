"use strict";

const logger = require("../lib/logUtil").getLogger("kafka-producer");

const kafka = require("kafka-node");
const client = new kafka.KafkaClient({
  kafkaHost: "localhost:9092"
});
const options = {
  requireAcks: 1,
  ackTimeoutMs: 100
};
const producer = new kafka.Producer(client, options);

producer.on("ready", () => {
  logger.debug("producer ready");
  const payloads = [{ topic: "test", messages: "kafka message" }];
  producer.send(payloads, (err, data) => {
    logger.debug(JSON.stringify(data));
  });
});

producer.on("error", err => {
  logger.error(err);
});
