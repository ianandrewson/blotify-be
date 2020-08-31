require('dotenv').config();
const { Client } = require('pg');
// /seedData is gitignored
const { seedUsers } = require('../seedData/seedUsers');

const client = new Client(process.env.POSTGRES_URI);
client.on('error', err => console.log(err));
client.on('end', () => console.log('Done seeding tables. Disconnected from Postgres.'));

module.exports = async function seedTables() {
  console.log('Seeding tables...');

  await client.connect()
    .then(() => console.log('Connected to Postgres'))
    .catch(err => console.log('Error connecting to Postgres: ', err));

  console.log('Seeding user_account table.');
  await Promise.all(
    seedUsers.map(async user => {
      await client.query(`
        INSERT INTO user_account(
          username,
          email
        ) VALUES ($1, $2)
      `, [user.username, user.email]);
    })
  )
    .then(() => console.log('Done seeding users.'))
    .catch(err => console.log('Error seeding user_account table: ', err));
  
  return client.end();
};
