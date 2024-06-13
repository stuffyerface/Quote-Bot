const utils = require("../utils.js")
module.exports = {
  execute(bot, messageContent, client, author) {
    const Discord = require("discord.js")
    const config = require("../config.json")
    require("dotenv").config()
    const webhookUrl = process.env.WEBHOOK_URL;
    const regex = /\/webhooks\/(\d+)\/([\w-]+)/;
    const [, id, token] = webhookUrl.match(regex);
    const webhookClient = new Discord.WebhookClient({ id, token });
    let msg = messageContent.toString()

    let words = msg.split(" ")
    let modified = false
    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith("l$")) {
        words[i] = utils.stufDecode(words[i])
        modified = true
      }
    }

    if(modified){
      msg = words.join(" ")
    }

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