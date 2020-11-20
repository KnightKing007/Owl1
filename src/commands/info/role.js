const Command = require('../../structures/bases/commands');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'role',
            description: 'Display information about a role.',
            category: 'Info',
        });
    }

    async execute(message, args) {
        const role = this.client.util.getMentions().role(args[0], message.guild) || message.member.roles.highest;

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`Info on **${role.name}** (ID: ${role.id})`)
            .setThumbnail(role.guild.iconURL({ dynamic: true, format: 'png' }))
            .addField('❯ Info', [
                `• Colour: ${role.color.toString(16)}`,
                `• Hoisted: ${role.hoisted ? 'Yes' : 'No'}`,
                `• Mentionable: ${role.mentionable ? 'Yes' : 'No'}`,
                `• Creation Date: ${moment(role.createdAt).format('L')}, ${moment(role.createdAt).fromNow()}`,
            ])
            .addField('❯ Permissions', role.permissions.toArray().map(perm => '• ' + this.client.util.capitalize(perm.toLowerCase().replace(/_/g, ' '))));

        message.channel.send({ embed: embed });
    }
}; 