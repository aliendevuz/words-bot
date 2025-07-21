import startCommand from "./commands/start";
import speedTestCommand from "./commands/speedTest";
import photoHandler from "./handlers/photoHandler";
import callbackHandler from "./handlers/callbackHandler";
import { Telegraf } from "telegraf";

export default function registerHandlers(bot: Telegraf) {
  bot.start(startCommand);
  bot.command("speed_test", speedTestCommand);
  bot.on("photo", photoHandler);
  bot.on("callback_query", callbackHandler);
}
