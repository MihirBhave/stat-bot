import {
  ApplicationCommandOption,
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";

declare type CommandData = {
  name: string;
  description: string;
  options: ApplicationCommandOption[];
  type?: ApplicationCommandOptionType
  run: (
    client: Client,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver
  ) => void;
};
