import { Context } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";

export default async function speedTestCommand(ctx: Context) {
  const start = Date.now();

  const msg = ctx.message as Message.TextMessage;

  await ctx.reply("Tezlik sinovi yakunlandi!", {
    reply_to_message: msg.message_id,
  } as any);

  const latency = Date.now() - start;
  await ctx.reply(`Javob vaqti: ${latency} ms`);
}
