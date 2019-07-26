const logger = require("../lib/logUtil").getLogger("gcp-pub");

const { PubSub } = require("@google-cloud/pubsub");
const client = new PubSub({
  projectId: process.env.PROJECT_ID
});

const publishMsg = async (seq, createdAt) => {
  const data = {
    name: "Ponz",
    createdAt,
    seq
  };
  const dataBuffer = Buffer.from(JSON.stringify(data));
  const msgId = await client.topic("my-topic").publish(dataBuffer);
  logger.debug(`Message ${msgId} published!`);
};

(async () => {
  for (let seq = 0; seq < 20; seq++) {
    const now = new Date().toLocaleTimeString();
    await publishMsg(seq, now);
  }
})();
