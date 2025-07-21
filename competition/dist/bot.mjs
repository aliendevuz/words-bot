import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./config.mjs";
import registerHandlers from "./registerHandlers.mjs";
const bot = new Telegraf(BOT_TOKEN);
registerHandlers(bot);
export default bot;
