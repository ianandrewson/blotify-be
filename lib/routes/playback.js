const { Router } = require('express');
const fs = require('fs');
const streamer = require('../utils/streamer');
const db = require('../db');

module.exports = Router()
  .get('/:id', async(req, res, next) => {
    const id = req.params.id;
    console.log(id);
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
    // console.log('songPath: ', songPath);

    if(songPath) {
      const song = fs.createReadStream(songPath);
      song.pipe(res);
      song.on('end', () => {
        console.log('ending');
        song.close();
        res.end();
      });
    }
    
    // probably best to have streamer return a stream,
    // and send res from here
  });
