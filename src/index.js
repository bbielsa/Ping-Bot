const DiscordClient = require('discord.js').Client
const config = require('config')


const clientSecret = config.get('token')
const client = new DiscordClient()

client.on('ready', () => {
    console.log('Im ready Im ready')
})

client.on('message', message => {
    console.log(message)
})

client.login(clientSecret)
