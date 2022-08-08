import DJS from "./lib/Client.js";
import { GatewayIntentBits, Partials } from "discord.js";
import "dotenv/config";

const client = new DJS({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
  partials: [Partials.User],
});

export default client;

client.start();
