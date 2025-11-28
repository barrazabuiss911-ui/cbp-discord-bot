import { Client, GatewayIntentBits } from "discord.js";
import fetch from "node-fetch";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const WEBHOOK_URL = process.env.N8N_WEBHOOK;
const UPDATE_CHANNEL = process.env.CBP_CHANNEL_ID;

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== UPDATE_CHANNEL) return;

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: message.author.username,
      content: message.content,
      timestamp: message.createdTimestamp
    })
  });
});

client.login(DISCORD_TOKEN);
