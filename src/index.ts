import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

const token = process.env.DISCORD_TOKEN;
if (!token) {
    throw new Error("DISCORD_TOKEN saknas i .env");
}

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ], 
});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Inloggad som ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;
    
    if (message.content === "ping") {
        message.reply("pong");
    }
})

client.login(token)