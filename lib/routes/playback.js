const { Router } = require('express');
const fs = require('fs');
const streamer = require('../utils/streamer');

module.exports = Router()
  .get('/', (req, res, next) => {
    // use streamer
    // res.send from here or within streamer?

    // const dir = fs.opendirSync('C:/Users/user/Desktop/crate_dig_june_18');
    // console.log(dir.readSync());
    // dir.closeSync();
    // res.send('check logs');

    const song = fs.createReadStream('C:/Users/user/Desktop/crate_dig_june_18/01-modeselektor-essential_mix-08-10-2011.mp3',);
    song.pipe(res);
    song.on('end', () => {
      console.log('ending');
      song.close();
      res.end();
    });

    // fs.readFile('C:/Users/user/Desktop/crate_dig_june_18/Benjamin_Damage_Drum_Computer.mp3', (err, data) => {

    //   if(err) console.log(err);
    //   res.type('audio/mp3');
    //   console.log(data);
    //   res.send(data);
    // });
    
    // probably best to have streamer return a stream,
    // and send res from here
  });
