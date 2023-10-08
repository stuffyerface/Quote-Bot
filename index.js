require("dotenv").config()
const mineflayer = require("mineflayer");
const config = require("./config.json")
const { Client, Intents } = require('discord.js');
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES)
const client = new Client({ intents: [myIntents] })
const fs = require('fs')
const prefix = config.prefix

var options = {
  host: "hypixel.net",
  username: config.email,
  password: config.password,
  version: "1.8",
  colorsEnabled: false,
  auth: config.auth
};

var bot = mineflayer.createBot(options);

bot.on('kicked', console.log)
bot.on('error', console.log)

const event_files = ["chatbridge", "consolelogs"]
const client_files = ["chatbridge", "sudo"]

bot.on("message", message => {

  function authorFunction(msg) {
    const args = msg.split(/ +/)
    if (!msg.startsWith("Guild >") || msg.endsWith("left.") || msg.endsWith("joined.")) return;
    if (!args[2].includes("[")) {
      return args[2]
    }
    if (args[2].includes("[")) {
      return args[3]
    }
  }

  const text = message + ``
  const author = authorFunction(text)

  event_files.forEach(event => {
    const torun = require("./events/" + event + '.js')
    torun.excute(bot, text, client, author)
  });
})




bot.once("login", () => {
  console.log(`Logged in as ${bot.username}, version: ${bot.version}`)
})


client.on("message", message => {
  const text = message.content
  client_files.forEach(file => {
    const torun = require("./client/" + file + '.js')
    torun.excute(client, text, bot, message)
  });
})

client.once("ready", () => {
  console.log('ready')
})

client.login(config.token);
