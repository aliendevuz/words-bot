import { Context } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import { ADMIN_ID } from "../config";
import { approveRejectKeyboard } from "../utils/keyboard";

function isPhotoMessage(
  message: Message
): message is Message.PhotoMessage {
  return "photo" in message;
}

export default async function photoHandler(ctx: Context) {
  const userId = ctx.from?.id;
  const message = ctx.message;

  if (!message || !isPhotoMessage(message)) return;

  const photos = message.photo;
  const fileId = photos[photos.length - 1].file_id;
  const caption = `💵 Yangi to‘lov kvitansiyasi\nUser: ${userId}`;

  if (userId) {
    const inlineKeyboard = approveRejectKeyboard(userId);
    try {
      await ctx.telegram.sendPhoto(ADMIN_ID, fileId, {
        caption,
        reply_markup: inlineKeyboard.reply_markup,
      });

      await ctx.reply("To‘lov kvitansiyasi qabul qilindi. Tekshirishdan so‘ng premium yoqamiz 👍");
    } catch (err) {
      console.error("Photo send error:", err);
    }
  } else {
    console.error("User ID not found.");
  }
}
