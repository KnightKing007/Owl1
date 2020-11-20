const Command = require('../../structures/bases/commands');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const status = {
    offline: 'Offline',
    dnd: 'Do Not Disturb',
    idle: 'Idle',
    online: 'Online',
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'user',
            description: 'Display information about a user.',
            category: 'Info',
        });
    }

    async execute(message, args) {
        const user = await this.client.util.getMentions().user(args[0]) || message.author;
        const member = user.id == message.author.id ? message.member : message.guild.members.cache.get(user.id);

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`Info on **${user.username}** (ID: ${user.id})`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'png' }))
            .addField('❯ User Details', [
                `• ID: ${user.id}`,
                `• Username: ${user.username}`,
                `• Created At: ${moment(user.createdAt).format('L')}, ${moment(user.createdAt).fromNow()}`,
                `• Status: ${status[user.presence.status]}`,
                `• Activities ${user.presence.activities.map((a) => a.name).join(', ')}`,
            ])
            .addField('❯ Member Details', [
                `• Nickname: ${member.nickname || 'None'}`,
                `• Roles: ${member.roles.cache.sort((a, b) => b.position - a.position).map(r => r)}`,
                `• Joined At: ${moment(member.joinedAt).format('L')}, ${moment(member.joinedAt).fromNow()}`,
            ]);

        message.channel.send({ embed: embed });
    }
}; 