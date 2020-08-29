/* eslint-disable no-console */

require('dotenv').config();
const { Client } = require('pg');

console.log('Connecting to postgres...');

const client = new Client(process.env.POSTGRES_URI);

client.connect()
  .then(() => console.log('Connected to Postgres database'))
  .catch(err => console.log(err));
client.on('error', err => console.log(err));
client.on('end', () => console.log('Disconnected from Postgres'));

module.exports = {
  pgClient: client,
  query: (text, params, callback) => client.query(text, params, callback)
};
