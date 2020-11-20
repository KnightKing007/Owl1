const Command = require('../../structures/bases/commands');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'restart',
            description: 'restart the bot',
            category: 'Owner',
            permission: 'botOwner',
            aliases: []
        });
    }

    async execute(message, args) {
     await this.client.user.setActivity(`🛑 [Restarting In 10 Seconds!] 🛑`, { type: "PLAYING" });

        message.channel
          .send(`🛑 | The Bot is going to restart in 10 seconds!`)
          .then(message => {
            setTimeout(function() {
              process.exit();
            }, 10000);
          });
    }
};