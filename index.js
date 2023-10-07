require("dotenv").config()
const mineflayer = require("mineflayer");
const config = require("./config.json")
const { Client, Intents } = require('discord.js');
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES)
const client = new Client( { intents: [myIntents] } )
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

const command_files = fs.readdirSync("./commands/normal/").filter(files => files.endsWith(".js"));

const commands = ["calc", "8ball", "cf"]

for (const val of command_files) {
    commands.push(val.replace('.js', ''))
}

const cdarr = []

bot.on("message", message =>{

  function authorFunction(msg) {
    const args = msg.split(/ +/)
    if(!msg.startsWith("Guild >") || msg.endsWith("left.") || msg.endsWith("joined.")) return;
    if(!args[2].includes("[")){
      return args[2]
    }
    if(args[2].includes("[")){
      return args[3]
    }
  }

  const text = message + ``
  
  const author = authorFunction(text)

    const fullArgs = text.split(/ +/)

    const content = text.substring(text.indexOf(":") + 1);

    if(cdarr[0]) return;
    
    if(content.startsWith(` ${prefix}`)){
    if(!cdarr[0]){
      cdarr.push("CD!")
      setTimeout(() => {
        cdarr.shift()
      }, (config.cooldown - "") * 1000);
      }
    }

    if(!content.startsWith(` ${prefix}`)) return;

    const args = content.slice(prefix.length + 1).split(/ +/)

    const commandSent = args.shift().toLowerCase();

    const stringsim = require("string-similarity")
    const arr = []
    commands.sort()
    commands.forEach(command => {
    const similarity = stringsim.compareTwoStrings(commandSent, command);
      if(similarity === 1){
        arr.push(command)
        return;
      }
    })
    commands.forEach(command => {
      const similarity = stringsim.compareTwoStrings(commandSent, command);
      if(similarity > 0.89){
        arr.push(command)
        return;
      } else
      if(similarity > 0.79){
        arr.push(command)
        return;
      } else
      if(similarity > 0.59){
        arr.push(command)
        return;
      } else
      if(similarity > 0.49){
        arr.push(command)
        return;
      }
    })
    if(!arr.length === 0) return;
    console.log(arr)

    const command = arr[0]

    console.log(command)
    if (commands.includes(command)) {
        console.log("looking for command file...")
        const torun = require("./commands/normal/" + command + '.js')
        torun.excute(bot, args, text, author)
        return;
    }

})

const event_files = ["channellog", "chatbridge", "consolelogs"]

const client_files = ["chatbridge", "say", "update"]

bot.on("message", message =>{

  function authorFunction(msg) {
    const args = msg.split(/ +/)
    if(!msg.startsWith("Guild >") || msg.endsWith("left.") || msg.endsWith("joined.")) return;
    if(!args[2].includes("[")){
      return args[2]
    }
    if(args[2].includes("[")){
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




bot.once("login", () =>{
  console.log(`Logged in as ${bot.username}, version: ${bot.version}`)
})


client.on("message", message =>{
  const text = message.content
  client_files.forEach(file => {
      const torun = require("./client/" + file + '.js')
      torun.excute(client, text, bot, message)
  });
})

client.once("ready", () =>{
  console.log('ready')
})

client.login(config.token);
