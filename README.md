## Quote Bridge Bot

This is a fork from [MX1D's Guild Bot](https://github.com/MX1D/Guild-Bot). Frag Bot features and Database connections have been stripped, amongst other things. There is a lot that has been changes, and a lot that will be changed.

# DISCLAIMER

This bot uses [mineflayer](https://www.npmjs.com/package/mineflayer), use at your own risk.

## Token

Firstly we have **Token** this is your Discord bot token
if you didn't make a bot yet make one at [Discord Developers Site](https://discord.com/developers/applications)
Then copy the token and paste it in the config file

## Email and Password

Second thing we have **Email** and **Password** Those are your minecraft account details and put the auth to either mojang or microsoft depending on your account type

## Webhook

Now you need to create a **Webhook** in the channel you want the chat bridge to be
Simply go to the channel settings > Intgrations and create a webhook with any name you want
Then copy the webhook URL and go to that link, You will find webhook id and token there
copy each one of them and put them in the config file

## Cooldown

For the cooldown it's the time between command usage **NOT FOR ONE USER** for all users so it's less spammy in the guild chat if so many people use the bot at the same time if you don't want a cooldown put a 0 there but if you do put any number in seconds i use 3 in my bot

## Owner ID

Here you can put your discord id for the bot to be able to use "sudo",
you can type anything and bot will say it for example "sudo /gc Hi!"
