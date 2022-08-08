import { EmbedBuilder } from "discord.js";
import Command from "../../lib/Command.js";

export default new Command({
  name: "help",
  description: "View all the commands!",
  options: [],
  run: async (client, interaction, options) => {
    const commands = client.commands;
    const list = commands.map((cmd) => {
      const { name, description } = cmd;
      let parent = "";
      let split = name.split("-");
      if (split.length > 1) parent = split[1];

      return {
        name: `\`/${parent ? `${parent} ${split[0]}` : name}\``,
        value: `\`\`\`diff\n+ ${description}\`\`\``,
        inline: true,
      };
    });

    const embed = new EmbedBuilder()
      .setTitle("Help Menu")
      .addFields(list)
      .setDescription(
        "**This bot was made by: `Saajith#1001` & `Agent Tasukare#3883`**"
      )
      .setColor("Green");

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
});
