import {
  ApplicationCommandOption,
  ApplicationCommandOptionType,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import DJS from "./lib/Client";

declare type CommandData = {
  name: string;
  description: string;
  options: ApplicationCommandOption[];
  type?: ApplicationCommandOptionType;
  run: (
    client: DJS,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver
  ) => void;
};
