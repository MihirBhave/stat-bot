import Command from "../../../lib/Command.js";
import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  GuildMember,
  PermissionFlagsBits,
} from "discord.js";

export default new Command({
  name: "statistics",
  description: "The Stats of this server!",
  options: [],
  type: ApplicationCommandOptionType.Subcommand,
  run: async (client, interaction, options) => {
    const guild = interaction.guild!;
    const member = interaction.member! as GuildMember;

    await guild.members.fetch();

    const membersOnline = guild.members.cache.filter(
      (member) => member.presence?.status === "online"
    );

    const embed = new EmbedBuilder()
      .setColor(client.none as any)
      .setAuthor({
        name: `${guild.name}`,
        iconURL: guild.iconURL()!,
      })
      .addFields(
        {
          name: "General",
          value: `Owner : <@${guild.ownerId}>\nCreated : <t:${Math.floor(
            guild.createdTimestamp! / 1000
          )}:R>\nDescription : ${
            guild.description ? guild.description : "None"
          }\nBoosts : ${guild.premiumSubscriptionCount}`,
        },
        {
          name: "Members",
          value: `Total Members : ${guild.memberCount}\nBots : ${
            guild.members.cache.filter((m) => m.user.bot)?.size
          }\nOnline : ${membersOnline.size}\nAdministrators : ${
            guild.members.cache.filter((m) =>
              m.permissions.has(PermissionFlagsBits.Administrator)
            )?.size
          }`,
        },
        {
          name: "Roles",
          value: `Total Roles : ${guild.roles.cache.size}\nAdmin Roles : ${
            guild.roles.cache.filter((r) =>
              r.permissions.has(PermissionFlagsBits.Administrator)
            )?.size
          }\nHighest Role : ${guild.roles.highest}`,
        },
        {
          name: "Channels",
          value: `Total Channels : ${
            guild.channels.cache.size
          }\nText Channels : ${
            guild.channels.cache.filter((c) => c.isTextBased())?.size
          }\nVoice Channels : ${
            guild.channels.cache.filter((c) => c.isVoiceBased())?.size
          }`,
        }
      )
      .setFooter({
        text: `Requested By ${member.user.username}`,
        iconURL: `${
          member.user.displayAvatarURL() ? member.user.displayAvatarURL() : null
        }`,
      });

    interaction.reply({
      embeds: [embed],
    });
  },
});
