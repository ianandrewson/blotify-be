require('dotenv').congif();
const { Client } = require('pg');

const client = new Client(process.env.POSTGRES_URI);
client.on('error', err => console.log(err));
client.on('end', () => console.log('Done creating tables. Disconnected from Postgres'));

module.exports = async function createTables() {
  console.log('Creating tables...');

  await client.connect()
    .then(() => console.log('Connected to Postgres.'))
    .catch(err => console.log('Error connecting to Postgres: ', err));

  console.log('Creating last_modified trigger function');
  await client.query(`
    CREATE OR REPLACE FUNCTION update_last_modified()
      RETURNS TRIGGER AS $update_modified$
        BEGIN
          NEW.last_modified := CURRENT_TIMESTAMP;
          RETURN NEW;
        END;
        $update_modified$ LANGUAGE plpgsql;
  `)
    .then(() => console.log('Done creating last_modified trigger function.'))
    .catch(err => console.log('Error creating last_modified trigger function: ', err));

  console.log('Creating user_account table.');
  await client.query(`
    CREATE TABLE user_account (
      id SERIAL PRIMARY KEY NOT NULL,
      username VARCHAR(64) NOT NULL,
      email VARCHAR(128) NOT NULL,
      last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      password_hash VARCHAR(256) NOT NULL,
      last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
      CREATE TRIGGER user_modified
        BEFORE UPDATE ON user_account
        FOR EACH ROW
        EXECUTE FUNCTION update_last_modified();
  `)
    .then(() => console.log('Done creating user_account table.'))
    .catch(err => console.log('Error creating user_account table: ', err));
};
