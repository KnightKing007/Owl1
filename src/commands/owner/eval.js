const Command = require('../../structures/bases/commands');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'eval',
            description: 'eval the code!',
            category: 'Owner',
            permission: 'botOwner',
            aliases: ["ev"]
        });
    }

    async execute(message, args) {
      const clean = text => {
         if (typeof(text) === "string")
     return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }  
      
      try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
    }
};