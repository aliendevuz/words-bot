import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { USERS_TABLE } from "../config";
import { Context } from "telegraf";

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

export default async function startCommand(ctx: Context) {
  const userId = ctx.from?.id.toString();

  if (userId) {
    try {
      await ddb.send(
        new PutCommand({
          TableName: USERS_TABLE,
          Item: {
            id: userId,
            name: ctx.from?.first_name,
            joinedAt: new Date().toISOString(),
          },
          ConditionExpression: "attribute_not_exists(id)",
        })
      );
      console.log("User saved successfully:", userId);
    } catch (error: any) {
      if (error.name === "ConditionalCheckFailedException") {
        console.log("User already exists:", userId);
      } else {
        console.error("Error saving user:", error);
      }
    }
  }

  ctx.reply(`Assalomu alaykum, ${ctx.from?.first_name}! Botimizga xush kelibsiz!`);
}
