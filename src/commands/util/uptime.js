const Command = require('../../structures/bases/commands');
const moment = require('moment');
require('moment-duration-format');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'uptime',
            description: 'Display how long the bot has been online!',
            category: 'Util',
        });
    }

    async execute(message) {
        const formattedTime = moment.duration(this.client.uptime).format('d [days] h [hours] m [mins] s [seconds]');
        message.channel.send(`⏳ My uptime is ${formattedTime}`);
    }
};