const DiscordClient = require('discord.js').Client
const config = require('config')
const SpamDetector = require('./spamdetector').SpamDetector
const counterSpam = require('./counterspam').counterSpam


const clientSecret = config.get('token')
const client = new DiscordClient()
const spamDetector = new SpamDetector(client)

spamDetector.on('spamDetected', spam => {
    const spammer = spam.author
    const spamChannel = spam.channel

    counterSpam(client, spammer, spamChannel)
})

client.login(clientSecret)
