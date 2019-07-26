"use strict";
const suffix = Math.floor(Math.random() * 100);
const logger = require("../lib/logUtil").getLogger(`queueGroupSub-${suffix}`);
const NATS = require("nats");
const nc = NATS.connect("nats://localhost:4222");

nc.on("error", err => {
  logger.error(`got error: ${err.message}`);
});

const queueName = process.argv[2] || "worker";
nc.subscribe("updates", { queue: queueName }, msg => {
  logger.info(`worker got message: ${msg}`);
});
