export default async function speedTestCommand(ctx) {
    const start = Date.now();
    const msg = ctx.message;
    await ctx.reply("Tezlik sinovi yakunlandi!", {
        reply_to_message: msg.message_id,
    });
    const latency = Date.now() - start;
    await ctx.reply(`Javob vaqti: ${latency} ms`);
}
