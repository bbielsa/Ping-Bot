const DiscordClient = require('discord.js').Client
const config = require('config')


const clientSecret = config.get('secret')
// const client = new DiscordClient()


console.log(clientSecret)
