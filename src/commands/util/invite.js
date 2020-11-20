const Command = require('../../structures/bases/commands');
const Discord = require("discord.js")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'invite',
            description: 'Show the bot invite!',
            category: 'Util',
        });
    }

    async execute(message) {
        const botinvite = `https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot`
        const serverinv = "https://discord.gg/hw7XPxz"
        const embed = new Discord.MessageEmbed()
        .setTitle("Invite Menu")
        .setColor("WHITE")
        .addFields(
		{ name: 'Invite The Bot', value: `[CLICK ME](${botinvite})`, inline: false },
		{ name: 'Join Support Server', value: `[CLICK ME](${serverinv})`, inline: false },
	)
	
	message.reply(embed)
    }
};