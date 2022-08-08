import {
  ApplicationCommandOptionType,
  channelLink,
  ChannelType,
  EmbedBuilder,
  GuildChannel,
  GuildMember,
} from "discord.js";
import Command from "../../../lib/Command.js";

// Returning the Stringified Name for the Channel Type
const getChannelType = (chx: GuildChannel): string | undefined => {
  switch (chx.type) {
    case ChannelType.GuildCategory:
      return "Category Channel";
    case ChannelType.GuildText:
      return "Text Channel";
    case ChannelType.GuildVoice:
      return "Voice Channel";
    case ChannelType.GuildForum:
      return "Forum CHannel";
    case ChannelType.GuildNews:
      return "News Channel";
    case ChannelType.GuildPublicThread:
      return "Public Thread";
    default:
      return undefined;
  }
};

export default new Command({
  name: "statistics",
  description: "Display a role's statistics!",
  options: [
    {
      name: "channel",
      description: "The Target Role",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  type: ApplicationCommandOptionType.Subcommand,

  async run(client, interaction, options) {
    const channel = options.getChannel("channel") as GuildChannel;
    const channelType = getChannelType(channel);

    const embed = new EmbedBuilder()
      .setAuthor({ name: channel.name })
      .setColor("Random")
      .addFields({
        name: "General",
        value: `Name: **${channel.name}**\nCategory: \`${
          channel.parent ? channel.parent.name : "None"
        }\`\nType: \`${channelType}\`\nChannel ID: \`${
          channel.id
        }\`\nCreated At: <t:${Math.floor(
          channel.createdTimestamp / 1000
        )}:R>\nMembers In Channel: \`${channel.members.size}/${
          interaction.guild?.memberCount
        }\``,
      })
      .setFooter({
        text: `Requested By ${interaction.user.username}#${interaction.user.discriminator}`,
        iconURL: `${(interaction.member as GuildMember).displayAvatarURL()}`,
      });

    interaction.reply({
      embeds: [embed],
    });
  },
});
