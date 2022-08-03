import DJS from "./lib/Client.js";
import {GatewayIntentBits} from 'discord.js'
import "dotenv/config";

const client = new DJS({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers , GatewayIntentBits.GuildPresences],
});

export default client;

client.start();
