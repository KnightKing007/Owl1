const Command = require('../../structures/bases/commands');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very High',
};
const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydney: 'Sydney',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South',
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'guild',
            description: 'Display information about a guild.',
            category: 'Info',
        });
    }

    async execute(message) {
        const guild = message.guild;

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`Info on **${guild.name}** (ID: ${guild.id})`)
            .setThumbnail(guild.iconURL({ dynamic: true, format: 'png' }))
            .addField('❯ Channels', [
                `• ${guild.channels.cache.filter(c => c.type == 'text').size} text`,
                `• ${guild.channels.cache.filter(c => c.type == 'voice').size} voice`,
            ])
            .addField('❯ Member', [
                `• ${guild.memberCount} members`,
                `• Guild Owner: ${guild.owner.user.tag} (ID: ${guild.owner.id})`,
            ])
            .addField('❯ Other', [
                `• Roles: ${guild.roles.cache.size - 1}`,
                `• Region: ${regions[guild.region]}`,
                `• Created At: ${moment(guild.createdAt).format('L')}, ${moment(guild.createdAt).fromNow()}`,
                `• Verification Level: ${verificationLevels[guild.verificationLevel]}`,
            ]);

        message.channel.send({ embed: embed });
    }
}; 