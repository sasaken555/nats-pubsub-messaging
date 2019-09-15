"use strict";
const logger = require("../lib/logUtil").getLogger("stan-basic");

const uuid = require("uuid/v4");
const clientId = `c-${uuid()}`;
const stan = require("node-nats-streaming").connect("ponz-cluster", clientId);

stan.on("connect", () => {
  logger.info("connected!");

  // Published simple message.
  stan.publish("PUBLIC.user.created", "user created", (err, gid) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info("published message with gid: " + gid);
    }
  });

  // Subscribe from last message.
  // In this sample, subscribe all messages.
  const opts = stan.subscriptionOptions().setStartWithLastReceived();
  const subscription = stan.subscribe("PUBLIC.user.created", opts);
  subscription.on("message", msg => {
    logger.info(`Received message [${msg.getSequence()}] ${msg.getData()}`);
  });

  // Unsubscribe after 1 second.
  setTimeout(() => {
    subscription.unsubscribe();
    subscription.on("unsubscribed", () => {
      stan.close();
    });
  }, 1000);
});

stan.on("close", () => {
  process.exit(0);
});
