import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
  GuildMember,
  Role,
} from "discord.js";
import Command from "../../../lib/Command.js";

export default new Command({
  name: "statistics",
  description: "Display a role's statistics!",
  type: ApplicationCommandOptionType.Subcommand,
  options: [
    {
      name: "role",
      description: "The Target Role",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
  async run(client, interaction, options) {
    const role = options.getRole("role") as Role;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${role.name}` })
      .setColor("Random")
      .addFields({
        name: "General",
        value: `Name: **${role.name}**\n Color Code: \`${
          role.hexColor
        }\`Role ID: \`${role.id}\`\nCreated At: <t:${Math.floor(
          role.createdTimestamp / 1000
        )}:R>\nRole Holders: \`${role.members.size}\``,
      })
      .setFooter({
        text: `Requested By ${interaction.user.username}$${interaction.user.discriminator}`,
        iconURL: `${(interaction.member as GuildMember).displayAvatarURL()}`,
      });
      
    interaction.reply({
      embeds: [embed],
    });
  },
});
