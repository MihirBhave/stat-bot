import Command from "../../../lib/Command.js";
import axios from "axios";

import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import makeBoard from "../../../lib/functions.js";

export default new Command({
  name: "search",
  description: "Search for a youtube channel/video",
  options: [
    {
      name: "type",
      description: "The search type (channel/video)",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "video",
          value: "video",
        },
        {
          name: "channel",
          value: "channel",
        },
      ],
    },
  ],
  type: ApplicationCommandOptionType.Subcommand,
  run: async (client, interaction, options) => {
    const api = "https://www.googleapis.com/youtube/v3/search";
    const type = options.getString("type");

    const { data } = await axios.get(api, {
      params: {
        type,
      },
    });
  },
});
