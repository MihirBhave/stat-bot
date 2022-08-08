import { EmbedBuilder } from "discord.js";
import client from "../index.js";

client.on("guildCreate", async (g) => {
  const channel = g.systemChannel;
  if (channel) {
    const embed = new EmbedBuilder()
      .setTitle("Hey!")
      .setThumbnail(client.user?.displayAvatarURL()!)
      .setDescription(
        `I am ${client.user?.username}\nI am a bot that specializes in statistics, like \`server\`, \`youtube\`, \`members\` etc. I provide lots of information, which can be very informative!!`
      )
      .setColor("Green")
      .setFooter({
        text: "Thank you for inviting me!",
      });

    await channel.send({
      embeds: [embed],
    });
  }
});
