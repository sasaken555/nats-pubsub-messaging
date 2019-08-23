const { getLogger } = require("../lib/logUtil");
const logger = getLogger("structured-data");

const NATS = require("nats");
const nc = NATS.connect({
  url: "nats://localhost:4222",
  // url: "nats://ponz-nats-cluster.default.svc.cluster.local:4222",
  json: true
});

nc.on("connect", c => {
  logger.info("connected!");
});

nc.on("disconnect", () => {
  logger.info("disconnected...");
  nc.close();
});

nc.on("error", err => {
  logger.error(err.message);
  nc.close();
});

const MAX_COUNT = 5;
nc.subscribe("chat", { max: MAX_COUNT }, msg => {
  logger.debug(`got message: ${JSON.stringify(msg)}`);
});

for (let idx = 0; idx < MAX_COUNT; idx++) {
  nc.publish("chat", {
    messageId: idx,
    name: "Awesome",
    score: Math.floor(Math.random() * 100),
    updatedAt: new Date().toISOString()
  });
}
