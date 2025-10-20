import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('BOT_TOKEN environment variable is not set');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// AWS Lambda uchun to‘g‘ri eksport qilingan handler
export const handler = async () => {
  const chatID = parseInt(process.env.ADMIN || '0', 10);
  if (!chatID || isNaN(chatID)) {
    console.error('ADMIN environment variable is not set or invalid');
    return;
  }

  const today = new Date().toLocaleDateString('uz-UZ', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let firstWord = 'so`z topilmadi';

  try {
    const res = await fetch('https://assets.4000.uz/assets/en/essential/words.json');
    if (!res.ok) {
      console.error('Fetch xatosi:', res.status, res.statusText);
    } else {
      const json: any = await res.json();
      // JSON tarkibidan 0 -> 0 -> index 0 -> w olish
      firstWord = json?.['0']?.['0']?.[0].w;
      console.log('Tanlangan so`z:', firstWord);
    }
  } catch (err: any) {
    console.error('Fetch yoki JSON parse xatosi:', err?.message ?? err);
  }

  const message = `📅 Har kunlik eslatma!\nBugungi sana: ${today}\n\nSo'z: ${firstWord}`;

  try {
    await bot.telegram.sendMessage(chatID, message);
    console.log(`Xabar ${chatID} ga yuborildi`);
  } catch (err: Error | any) {
    console.error('Xabar yuborishda xato:', err.message);
  }
};
