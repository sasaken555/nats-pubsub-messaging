const { getLogger } = require("../lib/logUtil");
const logger = getLogger("user-password-auth");

const NATS = require("nats");
const nc = NATS.connect({
  url: "nats://localhost:4222",
  user: process.env.NATS_USER,
  password: process.env.NATS_PASSWORD
});

nc.on("error", err => {
  logger.error(err.message);
  nc.close();
});

const subject = "authenticated";
nc.subscribe(subject, msg => {
  logger.debug("Authentication OK", msg);
});

nc.publish(subject, "Tech-Fes");
