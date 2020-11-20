require('dotenv/config');
const Command = require('../../structures/bases/commands');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'stats',
            description: 'Display information about the bot.',
            category: 'Info',
        });
    }

    async execute(message) {
        const botOwner = await this.client.users.fetch(process.env.botOwnerID);

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .setFooter(`2020 © ${botOwner.tag}`)
            .addField('Uptime', moment.duration(this.client.uptime).format('d [days] h [hrs] m [mins] s [secs]'), true)
            .addField('❯ Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField('❯ API Ping', `${this.client.ws.ping} ms`, true)
            .addField('❯ Members', `• Members: ${this.client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0).toLocaleString()}`, true)
            //.addField('❯ Source Code', '[View Here](https://github.com/iColtz/Aspect)', true)
            .addField('❯ Library', '[discord.js](https://discord.js.org/#/)', true);
            
        message.channel.send({ embed: embed });
    }
};