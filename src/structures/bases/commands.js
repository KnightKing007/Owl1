module.exports = class Command {

    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.description = options.description || "Not Have Usage";
        this.aliases = options.aliases || [];
        this.usage = options.usage || "Not Have Usage";
        this.examples = options.examples || [];
        this.category = options.category || "Not Have Usage";
        this.permission = options.permission;
        this.requireMentioned = options.requireMentioned;
    }

};