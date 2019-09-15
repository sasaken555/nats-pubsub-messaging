const { getLogger } = require("../lib/logUtil");
const logger = getLogger("scatter-gather");

const NATS = require("nats");
const nats = NATS.connect({
  url: "nats://localhost:4222",
  json: true
});

nats.on("connect", c => {
  logger.info("connected!");
});

nats.on("error", err => {
  logger.error(err.message);
  nats.close();
});

nats.on("unsubscribe", function(sid, subject) {
  logger.info(`unsubscribed subscription ${sid} for subject ${subject}`);
});

const SUBJECT = "PUBLIC.REQUEST";

// subscriber1
nats.subscribe(SUBJECT, { max: 1 }, (msg, replyTo, requestFrom) => {
  logger.debug(`[sub1] received message from ${requestFrom}`);
  nats.publish(replyTo, {
    message: "received message at sub1",
    replyTo,
    subscriber: "sub1"
  });
});

// subscriber2
nats.subscribe(SUBJECT, { max: 1 }, (msg, replyTo, requestFrom) => {
  logger.debug(`[sub2] received message from ${requestFrom}`);
  nats.publish(replyTo, {
    message: "received message at sub2",
    replyTo,
    subscriber: "sub2"
  });
});

nats.request(SUBJECT, "scatter gather!", response => {
  if (
    response instanceof NATS.NatsError &&
    response.code === NATS.REQ_TIMEOUT
  ) {
    logger.warn("request timeout");
    return;
  }
  logger.debug(`[pub] got message from publisher: ${response.subscriber}`);
});
