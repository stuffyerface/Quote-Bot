const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lobaton')
    .setDescription('Checks if the bot is working.'),
  async execute(interaction, bot) {
    if(bot.online){
      await interaction.reply({content: "Bot Online since " + bot.timestamp, ephemeral: true})
    } else {
      await interaction.reply({content: "Bot Offline since " + bot.timestamp, ephemeral: true})
    }
  }
} 