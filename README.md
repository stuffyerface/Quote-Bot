## Bridge Bot

A program to host a connection between a Channel inside of discord, and a Guild Chat in game on Hypixel.

> [!WARNING]
> This bot uses [mineflayer](https://www.npmjs.com/package/mineflayer), which is a modified version of MineCraft that allows you to run a client without graphics. Modified MineCraft clients may be against server rules, so this software is use at your own risk.

## Requirements
- A MineCraft Account in the guild you want to bridge (I recommend not using an account you care about)
- A Discord Bot Application - [Instructions](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- A Webhook in the channel you want to bridge - [Instructions](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- A computer to run the bot on


## Instructions for use
1. Create a Discord Bot and invite it to your server
2. Make a Webhook in the channel you want to bridge
3. Clone this repository to a preferred location on your computer
4. Populate the config.json file with your information (see below)
5. Open a terminal in the directory you cloned the repository to
6. Run `npm install` to install dependencies
7. Run `node index.js` to start the bot

## Config

> [!NOTE]
> When updating between release versions, be sure to copy over your config

The config folder is where you will put all information that is unique to your account, guild, and server. The config.json file is where you will put all of your information. The config.json file should look like this:

```json
{
    "serverip": "",
    "chatchannel": "",
    "homeguild": "",
    "botid": "",
    "sendjoinleavemessages": false,
    "namesToIgnore": [
        "sampleName1",
        "sampleName2"
    ],
    "kickmessage": "Bot kicked offline, check logs."
}
```
The fields are as follows:
| Field | Description |
| ----- | ----------- |
| serverip | The address of the Minecraft server to connect to. For these purposes: `hypixel.net`|
| chatchannel | The channel id. Found under "channel_id" when following the webhook link. |
| homeguild | The id of your bot's home guild. For slash commands.|
| botid | The id of your bot. For slash commands.|
| sendjoinleavemessages | `True` to send a message when guild members join/leave, `False` to not. |
| namesToIgnore | A list of usernames you don't wish to be sent when they join or leave |
| kickmessage | The message to send in the bridge channel when the bot detects itself going offline. |

> [!TIP]
> You can use tags in your `kickmessage` to mention users or roles, like `<@discordUserId>` or `<@&discordRoleId>`

## Environment Variables

> [!WARNING]
> Environment Variables are meant to remain private. Do not share these with anyone.

```.env
# Your .env file contains sensitive information. Do not share it with anyone.
DISCORD_TOKEN=""
WEBHOOK_URL="https://discord.com/api/webhooks/<channelID>/<webhookToken>"

# Minecraft Credentials
MC_EMAIL=""
MC_PASSWORD=""

```
The fields are as follows:
| Field | Description |
| ----- | ----------- |
| DISCORD_TOKEN | The token of your Discord Bot, found in the developer portal. |
| MC_EMAIL | The email of the MineCraft account you want to use. |
| MC_PASSWORD | The password of the MineCraft account you want to use, often not needed. |
| WEBHOOK_URL | The webhook link. Should be given to you upon webhook creation. |

## License
[MIT](https://choosealicense.com/licenses/mit/)