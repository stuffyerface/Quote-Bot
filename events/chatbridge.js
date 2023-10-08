module.exports = {
  excute(bot, messageContent, client, author) {
    const Discord = require("discord.js")
    const config = require("../config.json")
    if (!config.webhookid || !config.webhooktoken) return;
    const webhookClient = new Discord.WebhookClient(config.webhookid, config.webhooktoken);
    const msg = messageContent.toString()
    if (msg.length < 1) {
      console.log("Message too short to be sent to webhook.")
      return;
    }
    webhookClient.send({
      username: `${author}`,
      avatarURL: `https://minotar.net/helm/${author}/512`,
      content: `${msg}`,
      allowedMentions: { "parse": [] }
    })
  }
}