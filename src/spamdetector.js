const RateLimiter = require('limiter').RateLimiter


class SpamDetector {

    constructor(discordClient) {
        this.discordClient = discordClient
        this.limiters = []

        this.discordClient.on('message', message => this.onMessage(message))
    }

    onMessage(message) {
        const hasMentions = message.mentions.users.size > 0
        const isPerson = !message.author.bot

        if(!hasMentions || !isPerson)
            return;

        const author = message.author
        const id = author.id

        this.limiters[id] = new RateLimiter(5, 'minute')
    }

}


module.exports = {
    SpamDetector,
}