const { getLogger } = require("../lib/logUtil");
const logger = getLogger("basic");

const NATS = require("nats");
const url = process.env.NATS_URL || "nats://localhost:4222";
const nc = NATS.connect(url);

nc.on("connect", client => {
    logger.info("client connected!");
    logger.debug("Max payload size:", nc.info.max_payload);
    nc.close();
});

nc.on("error", err => {
    logger.error(err.message);
});
