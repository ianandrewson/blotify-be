require('dotenv').config();
const { Client } = require('pg');

const client = new Client(process.env.POSTGRES_URI);
client.on('error', err => console.log('error'));
client.on('end', () => console.log('Done dropping tables. Disconnected from Postgres.'));

module.exports = async function dropTables() {
  await client.connect()
    .then(console.log('Connected to Postgres'))
    .catch(err => console.log('Error connecting to Postgres: ', err));
  
  await client.query(`
    DROP TABLE IF EXISTS song_library, user_account
  `)
    .then(() => console.log('Done dropping tables.'))
    .catch(err => console.log('Error dropping tables: ', err));

  return client.end();
};
