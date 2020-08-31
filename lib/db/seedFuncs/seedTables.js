require('dotenv').config();
const { Client } = require('pg');
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
  
};