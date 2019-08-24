"use strict";

const logger = require("../lib/logUtil").getLogger("kafka-producer");
const uuid = require("uuid/v4");

const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "p-" + uuid(),
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  for (let mi = 0; mi < 10; mi++) {
    await producer.send({
      topic: "cgtest",
      messages: [{ value: `#${mi} message` }]
    });
    logger.debug(`#${mi} message published!`);
  }
};

run()
  .catch(logger.error)
  .then(() => producer.disconnect());
