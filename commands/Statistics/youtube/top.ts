import Command from "../../../lib/Command.js";
import axios from "axios";

import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import makeBoard from "../../../lib/functions.js";

export default new Command({
  name: "top",
  description: "The top 5 youtube channels!!",
  options: [],
  type: ApplicationCommandOptionType.Subcommand,
  run: async (client, interaction, options) => {
    const api = "https://matrix.sbapis.com/b/youtube/top";

    const { data } = await axios.get(api, {
      params: {
        query: "subscribers",
      },
    });

    const channels: [] = data.data.map(
      (channel: {
        id: { display_name: string };
        statistics: { total: { subscribers: number } };
      }) => {
        return {
          name: channel.id.display_name,
          subs: channel.statistics.total.subscribers,
        };
      }
    );

    const board = makeBoard(
      {
        labels: ["1", "2"],
        datasets: channels.map((ch: { name: string; subs: number }) => {
          return {
            label: encodeURIComponent(ch.name),
            data: [0, ch.subs],
            fill: false,
          };
        }),
      },
      "line"
    );

    const position: any = {
      0: "🏆",
      1: "🥈",
      2: "🥉",
    };

    const embed = new EmbedBuilder()
      .setTitle("Top 5 youtube channels!")
      .setImage(board)
      .setDescription(
        channels
          .map(
            (ch: { name: string; subs: number }, i) =>
              `${i < 3 ? position[i] : "🏅"} **${
                ch.name
              }** - \`${ch.subs.toLocaleString()}\``
          )
          .join("\n")
      )
      .setColor(client.none as any);

    interaction.reply({
      embeds: [embed],
    });
  },
});
