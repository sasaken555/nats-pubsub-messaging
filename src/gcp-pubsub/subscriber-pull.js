const logger = require("../lib/logUtil").getLogger("gcp-sub");

const { PubSub } = require("@google-cloud/pubsub");
const client = new PubSub({
  projectId: process.env.PROJECT_ID
});

// Subscribe to subscription.
const subscription = client.subscription("my-sub");

const msgHandler = msg => {
  logger.debug(`Received message ${msg.id}`);
  logger.debug(`data: ${msg.data}`);
  msg.ack();
};

// Wait for message event.
subscription.on("message", msgHandler);

// Unsubscribe subscription
const unsubscribe = () => {
  subscription.removeListener("message", msgHandler);
  logger.info("connection unsubscribed");
};

setTimeout(() => {
  unsubscribe();
}, 10 * 1000);
