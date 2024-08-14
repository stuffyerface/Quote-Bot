require("dotenv").config()
const mineflayer = require("mineflayer");
const config = require("./config.json")
const { ActivityType, Client, GatewayIntentBits, Collection, Events, REST, Routes, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const fs = require('fs')
const path = require('path')
const commandPath = fs.readdirSync(path.join(__dirname, 'commands'));

require('dotenv').config()

var options = {
  host: config.serverip,
  username: process.env.MC_EMAIL,
  //password: process.env.MC_PASSWORD,
  version: "1.8",
  colorsEnabled: false,
  auth: "microsoft",
  chatLengthLimit: 256
};

createBot()

function createBot() {
  var bot = mineflayer.createBot(options); 

  bot.on('end', reason => {
    console.log(reason)
    bot.end()
    bot.online = false
    bot.timestamp = getTime()
    client.user.setStatus("dnd")
    
    setTimeout(() => {
      console.log("Attempting to reconnect.")
      try {
        createBot()
        console.log("Bot created.")
      } catch (error) {
        console.log("Error reconnecting: " + error)
        client.channels.cache.get(config.chatchannel).send(config.kickmessage)
      }
    }, 10000);
  })
  bot.on('error', console.log)
  bot.on('kicked', console.log)

  const event_files = ["chatbridge"]
  const client_files = ["chatbridge", "sudo"]

  bot.on("message", message => {
    const msg = `` + message
    console.log(msg)
    if (!msg.startsWith("Guild >")) return;
    if (msg.endsWith("left.") || msg.endsWith("joined.")) {
      player = msg.split(" ")[2]
      if (!config.sendjoinleavemessages) return;
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




  bot.once("login", async () => {
    username = bot.username
    console.log(`Mineflayer logged in as ${username}, version: ${bot.version}`)
    bot.online = true
    bot.timestamp = getTime()
    client.user.setStatus("online")
    await client.channels.cache.get(config.chatchannel).send({ content: `${username} logged in.` })
    bot.chat("/limbo")
  })


  client.on("messageCreate", message => {
    const text = message.content
    client_files.forEach(file => {
      const torun = require("./client/" + file + '.js')
      torun.execute(client, text, bot, message)
    });
  })

  const errorEmbed = new EmbedBuilder()
    .setColor(0xf0554a)
    .setTitle('Slash Command Error')
    .setFooter({ text: 'Bridge bot by @stuffy' })
    .setDescription('This interaction failed. Please Try again.')

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction, bot)
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deterred) {
        try{
          await interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
        } catch {
          console.log("Interaction reply failed.")
        }
      } else {
        try{
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        } catch {
          console.log("Interaction reply failed.")
        }
      }
    }
  })

  client.once("ready", () => {
    console.log('Discord Client Ready')
    client.user.setActivity({ type: ActivityType.Custom, name: "Credits", state: "Bridge by @stuffy" })
  })

  client.login(process.env.DISCORD_TOKEN);

  process.on('SIGINT', async () => {
    console.log("Process ending...")
    await client.channels.cache.get(config.chatchannel).send({ content: `${bot.username} logging out.` })
    console.log("Sent message to channel.")
    bot.quit()
    console.log("Minecraft Bot Terminated.")
    client.destroy()
    console.log("Discord Bot Terminated.")
    process.exit(0)
  })

  client.commands = new Collection();
  const commands = [];

  for (const file of commandPath) {
    const command = require(`./commands/${file}`);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command)
      commands.push(command.data.toJSON())
    } else {
      console.log(`[WARNING] The command at ${command} is missing a required field.`)
    }
  }

  const rest = new REST().setToken(process.env.DISCORD_TOKEN);

  (async () => {
    try {
      console.log(`Started refreshing ${commands.length} slash commands.`)

      const data = await rest.put(
        Routes.applicationGuildCommands(config.botid, config.homeguild),
        { body: commands }
      )

      console.log(`Successfully reloaded ${data.length} slash commands.`)
    } catch (error) {
      console.error(error)
    }
  })();
}

function getTime() {
  timestamp = Math.floor(Date.now()/1000)
  return "<t:" + timestamp + ":R>"
}