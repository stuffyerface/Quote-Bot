const config = require("../config.json")
module.exports = {
  async execute(client, text, bot, message) {
    if (message.author.bot) return;
    if (text.startsWith('sudo')) return;
    if (message.channel.id === config.chatchannel) {
      displayName = message.member.displayName
      // Check if message is a reply
      if (message.reference) {
        const repliedMessage = message.channel.messages.cache.get(message.reference.messageId);
        if (!repliedMessage) {
          repliedUser = "Unknown"
        } else if (repliedMessage.webhookId) {
          repliedUser = repliedMessage.author.username
        } else {
          repliedUser = repliedMessage.member.displayName
        }
        command = `/gc ${displayName} replying to ${repliedUser}: ${text}`
      } else {
        command = `/gc ${displayName}: ${text}`
      }
      
      command = command.replaceAll("\n", " ") // Remove newlines
      command = command.replace(/<:([^:]+):\d+>/g, ":$1:") // Remove custom emojis 

      command = command.replace(/<@(\d+)>/g, (match, id) => `@${client.users.cache.get(id).globalName}`) // Replace user mentions with usernames
      command = command.replace(/<#(\d+)>/g, (match, id) => `#${client.channels.cache.get(id).name}`) // Replace channel mentions with channel names
      // command = command.replace(/<@&(\d+)>/g, (match, id) => `@${client.roles.cache.get(id).name}`) // Replace role mentions with role names DOES NOT WORK

      if (command.length > 256) {
        command = command.slice(0, 253) + "..."
      }
      bot.chat(command)
      // TODO: Upload images to imgur and send link instead.
      // const attachments = (message.attachments).array();
      // if (attachments.length > 0) {
      //   if (nick1) {
      //     setTimeout(() => {
      //       bot.chat(`/gc ${nick1}: ${attachments[0].url}`)
      //     }, 550);
      //   } else {
      //     setTimeout(() => {
      //       bot.chat(`/gc ${message.author.username}: ${attachments[0].url}`)
      //     }, 550)
      //   }
      // }
    }
  }
}