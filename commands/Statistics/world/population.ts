import Command from "../../../lib/Command.js";
import axios from "axios";
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Board from "../../../lib/Board.js";

export default new Command({
  name: "population",
  description: "Population statistics of the past year!",
  options: [],
  type: ApplicationCommandOptionType.Subcommand,
  run: async (client, interaction, options) => {
    const api = "https://world-population.p.rapidapi.com/worldpopulation";

    const board = new Board({
      width: 100,
      height: 100,
      points: [
        {
          x: 100,
          y: 400,
          value: "500",
        },
        {
          x: 300,
          y: 200,
          value: "1000",
        },
        {
          x: 400,
          y: 500,
          value: "1500",
        },
      ],
    });

    const imageInfo = board.getImage();

    const embed = new EmbedBuilder()
      .setTitle("World Population Statistics")
      .setImage(imageInfo.url)
      .setColor(client.none as any);

    interaction.reply({
      embeds: [embed],
      files: [imageInfo.image],
    });
  },
});
