import Command from "../../lib/Command.js";

export default new Command({
  name: "help",
  description: "View all the commands!",
  options: [],
  run: async(client, interaction, options) => {
    interaction.reply("HELP!");
  },
});
