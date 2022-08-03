import {
  Client,
  ClientOptions,
  Collection,
  ApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { readdirSync } from "node:fs";
import chalk from "chalk";
import { CommandData } from "../types";

export default class DJS extends Client {
  client: this;
  commands: Collection<string, CommandData>;
  constructor({ intents }: ClientOptions) {
    super({
      intents,
    });

    this.client = this;
    this.commands = new Collection();

    this.loadCommands();
  }

  loadCommands() {
    const commands: ApplicationCommandData[] = [];

    console.log(chalk.blue("-".repeat(32)));
    console.log(chalk.bold("Commands"));

    readdirSync("./out/commands/").forEach((dir) => {
      readdirSync(`./out/commands/${dir}`).forEach(async (file) => {
        const command = await import(`../commands/${dir}/${file}`);
        const { name, description, options } = command.default;

        this.commands.set(name, command);
        commands.push({
          name,
          description,
          options,
        });

        console.log(chalk.blue(`Loaded Command - ${chalk.yellow.bold(name)}`));
      });
    });

    console.log(chalk.blue("-".repeat(32)));

    this.client.on("ready", async () => {
      await this.client.application?.commands?.set(commands);

      this.client.user?.setActivity({
        name: "Satistics 📈",
      });

      console.log(chalk.green.bold("The bot is now online!!"));
    });

    this.loadEvents();
  }

  loadEvents() {
    console.log(chalk.blue("-".repeat(32)));
    console.log("Events");

    readdirSync("./out/events/").forEach(async (event) => {
      await import(`../events/${event}`);
      console.log(
        chalk.blue(
          `Loaded Event - ${chalk.yellow.bold(event.replace(".js", ""))}`
        )
      );
    });

    console.log(chalk.blue("-".repeat(32)));
  }

  start() {
    this.client.login(process.env.token);
  }
}
