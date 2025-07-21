import { APIGatewayProxyEvent } from "aws-lambda";
import bot from "./bot";

export const handler = async (event: APIGatewayProxyEvent) => {
  // fixed
  await bot.handleUpdate(JSON.parse(event.body || '{}'));
  return { statusCode: 200, body: 'OK' }
}
