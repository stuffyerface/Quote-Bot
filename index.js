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

bot.on('kicked', console.log) // THIS DOES NOT WORK IDK WHY???
bot.on('error', console.log)

const event_files = ["chatbridge"]
const client_files = ["chatbridge", "sudo"]

bot.on("message", message => {
  const msg = `` + message
  console.log(msg)
  if (!msg.startsWith("Guild >")) return;
  if (msg.endsWith("left.") || msg.endsWith("joined.")){
    // TODO: Add guild join/leave messages
    return;
  }

  function getAuthor(msg) {
    prefixes = msg.split(" ")
    prelen = prefixes.length
    if (prefixes[prelen-1].endsWith("]")) {
      return prefixes[prelen-2]
    }else{
      return prefixes[prelen-1]
    }
  }

  text = message + ``
  parts = text.split(": ")
  author = getAuthor(parts[0])
  if(author == bot.username) return;
  messageContent = parts[1]

  event_files.forEach(event => {
    const torun = require("./events/" + event + '.js')
    torun.excute(bot, messageContent, client, author)
  });
})




bot.once("login", () => {
  console.log(`Mineflayer logged in as ${bot.username}, version: ${bot.version}`)
})


client.on("message", message => {
  const text = message.content
  client_files.forEach(file => {
    const torun = require("./client/" + file + '.js')
    torun.excute(client, text, bot, message)
  });
})

client.once("ready", () => {
  console.log('Discord Client Ready')
})

client.login(config.token);
