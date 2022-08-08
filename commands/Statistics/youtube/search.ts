import Command from "../../../lib/Command.js";
import axios from "axios";

import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  MessageMentions,
} from "discord.js";

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
    {
      name: "query",
      description: "The keywords to search for.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  type: ApplicationCommandOptionType.Subcommand,
  run: async (client, interaction, options) => {
    const api = "https://www.googleapis.com/youtube/v3/search";
    const type = options.getString("type")!;
    const q = options.getString("query");

    const { data } = await axios.get(api, {
      params: {
        type,
        key: process.env.youtubeKey,
        part: "snippet",
        q,
      },
    });

    const results = data.items.map(
      (
        d: {
          id: {
            videoId: string;
          };
          snippet: {
            title: string;
            channelTitle: string;
            description: string;
          };
        },
        i: number
      ) => {
        const { snippet, id } = d;
        const { title, channelTitle, description } = snippet;

        const uriType =
          type === "channel"
            ? `https://www.youtube.com/c/${encodeURIComponent(title)}`
            : `https://www.youtube.com/watch?v=${
                id.videoId
              }&ab_channel=${encodeURIComponent(channelTitle)}`;

        return `\`${++i}.\` [**${title}**](${uriType})\n  -- \`${
          description.length > 0 ? description : "No Description."
        }\``;
      }
    );

    const embed = new EmbedBuilder()
      .setTitle(
        `🔎 ${
          type === "channel" ? "Channel" : "Video"
        } search results for "${q}"`
      )
      .setColor(client.none as any)
      .setDescription(results.join("\n\n"));

    interaction.reply({
      embeds: [embed],
    });
  },
});
