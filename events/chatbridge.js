module.exports = {
  execute(bot, messageContent, client, author) {
    const Discord = require("discord.js")
    const config = require("../config.json")
    if (!config.webhookid || !config.webhooktoken) return;
    const webhookClient = new Discord.WebhookClient({ id: config.webhookid, token: config.webhooktoken });
    const msg = messageContent.toString()

    try {
      webhookClient.send({
        username: `${author}`,
        avatarURL: `https://minotar.net/helm/${author}/512`,
        content: `${msg}`,
        allowedMentions: { "parse": [] }
      })
    } catch (err) {
      console.log(err)
    }
  }
}