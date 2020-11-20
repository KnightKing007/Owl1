require('dotenv/config');
const Event = require('../structures/bases/events');
const { muteModel, lockdownModel } = require('../database/models/export/index');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true,
        });
    }

    async run() {
        console.log('Bot is ready!');
        this.client.user.setActivity(`[?help] ${this.client.guilds.cache.size} servers`, { type: 'WATCHING' });
    }
};