const { getLogger } = require("../lib/logUtil");
const logger = getLogger("wildcard");

const NATS = require("nats");
const nc = NATS.connect("nats://localhost:4222");

nc.on("error", err => {
    logger.error(err.message);
    nc.close();
});

const format = require("date-fns/format");
const locales = {
    ja: require("date-fns/locale/ja"),
    ru: require("date-fns/locale/ru"),
    en: require("date-fns/locale/en"),
};

nc.subscribe("user.time.*", (msg, reply, subject) => {
    let time = "";
    const now = new Date();
    switch (subject) {
        case "user.time.ja":
            time = format(now, "YYYY年MM月DD日HH時mm分ss秒", { locale: locales["ja"] });
            break;
        case "user.time.ru":
            time = format(now, "YYYY-MM-DD HH:mm:ss", { locale: locales["ru"] });
            break;
        case "user.time.en":
            time = format(now, "YYYY/MM/DD HH:mm:ss", { locale: locales["en"] });
            break;
        default:
            time = "UNKNOWN SUBJECT!!!";
    }
    logger.debug(`subject: ${subject}, time: ${time}`);
});
