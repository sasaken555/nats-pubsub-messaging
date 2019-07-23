const { getLogger } = require("../lib/logUtil");
const logger = getLogger("structured-data");

const NATS = require("nats");
const nc = NATS.connect({
  url: "nats://localhost:4222",
  json: true
});

nc.subscribe("updates", msg => {
  logger.debug(`got message: ${JSON.stringify(msg)}`);
});

nc.publish("updates", { name: "Hoge", age: 88 });
