require('dotenv/config');
const Event = require('../../structures/bases/events');

module.exports = class extends Event {

    async run(member) {
        const channel = member.guild.channels.cache.get(process.env.memberLog_channel);

        const embed = {
            color: 'ORANGE',
            author: {
                name: `${member.user.tag} (${member.id})`,
                icon_url: member.user.displayAvatarURL({ dynamic: true, format: 'png' }),
            },
            footer: {
                text: 'User Left',
            },
            timestamp: Date.now(),
        };

        channel.send({ embed: embed });
    }   
}; 