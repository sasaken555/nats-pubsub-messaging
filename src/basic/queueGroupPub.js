"use strict";
const suffix = Math.floor(Math.random() * 100);
const logger = require("../lib/logUtil").getLogger(`queueGroupPub-${suffix}`);
const NATS = require("nats");
const nc = NATS.connect("nats://localhost:4222");

nc.on("error", err => {
  logger.error(`got error: ${err.message}`);
});

for (let i = 0; i < 10; i++) {
  logger.debug(`published #${i}`);
  nc.publish("updates", `message arrived #${i}`);
}
