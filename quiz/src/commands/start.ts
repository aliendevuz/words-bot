import { Context } from "telegraf";

export default function startCommand(ctx: Context) {
  ctx.reply(`Assalomu alaykum, ${ctx.from?.first_name}! Botimizga xush kelibsiz!`);
}
