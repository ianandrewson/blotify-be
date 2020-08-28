require('dotenv').config();

const app = require('./lib/app');
const PORT = process.env.PORT || 3737;

app.listen(PORT, () => console.log('server running on PORT', PORT));
