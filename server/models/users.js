const data = require('../data/users.json');

function getUsers() {
    return data.users;
}

function getUser(id) {
    return data.users.find(p => p.id === id);
}

module.exports = {
    getUsers,
    getUser
};
