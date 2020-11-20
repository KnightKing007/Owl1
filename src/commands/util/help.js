const Command = require('../../structures/bases/commands');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'help',
            description: 'Display a list of all available commands!',
            category: 'Util',
        });
    }

    async execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle("Help Menu")

        const command = this.client.commands.get(args[0]);

        if (command) {
            embed.addField('❯ Name', command.name);
            embed.addField('❯ Description', command.description);
            embed.addField('❯ Useage', command.usage);
            if (command.aliases.length) embed.addField('❯ Aliases', command.aliases.map(alias => `\`${alias}\``).join(' '));
            if (command.examples.length) embed.addField('❯ Examples', command.examples.map(example => `\`${example}\``).join('\n'));
        }
        else {
            let categories;
            embed.setDescription('For info on a command, use `?help <command>`');
            
            if (!this.client.owners.includes(message.author.id)) {
				categories = this.client.util.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
			} else {
				categories = this.client.util.removeDuplicates(this.client.commands.map(cmd => cmd.category));
			}

            for (const category of categories) {
                embed.addField(`❯ ${category}`, this.client.commands.filter(c => c.category === category).map(c => `\`${c.name}\``).join(' '));
            }
        }

        message.channel.send({ embed: embed });
    }
};