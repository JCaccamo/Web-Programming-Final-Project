const data = require('../data/users.json');

function getUsers() {
    return data.users;
}

function getUser(id) {
    return data.users.find(p => p.userName === userName);
}

module.exports = {
    getUsers,
    getUser
};
