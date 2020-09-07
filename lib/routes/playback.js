const { Router } = require('express');
const fs = require('fs');
const streamer = require('../utils/streamer');
const db = require('../db');

module.exports = Router()
  .get('/:id', async(req, res, next) => {
    const id = req.params.id;
    let songPath = '';
    
    try {
      const path = await db.query(`
        SELECT path
        FROM song_library
        WHERE id = $1
      `, [id]);
      songPath = path.rows[0].path;
    }
    catch(err) {next(err);}

    const song = streamer(songPath);
    song.on('end', () => {
      console.log('ending');
      res.end();
    });
    song.on('data', chunk => res.write(chunk));
    // song.pipe(res);
    
    // probably best to have streamer return a stream,
    // and send res from here
  });
