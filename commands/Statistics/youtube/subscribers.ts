import Command from "../../../lib/Command.js";
import axios from "axios";

import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import makeBoard from "../../../lib/functions.js";

export default new Command({
  name: "subscribers",
  description: "Youtube channels subscriber count statistics!",
  options: [],
  type: ApplicationCommandOptionType.Subcommand,
  run: async (client, interaction, options) => {
    const api = "https://www.googleapis.com/youtube/v3/search";

    const { data } = await axios.get(api, {
      params: {
        key: process.env.youtubeKey,
        type: "channel",
        order: "viewCount",
      },
    });

    const channels = await Promise.all(
      data.items.map(async (i: { id: { channelId: string } }) => {
        const { id } = i;

        const channelApi = "https://www.googleapis.com/youtube/v3/channels";
        const channel = await axios.get(channelApi, {
          params: {
            key: process.env.youtubeKey,
            id: id.channelId,
            part: "statistics",
          },
        });

        const { statistics } = channel.data.items[0];
        return statistics.subscriberCount;
      })
    );

    console.log(channels);

    const board = makeBoard(
      {
        labels: ["DanTDM", "Jacksepticeye", "Doggie"],
        datasets: [
          {
            label: "Subscribers",
            data: [100, 300, 500],
          },
        ],
      },
      "line"
    );

    const embed = new EmbedBuilder()
      .setTitle("Youtube channel subscribers")
      .setImage(board)
      .setColor(client.none as any);

    interaction.reply({
      embeds: [embed],
    });
  },
});
