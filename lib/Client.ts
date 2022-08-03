import {
  Client,
  ClientOptions,
  Collection,
  ApplicationCommandData,
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
    this.loadEvents();
  }

  loadCommands() {
    const commands: ApplicationCommandData[] = [];

    readdirSync("./out/commands/").forEach((dir) => {
      readdirSync(`./out/commands/${dir}`).forEach(async (file) => {
        if (!file.endsWith(".js")) {
          const mainCommand = {
            name: file,
            description: `${file} statistics`,
            options: [] as any,
          };

          readdirSync(`./out/commands/${dir}/${file}/`).forEach(async (sub) => {
            const command = await import(`../commands/${dir}/${file}/${sub}`);
            const { name, description, options, type } = command.default;

            this.commands.set(name, command.default);
            mainCommand.options.push({
              name,
              description,
              options,
              type,
            });
          });

          commands.push(mainCommand);
          return;
        }

        const command = await import(`../commands/${dir}/${file}`);
        const { name, description, options } = command.default;

        this.commands.set(name, command.default);
        commands.push({
          name,
          description,
          options,
        });
      });
    });

    this.client.on("ready", async () => {
      await this.client.application?.commands?.set(commands);

      console.log(chalk.green.bold(`${commands.length} Commands Loaded`));
      console.log(chalk.blue("-".repeat(32)));

      this.client.user?.setActivity({
        name: "Statistics 📈",
      });

      console.log(chalk.blue.bold("The bot is now online!!"));
    });
  }

  loadEvents() {
    console.log(chalk.blue("-".repeat(32)));
    console.log(chalk.yellow.bold("Events Loaded"));

    readdirSync("./out/events/").forEach(async (event) => {
      await import(`../events/${event}`);
    });

    console.log(chalk.blue("-".repeat(32)));
  }

  start() {
    this.client.login(process.env.token);
  }
}
