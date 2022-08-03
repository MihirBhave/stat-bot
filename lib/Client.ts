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

type CommandData = {
  name: string;
  description: string;
  options: ApplicationCommandData[];
  run: (
    client: Client,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver
  ) => void;
};


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
    this.loadEvents();
  }

  loadCommands() {
    const commands: ApplicationCommandData[] = [];

    console.log(chalk.blue("-".repeat(32)));
    readdirSync("./out/commands/").forEach((dir) => {
      readdirSync(`./out/commands/${dir}`).forEach(async (file) => {
        const command = await import(`../commands/${dir}/${file}`);
        console.log(command);
        const { name, description, options } = command;

        this.commands.set(name, command);
        commands.push({
          name,
          description,
          options,
        });

        console.log(chalk.blue(`Loaded Command - ${chalk.yellow.bold(name)}`));
      });
    });

    this.client.on("ready", async () => {
      await this.client.application?.commands?.set(commands);

      this.client.user?.setActivity({
        name: "Satistics 📈",
      });

      console.log(chalk.green.bold("The bot is now online!!"));
    });
  }

  loadEvents() {
    console.log(chalk.blue("-".repeat(32)));

    readdirSync("./out/events/").forEach(async (event) => {
      await import(`../events/${event}`);
      console.log(
        chalk.blue(
          `Loaded Event - ${chalk.yellow.bold(event.replace(".js", ""))}`
        )
      );
    });
  }

  start() {
    this.client.login(process.env.token);
  }
}
