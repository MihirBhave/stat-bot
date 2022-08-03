import {
  ApplicationCommandOption,
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { CommandData } from "../types";

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
