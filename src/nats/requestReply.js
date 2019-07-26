"use strict";
const { getLogger } = require("../lib/logUtil");
const logger = getLogger("req-res");
const NATS = require("nats");
const nc = NATS.connect("nats://localhost:4222");

// setup subscription
nc.subscribe("time", (msg, reply) => {
  if (reply) {
    logger.debug(`subject=time, msg=${msg}, reply=${reply}`);
    nc.publish(reply, new Date().toLocaleDateString());
  }
});

// reply message subscription
const inbox = NATS.createInbox();
nc.subscribe(inbox, msg => {
  logger.debug(`subject=${inbox}, msg=${msg}`);
  nc.close();
});

// publish to "time" subject, expect to reply to inbox
nc.publish("time", "What time is it?", inbox);
