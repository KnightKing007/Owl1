const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    guildID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    caseNumber: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
        required: true,
    },
});

module.exports = mongoose.model('guild', guildSchema);