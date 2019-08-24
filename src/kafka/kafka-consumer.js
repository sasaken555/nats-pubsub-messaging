"use strict";

const logger = require("../lib/logUtil").getLogger("kafka-consumer");
const uuid = require("uuid/v4");

const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "c-" + uuid(),
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "default-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "cgtest" });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      logger.debug(
        `topic=${topic}, partition=${partition}, message=${message.value.toString()}`
      );
    }
  });
};

run().catch(logger.error);
