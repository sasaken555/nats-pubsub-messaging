const { getLogger } = require("../lib/logUtil");
const logger = getLogger("pubsub");

const NATS = require("nats");
const nc = NATS.connect("nats://localhost:4222");

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

// subscribe "updates" subject for 10 messages.
const options = { max: 10 };
nc.subscribe("updates", options, msg => {
    logger.debug(`msg=${msg}`);
});
