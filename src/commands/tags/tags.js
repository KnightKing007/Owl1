const Command = require('../../structures/bases/commands');
const { tagModel } = require('../../database/models/export/index');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'tags',
            description: 'Display a list of all tags!',
            category: 'Tags',
        });
    }

    async execute(message) {
        const allTags = await tagModel.find({ guildID: message.guild.id });
        if (!allTags.length) return message.channel.send('This guild dosn\'t have any tags.');

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`${message.guild.name}'s Tags`)
            .setDescription(allTags.map(tag => `\`${tag.tagName}\``).join(' '))
    
        message.reply(embed);
        
    };
};