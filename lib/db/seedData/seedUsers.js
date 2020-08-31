const bcrypt = require('bcryptjs');
const password_hash = bcrypt.hashSync('password', 12);

const seedUsers = [
  {
    username: 'testUser',
    email: 'user@test.com',
    password_hash
  }
];

module.exports = seedUsers;
