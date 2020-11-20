const { promisify } = require('util');
const path = require('path');
const glob = promisify(require('glob'));

module.exports = class Util {

    constructor(client) {
        this.client = client;
    }

    getMentions() {
        const client = this.client;

        return {
            member(mention, guild) {
                if (!mention) return;
                const matches = mention.match(/<@!?(\d{17,19})>/);
                const memberID = matches ? matches[1] : mention;
                return guild.members.cache.get(memberID);
            },
            async user(mention) {
                if (!mention) return;
                const matches = mention.match(/<@!?(\d{17,19})>/);
                const userID = matches ? matches[1] : mention;
                return await client.users.fetch(userID).catch(() => null);
            },
            channel(mention, guild) {
                if (!mention) return;
                const matches = mention.match(/<#(\d{17,19})>/);
                const channelID = matches ? matches[1] : mention;
                return guild.channels.cache.get(channelID);
            },
            role(mention, guild) {
                if (!mention) return;
                const matches = mention.match(/<@&(\d{17,19})>/);
                const roleID = matches ? matches[1] : mention;
                return guild.roles.cache.get(roleID);
            },
        };
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    trimArray(arr, number) {
		if (arr.length > number) {
			const len = arr.length - number;
			arr = arr.slice(0, number);
			arr.push(`${len} more...`);
		}

		return arr;
	}

    removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    }

    async loadCommands() {
        return glob(`${this.directory}commands/**/*.js`).then(commands => {
            for (const commandFile of commands) {
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                const command = new File(this.client, name.toLowerCase());
                this.client.commands.set(command.name, command);
                if (command.aliases.length) {
                    for (const alias of command.aliases) {
                        this.client.aliases.set(alias, command.name);
                    }
                }
            }
        });
    }

    async loadEvents() {
        return glob(`${this.directory}events/**/*.js`).then(events => {
            for (const eventFile of events) {
                delete require.cache[eventFile];
                const { name } = path.parse(eventFile);
                const File = require(eventFile);
                const event = new File(this.client, name.toLowerCase());
                this.client.events.set(event.name, event);
                event.emitter[event.type](name, (...args) => event.run(...args));
            }
        });
    }

};