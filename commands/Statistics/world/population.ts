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

    // axios.get(api, {
    //   responseType: "json",
    //   headers: {
    //     "X-RapidAPI-Key": process.env.rapidkey as string,
    //     "X-RapidAPI-Host": "world-population.p.rapidapi.com",
    //   },
    // });

    const board = new Board({
      width: 100,
      height: 100,
      points: [
        {
          x: 50,
          y: 20,
        },
      ],
    });

    const imageInfo = board.getImage();

    const embed = new EmbedBuilder()
      .setTitle("World Population Statistics")
      .setImage(imageInfo.url)
      .setColor("NotQuiteBlack");

    interaction.reply({
      embeds: [embed],
      files: [imageInfo.image],
    });
  },
});
