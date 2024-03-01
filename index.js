require("dotenv").config()
const mineflayer = require("mineflayer");
const config = require("./config.json")
const { ActivityType, Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const fs = require('fs')
require ('dotenv').config()

var options = {
  host: config.serverip,
  username: process.env.MC_EMAIL,
  //password: process.env.MC_PASSWORD,
  version: "1.8",
  colorsEnabled: false,
  auth: "microsoft",
  chatLengthLimit: 256
};

var bot = mineflayer.createBot(options);

bot.on('end', reason => {
  console.log(reason)
  client.channels.cache.get(config.chatchannel).send(config.kickmessage)
  setTimeout(() => {
    console.log("Attempting to reconnect.")
    try {
      bot = mineflayer.createBot(options);
    } catch (error) {
      console.log("Error reconnecting: " + error)
    }
  }, 10000);
})
bot.on('error', (err) => console.log(err))

const event_files = ["chatbridge"]
const client_files = ["chatbridge", "sudo"]

bot.on("message", message => {
  const msg = `` + message
  console.log(msg)
  if (!msg.startsWith("Guild >")) return;
  if (msg.endsWith("left.") || msg.endsWith("joined.")) {
    player = msg.split(" ")[2]
    if(!config.sendjoinleavemessages) return;
    if (config.namesToIgnore.includes(player)) return;
    client.channels.cache.get(config.chatchannel).send({ content: `**${player}** ${msg.split(" ")[3]}` })
    return;
  }

  function getAuthor(msg) {
    prefixes = msg.split(" ")
    prelen = prefixes.length
    if (prefixes[prelen - 1].endsWith("]")) {
      return prefixes[prelen - 2]
    } else {
      return prefixes[prelen - 1]
    }
  }

  text = message + ``
  parts = text.split(": ")
  author = getAuthor(parts[0])
  if (author == bot.username) return;
  messageContent = parts.slice(1).join(": ")

  event_files.forEach(event => {
    const torun = require("./events/" + event + '.js')
    torun.execute(bot, messageContent, client, author)
  });
})




bot.once("login", () => {
  console.log(`Mineflayer logged in as ${bot.username}, version: ${bot.version}`)
  client.channels.cache.get(config.chatchannel).send({ content: `${bot.username} logged in.` })
  bot.chat("§")
})


client.on("messageCreate", message => {
  const text = message.content
  client_files.forEach(file => {
    const torun = require("./client/" + file + '.js')
    torun.execute(client, text, bot, message)
  });
})

client.once("ready", () => {
  console.log('Discord Client Ready')
  client.user.setActivity({ type: ActivityType.Custom, name: "Credits", state: "Bridge by @stuffy"})
})

client.login(process.env.DISCORD_TOKEN);

process.on('SIGINT', async () => {
  console.log("Shutting down...")
  await client.channels.cache.get(config.chatchannel).send({ content: `${bot.username} logging out.` })
  bot.quit()
  client.destroy()
  process.exit(0)
})