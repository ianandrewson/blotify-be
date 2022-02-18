const fs = require('fs');

module.exports = function streamer(path, range = 0) {
  if (!path) throw Error('Path to song required.');

  const fileSize = fs.statSync(path).size;
  const chunkSize = 2 ** 21; //2097152 Bytes = ~2 MB
  const start = Number(range.split('-')[0]);
  const end = Math.min(start + chunkSize, fileSize - 1);
  // const length = end - start + 1;
  const length = fileSize - 1;

  const songData = fs.createReadStream(path,
    {start, end}
  );
  songData.on('end', () => songData.close());
  return {
    songData,
    fileSize,
    start,
    end,
    length
  };

};
