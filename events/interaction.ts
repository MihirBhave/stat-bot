import { CommandInteractionOptionResolver } from "discord.js";
import client from "../index.js";

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    command.run(
      client,
      interaction,
      interaction.options as CommandInteractionOptionResolver
    );
  }
});
