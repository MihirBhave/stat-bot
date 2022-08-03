import {
  ApplicationCommandOption,
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";

declare type CommandData = {
  name: string;
  description: string;
  options: ApplicationCommandOption[];
  run: (
    client: Client,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver
  ) => void;
};
