require('dotenv').config();
const { Client } = require('pg');
// /seedData is gitignored
const seedUsers = require('../seedData/seedUsers');
const seedSongs = require('../seedData/seedSongs');

const client = new Client(process.env.POSTGRES_URI);
client.on('error', err => console.log(err));
client.on('end', () => console.log('Done seeding tables. Disconnected from Postgres.'));

module.exports = async function seedTables() {
  console.log('Seeding tables...');

  await client.connect()
    .then(() => console.log('Connected to Postgres'))
    .catch(err => console.log('Error connecting to Postgres: ', err));

  console.log('Seeding user_account table.');
  try {
    await Promise.all(
      seedUsers.map(async user => {
        await client.query(`
          INSERT INTO user_account(
            username,
            email,
            password_hash
          ) VALUES ($1, $2, $3)
        `, [user.username, user.email, user.password_hash])
          .catch(err => Promise.reject(err));
      })
    )
      .then(() => console.log('Done seeding users.'))
  } catch(error) {console.log('Error seeding user_account table: ', error);}

  console.log('Seeding song_library table.');
  try {
    await Promise.all(
      seedSongs.map(async song => {
        await client.query(`
          INSERT INTO song_library(
            user_account,
            title,
            artist,
            genre,
            path
          )
          VALUES ($1, $2, $3, $4, $5)
        `, [song.user_account, song.title, song.artist, song.genre, song.path]);
      })
    )
      .then(() => console.log('Done seeding song_library table.'));
  } catch(error) {console.log('Error seeding song_library table: ', error);}
  
  return client.end();
};
