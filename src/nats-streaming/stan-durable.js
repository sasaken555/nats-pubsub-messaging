"use strict";
const logger = require("../lib/logUtil").getLogger("stan-durable");

const uuid = require("uuid/v4");
const clientId = `c-${uuid()}`;
const stan = require("node-nats-streaming").connect("ponz-cluster", clientId);

stan.on("connect", () => {
  logger.info("connected!");

  // Published simple message.
  for (let pi = 0; pi < 5; pi++) {
    stan.publish("PUBLIC.user.updated", "user updated", (err, gid) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info("published message with gid: " + gid);
      }
    });
  }

  // Subscribe from last message with durable name.
  const opts = stan.subscriptionOptions();
  opts.setDeliverAllAvailable();
  opts.setDurableName("my-durable");

  let durableSub = stan.subscribe("PUBLIC.user.updated", opts);
  durableSub.on("message", msg => {
    logger.info(`Received message [${msg.getSequence()}] ${msg.getData()}`);
  });

  // Unsubscribe after 1 second.
  setTimeout(() => {
    durableSub.close(); // suspend subscription
    stan.close();
  }, 1000);
});

stan.on("close", () => {
  process.exit(0);
});
