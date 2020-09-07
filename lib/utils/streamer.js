const fs = require('fs');

module.exports = function streamer(path) {
  if(!path) throw Error('Path to song required.');
  
  const song = fs.createReadStream(path);
  song.on('end', () => song.close());
  return song;
};
