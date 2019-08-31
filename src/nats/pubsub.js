const { getLogger } = require("../lib/logUtil");
const logger = getLogger("pubsub");

const NATS = require("nats");
const nc = NATS.connect({
  url: "nats://localhost:4222"
  // servers: ["nats://localhost:4222", "nats://localhost:4223"]
});

nc.on("connect", c => {
  logger.info("connected!");
});

nc.on("disconnect", () => {
  logger.info("disconnected...");
});

nc.on("reconnect", () => {
  logger.info("reconnected!!");
});

nc.on("error", err => {
  logger.error(err.message);
  nc.close();
});

// subscribe "updates" subject for 10 messages.
const options = { max: 10 };
nc.subscribe("updates", options, msg => {
  logger.debug(`msg=${msg}`);
});
