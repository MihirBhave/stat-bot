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

    console.log(board);

    const embed = new EmbedBuilder()
      .setTitle("Youtube channel subscribers")
      .setImage(board)
      .setColor(client.none as any);

    interaction.reply({
      embeds: [embed],
    });
  },
});
