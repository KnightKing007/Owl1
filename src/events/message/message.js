const Event = require('../../structures/bases/events');
const { tagModel } = require('../../database/models/export/index');

module.exports = class extends Event {

    async run(message) {
        if (!message.content.startsWith(this.client.prefix) || message.bot || !message.guild) return;

        const [commandName, ...args] = message.content.slice(this.client.prefix.length).trim().split(/ +/g);

        const command = this.client.commands.get(commandName)
            || this.client.commands.get(this.client.aliases.get(commandName));

        if (!command) {
            const tagName = message.content.slice(this.client.prefix.length);

            const tagDoc = await tagModel.findOne({ guildID: message.guild.id, tagName: tagName })
                || await tagModel.findOne({ guildID: message.guild.id, tagAliases: tagName });

            if (tagDoc) {
                await tagDoc.updateOne({ tagUses: parseInt(tagDoc.tagUses) + 1 });
                return message.channel.send(tagDoc.tagContent);
            }
        }
        else {  
            const mentionedMember = this.client.util.getMentions().member(args[0], message.guild);

            if (command.permission) {
                const hasPermission = require('../../managers/permissionManager')(message.member, command.permission, mentionedMember);

                if (hasPermission) return;
            }
            
            if (command.requireMentioned && !mentionedMember) {
                return message.channel.send(`You need to mention a member you want to **${command.name}**`);
            }

            try {
                command.execute(message, args, mentionedMember);
            }
            catch (error) {
                console.log(error);
                message.channel.send('There seems to have been an error while executing this command.');
            }
        }
    }
};