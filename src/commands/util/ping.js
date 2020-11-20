const Command = require('../../structures/bases/commands');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ping',
            description: 'Pong!',
            category: 'Util',
        });
    }

    async execute(message) {
        const msg = await message.channel.send('Pinging...');

        const messagePing = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(`🏓 Pong! \nThe Bot Latency\`${messagePing}ms\` \nThe Api Latency \`${this.client.ws.ping}ms\``);
    }
};