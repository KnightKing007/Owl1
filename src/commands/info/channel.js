const Command = require('../../structures/bases/commands');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'channel',
            description: 'Display information about a channel.',
            category: 'Info',
        });
    }

    async execute(message, args) {
        const channel = this.client.util.getMentions().channel(args[0], message.guild) || message.channel;

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`Info on **${channel.name}** (ID: ${channel.id})`)
            .setThumbnail(channel.guild.iconURL({ dynamic: true, format: 'png' }))
            .addField('❯ Info', [
                `• Type: ${this.client.util.capitalize(channel.type)}`,
                `• Topic: ${channel.topic ? channel.topic.length > 50 ? channel.topic.substring(0, 50) + '...' : channel.topic : 'None'}`,
                `• NSFW: ${channel.nsfw ? 'Yes' : 'No'}`,
                `• Creation Date: ${moment(channel.createdAt).format('L')}, ${moment(channel.createdAt).fromNow()}`,
            ]);

        message.channel.send({ embed: embed });
    }
}; 