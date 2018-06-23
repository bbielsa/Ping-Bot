const DiscordClient = require('discord.js').Client
const config = require('config')
const SpamDetector = require('./spamdetector').SpamDetector


const clientSecret = config.get('token')
const client = new DiscordClient()
const spamDetector = new SpamDetector(client)

client.login(clientSecret)
