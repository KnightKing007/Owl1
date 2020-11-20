require('dotenv/config');
const Event = require('../../structures/bases/events');
const { evadingModel } = require('../../database/models/export/index');

module.exports = class extends Event {

    async run(member) {
        member.roles.add(process.env.join_role);

        const channel = member.guild.channels.cache.get(process.env.memberLog_channel);

        const evadingDoc = await evadingModel.findOne({
            guildID: member.guild.id,
            memberID: member.id,
        });

        if (evadingDoc) {
            const validRestrictions = ['muted', 'emojiRestricted', 'attachmentRestricted', 'reactionRestricted', 'tagRestricted'];
            const evadingRestrictions = Object.keys(evadingDoc.toJSON())
                .filter(x => validRestrictions.includes(x));

            for (const restriction of evadingRestrictions) {
                if (evadingDoc[restriction]) {
                    const restrictionRole = member.guild.roles.cache.get(process.env[`${restriction}_role`]);
                    if (restrictionRole) member.roles.add(restrictionRole);
                }
            }
        }

        const embed = {
            color: 'GREEN',
            author: {
                name: `${member.user.tag} (${member.id})`,
                icon_url: member.user.displayAvatarURL({ dynamic: true, format: 'png' }),
            },
            footer: {
                text: 'User Joined',
            },
            timestamp: Date.now(),
        };

        channel.send({ embed: embed });
    }   
}; 