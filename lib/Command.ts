import {
  ApplicationCommandOption,
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";

type CommandData = {
  name: string;
  description: string;
  options: ApplicationCommandOption[];
  run: (
    client: Client,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver
  ) => void;
};

export default class Command {
  constructor({ name, description, options, run }: CommandData) {
    return {
      name,
      description,
      options,
      run,
    };
  }
}
