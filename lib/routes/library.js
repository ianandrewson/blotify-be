const { Router } = require('express');
const db = require('../db');

module.exports = Router()
  .get('/', (req, res, next) => {
    db.query(`
      SELECT *
      FROM song_librarY
    `)
      .then(songs => res.send(songs.rows))
      .catch(err => console.log(err));
  });
