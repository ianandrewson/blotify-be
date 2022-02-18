const {Router} = require('express');
const streamer = require('../utils/streamer');
const db = require('../db');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(id);

    // const range = req.body.range ? req.body.range : '0-';
    const range = req.headers.range ? req.headers.range : '0-';

    let songPath = '';
    try {
      const path = await db.query(`
        SELECT path
        FROM song_library
        WHERE id = $1
      `, [id]);
      songPath = path.rows[0].path;
    }
    catch (err) {next(err);}

    const song = streamer(songPath, range);

    res.set({
      'Cache-Control': 'no-store',
      'Content-Type': 'audio/mp3',
      // 'Content-Range': `bytes ${song.start}-${song.end}/${song.fileSize}`,
      // 'Accept-Ranges': 'bytes',
      'Content-Length': `${song.length}`,
    });
    res.status(206);
    // song.songData.pipe(res);
    song.songData.pipe(res);

    // probably best to have streamer return a stream,
    // and send res from here
  });
