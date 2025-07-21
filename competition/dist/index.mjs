import bot from "./bot.mjs";
export const handler = async (event) => {
    // fixed
    await bot.handleUpdate(JSON.parse(event.body || '{}'));
    return { statusCode: 200, body: 'OK' };
};
