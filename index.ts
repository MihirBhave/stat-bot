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
// Anti Crash 

process.on("unhandledRejection", (reason, p ) => {
  console.log(" [antiCrash] :: Unhandled Rejection/Catch ");
});


export default client;

client.start();
