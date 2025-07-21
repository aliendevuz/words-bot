import startCommand from "./commands/start.mjs";
import speedTestCommand from "./commands/speedTest.mjs";
import photoHandler from "./handlers/photoHandler.mjs";
import callbackHandler from "./handlers/callbackHandler.mjs";
export default function registerHandlers(bot) {
    bot.start(startCommand);
    bot.command("speed_test", speedTestCommand);
    bot.on("photo", photoHandler);
    bot.on("callback_query", callbackHandler);
}
