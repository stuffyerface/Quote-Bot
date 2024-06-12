const config = require("../config.json")
const utils = require("../utils.js")

module.exports = {
  async execute(client, text, bot, message) {
    if (message.author.bot) return;
    if (text.startsWith('sudo')) return;
    if (message.channel.id === config.chatchannel) {
      let displayName = message.member.displayName
      displayName = displayName.slice(0,15)
      // Check if message is a reply
      let prefix
      if (message.reference) {
        const repliedMessage = message.channel.messages.cache.get(message.reference.messageId);
        let repliedUser
        if (!repliedMessage) {
          repliedUser = "Unknown"
        } else if (repliedMessage.webhookId) {
          repliedUser = repliedMessage.author.username
        } else {
          repliedUser = repliedMessage.member.displayName
        }
        repliedUser = repliedUser.slice(0,15)
        prefix = `${displayName} replying to ${repliedUser}: `
      } else {
        prefix = `${displayName}: `
      }
      text = text.replaceAll("\n", " ") // Remove newlines
      text = text.replace(/<:([^:]+):\d+>/g, ":$1:") // Remove custom emojis 

      text = text.replace(/<@(\d+)>/g, (match, id) => `@${client.users.cache.get(id).globalName}`) // Replace user mentions with usernames
      text = text.replace(/<#(\d+)>/g, (match, id) => `#${client.channels.cache.get(id).name}`) // Replace channel mentions with channel names
      // command = command.replace(/<@&(\d+)>/g, (match, id) => `@${client.roles.cache.get(id).name}`) // Replace role mentions with role names DOES NOT WORK
      text = text.replace(/\be+z+\b/gi, function (match) {
        return "*".repeat(match.length); // Censor "ez"
      })

      text = text.replace(/\bi+p+\b/gi, function (match) {
        return "*".repeat(match.length); // Censor "ip"
      })

      let words = text.split(" ")
      let modified = false

      for (let i = 0; i < words.length; i++) {
        if (words[i].startsWith("http")) {
          words[i] = utils.stufEncode(words[i])
          modified = true
        }
      }

      if (modified) {
        text = words.join(" ")
      }

      let command = `/gc ` + prefix + text

      if (command.length > 256) {
        command = command.slice(0, 253) + "..."
      }

      if (text.length != 0) {
        try {
          await bot.chat(command)
        } catch (error) {
          console.log(error)
        }
      }

      // const attachments = (message.attachments).array();

      // for (attachment of attachments) {
      //   const url = attachment.url;
      //   const filename = attachment.name;
      //   const imgur = require('imgur');
      //   imgur.setClientId(config.imgur_client_id);
      //   imgur.setAPIUrl('https://api.imgur.com/3/');
      //   imgur.uploadUrl(url)
      //     .then(function (json) {
      //       const link = json.data.link;
      //       if (link) {
      //         setTimeout(() => {
      //           bot.chat(`/gc ${prefix}: ${link}`)
      //         }, 550);
      //       }
      //     })
      //     .catch(function (err) {
      //       console.error(err.message);
      //     });
      // }
    }
  }
}