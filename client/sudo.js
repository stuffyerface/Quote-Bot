const config = require("../config.json")
module.exports = {
  execute(client, text, bot, message) {
    if (message.author.id === config.ownerID || message.author.id === config.subID) {
      if (text.startsWith('sudo')) {
        const msg = text.trim().slice(5)
        bot.chat(msg)
      }
    }
  }
}
