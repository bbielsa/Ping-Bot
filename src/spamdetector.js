const RateLimiter = require('limiter').RateLimiter
const EventEmitter = require('events')

class SpamDetector extends EventEmitter {

    constructor(discordClient) {
        super()

        this.discordClient = discordClient
        this.limiters = []

        this.discordClient.on('message', message => this.onMessage(message))
    }

    rateLimiterFor(user) {
        const id = user.id

        if(id in this.limiters) {
            return this.limiters[id]
        }
        else {
            const limiter = new RateLimiter(3, 'minute', true)
            this.limiters[id] = limiter

            return limiter
        }      
     }

    onMessage(message) {
        const hasMentions = message.mentions.users.size > 0
        const isPerson = !message.author.bot

        if(!hasMentions || !isPerson)
            return;

        const author = message.author
        const id = author.id
        const channel = message.channel
        const limiter = this.rateLimiterFor(author)

        limiter.removeTokens(1, (error, remaining) => {
            if(remaining < 0)
                this.emit('spamDetected', {author, channel})
        })
    }

}


module.exports = {
    SpamDetector,
}