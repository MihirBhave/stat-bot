import DJS from "./lib/Client.js";
import "dotenv/config";

const client = new DJS({
  intents: ["Guilds", "GuildMembers"],
});

export default client;

client.start();
