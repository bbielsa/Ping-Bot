const getRandomItem = require('random-weighted-item').default


const getChannels = client => Array.from(client.channels.values())

const userInChannel = (user, channel) => {
    return channel.members.some(member => member.user.id === user.id)
}

const otherChannels = (client, spammer, spamChannel) => {
    // channels the spammer is in
    const channels = getChannels(client)

    // get all the other text channels that the spammer is in
    const spammerChannels = channels
                                    .filter(channel => channel.type === 'text')
                                    .filter(channel => userInChannel(spammer, channel))
                                    .filter(channel => channel.id !== spamChannel)

    return spammerChannels
}

const randomOtherChannel = (client, spammer, spamChannel) => {
    const spammerOtherChannels = otherChannels(client, spammer, spamChannel)

    // weight channels that are further away in the list of channels this means
    // its more likely that the notification will happen in a channel where the 
    // spammer is not looking in, so they get an annoying ping notification 
    // sound
    const getWeight = otherChannel => Math.abs(spamChannel.calculatedPosition - otherChannel.calculatedPosition)

    return getRandomItem(spammerOtherChannels, getWeight)
}

const counterSpam = (client, spammer, spamChannel) => {
    const randomRoom = randomOtherChannel(client, spammer, spamChannel)

    randomRoom
        .send('Hey stop spamming <@' + spammer.id + '>')
        .then(message => message.delete()) // leave no trace of the bot
        .catch(console.error)
}


module.exports = {
    counterSpam,
}