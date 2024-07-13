const { SlashCommandBuilder , EmbedBuilder} = require('discord.js');
const { createBot } = require('mineflayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('forcestart')
    .setDescription('Attempts to start the bot if it has been kicked offline.'),
  async execute(interaction, bot) {
      if(!bot.online){
        createBot()
      } else {
        await interaction.reply({content: "Don't be silly, the bot is already up!", ephemeral: true})
        return
      }
  }
}