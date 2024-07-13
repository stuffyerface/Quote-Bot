const { SlashCommandBuilder , EmbedBuilder} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('online')
    .setDescription('Lists online guild members.'),
  async execute(interaction, bot) {
    const processingEmbed = new EmbedBuilder()
      .setColor(0x408741)
      .setTitle('Online Guild Members')
      .setFooter({ text: 'Bridge bot by @stuffy'})
      .setDescription("Finding Online Guild Members...")
    await interaction.reply({embeds: [processingEmbed], ephemeral: true})

    const cached = []
    let fail = false
    const messages = new Promise((resolve, reject) => {
      const listener = (message) => {
        message = message.toString();
        cached.push(message);
        if(message.startsWith("Total Members: ")) {
          bot.removeListener("message", listener);
          resolve(cached)
        }
      }
  
      bot.on("message", listener);
      bot.chat("/g online")
  
      setTimeout(() => {
        bot.removeListener("message", listener);
        fail = true
        reject("Timed out.")
      }, 2000);
    })

    const message = await messages;
    const trimmedMessages = message.map((message) => message.trim()).filter((message) => message.includes("●"));
    const description = trimmedMessages
      .map((message) => {
        const words = message.split("●")
        return words.join(' ')
      }).join("")
    const onlineEmbed = new EmbedBuilder()
      .setColor(0x408741)
      .setTitle('Online Guild Members')
      .setFooter({ text: 'Bridge bot by @stuffy'})
      .setDescription(description)
    
    return await interaction.editReply({embeds: [onlineEmbed], ephemeral: true})
  }
}