require("dotenv").config()
const mineflayer = require("mineflayer");
const config = require("./config.json")
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const fs = require('fs')
const prefix = config.prefix

var options = {
  host: "hypixel.net",
  username: config.email,
  password: config.password,
  version: "1.8",
  colorsEnabled: false,
  auth: config.auth,
  chatLengthLimit: 256
};

var bot = mineflayer.createBot(options);

bot.on('kicked', reason => {
  console.log(reason)
  client.channels.cache.get(config.chatchannel).send(`Bot kicked offline, check logs.`)
  setTimeout(() => {
    console.log("Attempting to reconnect.")
    bot = mineflayer.createBot(options);
  }, 10000);
})
bot.on('error', console.log)

const event_files = ["chatbridge"]
const client_files = ["chatbridge", "sudo"]

bot.on("message", message => {
  const msg = `` + message
  console.log(msg)
  if (!msg.startsWith("Guild >")) return;
  if (msg.endsWith("left.") || msg.endsWith("joined.")) {
    // TODO: Add guild join/leave messages
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
  client.user.setActivity("Hypixel", { type: "PLAYING" })
  client.user.setStatus("online")
})

client.login(config.token);

process.on('SIGINT', async () => {
  console.log("Shutting down...")
  await client.channels.cache.get(config.chatchannel).send({ content: `${bot.username} logging out.` })
  bot.quit()
  client.destroy()
  process.exit(0)
})