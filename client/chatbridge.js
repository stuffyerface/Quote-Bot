const config = require("../config.json")
module.exports = {
  excute(client, text, bot, message) {
    if (message.author.bot) return;
    if (text.startsWith('sudo')) return;
    if (message.channel.id === config.channelID) {
      displayName = message.member.displayName
      const attachments = (message.attachments).array();
      
      // Check if message is a reply
      if(message.reference) {
        const repliedMessage = message.channel.messages.cache.get(message.reference.messageID);
        if(repliedMessage) {
          repliedUser = repliedMessage.member.displayName
          
        }else{
          repliedUser = "Unknown"
        }
        command = `/gc ${displayName} replying to ${repliedUser}: ${text}`
      }else{
        command = `/gc ${displayName}: ${text}`
      }

      command.replace("\n", " ") // Remove newlines
      command.replace(/<:([^:]+):\d+>/g, "$1") // Remove custom emojis
      command.replace(/<@(\d+)>/g, client.users.cache.get("@$1").username) // Replace user mentions with usernames
      if (command.length > 256) {
        command = command.slice(0, 253) + "..."
      }
      bot.chat(command)

      // TODO: Upload images to imgur and send link instead.
      if (attachments.length > 0) {
        if (nick1) {
          setTimeout(() => {
            bot.chat(`/gc ${nick1}: ${attachments[0].url}`)
          }, 550);
        } else {
          setTimeout(() => {
            bot.chat(`/gc ${message.author.username}: ${attachments[0].url}`)
          }, 550)
        }
      }
    }
  }
}