import { Markup } from "telegraf";

export function approveRejectKeyboard(userId: number) {
  return Markup.inlineKeyboard([
    Markup.button.callback('✅ Approve', `approve_${userId}`),
    Markup.button.callback('❌ Reject', `reject_${userId}`),
  ]);
}
