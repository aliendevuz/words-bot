import { ADMIN_ID } from "../config.mjs";
export default async function callbackHandler(ctx) {
    const callback = ctx.callbackQuery;
    // ✅ Check that callbackQuery exists and is the expected type
    if (!callback || typeof callback !== "object" || !("data" in callback)) {
        await ctx.answerCbQuery("Noto‘g‘ri ma’lumot.");
        return;
    }
    const data = callback.data;
    const message = "message" in callback ? callback.message : undefined;
    if (!data || !message) {
        await ctx.answerCbQuery("Noto‘g‘ri ma’lumot.");
        return;
    }
    const parts = data.split("_");
    if (parts.length !== 2) {
        await ctx.answerCbQuery("Noto‘g‘ri format.");
        return;
    }
    const [action, userIdStr] = parts;
    const userId = parseInt(userIdStr, 10);
    try {
        if (action === "approve") {
            await ctx.telegram.sendMessage(userId, "✅ To‘lov tasdiqlandi! Premium faollashtirildi.");
            await ctx.telegram.editMessageCaption(ADMIN_ID, message.message_id, undefined, `✅ To‘lov tasdiqlandi\nUser: ${userId}`);
        }
        else if (action === "reject") {
            await ctx.telegram.sendMessage(userId, "❌ To‘lov rad etildi. Iltimos, qayta urinib ko‘ring.");
            await ctx.telegram.editMessageCaption(ADMIN_ID, message.message_id, undefined, `❌ To‘lov rad etildi\nUser: ${userId}`);
        }
        await ctx.answerCbQuery();
    }
    catch (err) {
        console.error("Callback handler error:", err);
        await ctx.answerCbQuery("Xatolik yuz berdi.");
    }
}
