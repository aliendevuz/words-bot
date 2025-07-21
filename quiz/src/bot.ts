import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./config";
import registerHandlers from "./registerHandlers";

const bot = new Telegraf(BOT_TOKEN);
registerHandlers(bot);

export default bot;
