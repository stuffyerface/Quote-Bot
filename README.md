## Bridge Bot

This is a template for a very basic Hypixel Guild Bridge based on [MX1D's Guild Bot](https://github.com/MX1D/Guild-Bot). Skyblock features, commands, redundancies, and other clunkiness has been removed. !DISCLAIMER: This bot uses [mineflayer](https://www.npmjs.com/package/mineflayer), which is a modified version of MineCraft that allows you to run a client without graphics. This is use at your own risk.

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
The config folder is where you will put all information that is unique to your account, guild, and server. The config.json file is where you will put all of your information. The config.json file should look like this:

```json
{
    "token": "",
    "email": "",
    "password": "",
    "auth": "microsoft",
    "webhookid": "",
    "webhooktoken": "",
    "chatchannel": "",
    "cooldown": "",
    "ownerID": "",
    "subID": ""
}
```
The fields are as follows:
| Field | Description |
| ----- | ----------- |
| token | The token of your Discord Bot, found in the developer portal. |
| email | The email of the MineCraft account you want to use. |
| password | The password of the MineCraft account you want to use |
| auth | The authentication method of the MineCraft account you want to use (microsoft or mojang) |
| webhookid | The webhook id. Found under "id" when following the webhook link.  |
| webhooktoken | The webhook token. Found under "token" when following the webhook link. |
| chatchannel | The channel id. Found under "channel_id" when following the webhook link. |
| cooldown | The cooldown between messages, leave empty for 0 |
| ownerID | ID for a Discord user with permission to `sudo` |
| subID | Alternate ID for a Discord user with permission to `sudo` |

## License
[MIT](https://choosealicense.com/licenses/mit/)