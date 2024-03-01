module.exports = {
  execute(bot, messageContent, client, author) {
    const Discord = require("discord.js")
    const config = require("../config.json")
    require("dotenv").config()
    const webhookUrl = process.env.WEBHOOK_URL;
    const regex = /\/webhooks\/(\d+)\/([\w-]+)/;
    const [, id, token] = webhookUrl.match(regex);
    const webhookClient = new Discord.WebhookClient({ id, token });
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