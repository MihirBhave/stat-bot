import { CommandInteractionOptionResolver } from "discord.js";
import client from "../index.js";

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const options = interaction.options as CommandInteractionOptionResolver;
    const cmdName = options.getSubcommand()
      ? options.getSubcommand(true)
      : interaction.commandName;

    const command = client.commands.get(cmdName);
    if (!command) return;

    command.run(client, interaction, options);
  }
});
