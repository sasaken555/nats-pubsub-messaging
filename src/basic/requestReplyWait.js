"use strict";
const { getLogger } = require("../lib/logUtil");
const logger = getLogger("req-res-wait");
const NATS = require("nats");
const nc = NATS.connect({
  url: "nats://localhost:4222",
  json: true
});

nc.on("connect", () => {
  logger.debug("connected!!");
});

nc.on("error", err => {
  logger.error(err.message);
});

nc.request("updates", new Date().toLocaleDateString(), { max: 1 }, response => {
  if (
    response instanceof NATS.NatsError &&
    response.code === NATS.REQ_TIMEOUT
  ) {
    logger.warn("request timeout");
    return;
  }
  logger.debug(`got message in publisher(request): ${response}`);
});

nc.requestOne("updates", "hogehoge", 1000, response => {
  logger.debug(`got message in publisher(requestOne): ${response}`);
  nc.close();
});

nc.subscribe("updates", (request, replyTo) => {
  logger.debug(`got message in subscriber ${request}`);
  logger.debug(`reply to subject=${replyTo}`);
  nc.publish(replyTo, "thank you for your request!");
});
