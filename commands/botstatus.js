const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lobaton')
    .setDescription('Checks if the bot is working.'),
  async execute(interaction, bot) {
    if(bot.online){
      await interaction.reply({content: "Bot Alive, unfortunateLy", ephemeral: true})
    } else {
      await interaction.reply({content: "Bot Dead L", ephemeral: true})
    }
  }
} 