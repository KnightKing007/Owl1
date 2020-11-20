require('dotenv/config');

module.exports = (member, permission, mentioned) => {
    switch (permission) {
        case 'botOwner':
            if (member.id !== process.env.botOwnerID) return true;
            else return false; 
        default:
            throw new TypeError('Invalid Permission Parameter.');
    }
};