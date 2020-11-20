require('dotenv/config');
const { Client, Collection } = require('discord.js');
const util = require('./util');

module.exports = class AspectClient extends Client {

    constructor() {
        super({
            disableMentions: 'everyone',
            ws: { properties: { $browser: "Discord Android" }}
        });
        
        this.token = process.env.bot_token
        
        this.prefix = process.env.prefix;

        this.util = new util(this);

        this.events = new Collection();

        this.commands = new Collection();

        this.aliases = new Collection();
        
        this.owners = process.env.botOwnerID
    }

    async start(token = this.token) {
        this.util.loadCommands();
        this.util.loadEvents();
        require('../database/database')();
        super.login(token);
    }
};